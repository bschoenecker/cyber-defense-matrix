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

## Super Easy Installation Guide

This app runs entirely inside Docker, a tool that packages the application so it works the same way on any computer. You do not need to install Node.js, a database, or any programming tools. Docker is the only thing you need.

---

### Step 1 — Install Docker Desktop

Docker Desktop is a free application that lets you run containerised apps like this one.

**On a Mac:**

Go to [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)


**On Windows 11:**

Go to [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)


---

### Step 2 — Get the project

Download and extract the ZIP file, or clone the Git repository.

---

### Step 3 — Generate a secret key

**On a Mac:**

1. In the **Terminal** app, type or paste this command and press Enter:
   ```
   openssl rand -base64 32
   ```
2. Copy the string.

**On Windows:**

1. Open *PowerShell* and paste this command:
   ```
   [Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Max 256) }))
   ```
2. Copy the string.

---

### Step 4 — Add your secret key to the app

1. Open the project folder and enter the string you copied here, keeping the quotes:
   ```
   NEXTAUTH_SECRET: "change-me-generate-with-openssl-rand-base64-32"
   ```

---

### Step 5 — Start the app


1. Navigate to the project root project folder and run:
   ```
   docker compose up --build
   ```

The first time you run this, it will take **3 to 5 minutes** to download and build everything. You will see a lot of text scrolling by — that is normal. It is finished when you see a line that says **"Ready"**.

---

### Step 6 — Open the app

Open any web browser and go to:

```
http://localhost:3001
```

Sign in with the default credentials:

- **Email:** `admin@cdm.local`
- **Password:** `ChangeMe123!`

> You should change the default password after your first login via the User Management page.

---

### Starting and stopping the app

To **stop** the app, use `Control + C`.

To **start** it again later, run `docker compose up` but without `--build`, which makes it much faster.

---

### Your data

All of your data is stored in a file called `cdm.db` inside a `data` folder in the project directory. To back up your work, simply copy that file somewhere safe. To restore it, copy it back.

---

## Credits

The Cyber Defense Matrix framework was created by [@sounilyu](https://x.com/sounilyu).
