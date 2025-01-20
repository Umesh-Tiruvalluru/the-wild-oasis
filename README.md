# The Wild Oasis

The Wild Oasis is a hotel management system designed to streamline daily operations for hotel employees. This modern, full-stack application provides an intuitive interface for managing cabins, bookings, and guest data while offering analytics about the hotel's performance.

## 🌟 Features

- **Secure Authentication System**

  - Employee-only access with protected routes
  - In-app user registration for hotel staff
  - Customizable user profiles with avatar support

- **Comprehensive Cabin Management**

  - Dynamic table view of all cabins with details
  - CRUD operations for cabin management
  - Photo upload capability for cabin listings
  - Flexible pricing and discount management

- **Advanced Booking System**

  - Complete booking overview with filtering capabilities
  - Check-in/check-out functionality
  - Integrated payment confirmation system
  - Breakfast add-on option during stay

- **Smart Dashboard**

  - Custom charts for sales analysis (total vs extras)
  - Stay duration statistics
  - Real-time occupancy rates
  - Daily check-in/check-out lists
  - 7/30/90-day booking insights

- **Additional Features**
  - Dark mode support
  - Customizable application settings
  - Guest nationality tracking with flag display

## 🛠️ Tech Stack

- **Frontend**

  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn UI for accessible components
  - React Hook Form
  - React Query for state management
  - React Router for navigation

- **Backend**

  - Supabase for backend services
  - Real-time data synchronization
  - Secure authentication
  - File storage for images

- **Development Tools**
  - Vite
  - ESLint
  - TypeScript
  - Prettier

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with 💚 by Umesh Tiruvalluru
