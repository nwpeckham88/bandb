// Backdoors & Breaches Core Card Dataset (Full Official Deck & Deck Architecture)

export const CARD_TYPES = {
  INITIAL: 'initial',
  PIVOT: 'pivot',
  PERSISTENCE: 'persistence',
  C2: 'c2',
  PROCEDURE: 'procedure',
  INJECT: 'inject'
};

export const TYPE_CONFIG = {
  [CARD_TYPES.INITIAL]: {
    name: 'Initial Compromise',
    color: '#ff3366',
    bgColor: 'rgba(255, 51, 102, 0.15)',
    borderColor: '#ff3366',
    badge: 'RED TEAM',
    icon: 'ShieldAlert'
  },
  [CARD_TYPES.PIVOT]: {
    name: 'Pivot & Escalate',
    color: '#ffaa00',
    bgColor: 'rgba(255, 170, 0, 0.15)',
    borderColor: '#ffaa00',
    badge: 'PRIVILEGE',
    icon: 'TrendingUp'
  },
  [CARD_TYPES.PERSISTENCE]: {
    name: 'Persistence',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: '#a855f7',
    badge: 'FOOTPRINT',
    icon: 'Anchor'
  },
  [CARD_TYPES.C2]: {
    name: 'C2 & Exfiltration',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#3b82f6',
    badge: 'EGRESS',
    icon: 'Radio'
  },
  [CARD_TYPES.PROCEDURE]: {
    name: 'Procedure Card',
    color: '#00ff88',
    bgColor: 'rgba(0, 255, 136, 0.12)',
    borderColor: '#00ff88',
    badge: 'DEFENDER',
    icon: 'Activity'
  },
  [CARD_TYPES.INJECT]: {
    name: 'Inject Event',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.2)',
    borderColor: '#eab308',
    badge: 'INCIDENT INJECT',
    icon: 'Zap'
  }
};

export const INITIAL_COMPROMISE_CARDS = [
  {
    id: 'init-1',
    type: CARD_TYPES.INITIAL,
    title: 'Phishing via Spear Attachment',
    description: 'Targeted user executed a malicious macro-enabled PDF/Doc embedded with shellcode payloads.',
    cve: 'CVE-2024-21412',
    attackVector: 'Email Gateway / User Endpoint',
    hintClue: 'Look for suspicious child processes spawned from Outlook or Acrobat Reader on user workstations.'
  },
  {
    id: 'init-2',
    type: CARD_TYPES.INITIAL,
    title: 'Password Spray / Credential Stuffing',
    description: 'Attacker used breached credential lists to spray single passwords across exposed VPN and O365 portals.',
    attackVector: 'External Identity Provider / VPN',
    hintClue: 'Check authentication logs for high volumes of failed logins originating from external residential proxies.'
  },
  {
    id: 'init-3',
    type: CARD_TYPES.INITIAL,
    title: 'Exploited Public-Facing Web App',
    description: 'Unpatched vulnerability in perimeter web application allowed remote unauthenticated code execution.',
    cve: 'CVE-2024-1708',
    attackVector: 'DMZ Web Server',
    hintClue: 'Examine HTTP POST request logs targeting vulnerable endpoint URI paths and unexpected spawned subshells.'
  },
  {
    id: 'init-4',
    type: CARD_TYPES.INITIAL,
    title: 'Malicious USB Dropped',
    description: 'Employee inserted an infected thumb drive found in the parking lot into an internal desktop.',
    attackVector: 'Physical Endpoint / Human Factor',
    hintClue: 'Review Windows Event Log ID 20001 (Plug and Play device driver installation) on desktop assets.'
  },
  {
    id: 'init-5',
    type: CARD_TYPES.INITIAL,
    title: 'Supply Chain / Trusted Relationship',
    description: 'Compromised third-party software update pushed a backdoor signed with legitimate vendor certificate.',
    attackVector: 'Third-Party Management Agent',
    hintClue: 'Look for recent automated updates installed by third-party remote monitoring software across servers.'
  },
  {
    id: 'init-6',
    type: CARD_TYPES.INITIAL,
    title: 'External Cloud Access / Leaked Keys',
    description: 'Attacker accessed AWS/Azure cloud console using stolen API keys or leaked IAM tokens from a public repository.',
    cve: 'MITRE T1078.004',
    attackVector: 'Cloud Infrastructure / IAM',
    hintClue: 'Inspect CloudTrail/Activity logs for API calls originating from unfamiliar external IP addresses.'
  },
  {
    id: 'init-7',
    type: CARD_TYPES.INITIAL,
    title: 'Insider Threat / Malicious Employee',
    description: 'A disgruntled employee or compromised insider transferred sensitive internal assets using authorized credentials.',
    attackVector: 'Internal User Access / Insider',
    hintClue: 'Check DLP logs and mass file downloading activity outside normal working hours.'
  },
  {
    id: 'init-8',
    type: CARD_TYPES.INITIAL,
    title: 'Social Engineering (Vishing / Smishing)',
    description: 'Attacker tricked helpdesk staff into resetting MFA tokens by impersonating a C-suite executive on a voice call.',
    attackVector: 'IT Helpdesk / Voice Phishing',
    hintClue: 'Review IT support tickets for out-of-band MFA reset requests and self-reported suspicious phone calls.'
  },
  {
    id: 'init-9',
    type: CARD_TYPES.INITIAL,
    title: 'Bring Your Own (Exploited) Device (BYOD)',
    description: 'Unmanaged personal laptop connected to corporate Wi-Fi introducing malware into the intranet.',
    attackVector: 'BYOD / Enterprise Wireless Network',
    hintClue: 'Analyze DHCP and network access control logs for unauthorized MAC addresses on internal subnets.'
  },
  {
    id: 'init-10',
    type: CARD_TYPES.INITIAL,
    title: 'Exploitable Perimeter Gateway (VPN / RDP)',
    description: 'Unauthenticated SSL VPN flaw allowed attackers to dump session tokens and connect directly.',
    cve: 'CVE-2023-46805',
    attackVector: 'Perimeter Gateway / Remote Access',
    hintClue: 'Look for unexpected active VPN sessions without accompanying MFA prompts in authentication gateways.'
  }
];

