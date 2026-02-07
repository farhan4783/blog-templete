import Link from "next/link"
import { Github, Twitter, Linkedin, Rocket } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/40 py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Rocket className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-display text-xl font-bold">ModernBlog</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            A modern, responsive blog template built with Next.js, Tailwind CSS, and Framer Motion.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ModernBlog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
