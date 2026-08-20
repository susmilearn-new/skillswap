# SkillSwap

SkillSwap is a skill-exchange platform that helps people discover learning partners based on the skills they want to learn and the skills they can teach.

Users can create a profile, manage their skills, discover skill matches, send exchange requests, and explore community skill trends through a personalized dashboard.

## Live Demo

https://skillswap-three-coral.vercel.app/

## Features

### Authentication

- User registration
- User login
- Form validation using Formik and Yup
- Protected dashboard access
- Persistent authentication state using Zustand
- Logout functionality

### User Profile

- View user information
- Manage skills to learn
- Manage skills to teach
- Update profile information
- Display user initials/avatar

### Skill Matching

- Match users based on compatible skills
- Identify skills the current user can teach
- Identify skills the matched user can teach
- Calculate a match percentage
- Sort matches based on match score
- Send skill exchange requests
- Request confirmation modal
- Request sent state

### Dashboard

The dashboard provides an overview of the user's SkillSwap activity.

It includes:

- Dashboard overview
- Skill matches
- Skill demand insights
- Saved users
- Profile information
- Community information

### Skill Demand Insights

The Trends page provides community-level skill insights.

It includes:

- Total skill categories
- Active learner count
- Session statistics
- Supply vs. demand chart
- Popular skill categories
- Learning path recommendations

### Community

- Display community members
- Show member location
- Display skills users can teach
- Display skills users want to learn
- Show ratings and session information

### Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

Tailwind CSS is used for responsive layouts and styling.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router DOM
- Tailwind CSS

### State Management

- Zustand
- Zustand Persist Middleware

### Forms & Validation

- Formik
- Yup

### UI & Icons

- Lucide React

### Charts

- Recharts

### Notifications

- React Toastify

### Deployment

- Vercel
