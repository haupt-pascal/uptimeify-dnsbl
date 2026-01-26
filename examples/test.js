import { getLookupDomains, parseLookupResult } from "../src/index.js";
import { resolve4 } from "node:dns/promises";

async function checkIP(ip) {
	console.log(`Checking IP: ${ip}`);
	try {
		const domains = getLookupDomains(ip);
		console.log(`Querying ${domains.length} blacklists...`);

		const results = await Promise.all(
			domains.map(async ({ address, listKey }) => {
				try {
					const addresses = await resolve4(address);
					
					const code = addresses[0];

					return parseLookupResult(listKey, code);
				} catch (error) {
					if (error.code === "ENOTFOUND") {
						return {
							name: listKey,
							listed: false,
							reason: "Not Listed (NXDOMAIN)",
							code: null,
							delistUrl: null,
						};
					}
					return {
						name: listKey,
						listed: false,
						reason: `Error: ${error.code}`,
						code: null,
						delistUrl: null,
					};
				}
			}),
		);
		console.log("\n--- Results ---");
		results.forEach((res) => {
			if (res.listed) {
				console.log(`[LISTED] ${res.name}: ${res.reason} (${res.code})`);
				console.log(`         Delist: ${res.delistUrl}`);
			} else {
			}
		});

		const listedCount = results.filter((r) => r.listed).length;
		console.log(
			`\nSummary: Listed in ${listedCount} of ${domains.length} blacklists.`,
		);
	} catch (err) {
		console.error("Critical Error:", err.message);
	}
}

await checkIP("213.209.159.159");
