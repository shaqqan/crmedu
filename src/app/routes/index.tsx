import React from "react";
import { Route, Routes } from "react-router";
import { MainLayout, ProtectedRoute } from "@/shared";
import {
  DashboardPage,
  LoginPage,
  BranchesPage,
  RegionsPage,
  HolidaysPage,
  StudentsPage,
  SchedulePage,
  CoursesPage,
  LanguagesPage,
  // CEO pages
  CeoDashboardPage,
  CeoBranchesPage,
  CeoReportsPage,
  CeoEmployeesPage,
  // Admin pages
  AdminDashboardPage,
  EmployeesPage,
  GroupsPage,
  MentorsPage,
  NewsPage,
  RolesPage,
  ClassroomsPage,
  // Financier pages
  FinancierDashboardPage,
  FinancierExpensesPage,
  // Finance pages
  ExpenseTypesPage,
  // Mentor pages
  MentorDashboardPage,
  MentorGroupsPage,
  MentorStudentsPage,
  MentorSchedulePage,
  // Receptionist pages
  ReceptionistDashboardPage,
  ReceptionistStudentsPage,
} from "@/pages";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<MainLayout />}>
        {/* General Dashboard (for non-mentors) */}
        <Route
          index
          element={
            <ProtectedRoute permission="dashboard.view">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ==================== CEO ROUTES ==================== */}
        <Route path="ceo">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute permission="dashboard.view">
                <CeoDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="branches"
            element={
              <ProtectedRoute permission="branches.view">
                <CeoBranchesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute permission="reports.financial.view">
                <CeoReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoute permission="employees.view">
                <CeoEmployeesPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="admin">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute permission="dashboard.view">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoute permission="employees.view">
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute permission="groups.view">
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="mentors"
            element={
              <ProtectedRoute permission="mentors.view">
                <MentorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="news"
            element={
              <ProtectedRoute permission="news.view">
                <NewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="roles"
            element={
              <ProtectedRoute permission="roles.view">
                <RolesPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== FINANCIER ROUTES ==================== */}
        <Route path="financier">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute permission="dashboard.view">
                <FinancierDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="expenses"
            element={
              <ProtectedRoute permission="finance.expenses.view">
                <FinancierExpensesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="expense-types"
            element={
              <ProtectedRoute permission="finance.expense-types.view">
                <ExpenseTypesPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== MENTOR ROUTES ==================== */}
        <Route path="mentor">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute permission="dashboard.view">
                <MentorDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute permission="groups.view">
                <MentorGroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute permission="students.view">
                <MentorStudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="schedule"
            element={
              <ProtectedRoute permission="schedule.view">
                <MentorSchedulePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== RECEPTIONIST ROUTES ==================== */}
        <Route path="receptionist">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute permission="dashboard.view">
                <ReceptionistDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute permission="students.view">
                <ReceptionistStudentsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== EXTENDED ADMIN ROUTES ==================== */}
        <Route
          path="admin/regions"
          element={
            <ProtectedRoute permission="regions.view">
              <RegionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/branches"
          element={
            <ProtectedRoute permission="branches.view">
              <BranchesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/languages"
          element={
            <ProtectedRoute permission="languages.view">
              <LanguagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses"
          element={
            <ProtectedRoute permission="courses.view">
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/classrooms"
          element={
            <ProtectedRoute permission="classrooms.view">
              <ClassroomsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/students"
          element={
            <ProtectedRoute permission="students.view">
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/schedule"
          element={
            <ProtectedRoute permission="schedule.view">
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/holidays"
          element={
            <ProtectedRoute permission="holidays.view">
              <HolidaysPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="library"
          element={
            <ProtectedRoute permission="library.view">
              <div>Библиотека</div>
            </ProtectedRoute>
          }
        />

        {/* ==================== FINANCE ROUTES ==================== */}
        <Route
          path="finance/expenses"
          element={
            <ProtectedRoute permission="finance.expenses.view">
              <div>Расходы</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="finance/salary-settings"
          element={
            <ProtectedRoute permission="finance.salary-settings.view">
              <div>Настройки зарплаты</div>
            </ProtectedRoute>
          }
        />

        {/* ==================== REPORT ROUTES ==================== */}
        <Route
          path="reports/financial"
          element={
            <ProtectedRoute permission="reports.financial.view">
              <div>Финансовый отчет</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/educational"
          element={
            <ProtectedRoute permission="reports.educational.view">
              <div>Учебный отчет</div>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
