export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  level: number;
  levelName: string;
  solution: string;
  winnerMessage: string;
  loserMessage: string;
}

export const quizData: Record<string, QuizQuestion[]> = {
  it: [
    {
      id: 1,
      question: "You're protecting a major Indian software company from hackers trying to break into their remote work systems. What's your first line of defense to stop them?",
      options: [
        "Set up bandwidth monitoring and traffic analysis",
        "Deploy strong firewall rules and secure access controls",
        "Launch security awareness training for remote workers"
      ],
      correctAnswer: 1,
      category: "IT/ITes",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Secured! A major Indian software company's 2024 remote work breach happened exactly like this - attackers bypassed their network perimeter defenses. You prevented what they couldn't. Your defense: Airtel Secure's Firewall and SASE.",
      loserMessage: "Breached. You just experienced what hit a major Indian software company in 2024 - attackers bypassed network perimeter defenses in their remote work infrastructure. <span class='highlight'>Airtel Secure's Firewall and SASE would have blocked this attack.</span>"
    },
    {
      id: 2,
      question: "Hackers are targeting an IT firm's web applications to steal client data. What protection will you put in place to block them?",
      options: [
        "Install comprehensive logging and audit systems",
        "Set up web application firewall and API security",
        "Schedule regular penetration testing sessions"
      ],
      correctAnswer: 1,
      category: "IT/ITes",
      level: 2,
      levelName: "Secure Workloads",
      solution: "CNAAP, API Security, WAF",
      winnerMessage: "Protected! A leading IT services firm's 2024 API breach exposed client data when attackers exploited application vulnerabilities. You caught what they missed. Your shield: Airtel Secure's CNAAP, API Security, and WAF.",
      loserMessage: "Compromised. This mirrors a leading IT services firm's 2024 disaster - API breach exposing client data through exploited application vulnerabilities. <span class='highlight'>Airtel Secure's CNAAP, API Security, and WAF could have prevented this.</span>"
    },
    {
      id: 3,
      question: "Cybercriminals sent spear-phishing emails to a tech company's employees. What's your defense to catch the malware before it spreads?",
      options: [
        "Roll out security awareness training programs",
        "Install endpoint detection and device encryption",
        "Enforce strong password policies and access controls"
      ],
      correctAnswer: 1,
      category: "IT/ITes",
      level: 3,
      levelName: "Secure Users",
      solution: "EDR, FDE, UEM",
      winnerMessage: "Defended! A prominent tech company's 2024 spear-phishing attack succeeded when malware remained undetected on employee devices. You spotted what they couldn't. Your detection: Airtel Secure's EDR, FDE, and UEM.",
      loserMessage: "Infected. You lived through a prominent tech company's 2024 nightmare - spear-phishing malware remained undetected on employee devices. <span class='highlight'>Airtel Secure's EDR, FDE, and UEM would have caught this threat.</span>"
    },
    {
      id: 4,
      question: "A sneaky advanced threat is hiding in an IT consulting firm's network. How will you hunt it down before it causes damage?",
      options: [
        "Run regular vulnerability scans and patch systems",
        "Deploy 24/7 security monitoring with automated alerts",
        "Conduct enhanced employee background checks"
      ],
      correctAnswer: 1,
      category: "IT/ITes",
      level: 4,
      levelName: "SOC",
      solution: "SIEM, SOAR, Threat Intelligence",
      winnerMessage: "Detected! A major IT consulting firm's 2024 advanced persistent threat continued undetected for months. You identified what they missed. Your vigilance: Airtel Secure's SIEM, SOAR, and Threat Intelligence.",
      loserMessage: "Infiltrated. This reflects a major IT consulting firm's 2024 reality - advanced persistent threats remained hidden for months. <span class='highlight'>Airtel Secure's SIEM, SOAR, and Threat Intelligence would have exposed them immediately.</span>"
    }
  ],  
  healthcare: [
    {
      id: 5,
      question: "Ransomware attackers are targeting a hospital's remote access systems to encrypt patient records. How do you stop them at the network gate?",
      options: [
        "Set up regular backup testing procedures",
        "Install network firewall and secure access controls",
        "Launch comprehensive staff security training"
      ],
      correctAnswer: 1,
      category: "Healthcare",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Secured! A leading hospital chain's 2024 ransomware attack affecting patient records exploited exactly these remote access weaknesses. You fortified what they couldn't. Your protection: Airtel Secure's Firewall and SASE.",
      loserMessage: "Compromised. You experienced a leading hospital chain's 2024 disaster - ransomware affecting patient records through remote access weaknesses. <span class='highlight'>Airtel Secure's Firewall and SASE would have prevented this breach.</span>"
    },
    {
      id: 6,
      question: "Malicious files are trying to spread through a diagnostic center's systems to steal patient data. What's your shield against this threat?",
      options: [
        "Deploy regular software updates and patches",
        "Activate data loss prevention and app security",
        "Create comprehensive incident response plans"
      ],
      correctAnswer: 1,
      category: "Healthcare",
      level: 2,
      levelName: "Secure Workloads",
      solution: "DLP, WAAP",
      winnerMessage: "Contained! A major diagnostic center's 2024 data breach exposing patient information spread when malicious files bypassed protection. You stopped what they couldn't. Your defense: Airtel Secure's DLP and WAAP.",
      loserMessage: "Breached. This mirrors a major diagnostic center's 2024 crisis - patient information exposed when malicious files bypassed protection systems. <span class='highlight'>Airtel Secure's DLP and WAAP would have contained this spread.</span>"
    },
    {
      id: 7,
      question: "Phishing emails are targeting hospital staff to steal their login credentials. What's your defense to protect medical teams?",
      options: [
        "Enforce regular password updates and complexity",
        "Deploy email security filtering and endpoint protection",
        "Enhance physical security and access controls"
      ],
      correctAnswer: 1,
      category: "Healthcare",
      level: 3,
      levelName: "Secure Users",
      solution: "Email Security, EDR, SSO",
      winnerMessage: "Protected! A major hospital's 2024 phishing attack succeeded when medical staff devices lacked adequate protection. You secured what they couldn't. Your guard: Airtel Secure's Email Security, EDR, and SSO.",
      loserMessage: "Compromised. You lived through a major hospital's 2024 phishing attack - medical staff devices lacked adequate protection. <span class='highlight'>Airtel Secure's Email Security, EDR, and SSO would have blocked this attack.</span>"
    },
    {
      id: 8,
      question: "Data thieves are quietly stealing patient records from a medical center. How will you catch them red-handed?",
      options: [
        "Increase staff security awareness training",
        "Launch 24/7 security monitoring with instant alerts",
        "Improve backup and disaster recovery systems"
      ],
      correctAnswer: 1,
      category: "Healthcare",
      level: 4,
      levelName: "SOC",
      solution: "24/7 Monitoring, SOAR, VAPT",
      winnerMessage: "Caught! A leading medical center's 2024 data exfiltration went undetected for weeks. You spotted what they missed. Your surveillance: Airtel Secure's 24/7 Monitoring, SOAR, and VAPT.",
      loserMessage: "Stolen. This reflects a leading medical center's 2024 reality - data exfiltration continued undetected for weeks. <span class='highlight'>Airtel Secure's 24/7 Monitoring, SOAR, and VAPT would have caught this immediately.</span>"
    }
  ],
  bfsi: [
    {
      id: 9,
      question: "Cybercriminals are trying to break through a major bank's network defenses to access customer accounts. What's your fortress wall?",
      options: [
        "Schedule regular compliance audits and checks",
        "Build robust firewall protection and secure access",
        "Strengthen customer authentication methods"
      ],
      correctAnswer: 1,
      category: "BFSI",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Blocked! A major bank's 2024 cyber attack succeeded when network perimeter defenses failed to stop intruders. You fortified what they couldn't. Your barrier: Airtel Secure's Firewall and SASE.",
      loserMessage: "Penetrated. You experienced a major bank's 2024 breach - network perimeter defenses failed against determined intruders. <span class='highlight'>Airtel Secure's Firewall and SASE would have stopped this infiltration.</span>"
    },
    {
      id: 10,
      question: "Attackers are flooding a payment platform's systems to crash their services. What's your shield to keep them running?",
      options: [
        "Add more server capacity and load balancing",
        "Deploy DDoS protection and web security",
        "Test disaster recovery procedures regularly"
      ],
      correctAnswer: 1,
      category: "BFSI",
      level: 2,
      levelName: "Secure Workloads",
      solution: "DDoS Protection, WAF",
      winnerMessage: "Defended! A leading payment platform's 2024 service disruption occurred when attackers overwhelmed their systems. You withstood what they couldn't. Your shield: Airtel Secure's DDoS Protection and WAF.",
      loserMessage: "Overwhelmed. This mirrors a leading payment platform's 2024 outage - systems crashed when attackers overwhelmed their infrastructure. <span class='highlight'>Airtel Secure's DDoS Protection and WAF would have maintained services.</span>"
    },
    {
      id: 11,
      question: "Fraudulent emails are targeting a bank's finance team to steal money. What's your trap to catch these fake messages?",
      options: [
        "Improve customer verification procedures",
        "Install advanced email security and user authentication",
        "Run regular staff cybersecurity training"
      ],
      correctAnswer: 1,
      category: "BFSI",
      level: 3,
      levelName: "Secure Users",
      solution: "Email Security, SSO, MFA",
      winnerMessage: "Secured! A regional bank's 2024 business email compromise succeeded when fraudulent emails bypassed detection. You caught what they missed. Your filter: Airtel Secure's Email Security, SSO, and MFA.",
      loserMessage: "Deceived. You experienced a regional bank's 2024 business email compromise - fraudulent emails bypassed all detection systems. <span class='highlight'>Airtel Secure's Email Security, SSO, and MFA would have blocked these threats.</span>"
    },
    {
      id: 12,
      question: "Hackers are using stolen passwords to break into customer accounts at a fintech company. How do you spot them instantly?",
      options: [
        "Set stronger customer account lockout rules",
        "Deploy real-time monitoring with threat intelligence",
        "Update security policies and procedures regularly"
      ],
      correctAnswer: 1,
      category: "BFSI",
      level: 4,
      levelName: "SOC",
      solution: "SIEM, Dark Web Monitoring, Threat Intelligence",
      winnerMessage: "Detected! A fintech company's 2024 credential stuffing attacks continued undetected for weeks. You spotted what they missed. Your intelligence: Airtel Secure's SIEM, Dark Web Monitoring, and Threat Intelligence.",
      loserMessage: "Compromised. This reflects a fintech company's 2024 nightmare - credential stuffing attacks ran undetected for weeks. <span class='highlight'>Airtel Secure's SIEM, Dark Web Monitoring, and Threat Intelligence would have caught this.</span>"
    }
  ],
  manufacturing: [
    {
      id: 13,
      question: "Cyberattackers want to shut down a car manufacturer's production line. What's your first barrier to keep them out?",
      options: [
        "Schedule regular maintenance of control systems",
        "Install proper firewall protection and secure access",
        "Add more physical security and surveillance"
      ],
      correctAnswer: 1,
      category: "Manufacturing",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Protected! A major automotive manufacturer's 2024 cyberattack disrupted production when network defenses failed. You secured what they couldn't. Your foundation: Airtel Secure's Firewall and SASE.",
      loserMessage: "Shutdown. You lived through a major automotive manufacturer's 2024 crisis - production stopped when network defenses failed against cyberattacks. <span class='highlight'>Airtel Secure's Firewall and SASE would have prevented this disruption.</span>"
    },
    {
      id: 14,
      question: "Ransomware is trying to spread across a steel company's factory systems. How do you contain the outbreak?",
      options: [
        "Set up regular system backup and recovery",
        "Create network barriers and workload protection",
        "Launch comprehensive employee training programs"
      ],
      correctAnswer: 1,
      category: "Manufacturing",
      level: 2,
      levelName: "Secure Workloads",
      solution: "CNAAP, DLP",
      winnerMessage: "Contained! A steel company's 2024 ransomware spread across systems due to inadequate network isolation. You segmented what they couldn't. Your protection: Airtel Secure's CNAAP and DLP.",
      loserMessage: "Infected. This mirrors a steel company's 2024 disaster - ransomware spread across all systems due to inadequate network isolation. <span class='highlight'>Airtel Secure's CNAAP and DLP would have contained this spread.</span>"
    },
    {
      id: 15,
      question: "Spies are targeting an automotive company's engineering team to steal trade secrets. What's your defense against these targeted attacks?",
      options: [
        "Tighten access controls for sensitive data",
        "Deploy email security and endpoint protection",
        "Update security awareness training regularly"
      ],
      correctAnswer: 1,
      category: "Manufacturing",
      level: 3,
      levelName: "Secure Users",
      solution: "Email Security, EDR, UEM",
      winnerMessage: "Defended! A leading automotive company's 2024 IP theft occurred when engineering staff fell victim to targeted attacks. You protected what they couldn't. Your guard: Airtel Secure's Email Security, EDR, and UEM.",
      loserMessage: "Stolen. You experienced a leading automotive company's 2024 IP theft - engineering staff fell victim to targeted attacks. <span class='highlight'>Airtel Secure's Email Security, EDR, and UEM would have blocked these threats.</span>"
    },
    {
      id: 16,
      question: "A supply chain attack is secretly infiltrating a manufacturing company's network. How do you detect these hidden threats?",
      options: [
        "Improve vendor security assessment procedures",
        "Launch 24/7 threat hunting and automated detection",
        "Conduct regular security audits and reviews"
      ],
      correctAnswer: 1,
      category: "Manufacturing",
      level: 4,
      levelName: "SOC",
      solution: "24/7 Monitoring, Threat Intelligence, SOAR",
      winnerMessage: "Exposed! A major manufacturing company's 2024 supply chain attack remained hidden for months. You revealed what they missed. Your watchfulness: Airtel Secure's 24/7 Monitoring, Threat Intelligence, and SOAR.",
      loserMessage: "Infiltrated. This reflects a major manufacturing company's 2024 supply chain nightmare - attacks remained hidden for months. <span class='highlight'>Airtel Secure's 24/7 Monitoring, Threat Intelligence, and SOAR would have exposed them.</span>"
    }
  ],
  government: [
    {
      id: 17,
      question: "State-sponsored hackers are attacking a government ministry's network. What's your digital fortress to protect national security?",
      options: [
        "Update staff security clearances regularly",
        "Deploy enhanced firewall and secure access protection",
        "Improve data classification procedures"
      ],
      correctAnswer: 1,
      category: "Government",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Secured! A government ministry's 2024 breach succeeded when network defenses proved inadequate against sophisticated attacks. You fortified what they couldn't. Your shield: Airtel Secure's Firewall and SASE.",
      loserMessage: "Penetrated. You experienced a government ministry's 2024 reality - network defenses proved inadequate against sophisticated attacks. <span class='highlight'>Airtel Secure's Firewall and SASE would have stopped this infiltration.</span>"
    },
    {
      id: 18,
      question: "Massive cyber attacks are hitting an e-governance portal to disrupt citizen services. What's your protective barrier?",
      options: [
        "Monitor system performance regularly",
        "Install web application firewall and data protection",
        "Enhance voter registration security measures"
      ],
      correctAnswer: 1,
      category: "Government",
      level: 2,
      levelName: "Secure Workloads",
      solution: "WAF, DLP, WAAP",
      winnerMessage: "Protected! A major e-governance portal's 2024 breach faced massive attacks due to insufficient web protection. You defended what they couldn't. Your armor: Airtel Secure's WAF, DLP, and WAAP.",
      loserMessage: "Attacked. This mirrors a major e-governance portal's 2024 crisis - massive attacks succeeded due to insufficient web protection. <span class='highlight'>Airtel Secure's WAF, DLP, and WAAP would have repelled these assaults.</span>"
    },
    {
      id: 19,
      question: "Enemy hackers are constantly targeting government employees to steal classified information. What's your shield for the workforce?",
      options: [
        "Run regular security clearance background checks",
        "Deploy email security and complete device protection",
        "Strengthen physical security and access controls"
      ],
      correctAnswer: 1,
      category: "Government",
      level: 3,
      levelName: "Secure Users",
      solution: "Email Security, EDR, FDE",
      winnerMessage: "Secured! A government department's systems face constant attacks often succeeding through employee compromise. You protected what they struggle with. Your defense: Airtel Secure's Email Security, EDR, and FDE.",
      loserMessage: "Compromised. You experienced what government departments face constantly - attacks succeeding through employee compromise. <span class='highlight'>Airtel Secure's Email Security, EDR, and FDE would have prevented this.</span>"
    },
    {
      id: 20,
      question: "Foreign spies have secretly infiltrated a defense ministry's systems. How do you expose these hidden intruders?",
      options: [
        "Improve personnel security screening procedures",
        "Launch 24/7 security monitoring with instant response",
        "Update security policies and training regularly"
      ],
      correctAnswer: 1,
      category: "Government",
      level: 4,
      levelName: "SOC",
      solution: "SIEM, SOAR, 24/7 Monitoring",  
      winnerMessage: "Detected! A defense ministry's 2024 infiltration went unnoticed, allowing prolonged foreign access. You caught what they missed. Your surveillance: Airtel Secure's SIEM, SOAR, and 24/7 Monitoring.",
      loserMessage: "Infiltrated. This reflects a defense ministry's 2024 nightmare - infiltration went unnoticed, allowing prolonged foreign access. <span class='highlight'>Airtel Secure's SIEM, SOAR, and 24/7 Monitoring would have caught this immediately.</span>"
    }
  ],
  others: [
    {
      id: 21,
      question: "Hackers want to steal customer data from a major retail chain. What's your first line of defense to protect shoppers?",
      options: [
        "Schedule regular PCI compliance audits",
        "Build strong network firewall and secure access protection",
        "Monitor point-of-sale systems closely"
      ],
      correctAnswer: 1,
      category: "Others",
      level: 1,
      levelName: "Secure Access",
      solution: "Firewall, SASE",
      winnerMessage: "Blocked! A major retail chain's 2024 customer data breach occurred when attackers bypassed network security. You stopped what they couldn't. Your barrier: Airtel Secure's Firewall and SASE.",
      loserMessage: "Breached. You lived through a major retail chain's 2024 disaster - customer data stolen when attackers bypassed network security. <span class='highlight'>Airtel Secure's Firewall and SASE would have blocked this breach.</span>"
    },
    {
      id: 22,
      question: "Cybercriminals are exploiting weaknesses in a telecom company's applications to steal customer information. What's your protective shield?",
      options: [
        "Update network infrastructure regularly",
        "Deploy API security and web application protection",
        "Strengthen customer data encryption protocols"
      ],
      correctAnswer: 1,
      category: "Others",
      level: 2,
      levelName: "Secure Workloads",
      solution: "WAAP, API Security, WAF",
      winnerMessage: "Shielded! A major telecom company's 2023 breach affecting millions of customers exploited application-layer vulnerabilities. You protected what they couldn't. Your defense: Airtel Secure's WAAP, API Security, and WAF.",
      loserMessage: "Exploited. This mirrors a major telecom company's 2023 disaster affecting millions - application-layer vulnerabilities were exploited. <span class='highlight'>Airtel Secure's WAAP, API Security, and WAF would have prevented this.</span>"
    },
    {
      id: 23,
      question: "Phishing emails are targeting an e-commerce platform's customer service team to steal payment data. What's your trap for these threats?",
      options: [
        "Improve customer payment verification systems",
        "Install email security filtering and device protection",
        "Run regular PCI-DSS compliance training"
      ],
      correctAnswer: 1,
      category: "Others",
      level: 3,
      levelName: "Secure Users",
      solution: "Email Security, EDR, UEM",
      winnerMessage: "Secured! A major e-commerce platform's 2024 payment data theft began with employee email compromise. You protected what they couldn't. Your guard: Airtel Secure's Email Security, EDR, and UEM.",
      loserMessage: "Compromised. You experienced a major e-commerce platform's 2024 payment theft - employee email compromise led to data theft. <span class='highlight'>Airtel Secure's Email Security, EDR, and UEM would have prevented this.</span>"
    },
    {
      id: 24,
      question: "Cyber thieves are secretly stealing millions of customer records from an online retailer. How do you catch them before they escape?",
      options: [
        "Enhance customer fraud detection systems",
        "Deploy 24/7 security monitoring and threat detection",
        "Update e-commerce platform security regularly"
      ],
      correctAnswer: 1,
      category: "Others",
      level: 4,
      levelName: "SOC",
      solution: "24/7 Monitoring, VAPT, SIEM",
      winnerMessage: "Caught! An online retailer's 2024 cyber attack continued undetected, compromising millions of customer records. You spotted what they missed. Your vigilance: Airtel Secure's 24/7 Monitoring, VAPT, and SIEM.",
      loserMessage: "Stolen. This reflects an online retailer's 2024 nightmare - cyber attacks ran undetected, compromising millions of records. <span class='highlight'>Airtel Secure's 24/7 Monitoring, VAPT, and SIEM would have caught this immediately.</span>"
    }
  ]
};