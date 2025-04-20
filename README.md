# React E-commerce Website

This project is a modern e-commerce web application built with React, Tailwind CSS, and TypeScript. It provides a user-friendly shopping experience for customers and powerful management tools for administrators.

## 🚀 Features

### Customer Features

- **Home Page**: Dynamic category menu and featured product showcase
- **Product Browsing**: Browse products by categories
- **Product Details**: View comprehensive product information including:
  - Product name and high-quality images
  - Detailed descriptions
  - Pricing
  - Customer ratings and reviews
- **User Authentication**: Secure register and login/logout functionality
- **Product Rating**: Ability to rate and review products
- **Responsive Design**: Optimized for desktop and mobile devices

### Admin Features

- **Secure Admin Panel**: Role-based authentication system
- **Category Management**: Create, edit, and delete product categories
- **Product Management**: Comprehensive product administration with:
  - Basic information (name, price)
  - Category assignment
  - Description editor
  - Image upload and management
  - Featured product designation
  - Creation and update timestamps
- **Customer Management**: View and manage customer accounts with:
  - Contact information
  - Account details
  - Account creation and update history

## 🛠️ Technology Stack

- **Frontend**: React 19.0.0 with TypeScript
- **Styling**: Tailwind CSS 4.1.4
- **State Management**: Zustand 5.0.3
- **API Communication**: Axios 1.8.4
- **Form Validation**: Zod 3.24.3
- **Build Tool**: Vite 6.3.1

## 📋 Prerequisites

- Node.js (18.x or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Navigate to the project directory:

   ```bash
   cd rookie-react
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```bash
   http://localhost:5173
   ```

## 📝 Project Structure

```bash
  assignment-react/
├── src/
│   ├── assets/        # Static assets like images
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts for state management
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Layout components
│   ├── pages/         # Application pages
│   ├── services/      # API services
│   ├── store/         # Zustand state stores
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Public assets
├── [index.html](http://_vscodecontentref_/1)         # HTML template
├── [tsconfig.json](http://_vscodecontentref_/2)      # TypeScript configuration
├── [vite.config.ts](http://_vscodecontentref_/3)     # Vite configuration
└── [package.json](http://_vscodecontentref_/4)       # Project dependencies and scripts
```

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the dist/ directory.

## 📚 Additional Information

- The authentication system uses JWT tokens for secure user sessions
- Product images are managed through a CDN for optimal performance
- The admin panel is protected with role-based access control

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```bash
The README.md has been updated with the e-commerce website documentation.The README.md has been updated with the e-commerce website documentation.
```
