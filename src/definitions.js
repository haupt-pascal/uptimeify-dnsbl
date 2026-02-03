/**
 * @typedef {Object} BlacklistDefinition
 * @property {string} name - The human-readable name of the blacklist
 * @property {string} delistUrl - URL where a user can request removal
 * @property {Object.<string, string>} mappings - Mapping of return codes (IPs) to reasons
 */

/**
 * Definition of known blacklists and their return codes.
 * @type {Object.<string, BlacklistDefinition>}
 */
export const blacklists = {
	"zen.spamhaus.org": {
		name: "Spamhaus ZEN",
		delistUrl: "https://check.spamhaus.org/",
		mappings: {
			"127.255.255.254":
				"Query blocked by Spamhaus (rate limit / missing authorization / policy)",
			"127.0.0.2": "Listed in SBL (Spamhaus Block List - Direct spam sources)",
			"127.0.0.3":
				"Listed in CSS (Combating Spam Syndicate - Compromised hosts)",
			"127.0.0.4":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.5":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.6":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.7":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.10": "PBL - ISP Policy",
			"127.0.0.11": "PBL - ISP Policy",
		},
	},
	"zen.dq.spamhaus.net": {
		name: "Spamhaus DQS (ZEN)",
		delistUrl: "https://check.spamhaus.org/",
		mappings: {
			"127.255.255.254":
				"Query blocked by Spamhaus (rate limit / missing authorization / policy)",
			"127.0.0.2": "Listed in SBL (Spamhaus Block List - Direct spam sources)",
			"127.0.0.3":
				"Listed in CSS (Combating Spam Syndicate - Compromised hosts)",
			"127.0.0.4":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.5":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.6":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.7":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.10": "PBL - ISP Policy",
			"127.0.0.11": "PBL - ISP Policy",
		},
	},
	"b.barracudacentral.org": {
		name: "Barracuda Reputation Block List",
		delistUrl: "https://www.barracudacentral.org/rbl/removal-request",
		mappings: {
			"127.0.0.2": "Listed in Barracuda RBL",
		},
	},
	"bl.spamcop.net": {
		name: "SpamCop Blocking List",
		delistUrl: "https://www.spamcop.net/bl.shtml",
		mappings: {
			"127.0.0.2": "Listed in SpamCop",
		},
	},
	// Disabled as Abusix RBLs are now paid services
	// "combined.mail.abusix.zone": {
	//	name: "Abusix Mail Intelligence",
	//	delistUrl: "https://abusix.com/lookup/",
	//	mappings: {
	//		"127.0.0.2": "Blacklisted (Generic)",
	//		"127.0.0.3": "Blacklisted (External)",
	//		"127.0.0.4": "Blacklisted (Dynamic/Policy)",
	//	},
	//},
	"dnsbl.sorbs.net": {
		name: "SORBS Aggregate",
		delistUrl: "http://www.sorbs.net/lookup.shtml",
		mappings: {
			"127.0.0.2": "HTTP Proxy",
			"127.0.0.3": "SOCKS Proxy",
			"127.0.0.4": "Misc Proxy",
			"127.0.0.5": "SMTP Relay",
			"127.0.0.6": "Spam Source",
			"127.0.0.7": "Web Spam",
			"127.0.0.8": "Block List",
			"127.0.0.9": "Zombie",
		},
	},
	"dnsbl-1.uceprotect.net": {
		name: "UCEPROTECT Level 1",
		delistUrl: "http://www.uceprotect.net/en/rblcheck.php",
		mappings: {
			"127.0.0.2": "Listed in UCEPROTECT Level 1",
		},
	},
	"nodes.junkemailfilter.com": {
		name: "Hostkarma",
		delistUrl: "http://www.junkemailfilter.com/",
		mappings: {
			"127.0.0.2": "Blacklisted (Spam Source)",
			"127.0.0.3": "Yellow list (Mixed spam/non-spam)",
			"127.0.0.4": "Brown list (Suspicious/Score)",
			"127.0.0.5": "No Blacklist (Do not block)",
			"127.0.0.1": "Whitelisted (Pass)",
		},
	},
	"ips.backscatterer.org": {
		name: "Backscatterer",
		delistUrl: "http://www.backscatterer.org/?target=test",
		mappings: {
			"127.0.0.2": "Listed in Backscatterer",
		},
	},
	"ivm-sip.invaluement.com": {
		name: "Invaluement SIP",
		delistUrl: "https://www.invaluement.com/lookup/",
		mappings: {
			"127.0.0.2": "Listed in Invaluement SIP",
		},
	},
	"bl.spamcannibal.org": {
		name: "SpamCannibal",
		delistUrl: "http://www.spamcannibal.org/",
		mappings: {
			"127.0.0.2": "Listed in SpamCannibal",
		},
	},
	"dnsbl.dronebl.org": {
		name: "DroneBL",
		delistUrl: "https://dronebl.org/lookup",
		mappings: {
			"127.0.0.2": "Sample",
			"127.0.0.3": "IRC Drone",
			"127.0.0.5": "Bottler",
			"127.0.0.6": "Glass bot",
			"127.0.0.7": "DDoS Drone",
			"127.0.0.8": "SOCKS Proxy",
			"127.0.0.9": "HTTP Proxy",
			"127.0.0.10": "ProxyChain",
			"127.0.0.11": "Web Page Proxy",
			"127.0.0.12": "Open DNS Resolver",
			"127.0.0.13": "Brute Force Attackers",
			"127.0.0.14": "Open Wingate Proxy",
			"127.0.0.15": "Compromised Router / Gateway",
			"127.0.0.16": "Rootkit / Trojan",
			"127.0.0.17": "Automatically Determined Botnet (Tracker)",
			"127.0.0.18": "DNSBL / Tor Exit Node",
			"127.0.0.255": "Unknown",
		},
	},
	"bl.spameatingmonkey.net": {
		name: "Spam Eating Monkey SEM-BLACK",
		delistUrl: "https://spameatingmonkey.com/lookup",
		mappings: {
			"127.0.0.2": "Listed in SEM-BLACK",
		},
	},
	"black.uribl.com": {
		name: "URIBL Black",
		delistUrl: "https://lookup.uribl.com/",
		mappings: {
			"127.0.0.1": "Query blocked, possibly due to high volume",
			"127.0.0.2": "Listed in URIBL Black",
			"127.0.0.255": "Query blocked",
		},
	},
	// Dead on arrival, not reliable
	// "dnsbl.madavi.de": {
	// 	name: "Madavi DNSBL",
	// 	delistUrl: "https://www.madavi.de/en/dnsbl.html",
	// 	mappings: {
	// 		"127.0.0.2": "Listed in Madavi DNSBL",
	// 	},
	// },
	"dnsbl.rv-soft.info": {
		name: "RV-SOFT Technology DNSBL",
		delistUrl: "http://dnsbl.rv-soft.info",
		mappings: {
			"127.0.0.2": "Open relay",
			"127.0.0.3": "Open proxy",
			"127.0.0.4": "Spam source",
			"127.0.0.5": "Malware domain",
			"127.0.0.6": "Phishing messages",
			"127.0.0.7": "Spear phishing messages",
			"127.0.0.8": "Fraudulent messages, HOAX",
			"127.0.0.9": "Blackmail messages",
			"127.0.0.10": "Spam from End User, local PC",
			"127.0.0.11": "Non-RFC Compliant",
			"127.0.0.12": "Does not properly handle 5xx errors",
			"127.0.0.13": "Compromised System - DDoS",
			"127.0.0.14": "Compromised System - Relay",
			"127.0.0.15": "Compromised System - Proxy",
			"127.0.0.16": "Compromised System - Autorooter/Scanner",
			"127.0.0.17": "Compromised System - Mass mailing virus",
			"127.0.0.18": "Compromised System - Mass mailing phishing",
			"127.0.0.19": "Bad reputation",
			"127.0.0.20": "Mass distribution",
			"127.0.0.126": "Other reason",
			"127.0.0.127": "Private record",
		},
	},
	"dnsbl.zapbl.net": {
		name: "ZapBL",
		delistUrl: "http://zapbl.net/",
		mappings: {
			"127.0.0.2": "Listed in ZapBL",
		},
	},
	"gl.suomispam.net": {
		name: "Suomispam Reputation",
		delistUrl: "https://suomispam.net/",
		mappings: {
			"127.0.0.2": "Listed in Suomispam",
		},
	},
	"dnsbl.kempt.net": {
		name: "Kempt.net DNSBL",
		delistUrl: "http://dnsbl.kempt.net/",
		mappings: {
			"127.0.0.2": "Listed in Kempt.net",
		},
	},
	"korea.services.net": {
		name: "Korea Services DNSBL",
		delistUrl: "http://www.korea.services.net/",
		mappings: {
			"127.0.0.2": "Listed in Korea Services",
		},
	},
	"nixspam.heise.de": {
		name: "NiX Spam",
		delistUrl: "https://www.heise.de/ix/nixspam/",
		mappings: {
			"127.0.0.2": "Listed in NiX Spam",
		},
	},
	"psbl.surriel.com": {
		name: "Passive Spam Block List (PSBL)",
		delistUrl: "http://psbl.surriel.com/",
		mappings: {
			"127.0.0.2": "Listed in PSBL",
		},
	},
	"rbl.interserver.net": {
		name: "InterServer RBL",
		delistUrl: "http://rbl.interserver.net/",
		mappings: {
			"127.0.0.2": "Listed in InterServer RBL",
		},
	},
	"sbl.spamhaus.org": {
		name: "Spamhaus SBL",
		delistUrl: "https://check.spamhaus.org/",
		mappings: {
			"127.255.255.254":
				"Query blocked by Spamhaus (rate limit / missing authorization / policy)",
			"127.0.0.2": "Listed in SBL (Spamhaus Block List)",
		},
	},
	"sbl.dq.spamhaus.net": {
		name: "Spamhaus DQS (SBL)",
		delistUrl: "https://check.spamhaus.org/",
		mappings: {
			"127.255.255.254":
				"Query blocked by Spamhaus (rate limit / missing authorization / policy)",
			"127.0.0.2": "Listed in SBL (Spamhaus Block List)",
		},
	},
	"spam.dnsbl.anonmails.de": {
		name: "Anonmails.de DNSBL",
		delistUrl: "https://spam.dnsbl.anonmails.de/",
		mappings: {
			"127.0.0.2": "Listed in Anonmails.de",
		},
	},
	"spam.pedantic.org": {
		name: "Pedantic.org spam list",
		delistUrl: "http://www.pedantic.org/",
		mappings: {
			"127.0.0.2": "Listed in Pedantic.org",
		},
	},
	// Disabled as Swinog DNSBL is not stable/reliable
	//"swinog.spam.dnsbl.ch": {
	//	name: "Swinog DNSBL",
	//	delistUrl: "https://www.swinog.ch/spam/",
	//	mappings: {
	//		"127.0.0.2": "Listed in Swinog",
	//	},
	//},
	"truncate.gbudb.net": {
		name: "GBUdb Truncate",
		delistUrl: "http://www.gbudb.com/truncate/",
		mappings: {
			"127.0.0.2": "Listed in GBUdb",
		},
	},
	"ubl.unsubscore.com": {
		name: "LashBack UBL",
		delistUrl: "https://blacklist.lashback.com/",
		mappings: {
			"127.0.0.2": "Listed in LashBack UBL",
		},
	},
	"all.s5h.net": {
		name: "all.s5h.net",
		delistUrl: "http://s5h.net",
		mappings: {
			"127.0.0.2": "Listed in all.s5h.net",
		},
	},
	"combined.abuse.ch": {
		name: "Abuse.ch Combined",
		delistUrl: "https://abuse.ch",
		mappings: {
			"127.0.0.2": "Listed in Abuse.ch",
		},
	},
	"dnsbl-2.uceprotect.net": {
		name: "UCEPROTECT Level 2",
		delistUrl: "http://www.uceprotect.net/en/rblcheck.php",
		mappings: {
			"127.0.0.2": "Listed in UCEPROTECT Level 2",
		},
	},
	"drone.abuse.ch": {
		name: "Abuse.ch Drone",
		delistUrl: "https://abuse.ch",
		mappings: {
			"127.0.0.2": "Listed in Abuse.ch Drone",
		},
	},
	// Dead project
	//"orvedb.aupads.org": {
	//	name: "OrveDB AuBads",
	//	delistUrl: "https://aupads.org",
	//	mappings: {
	//		"127.0.0.2": "Listed in OrveDB",
	//	},
	//},
	"rbl.0spam.org": {
		name: "0spam RBL",
		delistUrl: "https://0spam.org",
		mappings: {
			"127.0.0.2": "Listed in 0spam RBL",
		},
	},
	"singular.ttk.pte.hu": {
		name: "Singular TTK PTE",
		delistUrl: "http://singular.ttk.pte.hu",
		mappings: {
			"127.0.0.2": "Listed in Singular TTK PTE",
		},
	},
	"spam.spamrats.com": {
		name: "SpamRats Spam",
		delistUrl: "https://www.spamrats.com",
		mappings: {
			"127.0.0.38": "Listed in SpamRats Spam",
		},
	},
	"spamsources.fabel.dk": {
		name: "Spamsources Fabel",
		delistUrl: "http://www.fabel.dk",
		mappings: {
			"127.0.0.2": "Listed in Spamsources Fabel",
		},
	},
	"virus.rbl.jp": {
		name: "Virus RBL JP",
		delistUrl: "http://www.rbl.jp",
		mappings: {
			"127.0.0.2": "Listed in Virus RBL JP",
		},
	},
	"blacklist.woody.ch": {
		name: "Woody's SMTP Blacklist",
		delistUrl: "http://blacklist.woody.ch",
		mappings: {
			"127.0.0.2": "Listed in Woody's",
		},
	},
	// Often overloaded/unreliable
	// "db.wpbl.info": {
	// 	name: "WPBL",
	// 	delistUrl: "http://wpbl.info",
	// 	mappings: {
	// 		"127.0.0.2": "Listed in WPBL",
	// 	},
	// },
	"dnsbl-3.uceprotect.net": {
		name: "UCEPROTECT Level 3",
		delistUrl: "http://www.uceprotect.net/en/rblcheck.php",
		mappings: {
			"127.0.0.2": "Listed in UCEPROTECT Level 3",
		},
	},
	// Dead project
	// "duinv.aupads.org": {
	// 	name: "Duinv AuPads",
	// 	delistUrl: "https://aupads.org",
	// 	mappings: {
	// 		"127.0.0.2": "Listed in Duinv",
	// 	},
	// },
	"proxy.bl.gweep.ca": {
		name: "Gweep Proxy",
		delistUrl: "http://gweep.ca",
		mappings: {
			"127.0.0.2": "Listed in Gweep Proxy",
		},
	},
	"relays.bl.gweep.ca": {
		name: "Gweep Relays",
		delistUrl: "http://gweep.ca",
		mappings: {
			"127.0.0.2": "Listed in Gweep Relays",
		},
	},
	"spam.abuse.ch": {
		name: "Abuse.ch Spam",
		delistUrl: "https://abuse.ch",
		mappings: {
			"127.0.0.2": "Listed in Abuse.ch Spam",
		},
	},
	"spambot.bls.digibase.ca": {
		name: "Digibase Spambot",
		delistUrl: "http://bls.digibase.ca",
		mappings: {
			"127.0.0.2": "Listed in Digibase Spambot",
		},
	},
	"ubl.lashback.com": {
		name: "Lashback UBL",
		delistUrl: "https://blacklist.lashback.com",
		mappings: {
			"127.0.0.2": "Listed in Lashback UBL",
		},
	},
	"wormrbl.imp.ch": {
		name: "WormRBL",
		delistUrl: "http://antispam.imp.ch",
		mappings: {
			"127.0.0.2": "Listed in WormRBL",
		},
	},
	"bl.0spam.org": {
		name: "0spam Blocklist",
		delistUrl: "https://0spam.org",
		mappings: {
			"127.0.0.2": "Listed in 0spam",
		},
	},
	"bogons.cymru.com": {
		name: "Team Cymru Bogons",
		delistUrl: "https://www.team-cymru.com/bogon-reference.html",
		mappings: {
			"127.0.0.2": "Listed in Bogons",
		},
	},
	"dyna.spamrats.com": {
		name: "SpamRats Dyna",
		delistUrl: "https://www.spamrats.com",
		mappings: {
			"127.0.0.36": "Listed in SpamRats Dyna",
		},
	},
	"noptr.spamrats.com": {
		name: "SpamRats NoPtr",
		delistUrl: "https://www.spamrats.com",
		mappings: {
			"127.0.0.38": "Listed in SpamRats NoPtr",
		},
	},
	"relays.nether.net": {
		name: "Nether.net Relays",
		delistUrl: "http://puck.nether.net/bl/",
		mappings: {
			"127.0.0.2": "Listed in Nether.net",
		},
	},
	"spamrbl.imp.ch": {
		name: "Imp.ch Spam RBL",
		delistUrl: "http://antispam.imp.ch",
		mappings: {
			"127.0.0.2": "Listed in Imp.ch",
		},
	},
	"z.mailspike.net": {
		name: "Mailspike Z",
		delistUrl: "http://mailspike.net",
		mappings: {
			"127.0.0.2": "Listed in Mailspike Z",
		},
	},
};
