import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass rounded-xl shadow-lg border border-white/20 dark:border-white/10",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
