/**
 * Uptimeify DNSBL - Spamhaus DQS Example
 *
 * This script demonstrates how to query Spamhaus via DQS using a DQS key.
 *
 * IMPORTANT:
 * - Treat the key as a secret in real projects (use env vars / secret manager).
 * - The key below is a placeholder example provided by the user.
 */

import { getLookupDomains, parseLookupResult } from "../src/index.js";
import { resolve4 } from "node:dns/promises";

const DQS_KEY = process.env.SPAMHAUS_DQS_KEY;

async function checkIP(ip) {
	console.log(`\n🔎 Checking IP (Spamhaus DQS): ${ip}`);

	const domains = getLookupDomains(ip, {
		spamhaus: {
			mode: "dqs",
			dqsKey: DQS_KEY,
		},
	});

	// Reduce output noise: only show Spamhaus checks here.
	const spamhausOnly = domains.filter(
		(d) => d.listKey === "zen.dq.spamhaus.net" || d.listKey === "sbl.dq.spamhaus.net",
	);

	console.log(`   Using DQS key: ${DQS_KEY.slice(0, 4)}… (masked)`);
	console.log(`   Querying ${spamhausOnly.length} Spamhaus list(s) via DQS...`);

	const results = await Promise.all(
		spamhausOnly.map(async ({ address, listKey }) => {
			try {
				const [code] = await resolve4(address);
				return parseLookupResult(listKey, code);
			} catch (error) {
				if (error.code === "ENOTFOUND") {
					return {
						name: listKey,
						listed: false,
						reason: "Not Listed",
						code: null,
						delistUrl: null,
					};
				}

				return {
					name: listKey,
					listed: false,
					reason: `DNS Error: ${error.code || error.message}`,
					code: null,
					delistUrl: null,
				};
			}
		}),
	);

	const listed = results.filter((r) => r.listed);
	const notListed = results.filter((r) => !r.listed);

	if (listed.length > 0) {
		console.log(`\n❌ [LISTED] Found in ${listed.length} Spamhaus list(s):`);
		for (const res of listed) {
			console.log(`   - ${res.name}`);
			console.log(`     Reason: ${res.reason}`);
			console.log(`     Code:   ${res.code}`);
			if (res.delistUrl) console.log(`     Delist: ${res.delistUrl}`);
		}
	} else {
		console.log("\n✅ [CLEAN] Not listed in Spamhaus (via DQS).");
	}

	// Show non-listed results too, because DQS can return useful block/policy messages.
	if (notListed.length > 0) {
		console.log("\nℹ️  Other results:");
		for (const res of notListed) {
			console.log(`   - ${res.name}: ${res.reason}${res.code ? ` (${res.code})` : ""}`);
		}
	}
}

console.log("--- Spamhaus DQS Verification Utility ---");

// Example IPs (replace as needed)
await checkIP("213.209.159.159");
await checkIP("2a06:4880:8000::99");
