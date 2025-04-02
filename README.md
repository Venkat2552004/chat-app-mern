# Gossimp (A place where simps can gossip)

This is a Real-Time Chat Application built using the MERN Stack.

**Status:** In development

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Tech Stack

**Client:** React, TailwindCSS  
**Server:** Node.js, Express.js, Socket.io, JWT  
**Database:** MongoDB

## Features

- Real-time messaging using Socket.io
- User authentication with JWT
- Responsive design with TailwindCSS
- MongoDB for data persistence
- Scalable architecture with MERN stack

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/gossimp.git
   cd gossimp
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     SOCKET_PORT=your-socket-port
     ```

4. Start the application:

   ```bash
   # Start the server
   cd server
   npm start

   # Start the client
   cd ../client
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to start chatting in real time.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
