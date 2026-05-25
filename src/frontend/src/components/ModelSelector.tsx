import { Skeleton } from "@/components/ui/skeleton";
import type { Provider } from "@/types";
import { Cpu } from "lucide-react";

interface ModelSelectorProps {
  providers: Provider[];
  selected: string;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export default function ModelSelector({
  providers,
  selected,
  onSelect,
  isLoading,
}: ModelSelectorProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-28 shrink-0 rounded-full" />
        ))}
      </div>
    );
  }

  if (!providers.length) return null;

  return (
    <div className="flex items-center gap-2">
      <Cpu className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {providers.map((p) => {
          const isActive = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              data-ocid="model.tab"
              onClick={() => onSelect(p.id)}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, oklch(0.65 0.22 210 / 0.25), oklch(0.65 0.25 320 / 0.25))"
                  : "oklch(0.15 0.01 260 / 0.6)",
                border: isActive
                  ? "1px solid oklch(0.65 0.22 210 / 0.7)"
                  : "1px solid oklch(0.30 0.02 260 / 0.5)",
                color: isActive
                  ? "oklch(0.85 0.18 210)"
                  : "oklch(0.60 0.02 260)",
                boxShadow: isActive
                  ? "0 0 12px oklch(0.65 0.22 210 / 0.4), inset 0 0 8px oklch(0.65 0.22 210 / 0.1)"
                  : "none",
                animation: isActive
                  ? "glow-pulse 3s ease-in-out infinite"
                  : "none",
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
