// Role-Based Access Control Configuration

export type Role = "ceo" | "admin" | "financier" | "mentor" | "receptionist";

export type Permission =
  // Dashboard
  | "dashboard.view"
  | "dashboard.stats.students"
  | "dashboard.stats.groups"
  | "dashboard.stats.mentors"
  | "dashboard.stats.income"
  | "dashboard.schedule"
  | "dashboard.activities"
  | "dashboard.courses"
  | "dashboard.branches"
  // Regions
  | "regions.view"
  | "regions.create"
  | "regions.edit"
  | "regions.delete"
  // Branches
  | "branches.view"
  | "branches.create"
  | "branches.edit"
  | "branches.delete"
  // Employees
  | "employees.view"
  | "employees.create"
  | "employees.edit"
  | "employees.delete"
  // Roles
  | "roles.view"
  | "roles.create"
  | "roles.edit"
  | "roles.delete"
  // Languages
  | "languages.view"
  | "languages.create"
  | "languages.edit"
  | "languages.delete"
  // Courses
  | "courses.view"
  | "courses.create"
  | "courses.edit"
  | "courses.delete"
  // News
  | "news.view"
  | "news.create"
  | "news.edit"
  | "news.delete"
  // Groups
  | "groups.view"
  | "groups.create"
  | "groups.edit"
  | "groups.delete"
  // Classrooms
  | "classrooms.view"
  | "classrooms.create"
  | "classrooms.edit"
  | "classrooms.delete"
  // Mentors
  | "mentors.view"
  | "mentors.create"
  | "mentors.edit"
  | "mentors.delete"
  // Students
  | "students.view"
  | "students.create"
  | "students.edit"
  | "students.delete"
  // Schedule
  | "schedule.view"
  | "schedule.create"
  | "schedule.edit"
  | "schedule.delete"
  // Holidays
  | "holidays.view"
  | "holidays.create"
  | "holidays.edit"
  | "holidays.delete"
  // Library
  | "library.view"
  | "library.create"
  | "library.edit"
  | "library.delete"
  // Finance
  | "finance.expense-types.view"
  | "finance.expense-types.create"
  | "finance.expense-types.edit"
  | "finance.expense-types.delete"
  | "finance.expenses.view"
  | "finance.expenses.create"
  | "finance.expenses.edit"
  | "finance.expenses.delete"
  | "finance.salary-settings.view"
  | "finance.salary-settings.edit"
  // Reports
  | "reports.financial.view"
  | "reports.educational.view"
  // Leads
  | "leads.view"
  | "leads.create"
  | "leads.edit"
  | "leads.delete";

// Role permissions mapping
export const rolePermissions: Record<Role, Permission[]> = {
  ceo: [
    // Full access to everything
    "dashboard.view",
    "dashboard.stats.students",
    "dashboard.stats.groups",
    "dashboard.stats.mentors",
    "dashboard.stats.income",
    "dashboard.schedule",
    "dashboard.activities",
    "dashboard.courses",
    "dashboard.branches",
    "regions.view",
    "regions.create",
    "regions.edit",
    "regions.delete",
    "branches.view",
    "branches.create",
    "branches.edit",
    "branches.delete",
    "employees.view",
    "employees.create",
    "employees.edit",
    "employees.delete",
    "roles.view",
    "roles.create",
    "roles.edit",
    "roles.delete",
    "languages.view",
    "languages.create",
    "languages.edit",
    "languages.delete",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.delete",
    "news.view",
    "news.create",
    "news.edit",
    "news.delete",
    "groups.view",
    "groups.create",
    "groups.edit",
    "groups.delete",
    "classrooms.view",
    "classrooms.create",
    "classrooms.edit",
    "classrooms.delete",
    "mentors.view",
    "mentors.create",
    "mentors.edit",
    "mentors.delete",
    "students.view",
    "students.create",
    "students.edit",
    "students.delete",
    "schedule.view",
    "schedule.create",
    "schedule.edit",
    "schedule.delete",
    "holidays.view",
    "holidays.create",
    "holidays.edit",
    "holidays.delete",
    "library.view",
    "library.create",
    "library.edit",
    "library.delete",
    "finance.expense-types.view",
    "finance.expense-types.create",
    "finance.expense-types.edit",
    "finance.expense-types.delete",
    "finance.expenses.view",
    "finance.expenses.create",
    "finance.expenses.edit",
    "finance.expenses.delete",
    "finance.salary-settings.view",
    "finance.salary-settings.edit",
    "reports.financial.view",
    "reports.educational.view",
  ],

  admin: [
    // Everything except financial reports and salary settings
    "dashboard.view",
    "dashboard.stats.students",
    "dashboard.stats.groups",
    "dashboard.stats.mentors",
    "dashboard.schedule",
    "dashboard.activities",
    "dashboard.courses",
    "regions.view",
    "regions.create",
    "regions.edit",
    "regions.delete",
    "branches.view",
    "branches.create",
    "branches.edit",
    "branches.delete",
    "employees.view",
    "employees.create",
    "employees.edit",
    "employees.delete",
    "roles.view",
    "languages.view",
    "languages.create",
    "languages.edit",
    "languages.delete",
    "courses.view",
    "courses.create",
    "courses.edit",
    "courses.delete",
    "news.view",
    "news.create",
    "news.edit",
    "news.delete",
    "groups.view",
    "groups.create",
    "groups.edit",
    "groups.delete",
    "classrooms.view",
    "classrooms.create",
    "classrooms.edit",
    "classrooms.delete",
    "mentors.view",
    "mentors.create",
    "mentors.edit",
    "mentors.delete",
    "students.view",
    "students.create",
    "students.edit",
    "students.delete",
    "schedule.view",
    "schedule.create",
    "schedule.edit",
    "schedule.delete",
    "holidays.view",
    "holidays.create",
    "holidays.edit",
    "holidays.delete",
    "library.view",
    "library.create",
    "library.edit",
    "library.delete",
    "reports.educational.view",
  ],

  financier: [
    // Finance-focused access
    "dashboard.view",
    "dashboard.stats.income",
    "dashboard.branches",
    "branches.view",
    "employees.view",
    "students.view",
    "finance.expense-types.view",
    "finance.expense-types.create",
    "finance.expense-types.edit",
    "finance.expense-types.delete",
    "finance.expenses.view",
    "finance.expenses.create",
    "finance.expenses.edit",
    "finance.expenses.delete",
    "finance.salary-settings.view",
    "finance.salary-settings.edit",
    "reports.financial.view",
  ],

  mentor: [
    // Teaching-focused access
    "dashboard.view",
    "dashboard.stats.students",
    "dashboard.stats.groups",
    "dashboard.schedule",
    "courses.view",
    "groups.view",
    "students.view",
    "schedule.view",
    "schedule.edit", // Can edit own schedule
    "library.view",
    "library.create",
    "library.edit",
  ],

  receptionist: [
    // Front desk access
    "dashboard.view",
    "dashboard.stats.students",
    "dashboard.schedule",
    "dashboard.activities",
    "students.view",
    "students.create",
    "students.edit",
    "groups.view",
    "schedule.view",
    "news.view",
    // Leads management
    "leads.view",
    "leads.create",
    "leads.edit",
    "leads.delete",
  ],
};

