# Nexium_Saad-Safi_Internship

This repository contains projects developed during the Nexium AI-First Web Development Internship.

---

## 🚀 Live Demos

Explore the deployed versions of my assignments:

* **Grand Project: AI-Powered Recipe Generator (DishGen)**
    * Live Link: **https://dishgen-ai.vercel.app/**
    * GitHub Project Folder: [`/Final-Project/recipe-generator`]

* **Assignment 2: Blog Summarizer**
    * Live Link: **https://blog-summarizer-a2.vercel.app/**
    * GitHub Project Folder: [`/Assignment-2/blog-summarizer`]

* **Assignment 1: Inspirational Quote Generator**
    * Live Link: **https://quote-s-generator.vercel.app/**
    * GitHub Project Folder: [`/Assignment-1/quote-generator`]
    
---
# Grand Project

# 🍳 AI-Powered Recipe Generator 🍳

A modern, full-stack web application that intelligently generates custom recipes from user-provided ingredients. Built as the **Grand Project** for the **Nexium AI-First Web Development Internship**.

This project showcases a complete, production-ready application featuring a sophisticated UI/UX, a dual-engine AI core using **Google Gemini API** and **n8n**, and a robust dual-database architecture with **Supabase (PostgreSQL)** and **MongoDB Atlas**.

---

## 🚀 Live Demo & Walkthrough

* **Experience DishGen live:** `https://dishgen-ai.vercel.app`
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

---
---

# Assignment2

# 📝 AI-Powered Blog Summarizer 📝

A sophisticated and modern web application for intelligent blog summarization, keyword extraction, and multi-language translation, built as **Assignment 2** for the **Nexium AI-First Web Development Internship - Week 2: Automation & Data**.

This project significantly expands on core web development concepts, demonstrating advanced UI/UX design, direct **Google Gemini API** integration, and robust data management across **Supabase (PostgreSQL)** and **MongoDB Atlas**.

---

## 🚀 Live Demo

Experience the Blog Summarizer live:
https://blog-summarizer-a2.vercel.app/

---

## ✨ Features

This project delivers a comprehensive set of functionalities, building on the foundation concepts and introducing cutting-edge AI and data management aspects:

### User Experience & Interface
* **Intuitive & Modern UI:** A clean, aesthetic, and responsive user interface built with Next.js and ShadCN UI, providing a premium feel.
* **Dynamic Theme Switching:** Seamlessly toggle between **Light** and **Dark** themes for a personalized viewing experience, with enhanced gradients.
* **Clear Navigation:** A prominent Navbar with dedicated tabs for Home, History, Favorites, and About sections.
* **Granular Control:** Users can select between **"Static Logic"** (original assignment simulation) and **"AI" (Google Gemini API)** for summarization, and **"JS Dictionary"** (original simulation) vs. **"API/AI" (Google Gemini API)** for translation.
* **Summary Customization:** When using AI summarization, users can specify desired summary length (Short, Medium, Long) and style (Formal, Informal, Bullet Points).
* **Multi-language Translation:** Beyond English, summaries can be translated into various languages (e.g., Urdu, Hindi, Spanish, French) via the powerful Google Gemini API.
* **Efficient Actions:**
    * **Copy-to-Clipboard:** Quick buttons to copy English summary, translated summary, and keywords.
    * **"Favorite" / "Star" System:** Mark important summaries for easy access.

### Data Management & History
* **Comprehensive History:** View a chronological list of all previously summarized blogs, stored in **Supabase (PostgreSQL)**.
* **Modern Delete Confirmation:** Deleting history entries is handled with a visually appealing pop-up dialog.
* **Snippet View:** Displays key details like URL snippet, summary snippet, keywords, and date for quick Browse.
* **Dedicated Favorites Tab:** A separate section to view only the summaries marked as favorite, allowing for quick retrieval.
* **Detailed View:** Click "View Full Details" to access a dedicated page displaying the complete English summary, full translated summary, all keywords, and the **original full blog post content** (fetched from **MongoDB Atlas**).

### Backend & AI Integration
* **Intelligent Web Scraping:** Robustly fetches and cleans textual content from provided blog URLs.
* **Google Gemini API Integration:**
    * Powers high-quality summarization and relevant keyword extraction.
    * Provides accurate multi-language translation (replacing simple dictionary logic).
* **Dual Database Storage:**
    * **Supabase (PostgreSQL):** Stores structured summary data (summary texts, URL, keywords, favorite status, translation details).
    * **MongoDB Atlas:** Persists the raw, full text content of each scraped blog post.
* **Optimized API Routes:** Efficient Next.js API routes handle all backend logic, including scraping, AI processing, and database interactions.

---

## 🚀 Usage

### Home Tab:
* Enter a blog post URL.
* Select your **Summarization Method** (Static Logic or AI/Gemini API).
* Select your **Translation Method** (JS Dictionary or API/AI/Gemini API).
* If "AI" translation is selected, choose your **Target Language**.
* Click "Summarize Blog".
* View the English summary, translated summary, and keywords.
* Use the Copy buttons or the Favorite button.

### History Tab:
* See a list of all your past summaries.
* Delete entries using the trash icon.
* Mark/unmark as favorite using the star icon.
* Click "View Full Details" to see the comprehensive summary page.

