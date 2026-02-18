import {cn} from "@/lib/utils";
import {getTechIcon} from "@/lib/tech-icons";

const variantMap = {
  default: "bg-muted text-foreground/70",
  outline: "border border-foreground/15 text-foreground/65",
  ghost: "text-foreground/65 hover:bg-muted",
} as const;

const sizeMap = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
} as const;

const iconSizeMap = {
  sm: "size-3",
  md: "size-3.5",
} as const;

interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variantMap;
  size?: keyof typeof sizeMap;
  showIcon?: boolean;
}

/**
 * 기술 스택 표시용 뱃지 컴포넌트.
 * showIcon이 true이면 기술 이름에 매칭되는 아이콘을 자동으로 표시한다.
 * icon prop을 직접 전달하면 자동 매칭 대신 해당 아이콘을 사용한다.
 */
export function TechBadge({
  name,
  icon,
  className,
  variant = "default",
  size = "md",
  showIcon = false,
}: TechBadgeProps) {
  const resolvedIcon = icon ?? (showIcon ? renderAutoIcon(name, size) : null);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
    >
      {resolvedIcon && <span className="shrink-0">{resolvedIcon}</span>}
      {name}
    </span>
  );
}

function renderAutoIcon(name: string, size: keyof typeof iconSizeMap): React.ReactNode | null {
  const Icon = getTechIcon(name);
  if (!Icon) return null;
  return <Icon className={iconSizeMap[size]} />;
}
