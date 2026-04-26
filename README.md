# Cyber Defense Matrix Tool

## Overview of the Cyber Defense Matrix

The Cyber Defense Matrix is a framework that organizes cybersecurity activities across two primary dimensions, along with an additional perspective that highlights how resources are applied.

---

### 1. Functional Dimension (Horizontal Axis)

This dimension outlines key categories of security activity, aligned with widely recognized practices:

**Identify**
This area focuses on gaining visibility into an organization's assets, systems, and potential weaknesses. The goal is to understand what needs protection and where risks exist. Tools like asset inventories, vulnerability assessments, and threat intelligence support this effort.

**Protect**
The emphasis here is on putting safeguards in place to reduce the likelihood or impact of attacks. This includes implementing controls such as access management, system hardening, and security best practices to create multiple layers of defense.

**Detect**
This function is concerned with discovering security incidents as they occur—or shortly after. Effective monitoring and alerting systems, such as endpoint or network detection tools, help organizations recognize suspicious activity early.

**Respond**
Once an incident is identified, this area covers how an organization reacts. The objective is to contain the threat, limit damage, and maintain business operations. Having a well-defined incident response plan is essential.

**Recover**
This focuses on restoring systems and operations following an incident. Activities include data restoration, system repairs, and post-incident reviews to strengthen future resilience.

---

### 2. Asset Dimension (Vertical Axis)

This dimension categorizes what is being protected within the organization:

**Devices**
Covers endpoints such as laptops, servers, mobile devices, and other connected hardware.

**Applications**
Focuses on securing software systems from vulnerabilities, misuse, or unauthorized access.

**Networks**
Addresses the protection of communication channels and infrastructure from intrusion or misuse.

**Data**
Centers on safeguarding sensitive information in all states—stored, transmitted, or actively used.

**Users**
Involves training and enabling individuals to follow secure practices and recognize potential threats.

---

### 3. Resource Emphasis (Continuum)

In addition to the two axes, the matrix highlights how reliance on people, processes, and technology shifts across activities. Preventive measures tend to rely more heavily on technology, while detection and response increasingly depend on human involvement. Processes provide consistency throughout all areas.

---

## Why Use This Framework?

The matrix provides a structured way to evaluate and improve an organization's security posture. By mapping tools and practices into the grid, teams can better understand coverage and identify weaknesses.

**Key advantages include:**

- **Spotting Gaps** — Unfilled areas in the matrix can reveal missing capabilities or insufficient controls.
- **Setting Priorities** — Organizations can focus efforts on the most critical risks based on their specific environment and threat landscape.
- **Monitoring Improvement** — The framework can be reused over time to track progress as new solutions are implemented.
- **Encouraging Collaboration** — It creates a shared reference point that helps different teams align on responsibilities and strategy.

---

## Common Ways to Apply the Matrix

Because of its flexibility, this framework can support a variety of security planning and management activities:

- **Performance Measurement** — Helps translate security work into measurable outcomes that can be communicated to stakeholders.
- **Technology Planning** — Identifying gaps makes it easier to plan future investments in tools and capabilities.
- **Resource Planning** — Teams can allocate time and budget more effectively by focusing on the highest-impact risks.
- **Balancing Business Needs** — Supports aligning security controls with operational requirements, avoiding overly restrictive measures.
- **Evaluating Security Tools** — Mapping existing solutions can highlight redundancies or missing coverage.
- **Improving Team Coordination** — The structure provides a common language that helps teams collaborate and ensures smoother transitions during role changes or handoffs.

---

## Running the App

### Local development

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Visit `http://localhost:3000` and sign in with `admin@cdm.local` / `ChangeMe123!`.

### Docker

```bash
docker compose up --build
```

Visit `http://localhost:3001`. The database persists in `./data/cdm.db` on the host.

---

## Credits

The Cyber Defense Matrix framework was created by [@sounilyu](https://x.com/sounilyu).
