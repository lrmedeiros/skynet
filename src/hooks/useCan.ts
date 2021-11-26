import { useAuthContext } from "../contexts/AuthContext";

interface UseCanParams {
  roles: Array<"student" | "instructor" | "pilot">;
}

export function useCan({ roles }: UseCanParams) {
  const { associate, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return false;
  }

  if (associate.roles !== undefined) {
    console.log("poh");
  }
  if (roles?.length > 0) {
    const isSomeOfThisRoles = roles.some((role) => {
      return associate.roles.includes(role);
    });

    if (!isSomeOfThisRoles) {
      return false;
    }
  }

  return true;
}
