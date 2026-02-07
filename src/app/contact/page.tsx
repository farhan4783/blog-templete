"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Send, Loader2, CheckCircle } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(data)
        setIsSubmitting(false)
        setIsSuccess(true)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg">
                        Have a question or want to work together? Send us a message!
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl mx-auto"
            >
                <GlassCard className="p-8 md:p-10">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you shortly.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="mt-6 text-primary hover:underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    {...register("name")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <input
                                    id="subject"
                                    {...register("subject")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all ${errors.subject ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                    placeholder="Project Inquiry"
                                />
                                {errors.subject && (
                                    <p className="text-xs text-red-500">{errors.subject.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    {...register("message")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                    placeholder="Tell us about your project..."
                                />
                                {errors.message && (
                                    <p className="text-xs text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </GlassCard>
            </motion.div>
        </div>
    )
}
