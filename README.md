🍔 FoodXpress – Modular React Food Delivery Application

FoodXpress is a scalable, professional, and modular **React-based food delivery application** designed for efficient collaborative, team-based development.

**The core architectural principle is modularity:** Each major feature is implemented as an independent module, ensuring clean separation of concerns, high maintainability, and enabling parallel development by a team.

🌐 **Live Demo:** [https://food-xpress-one.vercel.app/](https://food-xpress-one.vercel.app/)

## 📌 Key Highlights

* **⚙️ Modular Architecture:** Each feature (Auth, Orders, Dashboard) is an isolated, independent module.
* **👥 Team-Based Development:** Clear responsibility boundaries for parallel work.
* **♻️ Reusable Shared Components:** Common UI elements and utilities reside in the `/shared` directory.
* **🚀 Scalable Structure:** Easy to extend with new features simply by adding new modules.
* **📦 Clean Imports:** Modules export all public components/hooks/services via a central `index.js`.

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn

### Installation & Run

```bash
# Clone the repository
git clone https://[https://github.com/your-username/FoodXpress.git](https://github.com/your-username/FoodXpress.git)
cd FoodXpress

# Install dependencies
npm install # or yarn install

# Run the development server
npm run dev

```

The application will now be running locally on: `http://localhost:5173`

## 👨‍💻 Team & Module Responsibilities

| Module | Developer | Responsibility |
| --- | --- | --- |
| **Auth** | Janardhan | Authentication & Authorization (Login, Signup, Forgot Password) |
| **User Management** | Tanushka | User profiles, account settings & management |
| **Home & Navigation** | Aryan | Navigation bar, main layout, and landing home page |
| **Order Management** | Prathamesh | Order creation, real-time tracking, status updates, and history |
| **Dashboard & Analytics** | Mayur | Analytics, reports, and admin-level dashboard views |

## 🏗️ Project Structure

The project employs a structured layout to enforce separation of concerns.

```
FoodXpress/src/
├── modules/                   # 🛑 INDEPENDENT TEAM-OWNED FEATURE MODULES
│   ├── auth/                  
│   ├── user-management/       
│   ├── home-navigation/       
│   ├── order-management/      
│   └── dashboard-analytics/   
│
├── shared/                    # ♻️ Reusable Components (Button, Modal, Card)
├── hooks/                     # Global custom hooks (e.g., useLocalStorage)
├── services/                  # Global API setup (e.g., axios instance, base URL)
├── utils/                     # Utility/helper functions (e.g., date formatting)
├── styles/                    # Global styles & theme setup
└── constants/                 # Application-wide constants (e.g., API paths)

```

### 📦 Module Structure Convention

Every module strictly adheres to this internal structure for consistency and maintainability:

```
module-name/
├── components/     # React components specific to this module
├── hooks/          # Module-specific custom hooks
├── services/       # Module-specific API calls/data fetching
├── utils/          # Module-specific helper functions
├── styles/         # Module-specific styles
└── index.js        # Central export file (REQUIRED)

```

✅ **Important:** All components, hooks, and services intended for use outside the module *must* be exported via `index.js`.

### 🔄 Usage & Imports

This convention ensures clean, high-level imports:

| Intent | Example Import |
| --- | --- |
| **Importing an entire module** | `import { LoginForm, useAuth } from '@/modules/auth';` |
| **Importing shared components** | `import { Button, Modal } from '@/shared';` |

## 🧠 Architectural Principles

The codebase is built on these foundational principles:

1. **Separation of Concerns:** Each module handles one core feature.
2. **Single Responsibility Principle (SRP):** Clear purpose for every file and component.
3. **Loose Coupling:** Modules are independent and rely on shared components, not each other.
4. **High Reusability:** Emphasis on creating and using components in `/shared`.
5. **Scalable Codebase:** Structure is designed to easily accommodate future growth and complexity.

## 📌 Future Enhancements

* Role-based access control (RBAC) for different user types.
* Payment gateway integration (e.g., Stripe).
* Real-time order tracking using WebSockets.
* Advanced admin-level analytics and reporting.
* Mobile responsiveness improvements.

## 📄 License

This project is intended for educational and demonstration purposes as a team project template.
