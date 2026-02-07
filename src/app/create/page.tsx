"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { PenTool, Loader2, Image as ImageIcon, Upload } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    category: z.string().min(2, { message: "Category is required." }),
    content: z.string().min(20, { message: "Content must be at least 20 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateBlogPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
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
        alert("Blog post submitted! (Simulation)")
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Create Your Story</h1>
                    <p className="text-muted-foreground text-lg">
                        Share your knowledge with the community.
                    </p>
                </motion.div>

                <GlassCard className="p-8 md:p-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Image Upload */}
                        <div className="w-full aspect-video rounded-xl bg-muted/50 border-2 border-dashed border-border/50 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <p className="font-medium">Click to upload cover image</p>
                                    <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 3MB)</p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">Title</label>
                                <input
                                    id="title"
                                    {...register("title")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all ${errors.title ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                    placeholder="Enter blog title"
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium">Category</label>
                                <select
                                    id="category"
                                    {...register("category")}
                                    className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all appearance-none ${errors.category ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                        }`}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Development">Development</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </select>
                                {errors.category && (
                                    <p className="text-xs text-red-500">{errors.category.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">Content</label>
                            <textarea
                                id="content"
                                rows={12}
                                {...register("content")}
                                className={`w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 transition-all resize-none font-mono text-sm ${errors.content ? "border-red-500 focus:ring-red-500/50" : "border-border/50 focus:border-primary focus:ring-primary/50"
                                    }`}
                                placeholder="Write your story here (Markdown supported)..."
                            />
                            {errors.content && (
                                <p className="text-xs text-red-500">{errors.content.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                                </>
                            ) : (
                                <>
                                    <PenTool className="w-5 h-5" /> Publish Story
                                </>
                            )}
                        </button>
                    </form>
                </GlassCard>
            </div>
        </div>
    )
}
