/**
 * Uptimeify DNSBL - Usage Example
 *
 * This script demonstrates how to identify if an IP address is blacklisted
 * using the helper functions provided by this library.
 *
 * Workflow:
 * 1. Generate lookup domains using `getLookupDomains(ip)`
 * 2. Query these domains using standard DNS lookups (A records)
 * 3. Parse the results using `parseLookupResult(listKey, code)`
 */

import {
	getLookupDomains,
	parseLookupResult,
	parseLookupResultJson,
} from "../src/index.js";
import { resolve4 } from "node:dns/promises";
import { performance } from "node:perf_hooks";

async function checkIP(ip) {
	console.log(`\n🔎 Checking IP: ${ip}`);

	const lookupOptions = process.env.SPAMHAUS_DQS_KEY
		? {
			spamhaus: {
				mode: "dqs",
				dqsKey: process.env.SPAMHAUS_DQS_KEY,
			},
		}
		: undefined;
	console.log(
		`   Spamhaus mode: ${lookupOptions ? "dqs" : "zen"}${lookupOptions ? " (via SPAMHAUS_DQS_KEY)" : ""}`,
	);

	try {
		// 1. Get the list of all DNSBL domains to query for this IP
		const startGetDomains = performance.now();
		const domains = getLookupDomains(ip, lookupOptions);
		const endGetDomains = performance.now();
		console.log(
			`   Preparing to query ${domains.length} blacklists... (took ${(endGetDomains - startGetDomains).toFixed(5)}ms)`,
		);

		let totalParseTime = 0;

		// 2. Perform DNS lookups in parallel
		// Note: handling DNS queries is outside the scope of the library,
		// but standard Node.js 'dns' module works perfectly.
		const results = await Promise.all(
			domains.map(async ({ address, listKey }) => {
				try {
					// resolve4 throws ENOTFOUND if the record doesn't exist (IP is clean)
					const addresses = await resolve4(address);
					const code = addresses[0]; // e.g., '127.0.0.2'

					// 3. Parse the returned code into a readable structure
					const startParse = performance.now();
					const result = parseLookupResult(listKey, code);
					const endParse = performance.now();
					totalParseTime += endParse - startParse;

					return result;
				} catch (error) {
					if (error.code === "ENOTFOUND") {
						// Domain not found = IP is not on this blacklist
						return {
							name: listKey,
							listed: false,
							reason: "Not Listed",
							code: null,
						};
					}
					// Handle other DNS errors
					return {
						name: listKey,
						listed: false,
						reason: `DNS Error: ${error.code}`,
						code: null,
					};
				}
			}),
		);

		console.log(
			`   [Perf] Cumulative time in parseLookupResult: ${totalParseTime.toFixed(5)}ms`,
		);

		// Display the findings
		const listed = results.filter((r) => r.listed);

		if (listed.length > 0) {
			console.log(`\n❌ [LISTED] Found in ${listed.length} blacklists:`);
			listed.forEach((res) => {
				console.log(`   - ${res.name}`);
				console.log(`     Reason: ${res.reason}`);
				console.log(`     Code:   ${res.code}`);
				if (res.delistUrl) {
					console.log(`     Delist: ${res.delistUrl}`);
				}
				console.log("");
			});
		} else {
			console.log("✅ [CLEAN] IP is not listed in any supported blacklists.");
		}
	} catch (err) {
		console.error("Critical Error during check:", err.message);
	}
}

// --- Execution ---

console.log("--- DNSBL Verification Utility ---");

// Check IPv4
await checkIP("213.209.159.159");

// Check IPv6
await checkIP("2a06:4880:8000::99");

// Check JSON Parsing Feature
console.log("\n-----------------------------------");
console.log("ℹ️  JSON Output Test:");
const startJson = performance.now();
const demoJson = parseLookupResultJson("zen.spamhaus.org", "127.0.0.4");
const endJson = performance.now();
console.log(demoJson);
console.log(`   (took ${(endJson - startJson).toFixed(5)}ms)`);
