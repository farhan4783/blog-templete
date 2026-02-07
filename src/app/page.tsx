"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

// Dummy data for featured articles
const featuredArticles = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with the latest features of Next.js 14, including Server Actions and Partial Prerendering.",
    author: "Jane Doe",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    slug: "getting-started-nextjs",
    category: "Development"
  },
  {
    id: 2,
    title: "The Future of CSS with Tailwind v4",
    excerpt: "Explore the new engine and features coming in Tailwind CSS v4 and how it changes the way we write styles.",
    author: "John Smith",
    date: "Nov 05, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    slug: "tailwind-v4-future",
    category: "Design"
  },
  {
    id: 3,
    title: "Mastering React Server Components",
    excerpt: "A deep dive into Server Components, how they work, and when to use them for optimal performance.",
    author: "Alice Johnson",
    date: "Dec 10, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1964&auto=format&fit=crop",
    slug: "mastering-rsc",
    category: "Engineering"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              Welcome to ModernBlog
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Share Your Story <br />
              <span className="text-primary">With The World</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover stories, thinking, and expertise from writers on any topic.
              A modern platform for reading and sharing ideas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog" className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 flex items-center gap-2">
                Start Reading <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="px-8 py-3 rounded-full bg-background border border-border hover:bg-muted transition-colors font-medium">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Articles</h2>
              <p className="text-muted-foreground">Hand-picked stories for you to read</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-primary hover:underline underline-offset-4">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredArticles.map((article) => (
              <motion.div key={article.id} variants={item}>
                <Link href={`/blog/${article.slug}`}>
                  <GlassCard className="h-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </div>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User className="w-3 h-3" />
                          </div>
                          {article.author}
                        </div>
                        <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read more <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 font-medium">
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
