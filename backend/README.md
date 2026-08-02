# 🏥 HospitalOS - Adaptive Resource Scheduling & Secure File Management

An interactive, full-stack Operating System (OS) inspired Hospital Management Platform designed as a medical resource dispatch system. This project models core operating system concepts—such as counting semaphores, process schedulers, wait-for graph cycle detectors, hardware interrupts, and protection rings—inside a hospital simulation environment.

HospitalOS serves as a conceptual OS demonstrating:
- **CPU Scheduling**: Dispatches patient ready queues to medical core units using FCFS, SJF, Multilevel Queue, and Priority + Aging algorithms.
- **Resource Allocation**: Manages clinical resources and monitors usage dynamically.
- **Memory Management**: Simulates shared memory frames and I/O registers through Intensive Care device resource locking.
- **Deadlock Prevention**: Uses all-or-nothing allocation strategy to prevent Hold-and-Wait deadlocks.
- **Synchronization**: Uses custom counting semaphores to coordinate mutual exclusion across competing threads.
- **Secure File Management**: Role-Based access to clinical records and secure file buffers.
- **Protection Rings**: Restricts API routes and console actions based on cryptographic JWT rings (Admin, Receptionist, Doctor, Nurse).
- **Socket Interrupts**: Real-time push updates over Socket.io mimicking hardware interrupts.

### 🔗 Repositories
* **Frontend Console**: [HospitalOS-frontend](https://github.com/tasifhossan/HospitalOS-frontend)
* **Backend Kernel**: [HospitalOS-backend](https://github.com/tasifhossan/HospitalOS-backend)

---

## 📸 Demo & Screenshots

![Kernel Ticking](docs/demo.gif)
*A placeholder for the real-time kernel running FCFS scheduling, resource allocations, and automatic deadlock detection.*

---

## 🧩 OS-Concept-to-Feature Mapping

| OS Concept | HospitalOS Counterpart | Implementation Details & File Reference |
| :--- | :--- | :--- |
| **Counting Semaphore** | Resource Lock Manager | Implemented from scratch as a counting semaphore. P/V operations manage exclusive resource limits. See [Semaphore.ts](file:///d:/pr-project/hospital360/backend/src/core/Semaphore.ts). |
| **CPU Scheduler & Dispatcher** | Adaptive Resource Scheduler | Implements FCFS, SJF, Multilevel Queue, and Priority + Aging schedulers to dispatch patients to doctor/nurse pools. See [SimulationClock.ts](file:///d:/pr-project/hospital360/backend/src/core/SimulationClock.ts). |
| **Deadlock Prevention** | All-or-Nothing Allocation | Verifies all requested resources are available before allocation, preventing hold-and-wait deadlocks. See `canAllocate` in [SimulationClock.ts](file:///d:/pr-project/hospital360/backend/src/core/SimulationClock.ts). |
| **Deadlock Detection** | Double Booking Prevention Engine | Periodically inspects resource occupancy and pending queues to build a directed Wait-For Graph. A Depth-First Search (DFS) detects back-edge cycles. See [DeadlockDetector.ts](file:///d:/pr-project/hospital360/backend/src/core/DeadlockDetector.ts). |
| **Hardware Timer Interrupt** | Scheduler Ticking Heartbeat | Uses a periodic timer interrupt loop to advance scheduler state, evaluate ready queues, and log metrics. See [SimulationClock.ts](file:///d:/pr-project/hospital360/backend/src/core/SimulationClock.ts). |
| **Protection Rings / Security Domains** | Role-Based Access Control (RBAC) | Restricts access to sensitive routes (admin, receptionist, doctor, nurse) based on JWT access roles. See [authMiddleware.ts](file:///d:/pr-project/hospital360/backend/src/server/auth/authMiddleware.ts). |
| **Syslog Monitor** | System Activity Logger | Secure database audit ledger capturing critical state transitions, retrying writes with backoff, and logging to a local fallback file on failure. See [auditLogger.ts](file:///d:/pr-project/hospital360/backend/src/server/auditLog/auditLogger.ts). |

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 15, React 19, Tailwind CSS, Lucide React, Socket.io-client.
* **Backend**: Node.js, Express (HospitalOS Core), Socket.io, TypeScript, Prisma ORM, PostgreSQL (Neon).
* **Testing**: Vitest.

---

## ⚡ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your local/cloud `DATABASE_URL` (PostgreSQL) and custom `JWT_SECRET`.
4. Apply Prisma migrations and database seed (if configured):
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend Core development server:
   ```bash
   npm run dev:server
   ```
   *The server will boot by default on port `4000`.*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables (optional, defaults to localhost):
   - Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL` in `.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:4000
     NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
     ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Tests
To run backend unit tests verifying Resource Lock Manager queue orders, deadlock cycle detection, and activity logger retry mechanisms:
```bash
cd backend
npm run test
```

---

## 🌐 Production Deployment
For step-by-step instructions on deploying the full-stack system manually on Neon/Supabase, Railway/Render, and Vercel, see the [Manual Deployment Guide](file:///d:/pr-project/hospital360/docs/DEPLOYMENT.md).
