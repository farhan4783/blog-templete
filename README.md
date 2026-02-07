# 🚀 ModernBlog - Next.js Advanced Template

![Next.js](https://img.shields.io/badge/Next.js-15.0%2B-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Featured-black?style=for-the-badge&logo=framer&logoColor=white)

A high-performance, aesthetically pleasing blog template built with the latest web technologies. Featuring a glassmorphism design system, dark mode, smooth animations, and MDX-powered content.

---

## ✨ Features

- **🎨 Premium UI/UX**: Glassmorphism aesthetic with reusable `GlassCard` components.
- **🌗 Dark/Light Mode**: Fully integrated theme switching with system preference detection.
- **⚡ Performant**: Built on Next.js 15 (App Router) for optimal speed and SEO.
- **📝 MDX Blog**: Write articles in Markdown/MDX with custom React components.
- **🔍 Real-time Search**: Client-side filtering of blog posts by title, category, and content.
- **🌊 Smooth Animations**: Page transitions and scroll animations powered by Framer Motion.
- **📱 Responsive**: Flawless experience across mobile, tablet, and desktop.
- **✉️ Contact Form**: Fully validated form using React Hook Form and Zod.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Content**: [Gray Matter](https://github.com/jonschlinkert/gray-matter) + [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or pnpm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/modern-blog.git
    cd modern-blog
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js App Router pages
│   ├── blog/            # Blog index and dynamic post pages
│   ├── contact/         # Contact page
│   ├── create/          # Create post page (demo)
│   ├── layout.tsx       # Root layout with Navbar/Footer
│   └── page.tsx         # Home page with Hero/Features
├── components/          # Reusable UI components
│   ├── ui/              # Base UI elements (GlassCard, etc.)
│   └── ...
├── content/             # MDX Blog posts
├── lib/                 # Utilities and data fetching
└── styles/              # Global styles
```

## 📝 Adding a New Blog Post

1.  Create a new `.mdx` file in `src/content/posts`.
2.  Add the required frontmatter:
    ```yaml
    ---
    title: "Your Post Title"
    date: "2024-03-20"
    author: "Your Name"
    excerpt: "A short summary of your post."
    image: "https://example.com/image.jpg"
    category: "Technology"
    readTime: "5 min read"
    ---
    ```
3.  Write your content below the frontmatter using standard Markdown/MDX.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
