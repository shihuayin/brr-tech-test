# BRR IT Dashboard

**Live Demo (recommended to try):** https://brr-tech-test.vercel.app/

**Repository：** https://github.com/shihuayin/brr-tech-test.git

---

## Overview

This project is an internal staff dashboard built with React + Firebase. It includes a staff directory, IT request form, ticket tracking, and to-do list.

- **Database: Firebase**  
  To simulate a real multi-device collaboration scenario, all data (staff list, tickets, todos) are stored in Firebase Firestore (real-time database). This enables cross-device, cross-user synchronization.
- **Sample Data Pre-imported**  
  I have used scripts/import.js to import sample data into Firestore, so serviceAccountKey.json is not included in this repo.
- **Login Simulation**
  On the Welcome page, the current user is stored in sessionStorage. Clicking “Login as User” / “Login as Admin” will persist after refresh.
- **Firebase Configuration**  
  For review convenience, the client initialization config in `src/firebase.js` is committed. No extra environment variables are needed.
  > ⚠️ In production, extract sensitive fields from `src/firebase.js` into a .env file and add it to .gitignore.

---

## Quick Start Locally

1. Clone the repo

   ```bash
   git clone https://github.com/shihuayin/brr-tech-test.git
   cd brr-tech-test
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm start
   ```

   Visit [http://localhost:3000](http://localhost:3000)，then click “Login as User” / “Login as Admin” to enter the dashboard.

4. Run unit tests

   ```bash
   npm test
   ```

---

## Completed Core Features

- **Dashboard Home**

  - Welcome message
  - **Unresolved Tickets** card:

    - Admin: count and display all users' unresolved tickets (including **Open** and **In Progress**)
    - Regular user: count and display their own unresolved tickets (including **Open** and **In Progress**)

  - **My Pending Tasks** card: display the number of incomplete to-do items for the current user

  - **Latest Updates** list:

    - Take the 3 most recent visible tickets
    - Sort by creation time descending (newest first)
    - Admin can see submitter info (username + email)

- **Staff Directory**

  - Regular user: view each staff member’s name, role, email, and status (active/inactive)
  - Admin: additionally see “Last Login”, “Google Drive Usage”, and “Current Device”

- **IT Request**

  - Select issue type from dropdown
  - Fill description and simulate file upload
    - After selecting a file, displays `Uploading...`, and after 2 seconds shows `Uploaded: filename`
  - “Submit Request” button becomes enabled when the form is complete

- **Ticket List**

  - **Regular user**: only shows tickets submitted by the current user
  - **Admin**: shows all submitted tickets
  - Filter by status（All / Open / In Progress / Resolved）
  - Sorting logic：

    1. Group by status priority：`Open` → `In Progress` → `Resolved`
    2. Within each status group, sort by creation time descending (newest first)

- **To-Do List**

  - Add, edit, and delete tasks
  - Check the checkbox to mark complete/incomplete, and automatically move completed items to the bottom

---

## Completed Bonus Features

- **Admin View**
  Staff directory shows last login, Drive usage, device
- **Routing Navigation**
  Page switching based on React Router
- **Styling**
  Uses Tailwind CSS
- **Reusable Components**
  `Card`、`FormField`、`StaffCard`、`TicketRow`、`TodoItem`
- **Unit Tests**
  Tests for `Card`、`StaffCard`、`TicketRow`、`ITRequest`

---

## Unfinished Bonus Items

- **TypeScript**
  Currently all JavaScript

---

## Future Improvements

- **Real Authentication**：integrate Firebase Auth to persist login state
- **Env Variable Management**：extract `src/firebase.js` config into `.env` and secure keys
- **Real File Upload**：integrate Firebase Storage to support actual file upload/download
- **Pagination/Search**：add pagination or keyword search for staff and tickets lists
