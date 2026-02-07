import { getPostData, getSortedPostsData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostData(params.slug);
    if (!post) {
        return {
            title: "Post Not Found",
        };
    }
    return {
        title: `${post.title} | ModernBlog`,
        description: post.excerpt,
    };
}

const components = {
    h1: (props: any) => (
        <h1 {...props} className="text-3xl md:text-4xl font-display font-bold mt-8 mb-4 text-foreground/90" />
    ),
    h2: (props: any) => (
        <h2 {...props} className="text-2xl md:text-3xl font-display font-bold mt-8 mb-4 text-foreground/90 border-b border-border/40 pb-2" />
    ),
    h3: (props: any) => (
        <h3 {...props} className="text-xl md:text-2xl font-display font-bold mt-6 mb-3 text-foreground/90" />
    ),
    p: (props: any) => (
        <p {...props} className="text-lg leading-relaxed mb-6 text-muted-foreground" />
    ),
    ul: (props: any) => (
        <ul {...props} className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" />
    ),
    ol: (props: any) => (
        <ol {...props} className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground" />
    ),
    li: (props: any) => <li {...props} className="text-lg" />,
    blockquote: (props: any) => (
        <blockquote
            {...props}
            className="border-l-4 border-primary pl-4 py-2 my-6 italic text-xl bg-primary/5 rounded-r-lg"
        />
    ),
    code: (props: any) => (
        <code
            {...props}
            className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm text-primary"
        />
    ),
    pre: (props: any) => (
        <pre
            {...props}
            className="bg-muted/50 p-4 rounded-lg overflow-x-auto mb-6 border border-border/50"
        />
    ),
    a: (props: any) => (
        <a {...props} className="text-primary hover:underline underline-offset-4 font-medium transition-colors" />
    ),
    GlassCard, // Make GlassCard available in MDX
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostData(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
            </Link>

            <header className="mb-12 text-center">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {post.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 !leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </header>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 shadow-2xl">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote source={post.content} components={components} />
            </div>

            <div className="mt-16 pt-8 border-t border-border/40">
                <h3 className="font-display font-bold text-2xl mb-6">Share this post</h3>
                {/* Share buttons placeholder */}
                <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">Twitter</button>
                    <button className="px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">LinkedIn</button>
                    <button className="px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">Facebook</button>
                </div>
            </div>
        </article>
    );
}
