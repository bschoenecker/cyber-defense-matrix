# Cyber Defense Matrix Tool

## What is This App?

The Cyber Defense Matrix Tool is a focused web application for mapping, tracking, and communicating your organisation's security controls using the Cyber Defense Matrix (CDM) framework created by Sounil Yu. It gives security teams a single place to document what they have in place, identify where gaps exist, and share that picture with stakeholders — without spreadsheets.

![Matrix Dashboard](images/ss1.png)

---

## Features

### The Matrix Dashboard

The heart of the app is a 5×5 interactive grid. The columns represent the five NIST Cybersecurity Framework functions: **Identify, Protect, Detect, Respond,** and **Recover**, and the rows represent the five asset classes your organisation needs to protect: **Devices, Applications, Networks, Data,** and **Users**.

Each cell in the grid represents a specific security domain. For example, the cell where *Devices* meets *Detect* is where your endpoint detection capabilities live. Click any cell to open it and see the controls mapped there, or to add new ones.

Each cell shows a coverage dot at a glance:
- 🟢 **Green** — all controls in this cell are implemented
- 🟡 **Yellow** — some controls implemented, some still pending
- ⚫ **Grey** — no controls defined yet

A summary bar across the top shows total controls, how many are implemented, how many of the 25 cells have coverage, and your overall implementation rate.

---

### Adding & Managing Controls

Clicking a cell opens a panel where you can create, edit, and manage the security controls that belong there. Each control has a title, an optional description, the tool or technology used, and a status toggle to mark it as implemented or pending.

When adding a control, the form includes a **reference suggestions panel** — a curated library of real-world controls relevant to that specific cell, drawn from industry frameworks and common security practice. Clicking any suggestion pre-fills the form so you can adopt it as-is or customise it to fit your environment.

![Matrix Dashboard](images/ss2.png)

---

### Technology / People / Process Positioning

Every control can be positioned on two independent scales that reflect the CDM's resource continuum:

**Technology ↔ People gradient**
A clickable colour bar that lets you indicate how much a given control relies on technology versus people. The dot starts at 50/50 and can be moved left (more technology-dependent) or right (more people-dependent). The split is shown as a live percentage — for example *Technology 70% / People 30%* — always summing to 100%.

**Process / Govern maturity scale**
A separate green bar represents how mature the process or governance component of that control is, from 0% (just getting started) to 100% (fully embedded).

Both positions are displayed as dots on a live spectrum bar beneath the matrix. When you open a cell, all of its controls appear on the spectrum, making it easy to see at a glance where your programme sits on the people-process-technology continuum.

![Matrix Dashboard](images/ss3.png)

---

### SOA Reference Library

The **SOA Reference** button opens a searchable Security Operations Architecture reference document. It provides descriptions of common security capabilities organised by category, each with subtopics and a one-click copy button — useful for drafting control descriptions or aligning your language with industry-standard terminology.

![Matrix Dashboard](images/ss4.png)

---

### Reporting & Export

**Export PDF Report** generates a professionally formatted A3 landscape PDF report containing:
- An executive summary with key statistics and asset class coverage bars
- The full 5×5 matrix overview with colour-coded implementation status per cell
- A detailed two-column breakdown of every control organised by asset class and NIST function, including tool, description, and notes

**Export CSV** downloads all controls as a flat spreadsheet for use in Excel, Google Sheets, or any reporting tool. Columns include asset class, NIST function, title, description, tool, implementation status, notes, created by, and date.

Both exports are available to all users regardless of role.

![Matrix Dashboard](images/ss5.png)

---

### User Management

Administrators can manage team access from the **User Management** page. Three roles are available:

- **Admin** — full access including user management
- **Editor** — can create, edit, and delete controls, and export
- **Viewer** — read-only access and export; cannot modify controls

Admins can create new users, change roles, deactivate accounts, and reset passwords.



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


- (Mac) - In the **Terminal** app, type or paste this command and press Enter:
   ```
   openssl rand -base64 32
   ```
- (Windows) - Open *PowerShell* and paste this command:
   ```
   [Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Max 256) }))
   ```
- Copy the string.

---

### Step 4 — Add your secret key to the app

- Open the project folder and enter the string you copied here, keeping the quotes:
   ```
   NEXTAUTH_SECRET: "change-me-generate-with-openssl-rand-base64-32"
   ```

---

### Step 5 — Start the app


- Navigate to the project root project folder and run:
   ```
   docker compose up --build
   ```

The first time you run this, it will take **3 to 5 minutes** to download and build everything.

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
