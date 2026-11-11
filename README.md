# SkillSwap – Community Learning Exchange

SkillSwap is a skill-exchange platform that helps people discover learning partners based on the skills they want to learn and the skills they can teach.

Users can create a profile, manage their skills, discover compatible skill matches, send exchange requests, and explore community skill trends through a personalized dashboard. The platform also integrates AI-powered features to provide intelligent skill matching and personalized learning path recommendations.

## Live Demo

- **Frontend:** https://skillswap-three-coral.vercel.app/
- **Backend API:** https://skillswap-backend-ofwf.onrender.com/api

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
- Calculate match percentages
- Sort matches based on match scores
- AI-powered skill matching suggestions
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

### AI-Powered Features

**1. AI Skill Matching**
- Analyze users' skills to teach and skills to learn.
- Identify compatible learning partners.
- Provide intelligent matching suggestions based on skill compatibility.

**2. AI-Powered Learning Paths**
- Generate personalized learning paths using AI.
- Use the user's learning interests and existing skills.
- Provide structured learning steps for each recommended skill.
- Include descriptions and suggested activities to guide learning progress.

**3. Skill Demand Insights**
- Analyze community skill data.
- Identify popular and in-demand skills.
- Visualize skill supply and demand.
- Provide insights into learning trends across the community.

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
- Show member locations
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

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

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

### AI Integration
- Groq API
- AI-powered skill matching
- AI-generated personalized learning paths

### Notifications
- React Toastify

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## Project Structure

### Frontend
React application containing pages, reusable components, API services, state management, and styling.

### Backend
Express application containing routes, controllers, models, authentication middleware, database configuration, and AI integration.

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=your_backend_api_url
```

### Backend (.env)

```env
PORT=3001
MONGODB_URL=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

**Note:** Keep environment variables and API keys private. Never commit `.env` files to GitHub.

---

## Deployment

- Frontend is deployed on Vercel.
- Backend is deployed on Render.
- MongoDB Atlas is used for cloud database storage.
- Groq API is used for AI-powered features.

