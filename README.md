# gym-slot-booking-app
A full-stack Gym Slot Booking Application that allows users to book and manage workout slots, track attendance, and view schedules, while providing an admin panel to manage users, slots, and system settings.
# Gym Slot Booking Backend

## Features
- User Registration & Login (JWT Authentication)
- Role-based Access (Admin/User)
- Slot Booking System
- Attendance Management

## Tech Stack
- FastAPI
- SQLite
- SQLAlchemy

## APIs
- POST /register
- POST /login
- GET /slots
- POST /slots (Admin)
- POST /book
- GET /bookings
- EDIT /booking/{id}

## Run Project
pip install fastapi uvicorn sqlalchemy python-jose passlib[bcrypt]

uvicorn backend.main:app --reload
