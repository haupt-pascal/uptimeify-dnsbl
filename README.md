# uptimeify-dnsbl

A lightweight, purely functional helper for checking if an IP is blocklisted. We handle the math and the mapping, you handle the network.

## What is this?

Checking DNS blocklists (DNSBL/RBL) usually involves three annoying steps:

1. Reversing the IP address (e.g. `1.2.3.4` -> `4.3.2.1` or the complex IPv6 nibble format).
2. Knowing which lists to check and what their specific return codes mean.
3. Making the DNS queries.

**uptimeify-dnsbl** solves #1 and #2. We give you the exact domains to query and parse the confusing result codes (like `127.0.0.4`) into human-readable reasons.

We intentionally **do not** perform the DNS lookups internally. This allows you to use your preferred DNS resolver, manage timeouts, handle concurrency, and cache results exactly how your app needs it.

## Features

- **IPv4 & IPv6 Support**: Correctly handles IP reversal for both protocols.
- **Result Parsing**: Translates cryptic return codes (`127.0.0.2`, `127.0.0.10`) into actual messages ("Listed in SBL", "ISP Policy").
- **Delisting Links**: Provides direct URLs to removal forms when available.
- **Zero Dependencies**: Just pure Javascript logic.

## Included Lists

We maintain definitions for the most reliable and widely used lists:

- **Spamhaus ZEN** (SBL, CSS, XBL, PBL) - _The gold standard_
- **Barracuda** (BRBL)
- **SpamCop**
- **Abusix Mail Intelligence**
- **SORBS** (Aggregate)
- **UCEPROTECT** (Level 1)
- **Hostkarma**
- **Backscatterer**
- **Invaluement SIP**
- **SpamCannibal**
- **DroneBL**
- **Spam Eating Monkey** (SEM-BLACK)
- **URIBL Black**
- **Madavi DNSBL**
- **RV-SOFT Technology**
- **ZapBL**
- **Suomispam Reputation**
- **Kempt.net**
- **Korea Services**
- **NiX Spam**
- **Passive Spam Block List** (PSBL)
- **InterServer RBL**
- **Spamhaus SBL**
- **all.s5h.net**
- **Abuse.ch Combined**
- **UCEPROTECT Level 2**
- **Abuse.ch Drone**
- **OrveDB AuBads**
- **0spam RBL**
- **Singular TTK PTE**
- **SpamRats Spam**
- **Spamsources Fabel**
- **Virus RBL JP**
- **Woody's SMTP Blacklist**
- **WPBL**
- **UCEPROTECT Level 3**
- **Duinv AuPads**
- **Gweep Proxy**
- **Gweep Relays**
- **Abuse.ch Spam**
- **Digibase Spambot**
- **Lashback UBL**
- **WormRBL**
- **0spam Blocklist**
- **Team Cymru Bogons**
- **SpamRats Dyna**
- **SpamRats NoPtr**
- **Nether.net Relays**
- **Imp.ch Spam RBL**
- **Mailspike Z**
- **Anonmails.de**
- **Pedantic.org**
- **Swinog**
- **GBUdb Truncate**
- **LashBack UBL**

## How to use it

### 1. Install

```bash
npm install uptimeify-dnsbl
```

### 2. Check an IP

```javascript
import { getLookupDomains, parseLookupResult } from "uptimeify-dnsbl";
import { resolve4 } from "node:dns/promises";

async function check(ip) {
	// 1. Get the list of domains to query
	const checks = getLookupDomains(ip);
	// Returns array: [{ address: "4.3.2.1.zen.spamhaus.org", listKey: "zen.spamhaus.org" }, ...]

	// 2. Run your DNS lookups
	// We use typical Promise handling here, but you can use any async pattern
	const results = await Promise.allSettled(
		checks.map(async ({ address, listKey }) => {
			// A successful DNS A-record lookup means the IP is listed.
			// If the IP is clean, resolve4 throws ENOTFOUND.
			const [code] = await resolve4(address);
			return parseLookupResult(listKey, code);
		}),
	);

	// 3. Process results
	const listings = results
		.filter((r) => r.status === "fulfilled") // Successful lookup = Listed
		.map((r) => r.value);

	if (listings.length > 0) {
		console.log(`❌ IP ${ip} is listed on:`);
		listings.forEach((listing) => {
			console.log(`   - ${listing.name}`);
			console.log(`     Reason: ${listing.reason}`);
			console.log(`     Delist: ${listing.delistUrl}`);
		});
	} else {
		console.log(`✅ IP ${ip} is clean.`);
	}
}

check("127.0.0.2");
```

## API

### `getLookupDomains(ip)`

Returns an array of objects containing the fully qualified domain to query (`address`) and the identifier key (`listKey`).

### `parseLookupResult(listKey, resultCode)`

Takes the list identifier and the IP address returned by the DNS query (e.g., `127.0.0.2`) and returns a rich object with the listing name, reason, and delist URL.

### `parseLookupResultJson(listKey, resultCode)`

Same as `parseLookupResult`, but returns a stringified JSON representation of the result.
