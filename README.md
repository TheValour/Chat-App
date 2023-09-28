# Chat App Readme

## Overview

This Chat App is a real-time messaging application built using React.js and Firebase. It allows users to sign in and exchange messages in real-time. This README provides essential information for setting up and using the Chat App.

## Features

- User authentication: Users can sign in using their email and password .
- Real-time messaging: Chat in real-time with other users within chat rooms.
- Create and join rooms: Users can create new chat rooms and join existing ones.
- Message history: Access the chat history for each room.

## Prerequisites

Before you can run the Chat App locally or deploy it, make sure you have the following prerequisites installed:

- Node.js and npm: You can download and install them from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

Follow these steps to set up and run the Chat App:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/TheValour/Chat-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chat-app
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create a Firebase project and set up Firebase Authentication and Firestore. Refer to Firebase documentation for details: [https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup).

5. Create a `.env` file in the project's root directory and add your Firebase configuration information as follows:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   Replace the placeholders with your Firebase project's configuration values.

6. Start the development server:

   ```bash
   npm start
   ```

7. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Chat App.

## Usage

1. Sign in or create an account using your email and password.

2. Once logged in, you can:
   - Search for a user to start the chat.
   - Chat with the existing user in your chat history.
     
     ![image](https://github.com/TheValour/Chat-App/assets/108991640/f52a3876-7bfd-4b0f-9f26-b5fe2d64215d)


3. Inside a chat room, you can send messages, see who's online, and access the chat history.

   ![image](https://github.com/TheValour/Chat-App/assets/108991640/347240d8-ff06-4c57-b045-13e1c459c784)

4. User can also intrect with other user vie send emoji 😍.
 
5. To log out, click the "Logout" button.

## Deployment

To deploy the Chat App to a production environment, you can follow the deployment guides for React.js applications. Some popular hosting options include Firebase Hosting, Netlify, and Vercel.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This Chat App is open-source software licensed under the [MIT License](LICENSE).

## Acknowledgments

This project was made possible by the contributions of the open-source community and the following libraries and technologies:

- [React.js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [Emoji-picker-React](https://www.npmjs.com/package/emoji-picker-react)

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainer.
Enjoy chatting with the Chat App! 🚀