export const PIVOT_ESCALATE_CARDS = [
  {
    id: 'piv-1',
    type: CARD_TYPES.PIVOT,
    title: 'Kerberoasting Attack',
    description: 'Attacker requested TGS tickets for SPN accounts to crack service account passwords offline.',
    attackVector: 'Active Directory / Domain Controller',
    hintClue: 'Monitor Event ID 4769 (A Kerberos service ticket was requested) with RC4 encryption type 0x17.'
  },
  {
    id: 'piv-2',
    type: CARD_TYPES.PIVOT,
    title: 'OS Credential Dumping (LSASS)',
    description: 'Extracted plaintext passwords and NTLM hashes directly from memory using LSASS process injection.',
    attackVector: 'Local Server Administrator',
    hintClue: 'Check EDR telemetry for handles opened to lsass.exe by unverified processes or mimikatz signatures.'
  },
  {
    id: 'piv-3',
    type: CARD_TYPES.PIVOT,
    title: 'Local Sudo / Token Impersonation',
    description: 'Exploited a misconfigured sudoer rule or Windows access token to elevate to NT AUTHORITY\\SYSTEM.',
    cve: 'CVE-2023-22809',
    attackVector: 'Linux / Windows Privilege Escalation',
    hintClue: 'Audit privilege escalation events and user account impersonation tokens logged in OS security logs.'
  },
  {
    id: 'piv-4',
    type: CARD_TYPES.PIVOT,
    title: 'Internal Remote Desktop Protocol (RDP)',
    description: 'Used harvested domain credentials to RDP across internal subnet boundaries into sensitive servers.',
    attackVector: 'Internal Network / Lateral Movement',
    hintClue: 'Check RDP Event ID 4624 type 10 (RemoteInteractive) connections between non-admin subnets.'
  },
  {
    id: 'piv-5',
    type: CARD_TYPES.PIVOT,
    title: 'LLMNR / NBT-NS Protocol Poisoning',
    description: 'Attacker spoofed local name resolution broadcasts to capture NTLMv2 hashes with Responder.',
    attackVector: 'Local Subnet Broadcasts',
    hintClue: 'Look for rogue SMB authentication attempts triggered by failed DNS lookups on local workstations.'
  },
  {
    id: 'piv-6',
    type: CARD_TYPES.PIVOT,
    title: 'Weaponizing Active Directory (AD ACLs / DCSync)',
    description: 'Exploited misconfigured Active Directory permissions to perform a DCSync and dump domain hashes.',
    cve: 'MITRE T1003.006',
    attackVector: 'Domain Controller / AD ACLs',
    hintClue: 'Monitor Directory Service access logs for DS-Replication-Get-Changes privileges exercised by non-DC accounts.'
  },
  {
    id: 'piv-7',
    type: CARD_TYPES.PIVOT,
    title: 'Internal Password Spraying',
    description: 'Attacker conducted low-and-slow password spraying against internal Active Directory accounts from a compromised host.',
    attackVector: 'Internal Domain Controllers',
    hintClue: 'Audit Windows Security Event ID 4625 across multiple workstation targets in quick succession.'
  },
  {
    id: 'piv-8',
    type: CARD_TYPES.PIVOT,
    title: 'Pass-the-Hash / Pass-the-Ticket (PtH / PtT)',
    description: 'Reused stolen NTLM password hashes or Kerberos TGT tickets to authenticate to administrative services without cracking plaintexts.',
    attackVector: 'Active Directory / Network Authentication',
    hintClue: 'Look for NTLM session logons using stolen hashes or unexpected Kerberos ticket requests with anomalous encryption types.'
  },
  {
    id: 'piv-9',
    type: CARD_TYPES.PIVOT,
    title: 'PsExec / WMI Remote Process Execution',
    description: 'Utilized administrative shares (ADMIN$) or WMI winmgmt to execute remote commands across secondary domain servers.',
    attackVector: 'WMI / Administrative Network Shares',
    hintClue: 'Audit Process Creation Event ID 4688 for PSEXESVC.exe and WmiPrvSE.exe spawning cmd.exe or powershell.exe.'
  },
  {
    id: 'piv-10',
    type: CARD_TYPES.PIVOT,
    title: 'AD CS Certificate Abuse (ESC1 / ESC8)',
    description: 'Exploited misconfigured Active Directory Certificate Services templates to request elevated domain admin certificates.',
    cve: 'MITRE T1649',
    attackVector: 'Active Directory Certificate Services',
    hintClue: 'Monitor Event ID 4887 (Certificate Services granted a certificate) for SAN field impersonation of privileged domain accounts.'
  }
];

