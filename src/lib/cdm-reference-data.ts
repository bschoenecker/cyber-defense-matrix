export type CdmSuggestion = {
  title: string
  description: string
  tool?: string
}

const data: Record<string, CdmSuggestion[]> = {

  // ─── DEVICES ────────────────────────────────────────────────────────────────

  DEVICES_IDENTIFY: [
    { title: 'Asset Inventory / CMDB', description: 'Maintain a complete record of all devices including hardware type, OS version, owner, and location.', tool: 'Lansweeper, ServiceNow CMDB, Axonius' },
    { title: 'Vulnerability Scanning', description: 'Regularly scan endpoints for known CVEs, missing patches, and misconfigured settings.', tool: 'Tenable Nessus, Qualys, Rapid7 InsightVM' },
    { title: 'Network-based Device Discovery', description: 'Passively or actively discover all devices connecting to the network, including unmanaged and IoT devices.', tool: 'Nmap, Forescout, Claroty' },
    { title: 'Hardware Asset Tracking', description: 'Track physical asset lifecycle from procurement to decommission, including serial numbers and locations.', tool: 'Snipe-IT, Asset Panda' },
    { title: 'OS & Firmware Inventory', description: 'Catalogue all operating system versions and firmware levels across the device estate.', tool: 'Microsoft Defender for Endpoint, Tanium' },
    { title: 'Configuration Baseline Assessment', description: 'Compare current device configurations against a hardened security baseline (e.g. CIS Benchmarks).', tool: 'CIS-CAT, Chef InSpec' },
    { title: 'IoT / OT Device Discovery', description: 'Identify and classify operational technology and IoT devices that may not support traditional agents.', tool: 'Claroty, Dragos, Nozomi Networks' },
  ],

  DEVICES_PROTECT: [
    { title: 'Endpoint Protection Platform (EPP)', description: 'Prevent known malware and threats from executing on endpoints using signature and heuristic detection.', tool: 'Microsoft Defender, Symantec, Sophos Intercept X' },
    { title: 'Endpoint Detection & Response (EDR)', description: 'Monitor and record endpoint activity to detect, investigate, and contain advanced threats.', tool: 'CrowdStrike Falcon, SentinelOne, Carbon Black' },
    { title: 'Full Disk Encryption', description: 'Encrypt endpoint storage to protect data in the event of physical loss or theft.', tool: 'BitLocker, FileVault, VeraCrypt' },
    { title: 'Patch Management', description: 'Automate the deployment of OS and application security patches to reduce the exploit window.', tool: 'WSUS, Ivanti Patch, Qualys Patch Management' },
    { title: 'Application Allowlisting', description: 'Only permit approved applications to execute, blocking unknown or unauthorised binaries.', tool: 'ThreatLocker, AppLocker, Carbon Black App Control' },
    { title: 'Mobile Device Management (MDM)', description: 'Enforce security policies, remote wipe, and configuration management on mobile endpoints.', tool: 'Microsoft Intune, Jamf, VMware Workspace ONE' },
    { title: 'Host-based Firewall', description: 'Restrict inbound and outbound network connections at the endpoint level.', tool: 'Windows Defender Firewall, iptables' },
    { title: 'USB / Removable Media Control', description: 'Prevent unauthorised use of removable storage devices.', tool: 'ThreatLocker Storage Control, Symantec DLP' },
    { title: 'Secure Boot / UEFI Hardening', description: 'Enforce hardware-level boot integrity to prevent bootkits and firmware attacks.', tool: 'TPM 2.0, UEFI Secure Boot' },
  ],

  DEVICES_DETECT: [
    { title: 'EDR Threat Detection', description: 'Detect malware, ransomware, fileless attacks, and living-off-the-land techniques on endpoints in real time.', tool: 'CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint' },
    { title: 'File Integrity Monitoring (FIM)', description: 'Alert on unexpected changes to critical system files, binaries, and configurations.', tool: 'Tripwire, OSSEC, Qualys FIM' },
    { title: 'Endpoint Log Collection', description: 'Forward endpoint event logs (Windows Event Logs, Sysmon) to a SIEM for correlation.', tool: 'Sysmon, Splunk UF, Elastic Agent' },
    { title: 'Anti-malware Alerting', description: 'Generate alerts when malicious or suspicious files are detected or quarantined.', tool: 'Microsoft Defender, Malwarebytes' },
    { title: 'Behavioral Analytics on Endpoints', description: 'Detect anomalous process execution, privilege escalation, and lateral movement patterns.', tool: 'Cybereason, Vectra, Microsoft Defender XDR' },
    { title: 'Threat Hunting', description: 'Proactively search endpoint telemetry for indicators of compromise that automated tools may miss.', tool: 'CrowdStrike Falcon Overwatch, custom SIEM queries' },
  ],

  DEVICES_RESPOND: [
    { title: 'Endpoint Isolation / Quarantine', description: 'Immediately isolate a compromised device from the network to prevent lateral movement.', tool: 'CrowdStrike, SentinelOne, Microsoft Defender for Endpoint' },
    { title: 'Remote Wipe', description: 'Remotely erase a lost or compromised endpoint to prevent data exposure.', tool: 'Microsoft Intune, Jamf' },
    { title: 'Forensic Imaging', description: 'Capture a forensic copy of a compromised device for investigation without altering evidence.', tool: 'FTK Imager, Velociraptor, KAPE' },
    { title: 'Automated EDR Response Actions', description: 'Use EDR capabilities to automatically kill malicious processes, delete files, or block hashes.', tool: 'CrowdStrike Real-Time Response, SentinelOne' },
    { title: 'Endpoint Incident Response Playbooks', description: 'Documented procedures for triaging, containing, and eradicating threats on endpoints.', tool: 'SOAR platforms, Cortex XSOAR' },
    { title: 'SOAR-driven Endpoint Response', description: 'Orchestrate automated response actions across endpoints triggered by SIEM or EDR alerts.', tool: 'Palo Alto XSOAR, Splunk SOAR, Microsoft Sentinel' },
  ],

  DEVICES_RECOVER: [
    { title: 'System Imaging & Restore', description: 'Restore a compromised or failed endpoint from a known-good golden image.', tool: 'Clonezilla, Microsoft Deployment Toolkit, SCCM' },
    { title: 'Endpoint Backup & Recovery', description: 'Back up endpoint data and configurations to enable rapid restoration after an incident.', tool: 'Veeam, Acronis, Backblaze for Business' },
    { title: 'Golden Image Management', description: 'Maintain and version-control clean OS images for rapid re-provisioning of compromised systems.', tool: 'MDT, Packer, VMware vSphere templates' },
    { title: 'OS Reimaging Capability', description: 'Ability to wipe and reimage a device quickly as part of incident recovery.', tool: 'SCCM OSD, Autopilot, Jamf Re-enrollment' },
    { title: 'Hardware Replacement Process', description: 'Documented process to replace compromised hardware and restore the user to productivity.', tool: 'ITSM ticketing, spare asset pool' },
  ],

  // ─── APPLICATIONS ────────────────────────────────────────────────────────────

  APPLICATIONS_IDENTIFY: [
    { title: 'Application Inventory', description: 'Maintain a complete catalogue of all applications including version, owner, and hosting environment.', tool: 'ServiceNow, Axonius, Qualys CSAM' },
    { title: 'Static Application Security Testing (SAST)', description: 'Analyse source code for security vulnerabilities before deployment.', tool: 'Checkmarx, Veracode, Semgrep, SonarQube' },
    { title: 'Dynamic Application Security Testing (DAST)', description: 'Test running applications for vulnerabilities by simulating attacks against live endpoints.', tool: 'Burp Suite, OWASP ZAP, HCL AppScan' },
    { title: 'Software Composition Analysis (SCA)', description: 'Identify vulnerabilities in open-source and third-party dependencies.', tool: 'Snyk, Black Duck, OWASP Dependency-Check' },
    { title: 'API Discovery', description: 'Enumerate all internal and external APIs, including shadow and undocumented endpoints.', tool: 'Salt Security, Noname Security, Postman' },
    { title: 'Penetration Testing', description: 'Engage testers to attempt exploitation of application vulnerabilities in a controlled manner.', tool: 'Cobalt, Synack, internal red team' },
    { title: 'Attack Surface Management', description: 'Continuously discover and assess external-facing application assets for exposure.', tool: 'Censys, Shodan, Tenable Attack Surface Management' },
  ],

  APPLICATIONS_PROTECT: [
    { title: 'Web Application Firewall (WAF)', description: 'Filter and block malicious HTTP traffic targeting web applications including OWASP Top 10 attacks.', tool: 'AWS WAF, Cloudflare WAF, F5 Advanced WAF, Imperva' },
    { title: 'Runtime Application Self-Protection (RASP)', description: 'Detect and block attacks in real time from within the application runtime.', tool: 'Sqreen, Contrast Security, Waratek' },
    { title: 'API Gateway & Security', description: 'Enforce authentication, rate limiting, input validation, and schema enforcement on APIs.', tool: 'Kong, AWS API Gateway, Apigee' },
    { title: 'Secrets Management', description: 'Prevent hardcoded credentials and manage secrets rotation for applications.', tool: 'HashiCorp Vault, AWS Secrets Manager, Azure Key Vault' },
    { title: 'Container Image Scanning', description: 'Scan container images for known vulnerabilities before they are deployed.', tool: 'Trivy, Aqua Security, Sysdig, Snyk Container' },
    { title: 'Secure SDLC / DevSecOps', description: 'Integrate security controls into the development pipeline including code review, SAST, and DAST.', tool: 'GitLab CI, GitHub Actions, Jenkins with security plugins' },
    { title: 'Dependency Patching', description: 'Regularly update third-party libraries and frameworks to remediate known CVEs.', tool: 'Dependabot, Renovate, Snyk' },
    { title: 'Code Signing', description: 'Digitally sign application binaries and packages to ensure integrity.', tool: 'DigiCert, AWS Signer, GPG' },
  ],

  APPLICATIONS_DETECT: [
    { title: 'Application Performance Monitoring (APM) & Anomaly Detection', description: 'Monitor application behaviour for error spikes, unusual traffic patterns, and security anomalies.', tool: 'Datadog, Dynatrace, New Relic' },
    { title: 'WAF Alerting', description: 'Generate security alerts from WAF rules blocking or flagging suspicious requests.', tool: 'AWS WAF, Cloudflare, Imperva' },
    { title: 'Application Log Monitoring', description: 'Collect, centralise, and analyse application logs for security-relevant events.', tool: 'Splunk, Elastic SIEM, Datadog Logs' },
    { title: 'API Anomaly Detection', description: 'Detect abnormal API usage patterns, credential stuffing, and data exfiltration via APIs.', tool: 'Salt Security, Noname Security, Cequence' },
    { title: 'SIEM Correlation for Apps', description: 'Create correlation rules in the SIEM to detect application-level attack patterns.', tool: 'Splunk, Microsoft Sentinel, IBM QRadar' },
    { title: 'Fraud Detection', description: 'Identify fraudulent transactions or account takeover attempts in customer-facing applications.', tool: 'Kount, Sift, Stripe Radar' },
  ],

  APPLICATIONS_RESPOND: [
    { title: 'WAF Emergency Rule Deployment', description: 'Rapidly deploy WAF blocking rules to mitigate an active application attack.', tool: 'AWS WAF, Cloudflare, Imperva' },
    { title: 'Application Rollback Procedures', description: 'Revert an application to a previous known-good version in response to a security incident.', tool: 'Git revert, CI/CD pipeline rollback, blue/green deploy' },
    { title: 'API Key Revocation', description: 'Immediately revoke and rotate compromised API keys or OAuth tokens.', tool: 'Auth0, Okta, AWS IAM' },
    { title: 'Application Incident Response Playbooks', description: 'Documented step-by-step procedures for handling common application security incidents.', tool: 'Atlassian Confluence, PagerDuty, Cortex XSOAR' },
    { title: 'Bug Bounty Triage Process', description: 'Structured process for receiving, validating, and remediating vulnerability reports from researchers.', tool: 'HackerOne, Bugcrowd' },
  ],

  APPLICATIONS_RECOVER: [
    { title: 'Application Backup & Restore', description: 'Restore application data and configuration from backups following an incident.', tool: 'AWS Backup, Azure Backup, Veeam' },
    { title: 'Blue/Green Deployment Recovery', description: 'Switch traffic to a clean environment as a fast recovery strategy.', tool: 'AWS CodeDeploy, Kubernetes, Spinnaker' },
    { title: 'Database Point-in-time Recovery', description: 'Restore a database to a specific point in time before data corruption or deletion occurred.', tool: 'AWS RDS PITR, Azure SQL, PostgreSQL PITR' },
    { title: 'DR Runbooks for Applications', description: 'Documented recovery procedures aligned to RTO/RPO for all critical applications.', tool: 'Confluence, ServiceNow, AWS CloudFormation' },
  ],

  // ─── NETWORKS ────────────────────────────────────────────────────────────────

  NETWORKS_IDENTIFY: [
    { title: 'Network Topology Mapping', description: 'Document and maintain an up-to-date map of network architecture, segments, and connections.', tool: 'SolarWinds NTM, Auvik, Nmap' },
    { title: 'Network Vulnerability Scanning', description: 'Scan network infrastructure for misconfigurations, open ports, and exploitable services.', tool: 'Nessus, Qualys, Rapid7 Nexpose' },
    { title: 'Passive Network Discovery', description: 'Monitor network traffic passively to discover connected devices without active scanning.', tool: 'Zeek (Bro), Forescout, Darktrace' },
    { title: 'NetFlow / Traffic Baseline', description: 'Capture and analyse network flow data to establish normal traffic patterns for anomaly detection.', tool: 'SolarWinds NTA, Cisco Stealthwatch, ntopng' },
    { title: 'Network Configuration Audit', description: 'Review router, switch, and firewall configurations for security weaknesses.', tool: 'Nipper, Cisco SecureX, Nessus compliance' },
    { title: 'External Attack Surface Discovery', description: 'Identify all internet-facing network assets and services.', tool: 'Shodan, Censys, Tenable ASM' },
  ],

  NETWORKS_PROTECT: [
    { title: 'Next-Generation Firewall (NGFW)', description: 'Enforce application-aware traffic filtering with IPS, SSL inspection, and threat intelligence integration.', tool: 'Palo Alto Networks, Fortinet FortiGate, Check Point' },
    { title: 'Network Segmentation / VLANs', description: 'Divide the network into security zones to limit lateral movement and contain breaches.', tool: 'Cisco, Aruba, VMware NSX' },
    { title: 'Zero Trust Network Access (ZTNA)', description: 'Enforce identity-aware, least-privilege access to network resources for all users and devices.', tool: 'Zscaler Private Access, Cloudflare Access, Palo Alto Prisma' },
    { title: 'VPN', description: 'Encrypt remote access connections to protect data in transit and control network access.', tool: 'Cisco AnyConnect, Palo Alto GlobalProtect, WireGuard' },
    { title: 'Intrusion Prevention System (IPS)', description: 'Detect and automatically block known attack signatures and network-level exploits.', tool: 'Snort, Suricata, Palo Alto Threat Prevention' },
    { title: 'DDoS Mitigation', description: 'Absorb or deflect volumetric and application-layer denial of service attacks.', tool: 'Cloudflare, AWS Shield, Radware, Akamai' },
    { title: 'Network Access Control (NAC)', description: 'Enforce posture-based access policies, ensuring only compliant devices connect to the network.', tool: 'Cisco ISE, Forescout, Aruba ClearPass' },
    { title: 'DNS Security / Filtering', description: 'Block malicious domains, prevent DNS tunnelling, and filter unwanted content at the DNS layer.', tool: 'Cisco Umbrella, Infoblox, Zscaler DNS' },
    { title: 'Secure Web Gateway (SWG)', description: 'Inspect and filter outbound web traffic to prevent malware downloads and data exfiltration.', tool: 'Zscaler Internet Access, Cisco Umbrella, Forcepoint' },
    { title: 'Email Gateway / Anti-spam', description: 'Filter inbound and outbound email for phishing, malware, and spam.', tool: 'Proofpoint, Mimecast, Microsoft Defender for Office 365' },
  ],

  NETWORKS_DETECT: [
    { title: 'SIEM', description: 'Centralise security log collection and apply correlation rules to detect threats across the network.', tool: 'Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM' },
    { title: 'Network Detection & Response (NDR)', description: 'Analyse network traffic using ML to detect lateral movement, C2 communication, and anomalies.', tool: 'Darktrace, ExtraHop Reveal(x), Vectra AI' },
    { title: 'Intrusion Detection System (IDS)', description: 'Monitor network traffic for known attack signatures and generate alerts.', tool: 'Snort, Suricata, Zeek' },
    { title: 'NetFlow Analysis', description: 'Analyse flow records to identify suspicious traffic volumes, connections, and protocols.', tool: 'SolarWinds NTA, Cisco Stealthwatch, ManageEngine' },
    { title: 'DNS Monitoring', description: 'Monitor DNS queries and responses to detect malware C2, DNS tunnelling, and data exfiltration.', tool: 'Cisco Umbrella, Infoblox, Zeek' },
    { title: 'Email Threat Detection', description: 'Detect phishing, BEC, and malware delivered via email through sandboxing and ML.', tool: 'Proofpoint TAP, Mimecast, Microsoft Defender for Office 365' },
    { title: 'Packet Capture & Analysis', description: 'Capture full packet data for deep investigation of network incidents.', tool: 'Wireshark, Security Onion, Zeek' },
  ],

  NETWORKS_RESPOND: [
    { title: 'Firewall-based Network Isolation', description: 'Block or isolate a compromised network segment by modifying firewall rules.', tool: 'Palo Alto, Fortinet, Check Point' },
    { title: 'ACL-based Containment', description: 'Apply access control lists on routers and switches to block attacker traffic.', tool: 'Cisco IOS, Juniper JunOS' },
    { title: 'DDoS Response Procedures', description: 'Invoke upstream DDoS scrubbing, rate limiting, and traffic diversion during an active attack.', tool: 'Cloudflare Magic Transit, AWS Shield Advanced' },
    { title: 'Network Forensics', description: 'Capture and analyse network evidence to determine the scope and method of an intrusion.', tool: 'Wireshark, NetworkMiner, Security Onion' },
    { title: 'BGP Blackholing', description: 'Null-route malicious source IP ranges at the network edge during an attack.', tool: 'ISP coordination, RTBH' },
  ],

  NETWORKS_RECOVER: [
    { title: 'Network Device Config Backup & Restore', description: 'Restore firewall, router, and switch configurations from backups to recover from compromise.', tool: 'Ansible, Oxidized, SolarWinds NCM' },
    { title: 'Redundant Network Paths', description: 'Maintain failover routing and link redundancy to ensure continuity during an incident.', tool: 'BGP redundancy, SD-WAN, MPLS failover' },
    { title: 'ISP / WAN Failover', description: 'Switch to a secondary ISP or WAN link when the primary is disrupted.', tool: 'SD-WAN (Cisco Viptela, VMware), dual ISP' },
    { title: 'Network DR Runbooks', description: 'Documented recovery procedures for restoring network services following a major incident.', tool: 'Confluence, ServiceNow' },
  ],

  // ─── DATA ────────────────────────────────────────────────────────────────────

  DATA_IDENTIFY: [
    { title: 'Data Classification', description: 'Classify all data by sensitivity level (e.g. Public, Internal, Confidential, Restricted) to drive protection decisions.', tool: 'Microsoft Purview, Varonis, Boldon James' },
    { title: 'Sensitive Data Discovery', description: 'Scan repositories, databases, and cloud storage to locate sensitive data such as PII, PCI, and PHI.', tool: 'Spirion, BigID, Varonis' },
    { title: 'Data Flow Mapping', description: 'Document how sensitive data flows between systems, teams, and third parties.', tool: 'OneTrust, TrustArc, manual DFDs' },
    { title: 'Database Inventory', description: 'Maintain a complete catalogue of all databases, their contents, owners, and access controls.', tool: 'Qualys, Imperva, ServiceNow' },
    { title: 'Cloud Storage Discovery', description: 'Identify all cloud storage buckets, blobs, and file shares and assess their exposure.', tool: 'Wiz, Orca Security, Lacework' },
    { title: 'Data Retention Inventory', description: 'Catalogue data retention policies and identify data held beyond its required retention period.', tool: 'OneTrust, Microsoft Purview' },
  ],

  DATA_PROTECT: [
    { title: 'Encryption at Rest', description: 'Encrypt stored data using strong algorithms (e.g. AES-256) to protect against physical theft or unauthorised access.', tool: 'BitLocker, AWS KMS, Azure Disk Encryption' },
    { title: 'Encryption in Transit (TLS/mTLS)', description: 'Enforce TLS for all data transmission to prevent interception.', tool: 'Let\'s Encrypt, AWS Certificate Manager, mutual TLS' },
    { title: 'Data Loss Prevention (DLP)', description: 'Monitor and prevent unauthorised transfer of sensitive data via email, web, endpoints, or cloud.', tool: 'Microsoft Purview DLP, Symantec DLP, Forcepoint DLP' },
    { title: 'Database Activity Monitoring (DAM)', description: 'Monitor all database queries and flag suspicious access patterns.', tool: 'Imperva DAM, IBM Guardium, McAfee DAM' },
    { title: 'Data Masking & Tokenisation', description: 'Replace sensitive data with non-sensitive equivalents in non-production environments.', tool: 'Informatica, Delphix, AWS Macie' },
    { title: 'Secrets Management', description: 'Store and rotate credentials, API keys, and certificates securely to prevent exposure.', tool: 'HashiCorp Vault, AWS Secrets Manager, Azure Key Vault' },
    { title: 'Cloud Access Security Broker (CASB)', description: 'Enforce data security policies for data stored and shared in SaaS and cloud platforms.', tool: 'Microsoft Defender for Cloud Apps, Netskope, Zscaler CASB' },
    { title: 'Digital Rights Management (DRM)', description: 'Control how sensitive documents can be opened, shared, printed, or modified.', tool: 'Microsoft Purview Information Protection, Adobe DRM' },
    { title: 'RBAC on Data Stores', description: 'Enforce least-privilege access controls on databases, file shares, and object storage.', tool: 'AWS IAM, Azure RBAC, Varonis' },
  ],

  DATA_DETECT: [
    { title: 'DLP Policy Violation Alerts', description: 'Generate alerts when data handling violates classification-based policies.', tool: 'Microsoft Purview, Symantec DLP, Forcepoint' },
    { title: 'User and Entity Behavior Analytics (UEBA)', description: 'Detect anomalous data access patterns that may indicate insider threat or compromised credentials.', tool: 'Microsoft Sentinel UEBA, Varonis, Securonix' },
    { title: 'Database Activity Monitoring Alerts', description: 'Alert on unusual query volumes, privilege escalation, and after-hours database access.', tool: 'Imperva, IBM Guardium' },
    { title: 'Cloud Data Exfiltration Detection', description: 'Detect large-scale or unusual data transfers from cloud storage to external destinations.', tool: 'AWS GuardDuty, Microsoft Defender for Cloud, Wiz' },
    { title: 'File Access Monitoring', description: 'Track access to sensitive files and alert on bulk reads, deletions, or permission changes.', tool: 'Varonis, Microsoft Purview Audit, Elastic' },
  ],

  DATA_RESPOND: [
    { title: 'Data Breach Response Plan', description: 'Documented procedures for confirming, containing, and notifying stakeholders of a data breach.', tool: 'OneTrust, ServiceNow, legal/DPO engagement' },
    { title: 'Access Revocation for Compromised Accounts', description: 'Immediately revoke access for accounts believed to have exfiltrated or accessed data unauthorisedly.', tool: 'Azure AD, Okta, CyberArk' },
    { title: 'Regulatory Breach Notification', description: 'Fulfil mandatory notification requirements under GDPR, HIPAA, PCI DSS, etc. within required timeframes.', tool: 'OneTrust, TrustArc, legal counsel' },
    { title: 'Forensic Data Preservation', description: 'Preserve data evidence in a forensically sound manner for investigation and legal proceedings.', tool: 'FTK, Magnet AXIOM, AWS S3 Object Lock' },
    { title: 'Data Containment Procedures', description: 'Isolate affected data repositories or revoke sharing permissions during an active breach.', tool: 'CASB, Microsoft Purview, cloud IAM' },
  ],

  DATA_RECOVER: [
    { title: 'Backup & Restore Procedures', description: 'Restore data from tested, clean backups following ransomware, deletion, or corruption.', tool: 'Veeam, Commvault, AWS Backup' },
    { title: 'Immutable Backups', description: 'Store backups in a write-once format to ensure they cannot be deleted or encrypted by ransomware.', tool: 'Veeam Hardened Repository, AWS S3 Object Lock, Azure Immutable Blob' },
    { title: 'Ransomware Recovery Procedures', description: 'Documented playbook for recovering from a ransomware attack including clean restore and validation.', tool: 'Veeam, Rubrik, Cohesity' },
    { title: 'Point-in-time Database Recovery', description: 'Restore a database to a specific timestamp before data was corrupted or deleted.', tool: 'AWS RDS, Azure SQL, PostgreSQL WAL' },
    { title: 'Offsite / Cloud Backup', description: 'Maintain geographically separated backup copies to protect against site-level incidents.', tool: 'AWS S3, Azure Blob, Backblaze B2' },
  ],

  // ─── USERS ────────────────────────────────────────────────────────────────────

  USERS_IDENTIFY: [
    { title: 'Identity Governance & Administration (IGA)', description: 'Manage the full lifecycle of user identities, roles, and entitlements including joiners, movers, and leavers.', tool: 'SailPoint, Saviynt, One Identity' },
    { title: 'Access Reviews / Recertification', description: 'Periodically review and certify user access rights to ensure least privilege is maintained.', tool: 'SailPoint, Saviynt, Microsoft Entra ID Governance' },
    { title: 'Privileged Account Discovery', description: 'Identify all privileged accounts including local admins, service accounts, and shared credentials.', tool: 'CyberArk, BeyondTrust, Delinea' },
    { title: 'User Directory Inventory', description: 'Maintain an accurate directory of all user accounts including status, roles, and group memberships.', tool: 'Active Directory, Azure AD / Entra ID, LDAP' },
    { title: 'Role Mapping & Entitlement Review', description: 'Document and validate that role assignments reflect actual job functions and enforce least privilege.', tool: 'SailPoint, Saviynt, manual review' },
    { title: 'Shadow IT / Unsanctioned App Discovery', description: 'Identify applications and services used by employees outside of approved channels.', tool: 'Netskope, Zscaler, Microsoft Defender for Cloud Apps' },
  ],

  USERS_PROTECT: [
    { title: 'Multi-Factor Authentication (MFA)', description: 'Require a second factor for all authentication to reduce the impact of stolen credentials.', tool: 'Duo Security, Microsoft Authenticator, Okta MFA' },
    { title: 'Identity & Access Management (IAM)', description: 'Centralise user authentication and authorisation with SSO and conditional access policies.', tool: 'Okta, Microsoft Entra ID, Ping Identity' },
    { title: 'Privileged Access Management (PAM)', description: 'Control, monitor, and audit access to privileged accounts and sensitive systems.', tool: 'CyberArk, BeyondTrust, Delinea Secret Server' },
    { title: 'Single Sign-On (SSO)', description: 'Provide seamless and secure access to all applications from a single authenticated session.', tool: 'Okta, Azure AD, Ping SSO' },
    { title: 'Security Awareness Training', description: 'Educate users on phishing, social engineering, secure password practices, and security policies.', tool: 'KnowBe4, Proofpoint Security Awareness, Cofense' },
    { title: 'Phishing Simulation', description: 'Run simulated phishing campaigns to measure and improve user awareness and resilience.', tool: 'KnowBe4, Proofpoint, GoPhish' },
    { title: 'Zero Trust / Conditional Access', description: 'Enforce context-aware access decisions based on user, device, location, and risk score.', tool: 'Microsoft Entra Conditional Access, Zscaler, Okta Adaptive MFA' },
    { title: 'Just-in-time (JIT) Access', description: 'Grant elevated permissions only when needed and for the minimum required duration.', tool: 'CyberArk, BeyondTrust, Azure PIM' },
    { title: 'Password Policy Enforcement', description: 'Enforce strong password requirements, expiry, and check against known breached credentials.', tool: 'Microsoft Entra ID, Have I Been Pwned API, 1Password' },
  ],

  USERS_DETECT: [
    { title: 'User and Entity Behavior Analytics (UEBA)', description: 'Baseline normal user behaviour and alert on deviations such as unusual login times, locations, or data access.', tool: 'Microsoft Sentinel UEBA, Varonis, Exabeam' },
    { title: 'Identity Threat Detection & Response (ITDR)', description: 'Detect identity-based attacks such as credential theft, lateral movement, and privilege escalation.', tool: 'Microsoft Entra ID Protection, CrowdStrike Falcon Identity, Vectra' },
    { title: 'Privileged Session Monitoring', description: 'Record and analyse privileged user sessions to detect misuse and support forensic investigations.', tool: 'CyberArk Session Manager, BeyondTrust, ObserveIT' },
    { title: 'Failed Login / Brute Force Detection', description: 'Alert on repeated failed authentication attempts indicative of password spraying or brute force.', tool: 'Azure AD Identity Protection, Splunk, Okta ThreatInsight' },
    { title: 'Phishing & BEC Detection', description: 'Detect business email compromise and spear phishing using ML and inbox analysis.', tool: 'Microsoft Defender for Office 365, Abnormal Security, Proofpoint' },
    { title: 'Insider Threat Detection', description: 'Monitor for data exfiltration, policy violations, and access anomalies by internal users.', tool: 'Varonis, Securonix, Microsoft Purview Insider Risk' },
  ],

  USERS_RESPOND: [
    { title: 'Account Lockout / Suspension', description: 'Immediately disable a compromised or malicious user account to prevent further damage.', tool: 'Active Directory, Azure AD, Okta' },
    { title: 'Forced Credential Reset', description: 'Force an immediate password reset for accounts suspected of compromise.', tool: 'Azure AD, Okta, Active Directory' },
    { title: 'PAM Session Termination', description: 'Terminate active privileged sessions on compromised or suspicious accounts.', tool: 'CyberArk, BeyondTrust' },
    { title: 'MFA Push Block / Reset', description: 'Block pending MFA push notifications and reset MFA enrolment for compromised accounts.', tool: 'Duo, Okta, Microsoft Authenticator' },
    { title: 'Insider Threat Response Procedures', description: 'Documented procedures for responding to insider threat incidents including HR, legal, and IT coordination.', tool: 'HR/Legal coordination, SOAR playbooks' },
    { title: 'Off-boarding & Access Revocation', description: 'Ensure all access is revoked promptly when an employee leaves or is terminated.', tool: 'IGA platforms, Okta lifecycle management, ServiceNow' },
  ],

  USERS_RECOVER: [
    { title: 'Account Recovery Procedures', description: 'Restore access to legitimate users following an account compromise or lockout.', tool: 'Azure AD, Okta, IT helpdesk process' },
    { title: 'Access Reinstatement Workflow', description: 'Structured workflow to re-provision access following an incident with appropriate approval gates.', tool: 'SailPoint, ServiceNow, Saviynt' },
    { title: 'Post-incident Security Awareness', description: 'Deliver targeted training to affected users following a phishing, social engineering, or insider incident.', tool: 'KnowBe4, Proofpoint' },
    { title: 'Identity Restoration After Compromise', description: 'Fully restore a compromised identity including re-issuance of credentials, MFA, and access review.', tool: 'CyberArk, Azure AD, Okta' },
    { title: 'Lessons Learned & Policy Update', description: 'Conduct post-incident review and update user access policies based on findings.', tool: 'Confluence, ServiceNow, ITSM' },
  ],
}

export function getCdmSuggestions(assetClass: string, nistFunction: string): CdmSuggestion[] {
  return data[`${assetClass}_${nistFunction}`] ?? []
}
