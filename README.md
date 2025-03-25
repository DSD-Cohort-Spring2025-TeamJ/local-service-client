# Local Service Booking Frontend

This is the frontend application for the **Local Service Booking Platform**, built with **React** and **Vite**, featuring dynamic appointment scheduling, Google Calendar integration, and admin controls.

---

## 🚀 Features

- Service booking/appointment scheduler
- Google OAuth login and calendar sync for admin
- Dynamic time slot selection based on technician availability & estimated duration of service
- Admin dashboard for reviewing appointments and adding notes
- Item inventory stock levels and order management
- Appointment confirmation and status management
- Display of synced Google Calendar events with clickable links
- Integrated currency formatting and spend tracking components

---

## 🛠 Technologies Used

- **React 18 (Vite)**
- **Tailwind CSS**
- **FullCalendar**
- **JWT authentication**
- **Fetch API & custom hooks for APIs**
- **Google OAuth**

---

## 📂 Project Structure

```
src
│
├── assets/
├── components/
│   ├── AppointmentDetails.jsx
│   ├── AppointmentScheduler.jsx
│   ├── AppointmentsList.jsx
│   ├── Button.jsx
│   ├── CalendarEvents.jsx
│   ├── ClientInfoForm.jsx
│   ├── Contact.jsx
│   ├── DataGrid.jsx
│   ├── DayCard.jsx
│   ├── Footer.jsx
│   ├── Gallery.jsx
│   ├── GoogleOAuthSetup.jsx
│   ├── Header.jsx
│   ├── IssueDescriptionForm.jsx
│   ├── Logo.jsx
│   ├── Message.jsx
│   ├── Modal.jsx
│   ├── Nav.jsx
│   ├── Pipe.jsx
│   ├── ReviewData.js
│   ├── Reviews.jsx
│   └── Services.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── Context.jsx
│
├── hooks/
│   ├── useAppointmentDetailActions.jsx
│   ├── useAppointments.jsx
│   ├── useFetchWithAuth.jsx
│   ├── useMultistepForm.jsx
│   └── useNotification.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── ServiceRequest.jsx
│   └── Signup.jsx
│
├── utils/
│   ├── formatDateRange.js
│   └── statusColors.js
│
├── css/
│   └── App.css
├── index.css
├── App.jsx
├── main.jsx
```

---

---

## ✅ Setup Instructions

1. Clone the repository:

```
git clone https://github.com/DSD-Cohort-Spring2025-TeamJ/local-service-frontend.git
cd local-service-frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Access the app:

```
http://localhost:5173
```

---

## 🌐 Live Demo

> [https://thepragmaticplumber.netlify.app/](https://thepragmaticplumber.netlify.app/)

---

## 📅 Google Calendar Setup

- Ensure backend Google OAuth callback is configured.
- After OAuth authentication, JWT token is stored and used for secure calendar requests.
- Events display in the calendar with clickable links.

---

## 📜 License

[MIT](LICENSE)