export const PERSISTENCE_CARDS = [
  {
    id: 'pers-1',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Scheduled Task / Cron Job',
    description: 'Attacker configured a recurring system task to re-execute stager scripts every 4 hours.',
    attackVector: 'System Scheduler',
    hintClue: 'Inspect Windows Scheduled Tasks under \\Microsoft\\Windows\\ or Linux crontabs for hidden script executions.'
  },
  {
    id: 'pers-2',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Web Shell on Internal IIS / Apache',
    description: 'Dropped an obfuscated PHP/ASPX web shell in a public web directory for persistent back-door access.',
    attackVector: 'Web Infrastructure',
    hintClue: 'Look for recently created file timestamps in wwwroot or web app upload folders with suspicious eval calls.'
  },
  {
    id: 'pers-3',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Registry Run Keys / Startup Folder',
    description: 'Modified HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run to trigger backdoor on user login.',
    attackVector: 'Registry / Windows Autostart',
    hintClue: 'Audit registry key modifications to Run, RunOnce, and Winlogon keys across endpoints.'
  },
  {
    id: 'pers-4',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Malicious Service Installation',
    description: 'Created a rogue background system service executing an obfuscated binary under system privileges.',
    attackVector: 'Service Control Manager',
    hintClue: 'Scan Windows Event ID 7045 (A service was installed in the system) with executable paths in Temp folders.'
  },
  {
    id: 'pers-5',
    type: CARD_TYPES.PERSISTENCE,
    title: 'DLL Search Order Hijacking / Side-Loading',
    description: 'Attacker placed a rogue malicious DLL into an application directory ahead of system DLL paths.',
    cve: 'MITRE T1574.002',
    attackVector: 'Endpoint File System / DLL Preloading',
    hintClue: 'Check EDR alerts for unsigned DLLs loaded by signed, trusted system executables.'
  },
  {
    id: 'pers-6',
    type: CARD_TYPES.PERSISTENCE,
    title: 'New Administrative User Added',
    description: 'Attacker created a local or domain administrator account to maintain stealth access.',
    attackVector: 'Local / Domain User Management',
    hintClue: 'Audit Event ID 4720 (A user account was created) and Event ID 4728 (Member added to security group).'
  },
  {
    id: 'pers-7',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Malicious Browser Plugin / Extension',
    description: 'Injected a malicious extension into Chrome/Edge to steal session cookies and keylogged credentials.',
    attackVector: 'User Browser Environment',
    hintClue: 'Review browser extension installation logs and unauthorized enterprise browser policy overrides.'
  },
  {
    id: 'pers-8',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Accessibility Feature Hijack (Sticky Keys / Utilman)',
    description: 'Replaced sethc.exe or utilman.exe with cmd.exe to launch system command prompts from the lock screen.',
    cve: 'MITRE T1546.008',
    attackVector: 'Windows Lock Screen Options',
    hintClue: 'Audit executions of cmd.exe or powershell.exe running as SYSTEM before user login.'
  },
  {
    id: 'pers-9',
    type: CARD_TYPES.PERSISTENCE,
    title: 'Logon Scripts / Shell Configuration',
    description: 'Modified user logon scripts (.bashrc, UserInit, or GPO logon scripts) to execute payloads on login.',
    attackVector: 'Group Policy / User Profile Scripts',
    hintClue: 'Inspect SYSVOL GPO script folders and environment variable overrides in user profile directories.'
  },
  {
    id: 'pers-10',
    type: CARD_TYPES.PERSISTENCE,
    title: 'WMI Event Subscription Persistence',
    description: 'Configured a permanent WMI __EventFilter and __EventConsumer to silently execute backdoor payloads on specific system triggers.',
    cve: 'MITRE T1546.003',
    attackVector: 'Windows Management Instrumentation (WMI)',
    hintClue: 'Query WMI namespace ROOT\\subscription for unapproved __EventConsumer instances pointing to encoded scripts.'
  }
];

