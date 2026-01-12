export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const APP_NAME = "EduCRM";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  // Legacy routes (deprecated, use role-specific routes)
  LIBRARY: "/library",
  // Role-specific routes
  CEO: {
    DASHBOARD: "/ceo/dashboard",
    BRANCHES: "/ceo/branches",
    REPORTS: "/ceo/reports",
    EMPLOYEES: "/ceo/employees",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    REGIONS: "/admin/regions",
    BRANCHES: "/admin/branches",
    EMPLOYEES: "/admin/employees",
    ROLES: "/admin/roles",
    LANGUAGES: "/admin/languages",
    COURSES: "/admin/courses",
    GROUPS: "/admin/groups",
    CLASSROOMS: "/admin/classrooms",
    MENTORS: "/admin/mentors",
    STUDENTS: "/admin/students",
    SCHEDULE: "/admin/schedule",
    HOLIDAYS: "/admin/holidays",
    NEWS: "/admin/news",
  },
  FINANCIER: {
    DASHBOARD: "/financier/dashboard",
    EXPENSES: "/financier/expenses",
    EXPENSE_TYPES: "/financier/expense-types",
  },
  MENTOR: {
    DASHBOARD: "/mentor/dashboard",
    GROUPS: "/mentor/groups",
    STUDENTS: "/mentor/students",
    SCHEDULE: "/mentor/schedule",
  },
  RECEPTIONIST: {
    DASHBOARD: "/receptionist/dashboard",
    STUDENTS: "/receptionist/students",
  },
  FINANCE: {
    ROOT: "/finance",
    EXPENSE_TYPES: "/finance/expense-types",
    EXPENSES: "/finance/expenses",
    SALARY_SETTINGS: "/finance/salary-settings",
  },
  REPORTS: {
    ROOT: "/reports",
    FINANCIAL: "/reports/financial",
    EDUCATIONAL: "/reports/educational",
  },
} as const;
