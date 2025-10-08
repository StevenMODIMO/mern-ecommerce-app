# MERN E-Commerce Store

Welcome to the MERN E-Commerce Store! This project is a fully functional e-commerce application built using the MERN stack, which consists of MongoDB, Express.js, React.js, and Node.js. This application serves as a robust platform for users to browse, search, and purchase products seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Product Management**: Admin panel for adding, updating, and deleting products.
- **Shopping Cart**: Users can add products to their cart and manage their orders.
- **Responsive Design**: Mobile-friendly interface for an optimal shopping experience on any device.
- **Search Functionality**: Users can easily search for products using keywords.
- **Payment Integration**: Seamless payment processing with popular payment gateways.
- **Order History**: Users can view their past orders and track their status.

## Technologies Used

- **MongoDB**: NoSQL database for storing product and user data.
- **Express.js**: Web framework for Node.js to build the backend API.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.
- **Redux**: State management for handling application state.
- **Bootstrap**: CSS framework for responsive design.

## Installation

To get started with the MERN E-Commerce Store, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-ecommerce-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd mern-ecommerce-app
    ```
3. Install the backend dependencies:
    ```bash
    cd backend
    npm install
    ```
4. Install the frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

5. Set up your environment variables in a `.env` file in the backend directory:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

6. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

7. Start the frontend application:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

Once the application is running, you can access it at `http://localhost:3000`. Users can register, log in, browse products, and make purchases. Admin users can manage products and view orders.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the MERN E-Commerce Store! We hope you find it useful for your e-commerce needs. Feel free to customize this README to fit your project requirements.