export const C2_EXFIL_CARDS = [
  {
    id: 'c2-1',
    type: CARD_TYPES.C2,
    title: 'DNS Tunneling',
    description: 'Attacker encoded data payload packets into subdomains of an attacker-controlled authoritative DNS server.',
    attackVector: 'DNS Protocol Egress',
    hintClue: 'Analyze DNS logs for high volumes of unique long TXT or A record queries to unknown external domains.'
  },
  {
    id: 'c2-2',
    type: CARD_TYPES.C2,
    title: 'HTTPS Encrypted Beaconing (C2)',
    description: 'Beaconing back to command & control infrastructure over TLS port 443 with jitter intervals.',
    attackVector: 'Encrypted Web Traffic',
    hintClue: 'Examine proxy logs for periodic outbound GET/POST requests with uniform payload sizes and strange User-Agents.'
  },
  {
    id: 'c2-3',
    type: CARD_TYPES.C2,
    title: 'Cloud Storage Exfiltration (Rclone/S3)',
    description: 'Compressed sensitive database exports into encrypted archives and staged them to cloud storage buckets.',
    attackVector: 'Cloud Storage API',
    hintClue: 'Check network flow logs for large outbound file transfers to mega.nz, AWS S3, or Google Drive endpoints.'
  },
  {
    id: 'c2-4',
    type: CARD_TYPES.C2,
    title: 'ICMP Payload Tunneling',
    description: 'Data exfiltrated in the payload data field of ICMP Echo Request packets through perimeter routers.',
    attackVector: 'Raw Sockets / ICMP',
    hintClue: 'Inspect packet capture files for unusually large ICMP packet sizes exceeding standard 64-byte ping requests.'
  },
  {
    id: 'c2-5',
    type: CARD_TYPES.C2,
    title: 'Windows Background Intelligent Transfer (BITS)',
    description: 'Utilized Windows BITS jobs to asynchronously download malicious payloads and upload stolen archives.',
    cve: 'MITRE T1197',
    attackVector: 'Background Intelligent Transfer Service',
    hintClue: 'Audit BITSAdmin command executions and Microsoft-Windows-BITS-Client event logs.'
  },
  {
    id: 'c2-6',
    type: CARD_TYPES.C2,
    title: 'Domain Fronting / CDN Channeling',
    description: 'Obfuscated C2 communications by routing HTTPS requests through major CDN hosts with spoofed SNI headers.',
    cve: 'MITRE T1090.004',
    attackVector: 'CDN / Domain Fronting',
    hintClue: 'Compare TLS SNI server names in network captures against host HTTP header host field discrepancies.'
  },
  {
    id: 'c2-7',
    type: CARD_TYPES.C2,
    title: 'Steganography / Image Payload Egress',
    description: 'Concealed sensitive internal database dumps inside innocuous PNG/JPG image metadata fields posted to external image hosts.',
    attackVector: 'Steganography / Web Media',
    hintClue: 'Check proxy logs for anomalous HTTP POST requests to public image sharing portals with large image sizes.'
  },
  {
    id: 'c2-8',
    type: CARD_TYPES.C2,
    title: 'Dead Drop Resolver / Web Social Media C2',
    description: 'Attacker fetched encrypted C2 instructions from public GitHub gists, Reddit posts, or Twitter profile bios.',
    cve: 'MITRE T1102.001',
    attackVector: 'Social Media / Web Dead Drop',
    hintClue: 'Inspect web proxy logs for automated, periodic GET requests to raw githubusercontent.com or paste sites.'
  },
  {
    id: 'c2-9',
    type: CARD_TYPES.C2,
    title: 'SMB Named Pipe Internal C2 Tunneling',
    description: 'Routed internal command and control traffic through encrypted SMB named pipes across compromised internal subnets.',
    attackVector: 'Internal SMB / Named Pipes',
    hintClue: 'Audit network connections over TCP port 445 using non-standard named pipes (e.g., \\pipe\\lsass_c2).'
  },
  {
    id: 'c2-10',
    type: CARD_TYPES.C2,
    title: 'SSH Dynamic Port Forwarding / SOCKS Proxy',
    description: 'Established an encrypted SSH tunnel with dynamic SOCKS port forwarding to bypass perimeter firewall inspection.',
    attackVector: 'Encrypted SSH Tunneling',
    hintClue: 'Monitor firewall logs for long-lived, high-volume outbound SSH connections (port 22) originating from non-developer hosts.'
  }
];

