# Email Builder Web App

## Overview
The **Email Builder** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). This application enables users to create, edit, and preview email templates with an intuitive user interface. The app also utilizes **EJS template engine** for setting up and rendering the initial email layout and **React Quill** for text manipulation, making the process of building professional emails seamless.

---
![image](https://github.com/user-attachments/assets/2e91f046-b9a8-4d78-a795-74875981c926)
![image](https://github.com/user-attachments/assets/02cf7429-b285-454f-bd71-76d93e214a11)

## Features

### Frontend
- **React Quill Integration**: A powerful WYSIWYG editor for easy text formatting and manipulation.
- **Dynamic Email Design**: Interactive UI to customize email templates in real-time.

### Backend
- **Node.js & Express.js**: Robust API to handle requests and manage email templates.
- **EJS Template Engine**: Predefined layout rendering for initial email design setup.

### Database
- **MongoDB**: Stores user email templates and customization data efficiently.

---

## Technologies Used

### Frontend
- React.js
- React Quill
- Tailwind CSS (or your preferred styling library/framework)

### Backend
- Node.js
- Express.js
- EJS (Embedded JavaScript templates)

### Database
- MongoDB

---

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager) or Yarn
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/email-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd email-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Start the backend server:
   ```bash
   npm run server
   ```
6. Access the app in your browser at `http://localhost:3000` (or as specified).

---

## Usage
1. Open the app in your browser.
2. Select or create a new email template.
3. Use the React Quill editor to customize the content and formatting.
4. Save the template to the database or export it as needed.
5. Preview the email layout in the app.

---

## Project Structure
```
email-builder/
├── client/         # React frontend
├── api/         # Node.js backend
    ├── views/          # EJS templates
    ├── models/         # MongoDB models
    ├── routes/         # API routes
    ├── public/         # Static files
```

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or report an issue.

---

## Acknowledgments
- **React Quill** for providing a great text editor.
- **EJS** for seamless templating.
- **MERN Stack** for enabling rapid full-stack development.

---

## Contact
For inquiries or support, please reach out at your-abhishek981037@gmail.com.
