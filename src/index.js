import { blacklists } from "./definitions.js";
import net from "node:net";

/**
 * @typedef {Object} LookupDomain
 * @property {string} address - The domain to query (e.g. 2.0.0.127.zen.spamhaus.org)
 * @property {string} listKey - The key of the blacklist (e.g. zen.spamhaus.org)
 */

/**
 * @typedef {Object} LookupResult
 * @property {string} name - The name of the blacklist or listKey if unknown
 * @property {boolean} listed - Whether the IP is listed (true) or not (false)
 * @property {string} reason - The reason for listing or status message
 * @property {string|null} code - The IP returned by the DNS query, or null
 * @property {string|null} delistUrl - URL to request delisting, or null
 */

/**
 * Reverses an IP address for DNSBL queries.
 * Supports IPv4 and IPv6.
 * @param {string} ip
 * @returns {string|null} Reversed IP (d.c.b.a for IPv4, nibbles for IPv6) or null if invalid
 */
function reverseIP(ip) {
	if (typeof ip !== "string") {
		return null;
	}

	if (net.isIPv4(ip)) {
		return ip.split(".").reverse().join(".");
	}

	if (net.isIPv6(ip)) {
		try {
			// Expand ::
			let expanded = ip;
			if (ip.indexOf("::") !== -1) {
				const parts = ip.split("::");
				const left = parts[0].split(":").filter((p) => p);
				const right = parts[1].split(":").filter((p) => p);
				const missing = 8 - (left.length + right.length);
				// Safety check for invalid IPv6 length
				if (missing < 0) return null;
				const middle = new Array(missing).fill("0000");
				expanded = [...left, ...middle, ...right].join(":");
			}

			// Check for IPv4-mapped IPv6 addresses (contain dots), not supported for now
			if (expanded.includes(".")) {
				return null;
			}

			const segments = expanded.split(":").map((part) => part.padStart(4, "0"));
			const fullHex = segments.join("");

			return fullHex.split("").reverse().join(".");
		} catch (e) {
			return null;
		}
	}

	return null;
}

/**
 * Generates the list of domains to query.
 *
 * @param {string} ip - The IPv4 or IPv6 address to check.
 * @param {Object} [options]
 * @param {Object} [options.spamhaus]
 * @param {"zen"|"dqs"} [options.spamhaus.mode] - Use Spamhaus public DNSBLs (zen) or Spamhaus DQS (dqs).
 * @param {string} [options.spamhaus.dqsKey] - Required when mode is 'dqs'.
 * @returns {Array<LookupDomain>} List of domains to query.
 */
export function getLookupDomains(ip, options = undefined) {
	if (!ip || typeof ip !== "string") {
		throw new Error("IP address must be a non-empty string");
	}

	const reversed = reverseIP(ip);
	if (!reversed) {
		throw new Error(`Invalid IP address: ${ip}`);
	}

	const spamhausMode = options?.spamhaus?.mode || "zen";
	const dqsKeyRaw = options?.spamhaus?.dqsKey;
	const dqsKey = typeof dqsKeyRaw === "string" ? dqsKeyRaw.trim() : "";

	if (spamhausMode !== "zen" && spamhausMode !== "dqs") {
		throw new Error("options.spamhaus.mode must be either 'zen' or 'dqs'");
	}

	if (spamhausMode === "dqs") {
		if (!dqsKey) {
			throw new Error(
				"options.spamhaus.dqsKey is required when options.spamhaus.mode is 'dqs'",
			);
		}
		// DQS keys are used as a DNS label; reject dots/whitespace and other characters.
		if (!/^[a-z0-9-]+$/i.test(dqsKey)) {
			throw new Error(
				"options.spamhaus.dqsKey must be a valid DNS label (letters/numbers/hyphen)",
			);
		}
	}

	const spamhausPublicKeys = new Set(["zen.spamhaus.org", "sbl.spamhaus.org"]);
	const spamhausDqsKeys = new Set(["zen.dq.spamhaus.net", "sbl.dq.spamhaus.net"]);

	const listKeys = Object.keys(blacklists).filter((listKey) => {
		if (spamhausMode === "zen") {
			return !spamhausDqsKeys.has(listKey);
		}
		if (spamhausMode === "dqs") {
			return !spamhausPublicKeys.has(listKey);
		}
		return true;
	});

	return listKeys.map((listKey) => {
		const address =
			spamhausMode === "dqs" && spamhausDqsKeys.has(listKey)
				? `${reversed}.${dqsKey}.${listKey}`
				: `${reversed}.${listKey}`;

		return {
			address,
			listKey,
		};
	});
}

/**
 * Parses the result from a DNS A-record lookup.
 *
 * @param {string} listKey - The blacklist domain (e.g. 'zen.spamhaus.org')
 * @param {string} resultCode - The IP returned by the DNS query (e.g. '127.0.0.2')
 * @returns {LookupResult} Human readable result
 */
export function parseLookupResult(listKey, resultCode) {
	if (!listKey || typeof listKey !== "string") {
		return {
			name: "Unknown",
			listed: false,
			reason: "Invalid list key provided",
			code: resultCode || null,
			delistUrl: null,
		};
	}

	const hasProp = Object.prototype.hasOwnProperty.call(blacklists, listKey);
	const listDef = hasProp ? blacklists[listKey] : null;

	if (!listDef) {
		return {
			name: listKey,
			listed: true,
			reason: "Unknown List",
			code: resultCode,
			delistUrl: null,
		};
	}

	try {
		// Some lists use A-record responses to indicate query errors/blocks.
		// Treat these as NOT listed, otherwise they become false positives.
		const spamhausKeys = new Set([
			"zen.spamhaus.org",
			"sbl.spamhaus.org",
			"zen.dq.spamhaus.net",
			"sbl.dq.spamhaus.net",
		]);
		if (spamhausKeys.has(listKey) && resultCode === "127.255.255.254") {
			return {
				name: listDef.name,
				listed: false,
				reason:
					listDef.mappings?.[resultCode] ||
					"Query blocked by Spamhaus (rate limit / missing authorization / policy)",
				code: resultCode,
				delistUrl: listDef.delistUrl,
			};
		}

		if (
			listKey === "black.uribl.com" &&
			(resultCode === "127.0.0.1" || resultCode === "127.0.0.255")
		) {
			return {
				name: listDef.name,
				listed: false,
				reason:
					listDef.mappings?.[resultCode] ||
					"Query blocked by URIBL (possibly due to high volume)",
				code: resultCode,
				delistUrl: listDef.delistUrl,
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

		const reason =
			listDef.mappings?.[resultCode] ||
			`Listed (Unmapped return code: ${resultCode})`;

		return {
			name: listDef.name,
			listed: true,
			reason: reason,
			code: resultCode,
			delistUrl: listDef.delistUrl,
		};
	} catch (error) {
		return {
			name: listDef.name || listKey,
			listed: true,
			reason: "Error parsing result",
			code: resultCode,
			delistUrl: listDef.delistUrl || null,
		};
	}
}

/**
 * Parses the result from a DNS A-record lookup and returns a JSON string.
 *
 * @param {string} listKey - The blacklist domain (e.g. 'zen.spamhaus.org')
 * @param {string} resultCode - The IP returned by the DNS query (e.g. '127.0.0.2')
 * @returns {string} JSON formatted string
 */
export function parseLookupResultJson(listKey, resultCode) {
	return JSON.stringify(parseLookupResult(listKey, resultCode));
}

export { blacklists };
