# 📱 MySMS Messenger

**MySMS Messenger** is a full-stack web application that allows users to send and view SMS messages using the Twilio API. Messages are stored in a MongoDB database, and only messages sent by a specific user (via session or authentication) are visible. Built with Angular and Ruby on Rails.

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | [Angular](https://angular.io/) (Latest stable) |
| Backend     | [Ruby on Rails](https://rubyonrails.org/) (API mode) |
| Database    | [MongoDB](https://www.mongodb.com/) via Mongoid |
| SMS Gateway | [Twilio API](https://www.twilio.com/) |
| Authentication (Bonus) | Devise (Ruby gem) |
| Hosting (Bonus) | Netlify/Vercel (Frontend), Render/Fly.io (Backend) |

---

## 🚀 Features

- ✅ Send SMS messages using Twilio
- ✅ Store and list sent messages
- ✅ Filter messages by session ID or authenticated user
- ✅ Twilio webhook integration for delivery status tracking
- ✅ Clean and responsive UI (Angular)
- ✅ Deployed full-stack demo (Bonus)

---

## 📸 UI Wireframe

> A simple UI with a form to send a message and a list of sent messages with delivery status.  
> *(Insert a screenshot or wireframe image here if available)*

---

## 📦 Installation

### Backend (Rails + MongoDB)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mysms-messenger.git
   cd mysms-messenger/backend
Install dependencies:

bash
Copy
Edit
bundle install
Configure Mongoid:

bash
Copy
Edit
rails g mongoid:config
Set environment variables:

Create a .env file or configure Rails credentials:

env
Copy
Edit
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_virtual_number
Start the Rails server:

bash
Copy
Edit
rails server
Frontend (Angular)
Navigate to frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the Angular development server:

bash
Copy
Edit
ng serve
Open in browser at http://localhost:4200

