// Technology banks: IT support (ITF), Cisco CCST Networking (CCN), AWS Cloud Practitioner (AWC),
// Azure Fundamentals (AZF) and Python PCEP (PCE). Original practice questions — not vendor exam items.
// Python outputs are checked by scripts/bank/check-python.py; subnetting and SLA maths are computed.
import { fmt, mcq, numOpts, others, pick, Q, repeat, ri, sample } from "./lib";

type F = [string, string, string, string[], string];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
function pairs(code: string, topic: string, list: [string, string][], ask: (a: string) => string, rev: (b: string) => string, why: (a: string, b: string) => string) {
  return [
    ...list.map((x) => mcq(code, topic, ask(x[0]), x[1], others(list, x, (y) => y[1]), why(x[0], x[1]), 1)),
    ...list.map((x) => mcq(code, topic, rev(x[1]), x[0], others(list, x, (y) => y[0]), why(x[0], x[1]), 2)),
  ];
}

// ---------------------------------------------------------------------------
// ITF — IT support fundamentals
// ---------------------------------------------------------------------------
const PORTS: [string, string][] = [
  ["HTTP", "80"], ["HTTPS", "443"], ["SSH", "22"], ["Telnet", "23"], ["FTP (control)", "21"], ["SMTP", "25"], ["DNS", "53"],
  ["POP3", "110"], ["IMAP", "143"], ["RDP", "3389"], ["SMB", "445"], ["DHCP (server)", "67"],
];
const HW: [string, string][] = [
  ["CPU", "processes instructions and performs calculations"],
  ["RAM", "temporarily holds data and programs currently in use and is cleared when power is lost"],
  ["SSD", "stores data permanently using flash memory with no moving parts"],
  ["HDD", "stores data permanently on spinning magnetic platters"],
  ["GPU", "renders images and video and handles parallel graphics workloads"],
  ["motherboard", "connects the CPU, memory, storage and expansion cards"],
  ["PSU", "converts mains AC power into the DC voltages the computer uses"],
  ["NIC", "connects a computer to a network"],
  ["BIOS/UEFI firmware", "starts the hardware checks and boots the operating system"],
];
const ITF_FACTS: F[] = [
  ["Troubleshooting", "What is the FIRST step in the standard troubleshooting methodology?", "Identify the problem", ["Establish a theory of probable cause", "Implement the solution", "Document findings"], "Identify the problem → theory → test → plan → implement → verify → document."],
  ["Troubleshooting", "After fixing a fault, what should a technician do before closing the ticket?", "Verify full system functionality and document the fix", ["Reboot the server farm", "Delete the ticket history", "Escalate to management"], "Verify the fix and implement preventive measures, then document."],
  ["Troubleshooting", "A theory of probable cause is confirmed. What comes next?", "Establish a plan of action to resolve the problem", ["Identify the problem again", "Close the ticket", "Replace all hardware"], "Then implement the plan or escalate."],
  ["Troubleshooting", "A user says 'the internet is down'. Others on the same network are fine. What is the most sensible next check?", "Check that user's own connection, cable or Wi-Fi settings", ["Restart the company's core router", "Call the internet provider", "Reinstall the user's operating system"], "If only one user is affected, start at their device."],
  ["Troubleshooting", "A PC shows 'No boot device found' after a new SSD was installed. What is the most likely cause?", "The boot order or the drive connection/installation", ["A faulty monitor", "A full recycle bin", "An expired antivirus licence"], "The firmware cannot find a bootable drive."],
  ["Troubleshooting", "A laptop runs on battery but won't charge when plugged in. What should you check first?", "The charger, cable and power outlet", ["The graphics driver", "The keyboard layout", "The screen resolution"], "Check the simplest, most likely cause first."],
  ["Operating systems", "Which Windows tool shows running processes and lets you end a frozen program?", "Task Manager", ["Disk Management", "Device Manager", "Event Viewer"], "Open it with Ctrl+Shift+Esc."],
  ["Operating systems", "Which Windows tool is used to update or roll back a device driver?", "Device Manager", ["Task Manager", "Disk Cleanup", "Registry Editor"], "Right-click the device → Properties → Driver."],
  ["Operating systems", "Which Windows tool shows system and application logs for diagnosing errors?", "Event Viewer", ["Task Scheduler", "Resource Monitor", "Control Panel"], "Logs are grouped into Application, Security and System."],
  ["Operating systems", "Which Windows command shows the computer's IP configuration?", "ipconfig", ["ifconfig only", "netstat -r only", "chkdsk"], "Use ipconfig /all for full details. Linux uses ip addr (or ifconfig)."],
  ["Operating systems", "Which Linux command lists files in a directory?", "ls", ["dir only", "cd", "pwd"], "pwd prints the current directory; cd changes it."],
  ["Operating systems", "Which Linux command changes file permissions?", "chmod", ["chown", "grep", "sudo"], "chown changes ownership; sudo runs a command as another user (often root)."],
  ["Operating systems", "Which file system is the default for modern Windows system drives?", "NTFS", ["FAT32", "ext4", "APFS"], "ext4 is common on Linux and APFS on macOS."],
  ["Operating systems", "What is the main limitation of the FAT32 file system?", "A maximum single file size of 4 GB", ["It can't be read by Windows", "It only works on SSDs", "It has no folders"], "exFAT removes this limit for removable drives."],
  ["Software", "Software you can use for free but whose source code is not shared is called", "freeware", ["open source", "shareware with a trial", "firmware"], "Open-source software publishes its source code."],
  ["Software", "Which type of licence lets anyone view, modify and share the source code?", "Open source", ["Proprietary", "Single-user EULA", "Site licence only"], "Examples include Linux and LibreOffice."],
  ["Security", "What does MFA require?", "Two or more different types of authentication factor", ["A longer password", "Two passwords", "A password changed monthly"], "Factors: something you know, have, or are."],
  ["Security", "An email urges you to 'verify your account' via a link to a lookalike site. This is", "phishing", ["a DDoS attack", "a brute-force attack", "a firmware update"], "Report it and don't click the link."],
  ["Security", "Which malware encrypts files and demands payment?", "Ransomware", ["Adware", "A keylogger", "A worm only"], "Good backups are the main defence."],
  ["Security", "The principle of least privilege means", "users get only the access they need to do their job", ["everyone is an administrator", "passwords never expire", "all ports are open"], "It limits damage from mistakes and compromised accounts."],
  ["Security", "Which backup rule recommends 3 copies, on 2 types of media, with 1 off-site?", "The 3-2-1 rule", ["The 1-2-3 rule", "RAID 5", "The 80/20 rule"], "It protects against device failure, disasters and ransomware."],
  ["Security", "Someone follows an employee through a secure door without badging in. This is", "tailgating", ["phishing", "shoulder surfing", "spoofing"], "Shoulder surfing is watching someone type a PIN or password."],
  ["Networking", "Which service turns a website name into an IP address?", "DNS", ["DHCP", "NAT", "FTP"], "DHCP assigns addresses; DNS resolves names."],
  ["Networking", "An IP address starting 169.254 on Windows usually means", "the device could not reach a DHCP server", ["the device has a static public IP", "IPv6 is disabled", "the DNS server is down only"], "It's an APIPA (link-local) address."],
  ["Networking", "Which Wi-Fi security standard is the newest and strongest?", "WPA3", ["WEP", "WPA", "WPA2-TKIP"], "WEP is broken and should never be used."],
  ["Networking", "What does a router mainly do?", "Forwards traffic between different networks", ["Stores files", "Prints documents", "Provides power"], "A switch connects devices within the same network."],
  ["Networking", "Which cable connector is used for wired Ethernet?", "RJ45", ["RJ11", "HDMI", "USB-C only"], "RJ11 is for telephone lines."],
  ["Cloud", "Which cloud model provides ready-to-use applications such as webmail?", "SaaS", ["IaaS", "PaaS", "On-premises"], "IaaS provides virtual machines; PaaS provides a platform to build apps."],
  ["Cloud", "Which cloud model provides virtual machines, storage and networks you manage yourself?", "IaaS", ["SaaS", "PaaS", "FaaS only"], "You manage the OS and apps; the provider manages hardware."],
  ["Hardware", "Which RAID level mirrors data across two drives?", "RAID 1", ["RAID 0", "RAID 5", "RAID 10 only"], "RAID 0 stripes with no redundancy; RAID 5 uses parity across 3+ drives."],
  ["Hardware", "Which RAID level stripes data for speed but gives NO fault tolerance?", "RAID 0", ["RAID 1", "RAID 5", "RAID 6"], "If one drive fails, all data is lost."],
  ["Hardware", "Which port is most commonly used to connect a modern monitor?", "HDMI or DisplayPort", ["RJ45", "PS/2", "VGA only"], "VGA is legacy analogue."],
  ["Hardware", "A thermal paste problem would most likely cause the computer to", "overheat and shut down or throttle", ["lose Wi-Fi", "print blank pages", "show the wrong time"], "Thermal paste transfers heat from the CPU to the cooler."],
  ["Helpdesk", "What is an SLA in IT support?", "An agreement setting the expected service levels, such as response times", ["A type of cable", "A security patch", "A backup method"], "Service Level Agreement."],
  ["Helpdesk", "When should a technician escalate a ticket?", "When the issue is beyond their knowledge, access or authority", ["Never", "Before asking any questions", "Only if the user is angry"], "Escalate with notes of what was already tried."],
  ["Helpdesk", "Before making a major change on a user's PC, a technician should first", "make sure the user's data is backed up", ["delete temporary files", "change the user's password", "remove the antivirus"], "Protect data before risky changes."],
];

