import { getSortedPostsData } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";

export const metadata = {
    title: "Blog | Modern Stories",
    description: "Read the latest stories and insights from our team.",
};

export default function BlogIndex() {
    const posts = getSortedPostsData();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Blog</h1>
                <p className="text-muted-foreground text-lg">
                    Insights, thoughts, and trends from the world of technology.
                </p>
            </div>

            <BlogList initialPosts={posts} />
        </div>
    );
}
