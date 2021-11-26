import { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface CanProps {
  children: ReactNode;
  roles: Array<"student" | "instructor" | "pilot">;
}

export function Can({ children, roles }: CanProps) {
  const canSeeComponent = useCan({ roles });

  if (!canSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