export const PROCEDURE_CARDS = [
  {
    id: 'proc-1',
    type: CARD_TYPES.PROCEDURE,
    title: 'Network Traffic Analysis (NetFlow / Zeek / Bro)',
    category: 'Network',
    description: 'Capture and inspect PCAPs, netflow records, firewall logs, and proxy requests for anomaly signals.',
    bonusTargets: [CARD_TYPES.C2, CARD_TYPES.INITIAL],
    bonusValue: 3
  },
  {
    id: 'proc-2',
    type: CARD_TYPES.PROCEDURE,
    title: 'Endpoint Detection & Response (EDR / AV)',
    category: 'Endpoint',
    description: 'Query EDR agent telemetry, process trees, binary hashes, and DLL injections across endpoints.',
    bonusTargets: [CARD_TYPES.PERSISTENCE, CARD_TYPES.PIVOT],
    bonusValue: 3
  },
  {
    id: 'proc-3',
    type: CARD_TYPES.PROCEDURE,
    title: 'Centralized Log Analysis (SIEM)',
    category: 'Logs',
    description: 'Run targeted SIEM correlation searches across Windows Event Logs, Syslog, and authentication audits.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE, CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-4',
    type: CARD_TYPES.PROCEDURE,
    title: 'Cyber Threat Intelligence (CTI)',
    category: 'Intel',
    description: 'Cross-reference external threat feeds, open-source intelligence, and known adversary TTPs.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-5',
    type: CARD_TYPES.PROCEDURE,
    title: 'Memory Forensics & Host Analysis',
    category: 'Forensics',
    description: 'Perform live RAM acquisition and analyze injected threads, unlinked processes, and hooked APIs.',
    bonusTargets: [CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE],
    bonusValue: 3
  },
  {
    id: 'proc-6',
    type: CARD_TYPES.PROCEDURE,
    title: 'Account Privileges & Audit Reset',
    category: 'Remediation',
    description: 'Invalidate active Kerberos tickets, force domain-wide password resets, and revoke elevated tokens.',
    bonusTargets: [CARD_TYPES.PIVOT],
    bonusValue: 3
  },
  {
    id: 'proc-7',
    type: CARD_TYPES.PROCEDURE,
    title: 'Host Isolation & Quarantine',
    category: 'Remediation',
    description: 'Isolate compromised endpoints at the network layer to halt lateral movement and C2 traffic.',
    bonusTargets: [CARD_TYPES.C2, CARD_TYPES.PERSISTENCE],
    bonusValue: 3
  },
  {
    id: 'proc-8',
    type: CARD_TYPES.PROCEDURE,
    title: 'Firewall & Egress ACL Review',
    category: 'Network',
    description: 'Block identified malicious IP ranges, restrict egress ports, and enable strict DNS inspection.',
    bonusTargets: [CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-9',
    type: CARD_TYPES.PROCEDURE,
    title: 'User & Entity Behavior Analytics (UEBA)',
    category: 'Analytics',
    description: 'Analyze anomalous behavior patterns, login velocity, and unusual time-of-day access across user accounts.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT],
    bonusValue: 3
  },
  {
    id: 'proc-10',
    type: CARD_TYPES.PROCEDURE,
    title: 'Internal Network Segmentation Audit',
    category: 'Network',
    description: 'Verify VLAN isolation, firewall inter-zone rules, and restrict administrative subnet traversal.',
    bonusTargets: [CARD_TYPES.PIVOT, CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-11',
    type: CARD_TYPES.PROCEDURE,
    title: 'Crisis Management & Incident Response Plan',
    category: 'Management',
    description: 'Activate executive response protocols, coordinate team actions, and streamline communication channels.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE, CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-12',
    type: CARD_TYPES.PROCEDURE,
    title: 'File Integrity Monitoring (FIM / Hash Verification)',
    category: 'Endpoint',
    description: 'Scan system binaries, web roots, and configuration directories for unauthorized file alterations or hash mismatches.',
    bonusTargets: [CARD_TYPES.PERSISTENCE, CARD_TYPES.INITIAL],
    bonusValue: 3
  },
  {
    id: 'proc-13',
    type: CARD_TYPES.PROCEDURE,
    title: 'Active Directory Audit & BloodHound Analysis',
    category: 'Logs',
    description: 'Map domain trust relationships, ACL permissions, Kerberos ticket requests, and anomalous admin group additions.',
    bonusTargets: [CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE],
    bonusValue: 3
  },
  {
    id: 'proc-14',
    type: CARD_TYPES.PROCEDURE,
    title: 'Cloud Security Posture & CloudTrail Audit',
    category: 'Intel',
    description: 'Audit CloudTrail logs, IAM policy modifications, S3 bucket permissions, and API access token usage.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.C2],
    bonusValue: 3
  },
  {
    id: 'proc-15',
    type: CARD_TYPES.PROCEDURE,
    title: 'Malware Reverse Engineering & Sandbox Analysis',
    category: 'Forensics',
    description: 'Detonate suspicious payloads in a secure sandbox to extract hardcoded C2 IP addresses, mutexes, and dropped artifacts.',
    bonusTargets: [CARD_TYPES.C2, CARD_TYPES.PERSISTENCE],
    bonusValue: 3
  },
  {
    id: 'proc-16',
    type: CARD_TYPES.PROCEDURE,
    title: 'Email Security Gateway & Attachment Analysis',
    category: 'Network',
    description: 'Inspect mail server header logs, quarantined attachments, phishing links, and inbound DMARC/SPF/DKIM failures.',
    bonusTargets: [CARD_TYPES.INITIAL],
    bonusValue: 3
  },
  {
    id: 'proc-17',
    type: CARD_TYPES.PROCEDURE,
    title: 'Vulnerability Management & Patch Compliance Audit',
    category: 'Endpoint',
    description: 'Scan perimeter systems and internal servers for known CVE vulnerabilities and missing security patches.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT],
    bonusValue: 3
  },
  {
    id: 'proc-18',
    type: CARD_TYPES.PROCEDURE,
    title: 'Honeytokens & Canary Credentials Audit',
    category: 'Analytics',
    description: 'Monitor decoy Active Directory service accounts, fake AWS keys, and canary files for unauthorized access attempts.',
    bonusTargets: [CARD_TYPES.PIVOT, CARD_TYPES.INITIAL],
    bonusValue: 3
  },
  {
    id: 'proc-19',
    type: CARD_TYPES.PROCEDURE,
    title: 'Identity & Access Management (IAM / MFA Audit)',
    category: 'Logs',
    description: 'Review multi-factor authentication logs, conditional access policies, and revoked session tokens.',
    bonusTargets: [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT],
    bonusValue: 3
  },
  {
    id: 'proc-20',
    type: CARD_TYPES.PROCEDURE,
    title: 'Deception Taps & Sinkhole Traffic Capture',
    category: 'Network',
    description: 'Redirect suspicious outbound C2 domain requests to internal sinkholes to capture live beacon payloads.',
    bonusTargets: [CARD_TYPES.C2],
    bonusValue: 3
  }
];

export const INJECT_CARDS = [
  {
    id: 'inj-1',
    type: CARD_TYPES.INJECT,
    title: 'C-Suite Executive Demands Update',
    description: 'The CEO calls an urgent briefing meeting, pulling key analysts away for 1 turn.',
    effect: 'Next roll suffers a -2 urgency modifier.',
    mechanic: { type: 'roll_modifier', rollPenalty: -2, duration: 1 }
  },
  {
    id: 'inj-2',
    type: CARD_TYPES.INJECT,
    title: 'Out-of-Band Comms Interrupted',
    description: 'Primary incident response Slack channel compromised. Switching to backup encrypted channels.',
    effect: 'Success threshold raised to 12+ for 1 turn (coordination overhead).',
    mechanic: { type: 'threshold_modifier', thresholdDelta: 1, duration: 1 }
  },
  {
    id: 'inj-3',
    type: CARD_TYPES.INJECT,
    title: 'Corrupted SIEM Log Archives',
    description: 'A 24-hour log gap was discovered due to disk buffer overflow on the syslog receiver.',
    effect: 'Log Analysis (SIEM) procedure cards provide no +3 bonus for 2 turns.',
    mechanic: { type: 'no_procedure_bonus', blockedCategories: ['Logs'], duration: 2 }
  },
  {
    id: 'inj-4',
    type: CARD_TYPES.INJECT,
    title: 'False Positive Red Herring',
    description: 'Third-party pen test team triggered alerts simultaneously, creating noise across all telemetry sources.',
    effect: 'All procedure card bonuses reduced by 1 this turn (noise overwhelms tools).',
    mechanic: { type: 'roll_modifier', rollPenalty: -1, duration: 1 }
  },
  {
    id: 'inj-5',
    type: CARD_TYPES.INJECT,
    title: 'Honeypots Deployed',
    description: 'Deception technology detected decoy access attempt, granting immediate insight into attacker lateral tactics.',
    effect: '+2 modifier on your next investigation roll.',
    mechanic: { type: 'roll_modifier', rollPenalty: 2, duration: 1 }
  },
  {
    id: 'inj-6',
    type: CARD_TYPES.INJECT,
    title: 'It Was a Pen Test!',
    description: 'Discovered that half the suspicious traffic was actually an authorized scheduled penetration test team.',
    effect: '+1 bonus on next 2 turns (noise filtered).',
    mechanic: { type: 'roll_modifier', rollPenalty: 1, duration: 2 }
  },
  {
    id: 'inj-7',
    type: CARD_TYPES.INJECT,
    title: 'Data Uploaded to Pastebin',
    description: 'Exfiltrated company data appeared on a public paste site. Management demands immediate results.',
    effect: 'Success threshold raised to 13+ for 1 turn (high stress).',
    mechanic: { type: 'threshold_modifier', thresholdDelta: 2, duration: 1 }
  },
  {
    id: 'inj-8',
    type: CARD_TYPES.INJECT,
    title: 'Intern Accidentally Reboots System',
    description: 'A stray reboot command took down critical log collectors and network taps for 1 turn.',
    effect: 'Forensics and Network procedure cards provide no +3 bonus for 1 turn.',
    mechanic: { type: 'no_procedure_bonus', blockedCategories: ['Forensics', 'Network'], duration: 1 }
  },
  {
    id: 'inj-9',
    type: CARD_TYPES.INJECT,
    title: 'Third-Party Vendor Alert',
    description: 'An external MSSP flagged compromised credentials associated with your primary gateway.',
    effect: '+2 roll bonus on next turn.',
    mechanic: { type: 'roll_modifier', rollPenalty: 2, duration: 1 }
  },
  {
    id: 'inj-10',
    type: CARD_TYPES.INJECT,
    title: 'Ransom Note Discovered / Encryption Threat',
    description: 'A countdown ransom note (.txt/.html) was discovered on an internal file server. Time is running out.',
    effect: 'Success threshold raised to 13+ for 1 turn (high urgency & panic).',
    mechanic: { type: 'threshold_modifier', thresholdDelta: 2, duration: 1 }
  }
];

// DECK ARCHITECTURE & DECK REGISTRY

export const CORE_DECK = {
  id: 'core-bnh',
  name: 'Backdoors & Breaches Core Deck',
  shortName: 'Core Deck',
  version: '1.0',
  author: 'Black Hills Information Security',
  description: 'The official 52-card Core Set from BHIS featuring 10 Initial Compromises, 10 Pivots, 10 Persistences, 10 C2s, 20 Procedures, and 10 Injects.',
  cards: {
    [CARD_TYPES.INITIAL]: INITIAL_COMPROMISE_CARDS,
    [CARD_TYPES.PIVOT]: PIVOT_ESCALATE_CARDS,
    [CARD_TYPES.PERSISTENCE]: PERSISTENCE_CARDS,
    [CARD_TYPES.C2]: C2_EXFIL_CARDS,
    [CARD_TYPES.PROCEDURE]: PROCEDURE_CARDS,
    [CARD_TYPES.INJECT]: INJECT_CARDS
  }
};

export const DECKS = {
  'core-bnh': CORE_DECK
};

export const AVAILABLE_DECKS = [
  {
    id: 'core-bnh',
    name: 'Backdoors & Breaches Core Deck',
    shortName: 'Core Deck',
    isAvailable: true,
    cardCount: INITIAL_COMPROMISE_CARDS.length + PIVOT_ESCALATE_CARDS.length + PERSISTENCE_CARDS.length + C2_EXFIL_CARDS.length + PROCEDURE_CARDS.length + INJECT_CARDS.length,
    description: 'The official standard Core Set from BHIS featuring 10 Initial Compromises, 10 Pivots, 10 Persistences, 10 C2s, 20 Procedures, and 10 Injects.'
  },
  {
    id: 'cloud-expansion',
    name: 'Cloud & Kubernetes Expansion (Coming Soon)',
    shortName: 'Cloud Deck',
    isAvailable: false,
    cardCount: 52,
    description: 'Cloud IAM exploits, S3 leaks, container escapes, and cloud-native security procedures.'
  },
  {
    id: 'ot-ics-expansion',
    name: 'OT / ICS Infrastructure Expansion (Coming Soon)',
    shortName: 'OT/ICS Deck',
    isAvailable: false,
    cardCount: 52,
    description: 'Industrial SCADA breaches, PLC compromise, protocol manipulation, and physical plant injects.'
  }
];

export const DEFAULT_DECK_ID = 'core-bnh';

export function getDeck(deckId = DEFAULT_DECK_ID) {
  return DECKS[deckId] || CORE_DECK;
}