function itf(): Q[] {
  const qs: Q[] = [
    ...facts("ITF", ITF_FACTS),
    ...pairs("ITF", "Ports & protocols", PORTS, (a) => `Which port does ${a} use by default?`, (b) => `Which protocol uses port ${b} by default?`, (a, b) => `${a} uses port ${b}.`),
    ...HW.map((x) => mcq("ITF", "Hardware", `Which component ${x[1]}?`, x[0].length < 5 ? x[0] : cap(x[0]), others(HW, x, (y) => (y[0].length < 5 ? y[0] : cap(y[0]))), `The ${x[0]} ${x[1]}.`, 1)),
  ];
  qs.push(...repeat(12, () => {
    const n = ri(5, 255);
    const b = n.toString(2);
    return mcq("ITF", "Data representation", `What is the binary number ${b} in decimal?`, String(n), numOpts(n, [n + 1, n - 1, n * 2, Math.floor(n / 2)]), `Add the place values (1, 2, 4, 8, 16…) of each 1 bit: ${b} = ${n}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const n = ri(16, 255);
    const h = n.toString(16).toUpperCase();
    return mcq("ITF", "Data representation", `What is hexadecimal ${h} in decimal?`, String(n), numOpts(n, [n + 16, n - 10, parseInt(h, 10) || n + 3]), `${h} = ${h.length === 2 ? `${parseInt(h[0], 16)}×16 + ${parseInt(h[1], 16)}` : h} = ${n}.`, 3);
  }));
  qs.push(...repeat(10, () => {
    const mbps = pick([8, 16, 40, 80, 100, 200]), mb = pick([50, 100, 200, 400, 500, 1000]);
    const t = (mb * 8) / mbps;
    if (!Number.isInteger(t)) return null;
    return mcq("ITF", "Data representation", `Roughly how long does it take to download a ${mb} MB file on a ${mbps} Mbps connection (ignoring overhead)?`, `${t} seconds`, numOpts(t, [mb / mbps, t * 8, t / 2], "seconds"), `${mb} MB × 8 = ${mb * 8} megabits; ÷ ${mbps} Mbps = ${t} s. Bytes are 8 bits.`, 2);
  }));
  qs.push(...repeat(6, () => {
    const gb = pick([2, 4, 8, 16]);
    return mcq("ITF", "Data representation", `How many megabytes (binary) are in ${gb} GB of RAM?`, `${(gb * 1024).toLocaleString("en-US")} MB`, [`${(gb * 1000).toLocaleString("en-US")} MB`, `${gb * 100} MB`, `${(gb * 1024 * 1024).toLocaleString("en-US")} MB`], `Memory uses binary units: 1 GB = 1,024 MB, so ${gb} × 1,024 = ${gb * 1024} MB.`, 2);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// CCN — Cisco CCST Networking style
// ---------------------------------------------------------------------------
const OSI: [string, string][] = [
  ["Layer 1 — Physical", "cables, connectors and transmitting bits"], ["Layer 2 — Data Link", "MAC addresses, frames and switches"],
  ["Layer 3 — Network", "IP addresses, packets and routers"], ["Layer 4 — Transport", "TCP/UDP, segments and port numbers"],
  ["Layer 5 — Session", "setting up and managing sessions between applications"], ["Layer 6 — Presentation", "data formatting, encryption and compression"],
  ["Layer 7 — Application", "network services used by applications, like HTTP and DNS"],
];
const CCN_FACTS: F[] = [
  ["TCP/IP", "Which transport protocol is connection-oriented and guarantees delivery?", "TCP", ["UDP", "ICMP", "ARP"], "TCP uses a three-way handshake, sequencing and acknowledgements."],
  ["TCP/IP", "Which transport protocol is best for live video calls where speed matters more than retransmission?", "UDP", ["TCP", "FTP", "SMTP"], "UDP has lower overhead and no retransmissions."],
  ["TCP/IP", "What are the three steps of the TCP handshake?", "SYN, SYN-ACK, ACK", ["ACK, SYN, FIN", "DISCOVER, OFFER, REQUEST", "HELLO, ACK, BYE"], "This sets up a TCP connection."],
  ["TCP/IP", "What are the four DHCP messages, in order?", "Discover, Offer, Request, Acknowledge", ["Request, Offer, Discover, Acknowledge", "SYN, SYN-ACK, ACK, FIN", "Hello, Offer, Accept, Bind"], "Remembered as DORA."],
  ["TCP/IP", "Which protocol finds the MAC address for a known IPv4 address?", "ARP", ["DNS", "DHCP", "ICMP"], "ARP maps Layer 3 addresses to Layer 2 addresses."],
  ["TCP/IP", "Which protocol does ping use?", "ICMP", ["TCP", "UDP", "ARP"], "ICMP echo request and echo reply."],
  ["TCP/IP", "Which DNS record maps a hostname to an IPv4 address?", "A record", ["AAAA record", "MX record", "CNAME record"], "AAAA is for IPv6; MX is for mail servers; CNAME is an alias."],
  ["TCP/IP", "Which DNS record identifies a domain's mail server?", "MX record", ["A record", "PTR record", "TXT record"], "Mail exchanger."],
  ["Addressing", "Which of these is a private IPv4 address range?", "192.168.0.0/16", ["8.8.8.0/24", "100.0.0.0/8", "172.32.0.0/16"], "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."],
  ["Addressing", "Which address is the IPv4 loopback address?", "127.0.0.1", ["0.0.0.0", "255.255.255.255", "192.168.1.1"], "It refers to the local device itself."],
  ["Addressing", "How many bits long is an IPv4 address?", "32 bits", ["48 bits", "64 bits", "128 bits"], "MAC addresses are 48 bits; IPv6 addresses are 128 bits."],
  ["Addressing", "How many bits long is an IPv6 address?", "128 bits", ["32 bits", "48 bits", "64 bits"], "Written as eight groups of four hex digits."],
  ["Addressing", "How many bits long is a MAC address?", "48 bits", ["32 bits", "64 bits", "128 bits"], "Usually written as six pairs of hex digits."],
  ["Addressing", "Which IPv6 address type starts with FE80::/10?", "Link-local", ["Global unicast", "Multicast", "Loopback"], "Link-local addresses work only on the local link."],
  ["Addressing", "What is the IPv6 loopback address?", "::1", ["FE80::1", "127.0.0.1", "FF02::1"], "It is the IPv6 equivalent of 127.0.0.1."],
  ["Addressing", "What does NAT do?", "Translates private IP addresses to a public IP address", ["Assigns IP addresses automatically", "Resolves names to IPs", "Encrypts Wi-Fi traffic"], "PAT/NAT overload lets many devices share one public address."],
  ["Devices", "Which device forwards frames using MAC addresses?", "Switch", ["Router", "Hub", "Modem"], "A hub repeats bits to all ports; a router forwards by IP."],
  ["Devices", "Which device connects different IP networks and chooses paths between them?", "Router", ["Switch", "Access point", "Repeater"], "Routers use routing tables."],
  ["Devices", "What is the default gateway?", "The router address a host uses to reach other networks", ["The DNS server", "The DHCP lease time", "The switch's MAC address"], "Without it, a host can only reach its local subnet."],
  ["Devices", "A VLAN is used to", "split one physical switch into separate logical networks", ["boost Wi-Fi range", "encrypt traffic", "assign public IPs"], "Traffic between VLANs needs a router or Layer 3 switch."],
  ["Cabling", "What is the maximum recommended length of a Cat6 copper Ethernet run at 1 Gbps?", "100 metres", ["10 metres", "500 metres", "2 kilometres"], "Fibre is used for longer distances."],
  ["Cabling", "Which cable type is immune to electromagnetic interference?", "Fibre optic", ["UTP", "STP", "Coaxial"], "It carries light, not electricity."],
  ["Wireless", "Which Wi-Fi band generally has longer range but more interference?", "2.4 GHz", ["5 GHz", "6 GHz", "60 GHz"], "Higher bands are faster but have shorter range."],
  ["Wireless", "Which non-overlapping channels are commonly used on 2.4 GHz Wi-Fi?", "1, 6 and 11", ["1, 2 and 3", "36, 40 and 44", "2, 7 and 12"], "Using them reduces interference."],
  ["Wireless", "What is an SSID?", "The name of a wireless network", ["A Wi-Fi password", "A type of antenna", "A MAC address filter"], "Access points broadcast it so clients can find the network."],
  ["Troubleshooting", "Which command shows the path packets take to a destination on Windows?", "tracert", ["ping", "nslookup", "arp -a"], "On Linux/macOS it is traceroute."],
  ["Troubleshooting", "Which command tests DNS name resolution?", "nslookup", ["tracert", "ipconfig /release", "netstat"], "dig is a common alternative on Linux/macOS."],
  ["Troubleshooting", "Which Cisco IOS command gives a quick summary of interfaces, IPs and their status?", "show ip interface brief", ["show running-config only", "ping", "copy run start"], "It shows each interface's up/down status."],
  ["Troubleshooting", "Which Cisco command saves the running configuration so it survives a reboot?", "copy running-config startup-config", ["show startup-config", "erase startup-config", "reload"], "Often shortened to copy run start."],
  ["Troubleshooting", "A host can ping 8.8.8.8 but not google.com. What is most likely wrong?", "DNS resolution", ["The cable", "The default gateway", "The NIC driver"], "IP connectivity works, so name resolution is the problem."],
  ["Troubleshooting", "A host has IP 192.168.1.20/24 and gateway 192.168.2.1. What is the problem?", "The gateway is not on the host's subnet", ["The mask is too large", "The IP is public", "Nothing is wrong"], "The gateway must be in the same subnet as the host."],
  ["Security", "Which protocol should replace Telnet for remote device management?", "SSH", ["HTTP", "FTP", "TFTP"], "SSH encrypts the session; Telnet sends everything in plain text."],
  ["Security", "A firewall rule that permits traffic to TCP port 443 allows", "HTTPS", ["SSH", "RDP", "DNS"], "HTTPS uses TCP 443."],
  ["Security", "Which wireless security protocol should never be used because it is easily cracked?", "WEP", ["WPA3", "WPA2-AES", "WPA3-Enterprise"], "WEP's encryption is broken."],
  ["Security", "Port security on a switch is used to", "limit which MAC addresses can use a switch port", ["encrypt traffic", "assign IP addresses", "route between VLANs"], "It helps stop unauthorised devices connecting."],
  ["Services", "Which protocol synchronises device clocks across a network?", "NTP", ["SNMP", "DHCP", "SMTP"], "Accurate time matters for logs and authentication."],
  ["Services", "Which protocol is used to monitor and manage network devices?", "SNMP", ["NTP", "SMTP", "ARP"], "Simple Network Management Protocol."],
  ["Services", "Which protocol securely transfers files over SSH?", "SFTP", ["TFTP", "FTP", "HTTP"], "TFTP has no authentication or encryption."],
  ["Addressing", "Which IPv4 address class has a default /8 mask?", "Class A", ["Class B", "Class C", "Class D"], "Class B is /16 and Class C is /24 by default; Class D is multicast."],
  ["Addressing", "Which IPv4 address is used to send to all hosts on the local subnet?", "255.255.255.255", ["0.0.0.0", "127.0.0.1", "224.0.0.1"], "It is the limited broadcast address."],
  ["Addressing", "How can the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001 be shortened?", "2001:db8::1", ["2001:db8:1", "2001::db8::1", "2001:0db8::0001:1"], "Drop leading zeros and replace one run of zero groups with ::."],
  ["Addressing", "What does SLAAC allow an IPv6 host to do?", "Configure its own address without a DHCP server", ["Translate IPv6 to IPv4", "Encrypt traffic", "Resolve names"], "Stateless address autoconfiguration."],
  ["Devices", "Which device provides wireless clients with access to a wired network?", "Access point", ["Switch", "Modem", "Patch panel"], "It bridges Wi-Fi and Ethernet."],
  ["Devices", "Which device converts the signal from an ISP line into Ethernet?", "Modem", ["Switch", "Access point", "Firewall"], "Modulator-demodulator."],
  ["Devices", "What does a MAC address table on a switch store?", "Which MAC address is reachable on which port", ["IP-to-name mappings", "Routes to other networks", "Wi-Fi passwords"], "The switch learns it from source MAC addresses."],
  ["Troubleshooting", "A cable tester shows a cable fails on several pins. Which OSI layer is the problem at?", "Layer 1 — Physical", ["Layer 3 — Network", "Layer 4 — Transport", "Layer 7 — Application"], "Cabling faults are physical-layer problems."],
  ["Troubleshooting", "Which Windows command releases and renews a DHCP address?", "ipconfig /release then ipconfig /renew", ["ping -t", "netstat -an", "nslookup /renew"], "Useful when a device has an APIPA address."],
  ["Troubleshooting", "Which command shows the ARP cache on Windows?", "arp -a", ["ipconfig /displaydns", "netstat -r", "tracert"], "It lists IP-to-MAC mappings."],
];

function ccn(): Q[] {
  const qs: Q[] = [
    ...facts("CCN", CCN_FACTS),
    ...OSI.map((x) => mcq("CCN", "OSI model", `Which OSI layer deals with ${x[1]}?`, x[0], others(OSI, x, (y) => y[0]), `${x[0]}: ${x[1]}.`, 2)),
  ];
  const mask = (p: number) => [0, 1, 2, 3].map((i) => (((0xffffffff << (32 - p)) >>> 0) >>> (24 - 8 * i)) & 255).join(".");
  qs.push(...repeat(14, () => {
    const p = ri(20, 30);
    const hosts = 2 ** (32 - p) - 2;
    return mcq("CCN", "Subnetting", `How many usable host addresses are in a /${p} IPv4 subnet?`, fmt(hosts), numOpts(hosts, [hosts + 2, 2 ** (32 - p - 1), hosts * 2]), `2^(32 − ${p}) − 2 = ${2 ** (32 - p)} − 2 = ${hosts} (network and broadcast addresses can't be used).`, 2);
  }));
  qs.push(...repeat(10, () => {
    const p = ri(16, 30);
    return mcq("CCN", "Subnetting", `What is the subnet mask for a /${p} prefix?`, mask(p), [mask(p - 1), mask(Math.min(p + 1, 32)), mask(p === 24 ? 16 : 24)], `/${p} means ${p} network bits set to 1: ${mask(p)}.`, 2);
  }));
  qs.push(...repeat(30, () => {
    const p = pick([25, 26, 27, 28, 29, 30]);
    const block = 2 ** (32 - p);
    const third = ri(0, 254), host = ri(1, 254);
    const net = Math.floor(host / block) * block, bc = net + block - 1;
    const ip = `192.168.${third}.${host}`;
    return Math.random() < 0.5
      ? mcq("CCN", "Subnetting", `What is the network address of ${ip}/${p}?`, `192.168.${third}.${net}`, [`192.168.${third}.${bc}`, `192.168.${third}.0`, `192.168.${third}.${Math.min(255, net + 1)}`, `192.168.${third}.${Math.max(0, net - block)}`], `/${p} has a block size of ${block}. ${host} falls in the block starting at ${net}.`, 3)
      : mcq("CCN", "Subnetting", `What is the broadcast address of ${ip}/${p}?`, `192.168.${third}.${bc}`, [`192.168.${third}.${net}`, `192.168.${third}.255`, `192.168.${third}.${Math.max(0, bc - 1)}`, `192.168.${third}.${Math.min(255, bc + block)}`], `Block size ${block}: the subnet is ${net}–${bc}, so the broadcast is .${bc}.`, 3);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// AWC — AWS Cloud Practitioner style
// ---------------------------------------------------------------------------
const AWS_SVC: [string, string][] = [
  ["Amazon EC2", "resizable virtual servers in the cloud"], ["Amazon S3", "object storage for files of any size"], ["Amazon RDS", "managed relational databases such as MySQL and PostgreSQL"],
  ["Amazon DynamoDB", "a serverless NoSQL key-value database"], ["AWS Lambda", "running code without managing servers, billed per request and duration"], ["Amazon CloudFront", "a content delivery network (CDN)"],
  ["Amazon Route 53", "DNS and domain registration"], ["Amazon VPC", "a logically isolated private network in AWS"], ["AWS IAM", "managing users, groups, roles and permissions"],
  ["Amazon CloudWatch", "monitoring metrics, logs and alarms"], ["AWS CloudTrail", "recording API calls and account activity for auditing"], ["Amazon EBS", "block storage volumes attached to EC2 instances"],
  ["Amazon EFS", "a shared, elastic file system for Linux workloads"], ["Amazon S3 Glacier", "low-cost archive storage"], ["AWS Shield", "DDoS protection"],
  ["AWS WAF", "a web application firewall filtering HTTP requests"], ["Amazon GuardDuty", "intelligent threat detection"], ["AWS Trusted Advisor", "recommendations on cost, security, performance and limits"],
  ["AWS CloudFormation", "infrastructure as code using templates"], ["Elastic Load Balancing", "distributing traffic across targets"], ["Amazon SNS", "pub/sub notifications such as SMS and email"],
  ["Amazon SQS", "message queues to decouple applications"], ["AWS Snowball", "physically moving large amounts of data into AWS"], ["Amazon Redshift", "a data warehouse for analytics"],
  ["AWS Organizations", "centrally managing multiple AWS accounts and consolidated billing"], ["AWS Artifact", "on-demand access to compliance reports"], ["Amazon Inspector", "automated vulnerability scanning of workloads"],
  ["AWS KMS", "creating and managing encryption keys"], ["Amazon Aurora", "a MySQL/PostgreSQL-compatible database built for the cloud"], ["AWS Elastic Beanstalk", "deploying web apps without managing the infrastructure"],
  ["Amazon Lightsail", "simple virtual private servers with predictable monthly pricing"], ["AWS Direct Connect", "a dedicated private network connection from on-premises to AWS"],
  ["Amazon ECS", "running and managing Docker containers"], ["Amazon SageMaker", "building, training and deploying machine learning models"],
];
const AWS_FACTS: F[] = [
  ["Shared responsibility", "Under the shared responsibility model, who is responsible for patching the guest OS on an EC2 instance?", "The customer", ["AWS", "Both equally", "The internet provider"], "AWS secures the cloud; customers secure what they put in it."],
  ["Shared responsibility", "Who is responsible for the physical security of AWS data centres?", "AWS", ["The customer", "The customer's ISP", "Both equally"], "Security OF the cloud is AWS's job."],
  ["Shared responsibility", "Who is responsible for configuring S3 bucket permissions?", "The customer", ["AWS", "AWS Support", "Nobody"], "Customer data and access settings are the customer's responsibility."],
  ["Shared responsibility", "With AWS Lambda, who manages the underlying operating system?", "AWS", ["The customer", "Both", "A third-party partner"], "Managed and serverless services shift more responsibility to AWS."],
  ["Global infrastructure", "What is an Availability Zone?", "One or more discrete data centres with redundant power and networking within a Region", ["A country", "A CDN edge location", "A single server rack"], "A Region contains multiple isolated AZs."],
  ["Global infrastructure", "What are edge locations mainly used for?", "Caching content close to users with CloudFront", ["Running RDS databases", "Storing IAM users", "Billing"], "They reduce latency for end users."],
  ["Global infrastructure", "To make an application highly available, you should deploy it", "across multiple Availability Zones", ["in a single AZ only", "on one large instance", "only at edge locations"], "If one AZ fails, the others keep running."],
  ["Pricing", "Which EC2 pricing option is cheapest for interruptible, flexible workloads?", "Spot Instances", ["On-Demand", "Dedicated Hosts", "Reserved Instances"], "Spot can be reclaimed with a two-minute warning."],
  ["Pricing", "Which EC2 option gives a discount for a 1- or 3-year commitment for steady workloads?", "Reserved Instances (or Savings Plans)", ["Spot Instances", "On-Demand", "Free Tier"], "Commitments lower the price."],
  ["Pricing", "Which EC2 option is best for short, unpredictable workloads that can't be interrupted?", "On-Demand", ["Spot", "3-year Reserved", "Dedicated Host only"], "Pay by the second/hour with no commitment."],
  ["Pricing", "Which tool estimates the cost of an AWS architecture before you build it?", "AWS Pricing Calculator", ["AWS Cost Explorer", "AWS Budgets", "CloudTrail"], "Cost Explorer analyses past spending; Budgets sends alerts."],
  ["Pricing", "Which tool alerts you when spending exceeds a threshold you set?", "AWS Budgets", ["AWS Pricing Calculator", "AWS Artifact", "Amazon Inspector"], "Budgets can alert on cost or usage."],
  ["Pricing", "Data transfer INTO AWS from the internet is generally", "free", ["charged per GB at a high rate", "only free on weekends", "charged per request"], "Data transfer out is usually charged."],
  ["Support", "Which is the lowest AWS Support plan that includes a Technical Account Manager (TAM)?", "Enterprise", ["Basic", "Developer", "Business"], "Enterprise On-Ramp gives access to a pool of TAMs."],
  ["Support", "Which AWS Support plan is free for all customers?", "Basic", ["Developer", "Business", "Enterprise"], "It includes billing support and the Health Dashboard."],
  ["Cloud concepts", "Which is a benefit of cloud computing?", "Trading capital expense for variable expense", ["Guessing capacity in advance", "Buying servers up front", "Running your own data centre"], "You pay only for what you use."],
  ["Cloud concepts", "Elasticity means", "automatically adding or removing resources to match demand", ["storing data in many Regions", "encrypting data at rest", "paying in advance"], "Auto Scaling provides elasticity for EC2."],
  ["Cloud concepts", "How many pillars does the AWS Well-Architected Framework have?", "Six", ["Four", "Five", "Seven"], "Operational excellence, security, reliability, performance efficiency, cost optimisation and sustainability."],
  ["Cloud concepts", "Which Well-Architected pillar focuses on minimising environmental impact?", "Sustainability", ["Reliability", "Cost optimisation", "Operational excellence"], "It was added as the sixth pillar."],
  ["Security", "What is the best practice for the AWS account root user?", "Enable MFA, lock it away and use IAM identities for daily work", ["Use it for everyday tasks", "Share it with the team", "Delete it"], "The root user has unrestricted access."],
  ["Security", "Which IAM identity should an EC2 instance use to access S3 securely?", "An IAM role", ["The root user's access keys", "An IAM user's password", "A security group"], "Roles provide temporary credentials."],
  ["Security", "Security groups act as", "a stateful virtual firewall for instances", ["a stateless subnet firewall", "an encryption service", "a DNS service"], "Network ACLs are the stateless subnet-level firewall."],
  ["Storage", "Which S3 storage class automatically moves objects between tiers based on access patterns?", "S3 Intelligent-Tiering", ["S3 Standard", "S3 Glacier Deep Archive", "S3 One Zone-IA"], "Useful when access patterns are unknown."],
  ["Cloud concepts", "Which of these is a benefit of AWS's massive economies of scale?", "Lower pay-as-you-go prices", ["Longer contracts", "Fixed capacity", "Owning your hardware"], "AWS passes on savings from aggregate usage."],
  ["Cloud concepts", "'Go global in minutes' refers to", "deploying applications in multiple Regions quickly", ["buying data centres abroad", "hiring global staff", "shipping hardware"], "One of the six advantages of cloud computing."],
  ["Migration", "Which AWS Cloud Adoption Framework perspective covers staff skills and training?", "People", ["Platform", "Operations", "Security"], "The six perspectives: business, people, governance, platform, security, operations."],
  ["Migration", "Moving an application to the cloud with no changes is called", "rehosting (lift and shift)", ["refactoring", "retiring", "repurchasing"], "One of the migration strategies (the 'R's)."],
  ["Migration", "Moving from an on-premises CRM to a SaaS CRM is an example of", "repurchasing", ["rehosting", "replatforming", "retaining"], "You switch to a different product."],
  ["Security", "Which service lets you manage access to multiple AWS accounts with single sign-on?", "AWS IAM Identity Center", ["AWS Shield", "Amazon Inspector", "AWS Artifact"], "Formerly AWS Single Sign-On."],
  ["Security", "Which service helps discover and protect sensitive data like personal information in S3?", "Amazon Macie", ["Amazon GuardDuty", "AWS Shield", "AWS Config"], "Macie uses machine learning to find sensitive data."],
  ["Security", "Which service records configuration changes to resources and checks them against rules?", "AWS Config", ["CloudWatch", "Cost Explorer", "Route 53"], "Useful for compliance auditing."],
  ["Security", "Which service stores, rotates and retrieves database credentials and API keys?", "AWS Secrets Manager", ["AWS KMS", "Amazon Macie", "AWS Artifact"], "It can rotate secrets automatically."],
  ["Pricing", "Which tool analyses and visualises your past AWS spending?", "AWS Cost Explorer", ["AWS Pricing Calculator", "AWS Budgets", "AWS Artifact"], "It can also forecast spend."],
  ["Pricing", "Which EC2 option provides a physical server dedicated to you, often for licensing reasons?", "Dedicated Hosts", ["Spot Instances", "On-Demand", "Savings Plans"], "Useful for server-bound software licences."],
  ["Pricing", "AWS Organizations consolidated billing lets you", "combine usage across accounts for volume discounts with one bill", ["get free support", "avoid all data transfer charges", "share root passwords"], "Usage is aggregated for tiered pricing."],
  ["Storage", "Which S3 storage class is the cheapest for data rarely accessed and retrievable within hours?", "S3 Glacier Deep Archive", ["S3 Standard", "S3 Standard-IA", "S3 Intelligent-Tiering"], "Retrieval takes hours."],
];

function awc(): Q[] {
  return [
    ...facts("AWC", AWS_FACTS),
    ...pairs("AWC", "Services", AWS_SVC, (a) => `What is ${a} used for?`, (b) => `Which AWS service provides ${b}?`, (a, b) => `${a}: ${b}.`),
  ];
}

// ---------------------------------------------------------------------------
// AZF — Azure Fundamentals style
// ---------------------------------------------------------------------------
const AZ_SVC: [string, string][] = [
  ["Azure Virtual Machines", "IaaS virtual servers running Windows or Linux"], ["Azure App Service", "PaaS hosting for web apps and APIs"], ["Azure Functions", "serverless, event-driven code"],
  ["Azure Blob Storage", "object storage for unstructured data"], ["Azure Files", "managed SMB/NFS file shares"], ["Azure SQL Database", "a managed relational SQL database (PaaS)"],
  ["Azure Cosmos DB", "a globally distributed NoSQL database"], ["Azure Virtual Network", "private networking for Azure resources"], ["Azure VPN Gateway", "encrypted connections to on-premises networks over the internet"],
  ["Azure ExpressRoute", "a private connection to Azure that doesn't go over the public internet"], ["Microsoft Entra ID", "cloud identity and access management (formerly Azure AD)"], ["Azure Policy", "enforcing rules and compliance on resources"],
  ["Azure Monitor", "collecting and analysing metrics and logs"], ["Azure Advisor", "personalised recommendations for cost, security, reliability and performance"], ["Azure Service Health", "information about Azure outages and planned maintenance affecting you"],
  ["Microsoft Defender for Cloud", "security posture management and threat protection"], ["Azure Key Vault", "storing secrets, keys and certificates"], ["Azure Kubernetes Service", "managed Kubernetes for containers"],
  ["Azure Container Instances", "running a container quickly without managing servers"], ["Azure DNS", "hosting DNS domains in Azure"], ["Azure Arc", "managing on-premises and multicloud resources from Azure"],
  ["Azure Resource Manager", "the deployment and management layer for Azure resources"], ["Microsoft Purview", "data governance and compliance"], ["Azure Virtual Desktop", "cloud-hosted Windows desktops and apps"],
  ["Azure Load Balancer", "distributing network traffic across VMs"], ["Azure Front Door", "global web traffic acceleration and load balancing"],
  ["Azure Backup", "backing up VMs, files and databases"], ["Azure Site Recovery", "replicating workloads for disaster recovery"],
];
const AZ_FACTS: F[] = [
  ["Cloud concepts", "Which cloud model gives you the MOST control over the operating system?", "IaaS", ["PaaS", "SaaS", "Serverless"], "With IaaS you manage the OS; with PaaS and SaaS the provider does."],
  ["Cloud concepts", "Microsoft 365 is an example of", "SaaS", ["IaaS", "PaaS", "On-premises"], "Ready-to-use software."],
  ["Cloud concepts", "A hybrid cloud combines", "public cloud with private (on-premises) infrastructure", ["two SaaS products", "IaaS and PaaS only", "two Azure regions"], "Workloads can move between them."],
  ["Cloud concepts", "Moving from buying servers to paying monthly for cloud resources shifts spending from", "CapEx to OpEx", ["OpEx to CapEx", "OpEx to OpEx", "CapEx to CapEx"], "Capital expenditure → operational expenditure."],
  ["Cloud concepts", "The ability to automatically add resources when demand rises is", "elasticity", ["high availability", "governance", "fault tolerance only"], "Scalability is the ability to grow; elasticity does it automatically."],
  ["Cloud concepts", "Which pricing model does the cloud generally use?", "Consumption-based (pay for what you use)", ["Fixed annual fee only", "Per employee only", "Free"], "You pay for resources used."],
  ["Architecture", "What is an Azure region pair?", "Two regions in the same geography paired for disaster recovery", ["Two availability zones", "A VM and its backup disk", "Two subscriptions"], "Updates roll out to one region at a time."],
  ["Architecture", "Availability zones protect against", "the failure of a single datacentre within a region", ["the failure of an entire geography", "user mistakes", "billing errors"], "Each zone has independent power, cooling and networking."],
  ["Architecture", "What is a resource group?", "A logical container for related Azure resources", ["A billing account", "A type of VM", "A security policy"], "A resource can be in only one resource group."],
  ["Architecture", "What is the correct hierarchy from top to bottom?", "Management groups → subscriptions → resource groups → resources", ["Subscriptions → management groups → resources → resource groups", "Resource groups → subscriptions → resources", "Resources → resource groups → subscriptions"], "Policies and RBAC inherit downwards."],
  ["Architecture", "Can a resource group contain resources from different regions?", "Yes", ["No", "Only for VMs", "Only in paired regions"], "The group's region only stores its metadata."],
  ["Governance", "Which feature prevents a resource from being accidentally deleted?", "A resource lock (CanNotDelete)", ["Azure Policy", "A tag", "An availability set"], "ReadOnly locks also block changes."],
  ["Governance", "What are tags used for?", "Adding name/value metadata, e.g. for cost tracking", ["Encrypting data", "Blocking deletion", "Creating VMs"], "Example: Department = Finance."],
  ["Governance", "Azure RBAC is used to", "control who can do what with Azure resources", ["enforce resource naming rules", "monitor VM performance", "estimate costs"], "Azure Policy controls what resources can look like."],
  ["Governance", "Which built-in RBAC role can manage everything except access?", "Contributor", ["Owner", "Reader", "User Access Administrator"], "Owner can also grant access."],
  ["Identity", "What does conditional access do?", "Applies access rules based on signals like user, location and device", ["Encrypts disks", "Creates backups", "Schedules VMs"], "For example, require MFA from outside the office."],
  ["Identity", "Single sign-on (SSO) means", "one set of credentials gives access to many applications", ["one app per user", "passwords change daily", "MFA is disabled"], "It reduces password fatigue."],
  ["Identity", "Which security model assumes breach and verifies every request explicitly?", "Zero Trust", ["Defence in depth only", "Perimeter-only security", "Least cost"], "Never trust, always verify."],
  ["Cost", "Which tool compares the cost of running on-premises with running in Azure?", "TCO calculator", ["Pricing calculator", "Azure Advisor", "Service Health"], "The pricing calculator estimates the cost of Azure services."],
  ["Cost", "Which tool estimates the monthly cost of Azure services you plan to use?", "Pricing calculator", ["TCO calculator", "Microsoft Purview", "Azure Arc"], "Cost Management analyses actual spending."],
  ["Cost", "Which of these usually reduces the cost of a VM that runs 24/7 for years?", "Azure Reservations", ["Spot VMs for production", "Bigger VM sizes", "Adding more regions"], "Commit to 1 or 3 years for a discount."],
  ["Architecture", "What is an availability set?", "A way to spread VMs across fault and update domains in one datacentre", ["A group of subscriptions", "A backup policy", "A billing scope"], "It protects against rack-level failures and planned maintenance."],
  ["Architecture", "Which service automatically adds or removes identical VMs based on demand?", "Virtual Machine Scale Sets", ["Availability sets", "Resource locks", "Azure Arc"], "They provide elasticity for VMs."],
  ["Architecture", "What are Azure sovereign regions?", "Isolated instances of Azure for specific compliance or government needs", ["Regions with no availability zones", "Cheaper regions", "Regions for testing only"], "For example, Azure Government."],
  ["Storage", "Which blob access tier is cheapest to store but has the highest retrieval time?", "Archive", ["Hot", "Cool", "Cold only for VMs"], "Archive data must be rehydrated before reading."],
  ["Storage", "Which storage redundancy option keeps three copies in a single datacentre?", "LRS (locally redundant storage)", ["ZRS", "GRS", "GZRS"], "ZRS spreads copies across zones; GRS copies to a paired region."],
  ["Storage", "Which storage redundancy option copies data to a secondary region?", "GRS (geo-redundant storage)", ["LRS", "ZRS", "Premium SSD"], "It protects against a regional outage."],
  ["Storage", "Which tool copies files to and from Azure Storage from the command line?", "AzCopy", ["Azure Arc", "Azure DNS", "Azure Policy"], "Azure Storage Explorer is the graphical alternative."],
  ["Storage", "Which service ships physical disks to move large amounts of data into Azure?", "Azure Data Box", ["Azure Files", "AzCopy", "Azure Migrate only"], "Used when network transfer would be too slow."],
  ["Migration", "Which service helps discover, assess and migrate on-premises servers to Azure?", "Azure Migrate", ["Azure Arc", "Azure Monitor", "Azure Advisor"], "It is a central hub for migration."],
  ["Management", "Which tool lets you manage Azure from a browser-based shell?", "Azure Cloud Shell", ["Azure Arc", "Azure Data Box", "Azure DNS"], "It supports Bash and PowerShell."],
  ["Management", "Which approach describes infrastructure in templates such as ARM or Bicep?", "Infrastructure as code", ["Manual configuration", "Serverless computing", "Hybrid identity"], "Deployments become repeatable."],
  ["Management", "Which Azure Monitor feature analyses application performance and usage?", "Application Insights", ["Log Analytics only", "Azure Advisor", "Service Health"], "It's an application performance monitoring service."],
  ["Cost", "Data going INTO Azure datacentres (ingress) is generally", "free", ["charged per GB", "charged per user", "only free for VMs"], "Egress (outbound) is usually charged."],
];

function azf(): Q[] {
  const qs = [
    ...facts("AZF", AZ_FACTS),
    ...pairs("AZF", "Services", AZ_SVC, (a) => `What is ${a} used for?`, (b) => `Which Azure service provides ${b}?`, (a, b) => `${a}: ${b}.`),
  ];
  const SLAS = [99.9, 99.95, 99.99];
  qs.push(...repeat(6, () => {
    const [a, b] = [pick(SLAS), pick(SLAS)];
    const c = Math.floor(((a / 100) * (b / 100)) * 1000000) / 10000;
    return mcq("AZF", "SLAs", `An app depends on a web app with a ${a}% SLA and a database with a ${b}% SLA. What is the composite SLA?`, `${fmt(c)}%`, [`${Math.min(a, b)}%`, `${Math.max(a, b)}%`, `${fmt(Math.round((a + b) / 2 * 1000) / 1000)}%`], `Multiply the SLAs: ${a}% × ${b}% ≈ ${fmt(c)}%. A chain of services is less available than any single part.`, 3);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
// PCE — Python (PCEP style). [topic, code, expected output, distractors, explanation]
// ---------------------------------------------------------------------------
export const PY: [string, string, string, string[], string][] = [
  ["Operators", "print(7 // 2)", "3", ["3.5", "4", "1"], "// is floor division."],
  ["Operators", "print(7 % 3)", "1", ["2", "0", "2.33"], "% gives the remainder."],
  ["Operators", "print(2 ** 3 ** 2)", "512", ["64", "36", "18"], "** is right-associative: 3**2 = 9, then 2**9 = 512."],
  ["Operators", "print(-7 // 2)", "-4", ["-3", "-3.5", "3"], "Floor division rounds towards negative infinity."],
  ["Operators", "print(10 / 4)", "2.5", ["2", "3", "2.25"], "/ always returns a float in Python 3."],
  ["Operators", "print(1 + 2 * 3)", "7", ["9", "6", "5"], "Multiplication happens before addition."],
  ["Operators", "print(True + True)", "2", ["True", "1", "Error"], "True behaves like 1 in arithmetic."],
  ["Operators", "print(5 == 5.0)", "True", ["False", "Error", "None"], "int and float values compare by value."],
  ["Operators", "print(not 0 and 3)", "3", ["True", "False", "0"], "not 0 is True; True and 3 returns 3."],
  ["Operators", "print(0 or 'hi')", "hi", ["0", "True", "False"], "or returns the first truthy operand."],
  ["Operators", "print(17 // 5 * 2)", "6", ["7", "2", "1"], "17 // 5 = 3, then 3 * 2 = 6."],
  ["Types", "print(type(3 / 1).__name__)", "float", ["int", "str", "number"], "Division with / gives a float."],
  ["Types", "print(int('12') + 3)", "15", ["123", "Error", "12"], "int('12') converts the string to 12."],
  ["Types", "print('3' * 3)", "333", ["9", "Error", "3 3 3"], "Multiplying a string repeats it."],
  ["Types", "print(int(3.99))", "3", ["4", "3.99", "Error"], "int() truncates towards zero."],
  ["Types", "print(float('2') + 1)", "3.0", ["21", "Error", "2.01"], "float('2') is 2.0."],
  ["Types", "print(bool(''))", "False", ["True", "''", "Error"], "An empty string is falsy."],
  ["Types", "print(str(10) + str(5))", "105", ["15", "Error", "10 5"], "String concatenation."],
  ["Strings", "s = 'python'\nprint(s[1:4])", "yth", ["pyt", "ytho", "ython"], "Slicing includes the start and excludes the end."],
  ["Strings", "s = 'python'\nprint(s[-1])", "n", ["p", "o", "Error"], "Index -1 is the last character."],
  ["Strings", "s = 'python'\nprint(s[::-1])", "nohtyp", ["python", "p", "Error"], "A step of -1 reverses the string."],
  ["Strings", "print(len('hello world'))", "11", ["10", "2", "12"], "The space counts as a character."],
  ["Strings", "print('Hello'.upper())", "HELLO", ["H", "HELLO()", "Error"], "upper() returns an upper-case copy."],
  ["Strings", "print('a,b,c'.split(','))", "['a', 'b', 'c']", ["['a,b,c']", "a b c", "('a', 'b', 'c')"], "split() returns a list."],
  ["Strings", "print('-'.join(['a', 'b', 'c']))", "a-b-c", ["abc", "-a-b-c", "['a', 'b', 'c']"], "join() puts the separator between items."],
  ["Strings", "print('abc' < 'abd')", "True", ["False", "Error", "None"], "Strings compare character by character."],
  ["Strings", "print('ab' in 'cabin')", "True", ["False", "Error", "1"], "in checks for a substring."],
  ["Lists", "a = [1, 2, 3]\na.append(4)\nprint(len(a))", "4", ["3", "5", "Error"], "append adds one item."],
  ["Lists", "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)", "[1, 2, 3, 4]", ["[1, 2, 3]", "[4]", "Error"], "b and a refer to the same list."],
  ["Lists", "a = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(a)", "[1, 2, 3]", ["[1, 2, 3, 4]", "[4]", "Error"], "a[:] makes a copy."],
  ["Lists", "a = [3, 1, 2]\na.sort()\nprint(a)", "[1, 2, 3]", ["[3, 1, 2]", "[3, 2, 1]", "None"], "sort() sorts the list in place."],
  ["Lists", "a = [3, 1, 2]\nprint(a.sort())", "None", ["[1, 2, 3]", "[3, 1, 2]", "Error"], "sort() returns None; it changes the list in place."],
  ["Lists", "a = [1, 2, 3, 4, 5]\nprint(a[1:-1])", "[2, 3, 4]", ["[1, 2, 3, 4]", "[2, 3, 4, 5]", "[2, 3]"], "From index 1 up to (not including) the last."],
  ["Lists", "a = [1, 2, 3]\nprint(a * 2)", "[1, 2, 3, 1, 2, 3]", ["[2, 4, 6]", "Error", "[[1, 2, 3], [1, 2, 3]]"], "Multiplying a list repeats it."],
  ["Lists", "a = [1, 2, 3]\ndel a[0]\nprint(a)", "[2, 3]", ["[1, 2]", "[1, 2, 3]", "Error"], "del removes the item at that index."],
  ["Lists", "a = [1, [2, 3], 4]\nprint(len(a))", "3", ["4", "5", "2"], "The nested list counts as one item."],
  ["Lists", "print([x * 2 for x in range(3)])", "[0, 2, 4]", ["[2, 4, 6]", "[0, 1, 2]", "[0, 2, 4, 6]"], "range(3) gives 0, 1, 2."],
  ["Lists", "a = [1, 2, 3]\na.insert(1, 9)\nprint(a)", "[1, 9, 2, 3]", ["[9, 1, 2, 3]", "[1, 2, 9, 3]", "[1, 9, 3]"], "insert(index, value) puts the value before that index."],
  ["Tuples & dicts", "t = (1, 2, 3)\nprint(t[1])", "2", ["1", "3", "Error"], "Tuples are indexed from 0."],
  ["Tuples & dicts", "t = (5,)\nprint(type(t).__name__)", "tuple", ["int", "list", "str"], "The trailing comma makes a one-item tuple."],
  ["Tuples & dicts", "d = {'a': 1, 'b': 2}\nprint(d['b'])", "2", ["1", "'b'", "Error"], "Look up a value by its key."],
  ["Tuples & dicts", "d = {'a': 1}\nd['a'] = 5\nprint(d)", "{'a': 5}", ["{'a': 1}", "{'a': 1, 'a': 5}", "Error"], "Assigning to an existing key replaces the value."],
  ["Tuples & dicts", "d = {'a': 1, 'b': 2}\nprint(len(d))", "2", ["4", "1", "3"], "len() counts the keys."],
  ["Tuples & dicts", "d = {'a': 1}\nprint(d.get('z', 0))", "0", ["None", "Error", "1"], "get() returns the default if the key is missing."],
  ["Tuples & dicts", "d = {'x': 1, 'y': 2}\nprint(list(d.keys()))", "['x', 'y']", ["[1, 2]", "['x', 1, 'y', 2]", "('x', 'y')"], "keys() gives the keys."],
  ["Tuples & dicts", "d = {'x': 1, 'y': 2}\nprint('y' in d)", "True", ["False", "2", "Error"], "in checks the keys of a dictionary."],
  ["Control flow", "x = 5\nif x > 3:\n    print('big')\nelse:\n    print('small')", "big", ["small", "big small", "Nothing"], "5 > 3 is True."],
  ["Control flow", "for i in range(2, 8, 3):\n    print(i, end=' ')", "2 5", ["2 5 8", "2 3 4 5 6 7", "3 6"], "range(start, stop, step) stops before 8."],
  ["Control flow", "n = 0\nwhile n < 3:\n    n += 1\nprint(n)", "3", ["2", "4", "0"], "The loop ends when n becomes 3."],
  ["Control flow", "for i in range(5):\n    if i == 3:\n        break\nprint(i)", "3", ["4", "5", "2"], "break leaves the loop when i is 3."],
  ["Control flow", "total = 0\nfor i in range(5):\n    if i % 2 == 0:\n        continue\n    total += i\nprint(total)", "4", ["6", "10", "0"], "Only odd numbers 1 and 3 are added."],
  ["Control flow", "for i in range(3):\n    pass\nelse:\n    print('done')", "done", ["Nothing", "0 1 2", "Error"], "A for-loop's else runs when the loop finishes without break."],
  ["Control flow", "count = 0\nfor c in 'banana':\n    if c == 'a':\n        count += 1\nprint(count)", "3", ["2", "6", "1"], "'banana' has three a's."],
  ["Control flow", "x = 10\nprint('even' if x % 2 == 0 else 'odd')", "even", ["odd", "True", "Error"], "A conditional expression."],
  ["Control flow", "print(list(range(3, 0, -1)))", "[3, 2, 1]", ["[3, 2, 1, 0]", "[1, 2, 3]", "[]"], "A negative step counts down and stops before 0."],
  ["Functions", "def f(a, b=2):\n    return a * b\nprint(f(3))", "6", ["3", "5", "Error"], "b uses its default value 2."],
  ["Functions", "def f(a, b=2):\n    return a * b\nprint(f(3, 4))", "12", ["6", "7", "Error"], "The argument 4 overrides the default."],
  ["Functions", "def f():\n    pass\nprint(f())", "None", ["pass", "Error", "0"], "A function without return returns None."],
  ["Functions", "def f(x):\n    x = x + 1\na = 5\nf(a)\nprint(a)", "5", ["6", "None", "Error"], "Rebinding x inside the function doesn't change a."],
  ["Functions", "def f(lst):\n    lst.append(1)\na = []\nf(a)\nprint(a)", "[1]", ["[]", "None", "Error"], "The list object itself is changed."],
  ["Functions", "x = 1\ndef f():\n    global x\n    x = 2\nf()\nprint(x)", "2", ["1", "None", "Error"], "global lets the function rebind the module-level x."],
  ["Functions", "def f(*args):\n    return len(args)\nprint(f(1, 2, 3))", "3", ["1", "6", "Error"], "*args collects positional arguments into a tuple."],
  ["Functions", "def f(n):\n    return 1 if n <= 1 else n * f(n - 1)\nprint(f(4))", "24", ["10", "16", "4"], "Recursive factorial: 4 × 3 × 2 × 1."],
  ["Functions", "print(max([3, 9, 2]))", "9", ["3", "2", "[9]"], "max() returns the largest item."],
  ["Functions", "print(sum([1, 2, 3]) / 3)", "2.0", ["6.0", "3.0", "Error"], "6 / 3 is 2.0 (a float)."],
  ["Operators", "x = 5\nx += 3\nx *= 2\nprint(x)", "16", ["13", "11", "10"], "5 + 3 = 8, then 8 × 2 = 16."],
  ["Operators", "print(3 > 2 > 1)", "True", ["False", "Error", "1"], "Chained comparison: 3 > 2 and 2 > 1."],
  ["Operators", "print(6 & 3)", "2", ["9", "7", "1"], "Bitwise AND: 110 & 011 = 010."],
  ["Operators", "print(6 | 3)", "7", ["2", "9", "5"], "Bitwise OR: 110 | 011 = 111."],
  ["Operators", "print(1 << 3)", "8", ["4", "3", "6"], "Shifting left by 3 multiplies by 2³."],
  ["Operators", "print(round(2.675, 1))", "2.7", ["2.6", "2.68", "3"], "Rounded to one decimal place."],
  ["Strings", "print('Py' + 'thon' * 0)", "Py", ["Python", "thon", "Error"], "'thon' * 0 is an empty string."],
  ["Strings", "print('hello'.find('l'))", "2", ["3", "1", "-1"], "find() returns the index of the first match."],
  ["Strings", "print('a-b'.replace('-', '+'))", "a+b", ["a-b", "ab", "Error"], "replace() returns a new string."],
  ["Strings", "print(len('  hi  '.strip()))", "2", ["6", "4", "0"], "strip() removes surrounding spaces."],
  ["Lists", "a = [1, 2, 3]\nprint(a.pop())", "3", ["1", "[1, 2]", "Error"], "pop() removes and returns the last item."],
  ["Lists", "a = [1, 2, 2, 3]\na.remove(2)\nprint(a)", "[1, 2, 3]", ["[1, 3]", "[1, 2, 2]", "Error"], "remove() deletes the first matching value."],
  ["Lists", "a = [5, 6, 7]\nprint(a.index(7))", "2", ["7", "3", "1"], "index() returns the position of the value."],
  ["Lists", "a = [1, 2]\na.extend([3, 4])\nprint(a)", "[1, 2, 3, 4]", ["[1, 2, [3, 4]]", "[3, 4]", "Error"], "extend() adds each item."],
  ["Lists", "a = [1, 2]\na.append([3, 4])\nprint(len(a))", "3", ["4", "2", "Error"], "append() adds the whole list as one item."],
  ["Lists", "m = [[1, 2], [3, 4]]\nprint(m[1][0])", "3", ["2", "1", "4"], "Row 1, column 0."],
  ["Lists", "print(sorted([3, 1, 2], reverse=True))", "[3, 2, 1]", ["[1, 2, 3]", "None", "[3, 1, 2]"], "sorted() returns a new sorted list."],
  ["Control flow", "for i in range(3):\n    for j in range(2):\n        pass\nprint(i + j)", "3", ["5", "2", "4"], "After the loops, i is 2 and j is 1."],
  ["Control flow", "i = 0\nwhile True:\n    i += 2\n    if i > 5:\n        break\nprint(i)", "6", ["5", "4", "8"], "i goes 2, 4, 6 — then breaks."],
  ["Functions", "f = lambda x: x * x\nprint(f(4))", "16", ["8", "4", "Error"], "A lambda is a small anonymous function."],
  ["Functions", "def f(a, b):\n    return b - a\nprint(f(b=10, a=3))", "7", ["-7", "13", "Error"], "Keyword arguments match by name."],
  ["Functions", "def f(x):\n    return x, x * 2\na, b = f(3)\nprint(b)", "6", ["3", "(3, 6)", "Error"], "The function returns a tuple that is unpacked."],
  ["Errors", "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print('oops')", "oops", ["0", "inf", "Error"], "The exception is caught."],
  ["Errors", "try:\n    int('x')\nexcept ValueError:\n    print('bad')\nelse:\n    print('ok')", "bad", ["ok", "bad ok", "Error"], "int('x') raises ValueError."],
  ["Errors", "try:\n    x = 1\nexcept:\n    print('a', end=' ')\nelse:\n    print('b', end=' ')\nfinally:\n    print('c')", "b c", ["a c", "c", "b"], "No error: else runs, then finally."],
];

function pce(): Q[] {
  const qs = PY.map(([t, code, out, d, e]) => mcq("PCE", t, `What is the output of this code?\n\n${code}`, out, d, e, 2));
  const FACTS: F[] = [
    ["Basics", "Which of these is a valid Python variable name?", "my_score", ["2score", "my-score", "class"], "Names can't start with a digit, contain hyphens or be keywords."],
    ["Basics", "Which keyword defines a function?", "def", ["func", "function", "lambda only"], "lambda creates small anonymous functions."],
    ["Basics", "How do you start a single-line comment in Python?", "#", ["//", "/*", "--"], "Everything after # on that line is ignored."],
    ["Basics", "Which data type is immutable?", "tuple", ["list", "dict", "set"], "Lists, dictionaries and sets can be changed."],
    ["Basics", "What does input() return?", "A string", ["An int", "A float", "It depends on what you type"], "Convert with int() or float() if needed."],
    ["Basics", "Which error happens when you use a variable that hasn't been defined?", "NameError", ["TypeError", "ValueError", "IndexError"], "IndexError is for list indexes out of range."],
    ["Basics", "Which error does [1, 2][5] raise?", "IndexError", ["KeyError", "ValueError", "NameError"], "The index is out of range."],
    ["Basics", "Which error does {'a': 1}['b'] raise?", "KeyError", ["IndexError", "NameError", "ValueError"], "The key doesn't exist."],
    ["Basics", "Which error does '2' + 2 raise?", "TypeError", ["ValueError", "NameError", "SyntaxError"], "You can't add a str and an int."],
    ["Basics", "Python uses ___ to group statements into blocks.", "indentation", ["curly braces", "semicolons", "BEGIN and END"], "Consistent indentation (usually 4 spaces) is required."],
  ];
  return [...qs, ...facts("PCE", FACTS)];
}

export function technology(): Record<string, Q[]> {
  return { ITF: itf(), CCN: ccn(), AWC: awc(), AZF: azf(), PCE: pce() };
}