### Favorites Tab:
* View only the summaries you have marked as favorite.
* Unmark as favorite to remove from this list.

### About Tab:
* Learn about the project and its development.

---

## 🛠️ Tech Stack

This project was developed using the following comprehensive set of technologies and tools, aligning with the Nexium internship's curriculum and focusing on AI-First principles:

* **Framework:** [**Next.js 15 (App Router)**](https://nextjs.org/) - React framework for production-grade applications.
    * Server Components & Client Components: Utilized for optimal data fetching, rendering, and interactive UI elements.
* **UI Library:** [**ShadCN UI**](https://ui.shadcn.com/) - Customizable, accessible UI components.
* **Styling:** [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapid and custom design.
* **Theming:** [**Next Themes**](https://github.com/pacocoursey/next-themes) - Integration for seamless Light/Dark mode switching.
* **Language:** [**TypeScript**](https://www.typescriptlang.org/) - Strongly typed JavaScript for robust and maintainable code.
* **AI / LLM:** [**Google Gemini API**](https://ai.google.dev/) (`@google/generative-ai` SDK) - For cutting-edge AI summarization, keyword extraction, and translation.
* **Database (Structured):** [**Supabase**](https://supabase.com/) (PostgreSQL) - Open-source Firebase alternative for structured data management and authentication features.
* **Database (Unstructured):** [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas) - Cloud-hosted NoSQL database for flexible storage of raw text data.
* **Web Scraping:** [**Cheerio**](https://cheerio.js.org/) & `node-fetch` - For efficient HTML parsing and content extraction.
* **Utilities:**
    * `date-fns` (for date formatting)
    * `lucide-react` (for icons)
    * `sonner` (for elegant toast notifications)
* **Package Manager:** [**pnpm**](https://pnpm.io/) - Fast, disk-space efficient package manager.
* **Code Quality:** [**ESLint**](https://eslint.org/) & [**Prettier**](https://prettier.io/) - For consistent code style and error detection.
* **Version Control:** [**Git**](https://git-scm.com/) - Managed with conventional commit messages.
* **Deployment:** [**Vercel**](https://vercel.com/) - Platform for automatic deployments from Git.

---

## 📦 Project Structure

The assignment's code is located within the `internship/assignment-2/blog-summarizer` directory.


---
---

# Assignment1

# 🌟 Inspirational Quote Generator 🌟

A modern and aesthetic web application for generating motivational and inspiring quotes, built as **Assignment 1** for the **Nexium AI-First Web Development Internship - Week 1: Foundation**.

This project showcases core web development concepts, including Next.js 15 (App Router), ShadCN UI, DaisyUI, and a robust Git workflow.

---

## 🚀 Live Demo

Experience the Quote Generator live:
https://quote-s-generator.vercel.app/

![image](https://github.com/user-attachments/assets/f2cd48f9-ca49-46fd-ac8e-a03e12f34577)

**Light Mode:**
![image](https://github.com/user-attachments/assets/7f6b4379-b0de-434a-a6b5-97fa2b9d13c1)

**Dark Mode:**
![image](https://github.com/user-attachments/assets/92e4f067-09a2-4377-a97e-af331d92d455)

---

## ✨ Features

* **Topic-Based Quote Generation:** Get 3 motivational quotes by entering a specific topic (e.g., "Motivation", "Success", "Learning").
* **Dynamic UI:** Clean, aesthetic, and modern user interface with subtle blur and 3D-ish shadow effects.
* **Theme Switching:** Seamlessly toggle between **Light** and **Dark** themes for a personalized experience.
* **Responsive Design:** Optimized for a smooth experience across various devices (desktop, tablet, mobile).
* **Accessible Components:** Built with accessibility considerations using ShadCN UI.

---

## 🛠️ Tech Stack

This project was developed using the following technologies and tools, adhering to the Nexium internship's Week 1 curriculum:

* **Framework:** [**Next.js 15 (App Router)**](https://nextjs.org/) - React framework for production.
    * **Server Components:** Utilized for efficient data fetching and rendering.
    * **Client Components:** Employed for interactive UI elements (form, theme switcher).
* **UI Library:** [**ShadCN UI**](https://ui.shadcn.com/) - Re-usable components that you can copy and paste into your apps.
* **Styling:** [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
* **Theming:** [**DaisyUI**](https://daisyui.com/) - Tailwind CSS component library that adds semantic classes and themes.
* **Language:** [**TypeScript**](https://www.typescriptlang.org/) - Strongly typed JavaScript for enhanced code quality and maintainability.
* **Package Manager:** [**pnpm**](https://pnpm.io/) - Fast, disk-space efficient package manager.
* **Code Quality:** [**ESLint**](https://eslint.org/) & [**Prettier**](https://prettier.io/) - For consistent code style and error detection.
* **Version Control:** [**Git**](https://git-scm.com/) - Managed with conventional commit messages.
* **Deployment:** [**Vercel**](https://vercel.com/) - Platform for automatic deployments from Git.

---

## 📦 Project Structure

The assignment's code is located within the `internship/assignment-1/quote-generator` directory.
