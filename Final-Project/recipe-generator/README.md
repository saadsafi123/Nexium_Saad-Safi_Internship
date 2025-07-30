# Grand Project

# 🍳 AI-Powered Recipe Generator 🍳

A modern, full-stack web application that intelligently generates custom recipes from user-provided ingredients. Built as the **Grand Project** for the **Nexium AI-First Web Development Internship**.

This project showcases a complete, production-ready application featuring a sophisticated UI/UX, a dual-engine AI core using **Google Gemini API** and **n8n**, and a robust dual-database architecture with **Supabase (PostgreSQL)** and **MongoDB Atlas**.

---

## 🚀 Live Demo & Walkthrough

* **Experience DishGen live:** [`https://dishgen-ai.vercel.app`](https://dishgen-ai.vercel.app/)
* **Watch the video tour:** ``

---

## ✨ Features

This project delivers a comprehensive set of functionalities, demonstrating a mastery of modern web development and AI integration.

### User Experience & Interface
* **Aesthetic & Modern UI:** A clean, polished, and fully responsive user interface built with Next.js and ShadCN UI, featuring a custom theme and subtle background gradients.
* **Dynamic Theme Switching:** Seamlessly toggle between **Light** and **Dark** modes.
* **Animated Navbar:** A sticky, transparent navbar with a continuously animated logo, hover effects, and a fully functional slide-out menu for mobile devices.
* **Advanced Recipe Form:**
    * **Dual Generation Engine:** Users can choose between the "Public AI Model" (direct Gemini API call) for deployment and a "Local n8n Workflow" for development.
    * **Ingredient Strictness Control:** A radio button option to instruct the AI to be "Flexible" or "Strict" with the provided ingredients.
    * **Helpful Popovers:** Intuitive info icons provide help text on tap/click, ensuring a clean UI.
* **Professional Loading States:** An animated **skeleton loader** appears while the AI generates a recipe, providing an excellent user experience.
* **Polished Recipe Display:** Generated and saved recipes are displayed in a beautiful, magazine-style card layout with clear sections for stats, ingredients, and instructions.
* **Efficient Actions:**
    * **Save, Print, Generate New:** A clean, icon-based button group for managing generated recipes.
    * **Interactive Rating System:** An interactive 5-star component allows users to rate recipes.

### Data Management & Personalization
* **Personal Recipe Book ("My Recipes"):** View a chronological, searchable, and sortable list of all saved recipes, stored in **Supabase (PostgreSQL)**.
* **Advanced Controls:** Users can **search** by name and **sort** recipes by "Newest," "Oldest," or "Highest Rated."
* **Secure Deletion:** Deleting history entries is handled safely with a modern confirmation dialog.
* **Community Discovery ("Explore" Page):**
    * **Data-Driven Tabs:** View recipes categorized by "Most Saved," "Highest Rated" (from Supabase), and "Recently Generated" (from MongoDB).
    * **Varied Interactions:** Saved/Rated recipes link to a public, read-only detail page, while recent generations are shown in a pop-up modal.
* **Detailed View:** Clicking a saved recipe leads to a dedicated page displaying the complete recipe details, where the user can also update their rating or delete the recipe.

### Backend & AI Integration
* **Dual AI Engine:**
    * The public-facing engine makes direct calls to the **Google Gemini API** from a Next.js API route for fast, scalable generation.
    * A secondary engine demonstrates automation principles by calling a local **n8n workflow**.
* **Dynamic Prompt Engineering:** The prompt sent to the AI is dynamically constructed based on all user preferences, including cuisine, dietary needs, and ingredient strictness.
* **Dual Database Architecture:**
    * **Supabase (PostgreSQL):** Stores structured user and recipe data (name, instructions, ingredients, ratings, etc.).
    * **MongoDB Atlas:** Persists all raw AI generation logs, capturing both the user's request and the AI's response for analytics and the "Recent" feed.
* **Robust API Routes:** Secure Next.js API routes handle all backend logic, including AI processing and all database interactions (CRUD operations).

---

## 🚀 Usage

### Recipe Tab:
* Enter ingredients you have on hand.
* Select your **Ingredient Mode** (Flexible or Strict).
* Choose your preferences (Cuisine, Meal Type, Difficulty, Dietary Needs).
* Select your **Generation Engine** (Public AI or Local n8n).
* Click "Generate Recipe" and view the result.
* Use the Save, Print, or Rate buttons on the generated recipe card.

### My Recipes Tab:
* See a list of all your saved recipes.
* Use the search bar and sort dropdown to find specific recipes.
* Click any card to go to a detailed view where you can update your rating or delete the recipe.

### Explore Tab:
* View community recipes in three categories.
* Click a "Most Saved" or "Highest Rated" card to see its read-only detail page.
* Click a "Recent" card to see its details in a pop-up modal.

---

## 🛠️ Tech Stack

* **Framework:** [**Next.js 15 (App Router)**](https://nextjs.org/)
* **UI Library:** [**ShadCN UI**](https://ui.shadcn.com/)
* **Styling:** [**Tailwind CSS**](https://tailwindcss.com/)
* **Theming:** [**Next Themes**](https://github.com/pacocoursey/next-themes)
* **Language:** [**TypeScript**](https://www.typescriptlang.org/)
* **AI / LLM:** [**Google Gemini API**](https://ai.google.dev/) (`@google/generative-ai` SDK)
* **Automation:** [**n8n**](https://n8n.io/) (for local workflow development)
* **Database (Structured):** [**Supabase**](https://supabase.com/) (PostgreSQL)
* **Database (Unstructured):** [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas)
* **Form Management:** [**React Hook Form**](https://react-hook-form.com/) & [**Zod**](https://zod.dev/)
* **Utilities:** `date-fns`, `lucide-react`, `sonner`
* **Package Manager:** [**pnpm**](https://pnpm.io/)
* **Deployment:** [**Vercel**](https://vercel.com/)

---

## 📦 Project Structure

The project code is located within the `internship/final-project/recipe-generator` directory.
