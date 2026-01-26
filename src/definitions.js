export const blacklists = {
	"zen.spamhaus.org": {
		name: "Spamhaus ZEN",
		delistUrl: "https://check.spamhaus.org/",
		mappings: {
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
			"127.0.0.8":
				"Listed in XBL/PBL (Exploits/Policy Block List - Botnets, open proxies, dynamic IPs)",
			"127.0.0.9":
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
	"combined.mail.abusix.zone": {
		name: "Abusix Mail Intelligence",
		delistUrl: "https://abusix.com/lookup/",
		mappings: {
			"127.0.0.2": "Blacklisted (Generic)",
			"127.0.0.3": "Blacklisted (External)",
			"127.0.0.4": "Blacklisted (Dynamic/Policy)",
		},
	},
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
			"127.0.0.3": "Blacklisted (Send-verify)",
			"127.0.0.4": "Blacklisted (Sender-verify)",
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
};
