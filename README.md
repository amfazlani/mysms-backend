# 📱 MySMS Messenger

**MySMS Messenger** is a full-stack web application that allows users to send and view SMS messages using the Twilio API. Messages are stored in a MongoDB database and filtered by session or authenticated user. Built with Angular (frontend) and Ruby on Rails (API backend).

---

## 🛠 Tech Stack

| Layer       | Technology                                  |
|-------------|----------------------------------------------|
| Frontend    | [Angular](https://angular.io/)               |
| Backend     | [Ruby on Rails (API mode)](https://rubyonrails.org/) |
| Database    | [MongoDB](https://www.mongodb.com/) via Mongoid |
| SMS Gateway | [Twilio API](https://www.twilio.com/)        |
| Auth        | [Devise](https://github.com/heartcombo/devise) (Bonus) |
| Deployment  | Vercel/Netlify (Frontend), Render/Fly.io (Backend) |

---

## 🚀 Features

- ✅ Send SMS messages using Twilio
- ✅ Store and list sent messages
- ✅ View messages by user
- ✅ Track Twilio delivery status with webhooks
- ✅ Responsive and modern UI with Angular
- ✅ User authentication (Bonus)
- ✅ Live deployment (Bonus)

---

## Live Demo

The app is hosted live at:  
**[https://adorable-bavarois-28bb02.netlify.app](https://adorable-bavarois-28bb02.netlify.app)**

You can use the test Twilio virtual number for sending messages during testing:

**Test Virtual Number:** `+1 877-780-4236`


## 📦 Installation

### 🔧 Prerequisites

- Node.js + npm
- Ruby & Rails
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Twilio account (free)

---

### ⚙️ Backend (Ruby on Rails + MongoDB)

1. Clone the repository:

  ```bash
  git clone https://github.com/amfazlani/mysms-backend.git
  cd mysms-backend
  ```

2. Install Ruby dependencies:

  ```bash
  bundle install
  ```

3. Set up Mongoid configuration:

  ```bash
  rails g mongoid:config
  ```

4. Create .env file and add Twilio credentials:

  ```bash
  TWILIO_SID=your_twilio_account_sid
  TWILIO_TOKEN=your_twilio_auth_token
  TWILIO_PHONE=your_twilio_virtual_number
  BASE_URL=http://localhost:3000
  CLIENT_URL=http://localhost:4200
  ```

5. Start Rails server:

  ```bash
rails server
  ```

The API will be available at http://localhost:3000


### 🖥️ Frontend (Angular)

1. Navigate to the frontend directory:

  ```bash
cd ../frontend
  ```

2. Install Angular dependencies:

  ```bash
npm install
  ```


3. Start the Angular dev server:

  ```bash
ng serve
  ```

The app will open at http://localhost:4200

### 📦 Example usage in Angular

Authentication is handled using [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth), which provides token-based auth for APIs.

After a successful login or registration using `devise_token_auth`, capture the authentication headers from the response and use them in all subsequent API requests:

```ts
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'access-token': token,    // Received from login/register response
  'client': clientId,       // Received from login/register response
  'uid': uid                // Received from login/register response
});

this.http.get(`${environment.apiBaseUrl}/messages`, { headers })
  .subscribe(response => {
    console.log(response);
  });

```


## 🧪 API Reference.

| Method  | Endpoint                 |  Description                           |
|---------|--------------------------|----------------------------------------|
| POST    | `/api/messages`          |   Send a new SMS message               |
| GET     | `/api//messages`         |   Get messages for current session/user|
| POST    | `/api/messages/status`   |   Webhook to update delivery status    |
| POST    | `/auth/sign_in`          |   Sign in  (Devise - Bonus)            |
| DELETE  | `/auth/sign_out`         |   Sign out (Devise - Bonus)            |
| POST    | `/auth`                  |   Sign Up (Devise - Bonus)             |
