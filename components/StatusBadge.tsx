interface StatusBadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "muted";
}

const variantClasses: Record<
  NonNullable<StatusBadgeProps["variant"]>,
  string
> = {
  default: "bg-surfaceHover text-text border border-border",
  success: "bg-[#33392b] text-accent border border-accent/20",
  warning: "bg-[#2a1e18] text-[#f0cc8f] border border-[#5f4a35]",
  muted: "bg-surfaceHover/80 text-muted border border-border",
};

export function StatusBadge({ label, variant = "default" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
