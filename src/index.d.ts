export interface LookupDomain {
	/** The domain to query (e.g. 2.0.0.127.zen.spamhaus.org) */
	address: string;
	/** The key of the blacklist (e.g. zen.spamhaus.org) */
	listKey: string;
}

export interface LookupResult {
	/** The name of the blacklist or listKey if unknown */
	name: string;
	/** Whether the IP is listed (true) or not (false) */
	listed: boolean;
	/** The reason for listing or status message */
	reason: string;
	/** The IP returned by the DNS query, or null */
	code: string | null;
	/** URL to request delisting, or null */
	delistUrl: string | null;
}

export interface BlacklistDefinition {
	/** The human-readable name of the blacklist */
	name: string;
	/** URL where a user can request removal */
	delistUrl: string;
	/** Mapping of return codes (IPs) to reasons */
	mappings: Record<string, string>;
}

export interface GetLookupDomainsOptions {
	spamhaus?: {
		/** Use Spamhaus public DNSBLs (zen) or Spamhaus DQS (dqs). Default: zen */
		mode?: "zen" | "dqs";
		/** Required when mode is 'dqs' */
		dqsKey?: string;
	};
}

/**
 * Definition of known blacklists and their return codes.
 */
export const blacklists: Record<string, BlacklistDefinition>;

/**
 * Generates the list of domains to query.
 *
 * @param ip - The IPv4 or IPv6 address to check.
 * @returns List of domains to query.
 */
export function getLookupDomains(ip: string): LookupDomain[];

/**
 * Generates the list of domains to query, with optional Spamhaus DQS support.
 */
export function getLookupDomains(
	ip: string,
	options?: GetLookupDomainsOptions,
): LookupDomain[];

/**
 * Parses the result from a DNS A-record lookup.
 *
 * @param listKey - The blacklist domain (e.g. 'zen.spamhaus.org')
 * @param resultCode - The IP returned by the DNS query (e.g. '127.0.0.2')
 * @returns Human readable result
 */
export function parseLookupResult(
	listKey: string,
	resultCode: string,
): LookupResult;

/**
 * Parses the result from a DNS A-record lookup and returns a JSON string.
 *
 * @param listKey - The blacklist domain (e.g. 'zen.spamhaus.org')
 * @param resultCode - The IP returned by the DNS query (e.g. '127.0.0.2')
 * @returns JSON formatted string
 */
export function parseLookupResultJson(
	listKey: string,
	resultCode: string,
): string;
