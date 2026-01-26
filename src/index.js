import { blacklists } from "./definitions.js";
import net from "node:net";

/**
 * Reverses an IP address for DNSBL queries.
 * @param {string} ip
 * @returns {string|null} Reversed IP (d.c.b.a) or null if invalid
 */
function reverseIP(ip) {
	if (!net.isIPv4(ip)) {
		return null;
	}
	return ip.split(".").reverse().join(".");
}

/**
 * Generates the list of domains to query.
 *
 * @param {string} ip - The IPv4 address to check.
 * @returns {Array<{address: string, listKey: string}>} List of domains to query.
 */
export function getLookupDomains(ip) {
	const reversed = reverseIP(ip);
	if (!reversed) {
		throw new Error(`Invalid IPv4 address: ${ip}`);
	}

	return Object.keys(blacklists).map((listKey) => {
		return {
			address: `${reversed}.${listKey}`,
			listKey: listKey,
		};
	});
}

/**
 * Parses the result from a DNS A-record lookup.
 *
 * @param {string} listKey - The blacklist domain (e.g. 'zen.spamhaus.org')
 * @param {string} resultCode - The IP returned by the DNS query (e.g. '127.0.0.2')
 * @returns {Object} Human readable result
 */
export function parseLookupResult(listKey, resultCode) {
	const listDef = blacklists[listKey];

	if (!listDef) {
		return {
			name: listKey,
			listed: true,
			reason: "Unknown List",
			code: resultCode,
			delistUrl: null,
		};
	}

	if (listKey === "nodes.junkemailfilter.com" && resultCode === "127.0.0.1") {
		return {
			name: listDef.name,
			listed: false,
			reason: listDef.mappings[resultCode] || "Whitelisted",
			code: resultCode,
			delistUrl: listDef.delistUrl,
		};
	}

	const reason = listDef.mappings?.[resultCode] || "Listed (Unknown Reason)";

	return {
		name: listDef.name,
		listed: true,
		reason: reason,
		code: resultCode,
		delistUrl: listDef.delistUrl,
	};
}

export { blacklists };