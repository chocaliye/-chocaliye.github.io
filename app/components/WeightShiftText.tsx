import type { ReactNode } from "react";

export function WeightShiftText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`weightShift ${className}`}>
      <span className="weightShiftReserve" aria-hidden="true">
        {children}
      </span>
      <span className="weightShiftVisible">{children}</span>
    </span>
  );
}
