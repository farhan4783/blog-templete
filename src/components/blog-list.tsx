"use client"

import { useState } from "react"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react"
import { Post } from "@/lib/posts"
import { motion, AnimatePresence } from "framer-motion"

interface BlogListProps {
    initialPosts: Post[]
}

export function BlogList({ initialPosts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = initialPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search articles by title, content, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredPosts.map((post) => (
                        <motion.div
                            layout
                            key={post.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group h-full block">
                                <GlassCard className="h-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                                    <div className="relative h-48 overflow-hidden shrink-0">
                                        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                                            {post.category}
                                        </div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                                            <div className="flex items-center gap-2 text-xs font-medium">
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                    <User className="w-3 h-3" />
                                                </div>
                                                {post.author}
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
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your search query.</p>
                </div>
            )}
        </div>
    )
}