// Sidebar items configuration
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  permission: Permission;
  children?: SidebarItem[];
}

export const sidebarConfig: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: "Category2",
    path: "/",
    permission: "dashboard.view",
  },
  {
    id: "regions",
    label: "Регионы",
    icon: "Location",
    path: "/regions",
    permission: "regions.view",
  },
  {
    id: "branches",
    label: "Филиалы",
    icon: "Building",
    path: "/branches",
    permission: "branches.view",
  },
  {
    id: "employees",
    label: "Сотрудники",
    icon: "People",
    path: "/employees",
    permission: "employees.view",
  },
  {
    id: "roles",
    label: "Роли",
    icon: "Shield",
    path: "/roles",
    permission: "roles.view",
  },
  {
    id: "languages",
    label: "Языки",
    icon: "LanguageSquare",
    path: "/languages",
    permission: "languages.view",
  },
  {
    id: "courses",
    label: "Курсы",
    icon: "Book1",
    path: "/courses",
    permission: "courses.view",
  },
  {
    id: "news",
    label: "Новости",
    icon: "Notification",
    path: "/news",
    permission: "news.view",
  },
  {
    id: "groups",
    label: "Группы",
    icon: "People",
    path: "/groups",
    permission: "groups.view",
  },
  {
    id: "classrooms",
    label: "Аудитории",
    icon: "House2",
    path: "/classrooms",
    permission: "classrooms.view",
  },
  {
    id: "mentors",
    label: "Менторы",
    icon: "Teacher",
    path: "/mentors",
    permission: "mentors.view",
  },
  {
    id: "students",
    label: "Студенты",
    icon: "Profile2User",
    path: "/students",
    permission: "students.view",
  },
  {
    id: "schedule",
    label: "Расписание",
    icon: "Calendar",
    path: "/schedule",
    permission: "schedule.view",
  },
  {
    id: "holidays",
    label: "Праздники",
    icon: "Cake",
    path: "/holidays",
    permission: "holidays.view",
  },
  {
    id: "library",
    label: "Библиотека",
    icon: "Book",
    path: "/library",
    permission: "library.view",
  },
  {
    id: "finance-expense-types",
    label: "Типы расходов",
    icon: "Category",
    path: "/finance/expense-types",
    permission: "finance.expense-types.view",
  },
  {
    id: "finance-expenses",
    label: "Расходы",
    icon: "Wallet",
    path: "/finance/expenses",
    permission: "finance.expenses.view",
  },
  {
    id: "finance-salary",
    label: "Настройки зарплаты",
    icon: "DollarCircle",
    path: "/finance/salary-settings",
    permission: "finance.salary-settings.view",
  },
  {
    id: "reports-financial",
    label: "Финансовый отчет",
    icon: "Chart",
    path: "/reports/financial",
    permission: "reports.financial.view",
  },
  {
    id: "reports-educational",
    label: "Учебный отчет",
    icon: "DocumentText",
    path: "/reports/educational",
    permission: "reports.educational.view",
  },
];

// Role display names
export const roleNames: Record<Role, string> = {
  ceo: "Директор",
  admin: "Администратор",
  financier: "Финансист",
  mentor: "Ментор",
  receptionist: "Ресепшионист",
};

// Helper function to check if a role has a specific permission
export const hasPermission = (role: Role, permission: Permission): boolean => {
  return rolePermissions[role].includes(permission);
};

// Helper function to check if a role has any of the permissions
export const hasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

// Helper function to get sidebar items for a role
export const getSidebarItemsForRole = (role: Role): SidebarItem[] => {
  return sidebarConfig.filter((item) => hasPermission(role, item.permission));
};
