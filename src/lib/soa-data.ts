// Security Operations Architecture (SOA) mind map data
// Source: Joshua C. Geno, CC BY-SA 4.0

export type SoaItem = {
  id: string
  name: string
  description: string
  subtopics?: SoaSubtopic[]
}

export type SoaSubtopic = {
  name: string
  description: string
}

export type SoaCategory = {
  id: string
  label: string
  color: string
  items: SoaItem[]
}

export const SOA_CATEGORIES: SoaCategory[] = [
  {
    id: 'network',
    label: 'Network',
    color: 'text-green-400',
    items: [
      {
        id: 'net-secure-file',
        name: 'Secure File Exchange/Storage',
        description: 'Platforms and protocols for securely transferring and storing files between users and systems, ensuring confidentiality and integrity in transit and at rest.',
        subtopics: [
          { name: 'Protocol', description: 'Secure transfer protocols such as SFTP, FTPS, and AS2 that encrypt file data during transmission.' },
          { name: 'Encryption/DRM', description: 'Encryption and Digital Rights Management applied to files to prevent unauthorized access or redistribution.' },
          { name: 'Cloud/Intermediary', description: 'Cloud-based or broker services that facilitate secure file exchange between parties without direct connections.' },
        ],
      },
      {
        id: 'net-monitoring',
        name: 'Monitoring',
        description: 'Continuous observation of network traffic and activity to detect anomalies, performance issues, and security events.',
        subtopics: [
          { name: 'Internal', description: 'Monitoring of traffic and behavior within the internal network, including east-west traffic between systems.' },
          { name: 'External', description: 'Monitoring of inbound and outbound traffic at the network edge and beyond.' },
          { name: 'AI/Correlated/Analytics', description: 'Machine learning and correlation engines that analyze traffic patterns to surface threats not visible through signature matching alone.' },
          { name: 'Virtual/SDN', description: 'Monitoring of virtualized and software-defined network environments where traditional packet capture may not apply.' },
        ],
      },
      {
        id: 'net-secure-access',
        name: 'Secure Access',
        description: 'Technologies that enforce authenticated, encrypted, and policy-compliant access to network resources for users and systems.',
        subtopics: [
          { name: 'Endpoint', description: 'VPN, ZTNA, or NAC solutions that gate endpoint access to the network based on device posture and identity.' },
          { name: 'Net2Net', description: 'Site-to-site or network-to-network secure tunnels, such as IPsec VPNs, linking branch offices or cloud environments.' },
          { name: 'Application', description: 'Application-layer access controls such as ZTNA proxies that expose specific applications rather than network segments.' },
        ],
      },
      {
        id: 'net-ddos',
        name: 'DDoS',
        description: 'Defenses against Distributed Denial of Service attacks that aim to exhaust network or application resources.',
        subtopics: [
          { name: 'Volumetric', description: 'Mitigation of high-bandwidth flood attacks (UDP/ICMP floods) that saturate upstream network links.' },
          { name: 'Layer 3', description: 'Network-layer attack mitigation targeting IP routing and infrastructure protocols.' },
          { name: 'Layer 7', description: 'Application-layer DDoS mitigation targeting HTTP/S endpoints with low-and-slow or request flood attacks.' },
          { name: 'Cloud/API', description: 'Cloud-based scrubbing centers and API protection services that absorb or filter DDoS traffic before it reaches the origin.' },
        ],
      },
      {
        id: 'net-deception',
        name: 'Deception',
        description: 'Technologies that plant decoy assets throughout the network to detect, study, and redirect attackers away from real resources.',
        subtopics: [
          { name: 'Integration/Automation', description: 'Automated orchestration that connects deception alerts to SIEMs, SOARs, and blocking controls for faster response.' },
          { name: 'HoneyPots', description: 'Decoy systems that mimic real hosts to attract and identify attackers probing the network.' },
          { name: 'HoneyNets', description: 'Full decoy network segments used to study attacker behavior in a contained environment.' },
          { name: 'HoneyCredentials', description: 'Fake credentials planted in memory or files to detect credential theft and lateral movement attempts.' },
          { name: 'Cloud', description: 'Deception assets deployed in cloud environments to detect threats targeting cloud-hosted workloads.' },
        ],
      },
      {
        id: 'net-infrastructure',
        name: 'Infrastructure',
        description: 'The foundational physical and logical components that carry and route network traffic securely.',
        subtopics: [
          { name: 'Hardware (NAC)', description: 'Physical network access control appliances that enforce policy at the port level for wired and wireless connections.' },
          { name: 'Protocol (DNS, OSPF, BGP)', description: 'Hardening and monitoring of core routing and name resolution protocols to prevent hijacking and poisoning attacks.' },
          { name: 'Packet Broker', description: 'Network packet brokers that aggregate, filter, and distribute traffic to monitoring and security tools without impacting production flows.' },
          { name: 'Virtual/SDN/Micro-segmentation', description: 'Software-defined networking and micro-segmentation to isolate workloads and enforce least-privilege traffic policies.' },
        ],
      },
      {
        id: 'net-email',
        name: 'Email',
        description: 'Security controls protecting the email channel from phishing, malware delivery, spoofing, and data exfiltration.',
        subtopics: [
          { name: 'Filtering', description: 'Inbound and outbound email filtering for spam, malware, phishing links, and malicious attachments.' },
          { name: 'DMARC', description: 'Domain-based Message Authentication, Reporting, and Conformance policies that prevent domain spoofing and email impersonation.' },
          { name: 'Cloud/aaS', description: 'Cloud-delivered email security services (SEG) that sit in front of or alongside cloud mail platforms like M365 and Google Workspace.' },
          { name: 'Infrastructure Protection', description: 'Hardening of mail server infrastructure including TLS enforcement, relay restrictions, and secure DNS records (SPF, DKIM).' },
        ],
      },
      {
        id: 'net-capki',
        name: 'CA/PKI',
        description: 'Certificate Authority and Public Key Infrastructure systems that issue and manage digital certificates for authentication and encryption.',
        subtopics: [
          { name: 'Internal', description: 'Private CA infrastructure for issuing certificates to internal systems, users, and services.' },
          { name: 'Automatic Provisioning', description: 'Automated certificate lifecycle management (ACME, SCEP) to eliminate manual renewals and reduce outages.' },
          { name: 'External', description: 'Publicly trusted CA certificates for externally facing services and TLS inspection.' },
        ],
      },
      {
        id: 'net-cloud-vendor',
        name: 'Cloud/Vendor Security',
        description: 'Security controls governing the use of cloud services and third-party vendors, ensuring shared responsibility obligations are met.',
        subtopics: [
          { name: 'Containers', description: 'Security controls for containerized workloads including image scanning, runtime protection, and network policy enforcement.' },
          { name: 'Virtualization', description: 'Hypervisor and VM-level security controls to prevent escape attacks and enforce isolation between virtual workloads.' },
          { name: 'Compliance', description: 'Cloud compliance tooling that continuously checks configurations against frameworks like CIS, NIST, and PCI DSS.' },
          { name: '3rd Party/VPC', description: 'Security posture management for third-party connections and Virtual Private Cloud configurations.' },
          { name: 'CASB', description: 'Cloud Access Security Broker that enforces policies for sanctioned and unsanctioned cloud service usage, providing visibility and DLP in the cloud.' },
        ],
      },
    ],
  },
  {
    id: 'perimeter',
    label: 'Perimeter',
    color: 'text-red-400',
    items: [
      {
        id: 'per-firewall',
        name: 'Firewall & Outbound',
        description: 'Network firewalls that enforce access control policies between network segments and control outbound traffic to prevent data exfiltration and C2 communication.',
        subtopics: [
          { name: 'Layer 3', description: 'Packet-filtering firewalls that enforce rules based on IP addresses and ports.' },
          { name: 'Layer 7', description: 'Next-generation firewalls (NGFW) with application awareness and deep packet inspection.' },
          { name: 'Virtual/SDN/Cloud', description: 'Software-defined and cloud-native firewall instances for dynamic, scalable perimeter enforcement.' },
          { name: 'Endpoint', description: 'Host-based firewalls on individual endpoints to control local inbound and outbound traffic.' },
        ],
      },
      {
        id: 'per-ips',
        name: 'IPS/IDS/NGIPS',
        description: 'Intrusion Prevention and Detection Systems that monitor traffic for known attack patterns and anomalous behavior, blocking or alerting on threats.',
        subtopics: [
          { name: 'Signature', description: 'Pattern-matching detection using known threat signatures from threat intelligence feeds.' },
          { name: 'Behavior', description: 'Anomaly and heuristic detection that identifies deviations from baseline traffic patterns.' },
          { name: 'Deception', description: 'IPS/IDS integration with deception technologies to trigger alerts when decoy assets are accessed.' },
        ],
      },
      {
        id: 'per-wsg',
        name: 'Web Security Gateway',
        description: 'Secure web gateways that proxy and inspect outbound web traffic to enforce acceptable use policies and block malicious content.',
        subtopics: [
          { name: 'Enterprise', description: 'On-premises or private cloud web proxy appliances for centralized outbound filtering.' },
          { name: 'Cloud', description: 'Cloud-delivered SWG (SSE) that protects users regardless of network location, including remote workers.' },
        ],
      },
      {
        id: 'per-fraud',
        name: 'Fraud Prevention',
        description: 'Controls that detect and prevent fraudulent transactions, account takeovers, and identity abuse targeting the organization or its customers.',
        subtopics: [
          { name: 'Anti-fraud', description: 'Dedicated fraud detection engines that score transactions and flag suspicious activity in real time.' },
          { name: 'Integrated', description: 'Fraud controls embedded directly into application workflows and authentication flows.' },
          { name: 'Analytics', description: 'Behavioral analytics and ML models that identify fraud patterns across large datasets.' },
        ],
      },
      {
        id: 'per-nac',
        name: 'NAC',
        description: 'Network Access Control enforces security policy compliance before granting devices access to the network.',
        subtopics: [
          { name: 'Enterprise', description: 'Full-featured NAC platforms for wired and wireless enterprise environments with posture assessment and quarantine.' },
          { name: 'Cloud/Virtual', description: 'Cloud-delivered or virtualized NAC for dynamic and cloud-connected environments.' },
          { name: 'Mobile', description: 'NAC controls specific to mobile device access, often integrated with MDM/UEM solutions.' },
        ],
      },
      {
        id: 'per-utm',
        name: 'Unified Threat Management',
        description: 'All-in-one security appliances that combine firewall, IPS, web filtering, antivirus, and VPN into a single platform.',
        subtopics: [
          { name: 'Enterprise', description: 'High-capacity UTM platforms for large enterprise deployments.' },
          { name: 'Cloud', description: 'Cloud-based UTM services offering consolidated threat management without on-premises hardware.' },
        ],
      },
      {
        id: 'per-dlp',
        name: 'DLP',
        description: 'Data Loss Prevention technologies that detect and block unauthorized transmission of sensitive data outside the organization.',
        subtopics: [
          { name: 'Basic Keywords', description: 'Pattern and keyword matching to detect known sensitive data types (SSN, credit card numbers) in outbound traffic.' },
          { name: 'Content Discovery/Tagging', description: 'Deep content inspection and classification that identifies sensitive data by context, not just pattern.' },
          { name: 'Cloud/Virtual/CASB', description: 'DLP enforcement extended into cloud applications and SaaS platforms via CASB integration.' },
          { name: 'API/In App', description: 'DLP controls embedded at the application or API layer to prevent sensitive data from leaving via APIs.' },
        ],
      },
      {
        id: 'per-waf',
        name: 'WAF',
        description: 'Web Application Firewalls that inspect HTTP/S traffic to protect web applications from OWASP Top 10 attacks and other exploits.',
        subtopics: [
          { name: 'Application', description: 'WAF rules tailored to the specific application being protected, reducing false positives.' },
          { name: 'Appliance', description: 'Dedicated hardware or virtual WAF appliances deployed inline or out-of-band.' },
          { name: 'Cloud/Virtual', description: 'Cloud-delivered WAF services (CDN-integrated) for internet-facing applications.' },
        ],
      },
    ],
  },
  {
    id: 'endpoint',
    label: 'Endpoint',
    color: 'text-blue-400',
    items: [
      {
        id: 'end-av',
        name: 'Anti-Virus/Malware',
        description: 'Host-based controls that detect and block malicious software including viruses, ransomware, trojans, and spyware.',
        subtopics: [
          { name: 'Signature', description: 'Hash and signature-based detection of known malware using continuously updated definitions.' },
          { name: 'Behavior', description: 'Heuristic and behavioral analysis that detects malware by what it does rather than what it looks like.' },
          { name: 'Dynamic', description: 'Sandboxing and dynamic analysis that executes suspicious code in isolation to observe its behavior.' },
        ],
      },
      {
        id: 'end-epp',
        name: 'Endpoint Sec. Suites',
        description: 'Integrated endpoint protection platforms (EPP/EDR/XDR) combining prevention, detection, and response capabilities in a single agent.',
        subtopics: [
          { name: 'Traditional', description: 'Classic EPP suites providing antivirus, firewall, and basic behavioral protection for desktops and servers.' },
          { name: 'Mobile', description: 'Mobile Threat Defense (MTD) agents for iOS and Android that detect mobile-specific threats.' },
          { name: 'Cloud/Virtual', description: 'Lightweight agents optimized for cloud workloads and VDI environments.' },
        ],
      },
      {
        id: 'end-hardware',
        name: 'Hardware/Embedded',
        description: 'Security controls built into hardware and firmware layers, establishing a root of trust below the operating system.',
        subtopics: [
          { name: 'Trusted Execution', description: 'Secure enclaves (Intel SGX, ARM TrustZone) that protect code and data from the OS and hypervisor.' },
          { name: 'Trusted Platform', description: 'TPM chips and Secure Boot that verify firmware and OS integrity at startup.' },
          { name: 'IoT/Embedded Devices', description: 'Security controls for embedded systems with constrained resources where full OS-based agents cannot run.' },
        ],
      },
      {
        id: 'end-mfa',
        name: 'Multi-Factor Auth.',
        description: 'Authentication mechanisms that require two or more verification factors, significantly reducing the risk of credential-based attacks.',
        subtopics: [
          { name: 'Factors', description: 'The range of MFA factor types: hardware tokens, TOTP, push notifications, biometrics, and passkeys.' },
          { name: 'Integration/Federation', description: 'MFA integrated with identity providers and federated into applications via SAML, OIDC, and RADIUS.' },
        ],
      },
      {
        id: 'end-voice',
        name: 'Voice Sec.',
        description: 'Security controls protecting voice communications from eavesdropping, toll fraud, vishing, and VoIP-specific attacks.',
        subtopics: [
          { name: 'Mobile', description: 'Encryption and authentication controls for mobile voice communications.' },
          { name: 'Application', description: 'Application-layer VoIP security including SIP protocol hardening and encrypted calling apps.' },
          { name: 'Infrastructure', description: 'Security of PBX and UC infrastructure including session border controllers and signaling encryption.' },
        ],
      },
      {
        id: 'end-iot',
        name: 'IoT/SCADA/ICS',
        description: 'Security for operational technology, industrial control systems, and IoT devices that manage physical processes and critical infrastructure.',
        subtopics: [
          { name: 'Architecture', description: 'OT/ICS security architecture including network segmentation between IT and OT zones (Purdue model).' },
          { name: 'SD-LAN (Wired & Wireless)', description: 'Software-defined LAN segmentation to isolate IoT and OT devices from the rest of the network.' },
          { name: 'Integration', description: 'Security integration between OT systems and enterprise IT security tools like SIEMs and vulnerability scanners.' },
        ],
      },
      {
        id: 'end-mobile',
        name: 'Mobile Sec. Suites',
        description: 'Comprehensive mobile security solutions covering device management, application security, and communications protection for smartphones and tablets.',
        subtopics: [
          { name: 'Device Security', description: 'MDM/UEM enrollment, remote wipe, PIN enforcement, and device posture checks.' },
          { name: 'App/Data Security', description: 'MAM controls, app wrapping, and containerization to separate corporate and personal data.' },
          { name: 'Communications Security', description: 'Encrypted messaging, VPN, and secure email clients for mobile workers.' },
        ],
      },
      {
        id: 'end-mainframe',
        name: 'Mainframe/Midrange',
        description: 'Security controls specific to mainframe and midrange computing environments that often run legacy workloads with unique security requirements.',
        subtopics: [
          { name: 'Legacy Device Security', description: 'Controls for aging systems that cannot run modern agents, including network isolation and compensating controls.' },
          { name: 'Security Suites', description: 'Mainframe-native security products (RACF, ACF2, TopSecret) that enforce access control and audit logging.' },
        ],
      },
      {
        id: 'end-hardening',
        name: 'Secure Config/Hardening',
        description: 'The process of reducing the attack surface of systems by removing unnecessary services, applying security baselines, and patching vulnerabilities.',
        subtopics: [
          { name: 'Baseline Scans/Manual Remediation', description: 'Periodic configuration assessment against CIS Benchmarks or STIG baselines with manual remediation of findings.' },
          { name: 'Continuous Hardening/Automatic Remediation', description: 'Automated drift detection and remediation using tools like Ansible, Chef, or Puppet to maintain hardened state.' },
        ],
      },
      {
        id: 'end-pwdmgmt',
        name: 'Password/Privilege/Identity Management',
        description: 'Integrated management of credentials, privileged access, and identities across the enterprise to enforce least privilege and prevent credential abuse.',
        subtopics: [
          { name: 'Password Management', description: 'Enterprise password vaults and managers that store, rotate, and audit credential usage.' },
          { name: 'Privilege Management', description: 'PAM solutions that control and session-record privileged access to critical systems.' },
          { name: 'Identity Management', description: 'Identity lifecycle management including provisioning, deprovisioning, and role management.' },
        ],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    color: 'text-purple-400',
    items: [
      {
        id: 'dat-appsec',
        name: 'Application Sec.',
        description: 'Security practices and tools applied throughout the software development lifecycle to identify and remediate vulnerabilities before and after deployment.',
        subtopics: [
          { name: 'Enterprise', description: 'SAST, DAST, SCA, and IAST tools integrated into enterprise CI/CD pipelines for continuous security testing.' },
          { name: 'Mobile', description: 'Mobile application security testing (MAST) and app store monitoring for vulnerable or malicious mobile apps.' },
          { name: 'Cloud/aaS', description: 'Cloud-native application security including serverless function scanning and container image analysis.' },
        ],
      },
      {
        id: 'dat-destruction',
        name: 'Data Destruction',
        description: 'Processes and technologies that ensure sensitive data is permanently and verifiably destroyed when no longer needed, preventing recovery.',
        subtopics: [
          { name: 'Retention/Destruction/Discovery', description: 'Automated policies that enforce data retention schedules and trigger secure deletion when data reaches end-of-life.' },
          { name: 'External Providers', description: 'Certified third-party data destruction and media sanitization services with chain-of-custody documentation.' },
        ],
      },
      {
        id: 'dat-compliance',
        name: 'Compliance Frameworks',
        description: 'Structured sets of controls and requirements used to measure and improve an organization\'s security and privacy posture against recognized standards.',
        subtopics: [
          { name: 'Intl./Federal/State Frameworks', description: 'Regulatory frameworks such as HIPAA, GDPR, FedRAMP, CMMC, and state privacy laws (CCPA, SHIELD).' },
          { name: 'Industry Frameworks', description: 'Industry-specific standards such as PCI DSS, HITRUST CSF, SOC 2, and ISO 27001.' },
          { name: 'Consultants/Assessors/Registrars', description: 'Third-party QSAs, auditors, and certification bodies that assess and certify compliance.' },
        ],
      },
      {
        id: 'dat-vuln',
        name: 'Vulnerability Mgt.',
        description: 'The continuous process of identifying, prioritizing, and remediating vulnerabilities across all systems before they can be exploited.',
        subtopics: [
          { name: 'Enterprise', description: 'Agent-based and agentless vulnerability scanning across on-premises infrastructure and workstations.' },
          { name: 'Cloud/aaS', description: 'Cloud-native vulnerability management that covers cloud workloads, containers, and serverless functions.' },
          { name: 'Integration - Vuln./Patch Management', description: 'Integration between vulnerability scanners and patch management systems to automate remediation workflows.' },
        ],
      },
      {
        id: 'dat-ip',
        name: 'Content/Intellectual Property Protection',
        description: 'Controls that prevent unauthorized copying, distribution, or theft of proprietary content, source code, and intellectual property.',
        subtopics: [
          { name: 'DRM', description: 'Digital Rights Management systems that cryptographically bind usage rights to content, preventing unauthorized access or redistribution.' },
          { name: 'Protection Providers', description: 'Services that monitor for IP theft, piracy, and unauthorized use of proprietary content across the internet and dark web.' },
        ],
      },
      {
        id: 'dat-iam',
        name: 'Identity/Access Management',
        description: 'The framework of policies and technologies that ensure only authorized users access the right resources at the right time.',
        subtopics: [
          { name: 'Identity Management', description: 'Lifecycle management of digital identities including creation, modification, and deprovisioning.' },
          { name: 'Access Management', description: 'SSO, MFA, and policy enforcement that governs how authenticated identities access systems and data.' },
          { name: 'Federated Identity', description: 'Cross-domain identity federation via SAML, OIDC, and OAuth enabling seamless access across organizational boundaries.' },
          { name: 'Privileged Identity Management/Governance', description: 'Governance and oversight of privileged accounts, including just-in-time access and access certification campaigns.' },
        ],
      },
      {
        id: 'dat-forensics',
        name: 'Forensics',
        description: 'The collection, preservation, and analysis of digital evidence to support incident investigations and legal proceedings.',
        subtopics: [
          { name: 'Internal', description: 'In-house forensic capabilities including disk imaging, memory analysis, and log preservation.' },
          { name: 'External/Cloud', description: 'Third-party forensic services and cloud-native forensic tools for investigating cloud incidents.' },
          { name: 'Proactive', description: 'Proactive forensic readiness including pre-configured logging, evidence collection policies, and legal hold procedures.' },
          { name: 'Reactive', description: 'Reactive forensic investigation triggered after an incident to determine scope, attribution, and impact.' },
        ],
      },
      {
        id: 'dat-encryption',
        name: 'Encryption',
        description: 'Cryptographic controls that protect data confidentiality and integrity across storage, transmission, and communication channels.',
        subtopics: [
          { name: 'At-Rest', description: 'Encryption of stored data on disks, databases, and file systems (AES-256, TDE) to protect against physical theft and unauthorized access.' },
          { name: 'In-Motion', description: 'Encryption of data in transit using TLS/SSL, IPsec, and other transport-layer protocols.' },
          { name: 'Voice/Video/RTSP', description: 'End-to-end encryption for real-time audio, video, and streaming media communications.' },
          { name: 'Cloud', description: 'Cloud encryption including BYOK (Bring Your Own Key) and HYOK (Hold Your Own Key) for sensitive cloud-stored data.' },
        ],
      },
      {
        id: 'dat-fim',
        name: 'File Integrity Monitoring',
        description: 'Continuous monitoring of critical system files, directories, and registry keys to detect unauthorized changes that may indicate compromise.',
        subtopics: [
          { name: 'Change Logging', description: 'Recording all changes to monitored files with timestamps and user attribution for audit trails.' },
          { name: 'Change Auditing', description: 'Review and alerting on changes to critical files against an approved baseline.' },
          { name: 'Endpoint Detection & Response', description: 'EDR integration with FIM to correlate file changes with process activity for richer threat context.' },
        ],
      },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    color: 'text-orange-400',
    items: [
      {
        id: 'gov-ti',
        name: 'Threat Intelligence',
        description: 'The collection and analysis of information about current and emerging threats to inform defensive decisions and prioritize security investments.',
        subtopics: [
          { name: 'Passive', description: 'Consumption of third-party threat feeds, ISACs, and commercial intelligence without active engagement.' },
          { name: 'Active', description: 'Active intelligence gathering through hunting, dark web monitoring, and adversary tracking.' },
          { name: 'Integrated', description: 'Threat intelligence operationalized into SIEM rules, firewall blocks, and SOAR playbooks in real time.' },
        ],
      },
      {
        id: 'gov-ir',
        name: 'Incident Response',
        description: 'The structured process for detecting, containing, eradicating, and recovering from security incidents while preserving evidence.',
        subtopics: [
          { name: 'Response (non-integrated)', description: 'Manual incident response processes driven by runbooks and playbooks without tool automation.' },
          { name: 'Workflow Support', description: 'Ticketing and case management tools that track incident status, tasks, and communications.' },
          { name: 'Integrated Response and Workflow (SOAR)', description: 'Security Orchestration, Automation, and Response platforms that automate containment and enrichment actions.' },
          { name: 'Threat Hunting', description: 'Proactive searches through data to find hidden threats that evade automated detection.' },
        ],
      },
      {
        id: 'gov-analytics',
        name: 'Sec. Analytics',
        description: 'Advanced analysis of security event data to identify threats, understand attacker behavior, and reduce false positive fatigue.',
        subtopics: [
          { name: 'Traditional (post-event)', description: 'Retrospective log analysis and correlation to understand what happened after an event is detected.' },
          { name: 'Advanced Analysis (predictive)', description: 'Statistical and ML models that predict future attack paths based on historical patterns.' },
          { name: 'AI/Cognitive', description: 'AI-driven analysis that learns normal behavior and flags deviations without explicit rule definition.' },
          { name: 'Connectors/Integrations', description: 'Data pipelines and APIs that pull telemetry from endpoints, network, cloud, and applications into the analytics platform.' },
          { name: 'User Behavior Analytics', description: 'UEBA tools that baseline normal user activity and alert on anomalous behavior indicative of insider threats or account compromise.' },
        ],
      },
      {
        id: 'gov-insurance',
        name: 'Cyber Insurance',
        description: 'Financial risk transfer mechanisms that provide coverage for costs associated with cyber incidents including breach response, liability, and business interruption.',
        subtopics: [
          { name: 'Insurance', description: 'First-party cyber insurance covering direct costs: incident response, notification, forensics, and business interruption.' },
          { name: 'Cyber Risk Transfer', description: 'Risk transfer mechanisms including contractual liability clauses and third-party indemnification.' },
        ],
      },
      {
        id: 'gov-brand',
        name: 'Brand/Reputation Protection',
        description: 'Monitoring and defensive actions to protect the organization\'s brand identity and reputation from cyber-enabled attacks.',
        subtopics: [
          { name: 'Brand/IP Monitoring', description: 'Continuous monitoring for trademark abuse, counterfeit websites, and unauthorized use of brand assets online.' },
          { name: 'Domain Management', description: 'Defensive domain registration, typosquat monitoring, and takedown services for fraudulent lookalike domains.' },
        ],
      },
      {
        id: 'gov-grc',
        name: 'GRC Suite',
        description: 'Governance, Risk, and Compliance platforms that centralize policy management, risk tracking, audit workflows, and compliance reporting.',
        subtopics: [
          { name: 'Compliance', description: 'Compliance management modules that map controls to frameworks, track evidence, and manage assessments.' },
          { name: 'Automation/WorkFlow', description: 'Automated workflows for risk assessments, policy acknowledgments, and exception management.' },
          { name: 'Cloud Hosted', description: 'SaaS GRC platforms that eliminate on-premises infrastructure while providing scalable compliance management.' },
          { name: 'Analytics', description: 'Risk dashboards and reporting analytics that provide executive visibility into compliance posture and residual risk.' },
        ],
      },
      {
        id: 'gov-pentest',
        name: 'Penetration Testing',
        description: 'Authorized simulated attacks against systems and applications to identify exploitable vulnerabilities before real attackers do.',
        subtopics: [
          { name: 'Ethical Hacking', description: 'Manual penetration testing by skilled security professionals simulating advanced adversary techniques.' },
          { name: 'Automated Tools', description: 'Automated scanning and exploitation tools (Nessus, Metasploit, Burp Suite) used in testing engagements.' },
        ],
      },
      {
        id: 'gov-siem',
        name: 'SIEM',
        description: 'Security Information and Event Management platforms that aggregate, correlate, and alert on log and event data from across the environment.',
        subtopics: [
          { name: 'Standard', description: 'On-premises SIEM deployments for organizations requiring data residency or air-gapped environments.' },
          { name: 'Virtual/Cloud', description: 'Cloud-native SIEM platforms (Microsoft Sentinel, Chronicle, Splunk Cloud) offering elastic scaling.' },
          { name: 'Connectors/Integrations', description: 'Data source connectors that ingest logs from firewalls, endpoints, cloud platforms, and applications.' },
          { name: 'Intelligence Exchange', description: 'Threat intelligence feeds integrated into the SIEM to enrich alerts with IOC context.' },
          { name: 'External Workflow Support', description: 'SIEM integration with ticketing systems, SOAR platforms, and communication tools for streamlined response.' },
        ],
      },
      {
        id: 'gov-insider',
        name: 'Insider Threat',
        description: 'Programs and technologies designed to detect and prevent malicious or negligent actions by employees, contractors, and trusted users.',
        subtopics: [
          { name: 'Detection (Analytics)', description: 'UEBA and behavioral analytics that identify anomalous data access, exfiltration attempts, and policy violations by insiders.' },
          { name: 'Prevention', description: 'DLP, PAM, and access controls that limit what insiders can access and take, reducing the blast radius of insider incidents.' },
        ],
      },
      {
        id: 'gov-bas',
        name: 'Breach and Attack Simulation',
        description: 'Continuous automated testing of security controls by simulating real-world attack techniques to validate that defenses work as expected.',
        subtopics: [
          { name: 'People Attacks', description: 'Simulated phishing and social engineering campaigns that measure employee susceptibility and training effectiveness.' },
          { name: 'Process/Procedure Attacks', description: 'Testing of incident response processes, escalation paths, and procedural controls under simulated attack conditions.' },
          { name: 'Technology Attacks', description: 'Automated simulation of malware execution, lateral movement, and data exfiltration to validate technical controls.' },
        ],
      },
      {
        id: 'gov-bounty',
        name: 'Bounty Support',
        description: 'Structured programs that invite external security researchers to find and responsibly disclose vulnerabilities in exchange for recognition or financial rewards.',
        subtopics: [
          { name: 'Disclosure', description: 'Coordinated vulnerability disclosure (CVD) policies and processes that define how external researchers report findings.' },
          { name: 'Reimbursement', description: 'Bug bounty reward structures and platforms (HackerOne, Bugcrowd) that incentivize quality vulnerability research.' },
        ],
      },
    ],
  },
  {
    id: 'force-multipliers',
    label: 'Force Multipliers',
    color: 'text-zinc-300',
    items: [
      {
        id: 'fm-vars',
        name: 'Value Added Resellers',
        description: 'Technology partners that bundle vendor products with professional services, configuration, and support to deliver complete security solutions.',
      },
      {
        id: 'fm-rd',
        name: 'Research & Development',
        description: 'Internal and collaborative security R&D that advances defensive capabilities, develops new detection methods, and builds proprietary tooling.',
      },
      {
        id: 'fm-complexity',
        name: 'Complexity Reduction',
        description: 'Strategic efforts to consolidate tools, simplify architectures, and reduce the number of disparate security products to improve visibility and reduce operational burden.',
      },
      {
        id: 'fm-analysis',
        name: 'Sec. Industry Analysis',
        description: 'Continuous monitoring of the security vendor landscape, analyst reports (Gartner, Forrester), and peer benchmarking to inform investment decisions.',
      },
      {
        id: 'fm-mss',
        name: 'Managed Security Services',
        description: 'Outsourced security operations including MDR, MSSP, and SOC-as-a-service that extend in-house team capabilities with 24/7 monitoring and response.',
      },
      {
        id: 'fm-recruiting',
        name: 'Recruiting/Internships/Succession Planning',
        description: 'Programs to attract, develop, and retain security talent including internship pipelines, university partnerships, and leadership succession planning.',
      },
      {
        id: 'fm-consulting',
        name: 'Consulting/Professional Services',
        description: 'Specialized security consulting engagements for strategy, architecture reviews, assessments, and project-based implementation support.',
      },
      {
        id: 'fm-training',
        name: 'Training/Conferences',
        description: 'Continuous education for the security team through certifications, hands-on training platforms, and industry conferences (RSA, Black Hat, DEF CON).',
      },
      {
        id: 'fm-iarm',
        name: 'Information Assurance/Risk Management',
        description: 'Enterprise risk management programs that identify, assess, and treat information security risks in alignment with business objectives and regulatory requirements.',
      },
    ],
  },
]
