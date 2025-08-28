// Single source of truth for role metadata (labels, grouping, etc.)
export const ROLE_CATEGORIES = {
  CLIENT: "Klient",
  INSTRUCTOR: "Instruktor",
} as const;

export const ROLES = [
  { key: "STUDENT", label: "Jestem Studentem", category: "CLIENT" },
  { key: "GUARDIAN", label: "Jestem Opiekunem", category: "CLIENT" },
  { key: "INSTRUCTOR", label: "Jestem Instruktorem", category: "INSTRUCTOR" },
  { key: "OWNER", label: "Jestem Właścicielem szkoły", category: "INSTRUCTOR" },
] as const;

// 🔒 Strong typing for role keys derived from the config itself
export type RoleKey = (typeof ROLES)[number]["key"];

export const roleKeys = new Set<string>(ROLES.map((r) => r.key));

export const rolesByCategory = Object.entries(ROLE_CATEGORIES).map(
  ([id, title]) => ({
    id,
    title,
    roles: ROLES.filter((r) => r.category === id),
  })
);

export const ONBOARDING_STEPS = ["role", "details"];
