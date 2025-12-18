<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# FoodXpress - Modular React Application

A modular React application for food delivery management with team-based development structure.

## Team & Module Assignment

| Module | Developer | Responsibility |
|--------|-----------|----------------|
| Auth | Janardhan | Authentication & Authorization |
| User Management | Tanushka | User profiles & management |
| Home & Navigation | Aryan | Navigation, header, home page |
| Order Management | Prathamesh | Order processing & tracking |
| Dashboard & Analytics | Mayur | Analytics, reports, dashboard |

## Project Structure

```
reactjsx/src/
├── modules/
│   ├── auth/                    # Janardhan's module
│   ├── user-management/         # Tanushka's module
│   ├── home-navigation/         # Aryan's module
│   ├── order-management/        # Prathamesh's module
│   └── dashboard-analytics/     # Mayur's module
├── shared/                      # Shared components & utilities
├── hooks/                       # Global hooks
├── services/                    # Global services
├── utils/                       # Global utilities
├── styles/                      # Global styles
└── constants/                   # Global constants
```

## Module Structure

Each module follows the same structure:
- `components/` - React components
- `hooks/` - Custom hooks
- `services/` - API services
- `utils/` - Helper functions
- `styles/` - Module-specific styles
- `index.js` - Main export file

## Usage

Import entire modules or specific components:

```jsx
// Import entire module
import { LoginForm, useAuth } from '@/modules/auth';

// Import shared components
import { Button, Modal } from '@/shared';
```

## Development Workflow

1. Each developer works in their assigned module
2. Use shared components from `/shared` folder
3. Export all module components through `index.js`
4. Follow consistent naming conventions
5. Add tests in respective module folders

## Getting Started

```bash
cd reactjsx
npm install
npm run dev
```
>>>>>>> bd73f65ac5e8ae6d713977336b0c68a1ab77c454
