# Neon Dreams Portfolio

A stunning, interactive, and modern developer portfolio built with React, TypeScript, and Vite. This project showcases a futuristic "Neon Dreams" aesthetic with 3D interactions, dynamic data fetching, and sleek UI components.

## 🚀 Features

- **3D Interactive Profile Card:** A fully interactive 3D profile card that responds to mouse movements, featuring a custom preview modal and zoom controls.
- **Dynamic GitHub Commits:** Integrates directly with the GitHub API to fetch and display the author's real-time commit count without requiring manual updates.
- **Modern Tech Stack:** Built with React 18, Vite for lightning-fast bundling, and TypeScript for strict type safety.
- **Neon Glassmorphism UI:** Features a sleek dark mode aesthetic with custom neon borders, glowing hover effects, and smooth Tailwind CSS transitions.
- **Project Showcase:** A dynamic projects grid showcasing featured repositories with direct live links and GitHub repository links.
- **Responsive Design:** Fully responsive layout that looks great on mobile devices, tablets, and large desktop screens.

## 🛠️ Technologies Used

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Custom [shadcn/ui](https://ui.shadcn.com/) inspired components

## 📦 Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ITZBOBO/terminal-portfolio.git
   cd neon-dreams-portfolio-main
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080/` (or your configured Vite port).

## 💡 Key Implementations

- **`ProfileCard3D.tsx`:** Manages the 3D tilt effect on mouse move and uses a `useEffect` hook to asynchronously query `api.github.com/search/commits?q=author:ITZBOBO` for the dynamic commit counter.
- **`ProjectsSection.tsx`:** Renders the interactive grid of projects, mapping over a data array to display dynamic image covers, descriptions, and technology tags.

## 👨‍💻 Author

Built by **ITZBOBO**. You can view my public repositories and recent commits on my [GitHub Profile](https://github.com/ITZBOBO).
