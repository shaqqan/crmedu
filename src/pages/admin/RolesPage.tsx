import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid2 as Grid,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Shield,
  People,
  ArrowDown2,
  TickCircle,
  CloseSquare,
} from "iconsax-react";

interface Permission {
  key: string;
  label: string;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  usersCount: number;
  permissions: string[];
  isSystem: boolean;
}

const permissionGroups: PermissionGroup[] = [
  {
    name: "Дашборд",
    permissions: [
      { key: "dashboard.view", label: "Просмотр дашборда" },
    ],
  },
  {
    name: "Филиалы",
    permissions: [
      { key: "branches.view", label: "Просмотр филиалов" },
      { key: "branches.create", label: "Создание филиалов" },
      { key: "branches.edit", label: "Редактирование филиалов" },
      { key: "branches.delete", label: "Удаление филиалов" },
    ],
  },
  {
    name: "Сотрудники",
    permissions: [
      { key: "employees.view", label: "Просмотр сотрудников" },
      { key: "employees.create", label: "Создание сотрудников" },
      { key: "employees.edit", label: "Редактирование сотрудников" },
      { key: "employees.delete", label: "Удаление сотрудников" },
    ],
  },
  {
    name: "Менторы",
    permissions: [
      { key: "mentors.view", label: "Просмотр менторов" },
      { key: "mentors.create", label: "Создание менторов" },
      { key: "mentors.edit", label: "Редактирование менторов" },
      { key: "mentors.delete", label: "Удаление менторов" },
    ],
  },
  {
    name: "Студенты",
    permissions: [
      { key: "students.view", label: "Просмотр студентов" },
      { key: "students.create", label: "Регистрация студентов" },
      { key: "students.edit", label: "Редактирование студентов" },
      { key: "students.delete", label: "Удаление студентов" },
    ],
  },
  {
    name: "Группы",
    permissions: [
      { key: "groups.view", label: "Просмотр групп" },
      { key: "groups.create", label: "Создание групп" },
      { key: "groups.edit", label: "Редактирование групп" },
      { key: "groups.delete", label: "Удаление групп" },
    ],
  },
  {
    name: "Курсы",
    permissions: [
      { key: "courses.view", label: "Просмотр курсов" },
      { key: "courses.create", label: "Создание курсов" },
      { key: "courses.edit", label: "Редактирование курсов" },
      { key: "courses.delete", label: "Удаление курсов" },
    ],
  },
  {
    name: "Расписание",
    permissions: [
      { key: "schedule.view", label: "Просмотр расписания" },
      { key: "schedule.create", label: "Создание занятий" },
      { key: "schedule.edit", label: "Редактирование занятий" },
      { key: "schedule.delete", label: "Удаление занятий" },
    ],
  },
  {
    name: "Финансы",
    permissions: [
      { key: "finance.expenses.view", label: "Просмотр расходов" },
      { key: "finance.expenses.create", label: "Создание расходов" },
      { key: "finance.salary-settings.view", label: "Просмотр настроек зарплаты" },
      { key: "finance.salary-settings.edit", label: "Редактирование зарплаты" },
    ],
  },
  {
    name: "Отчеты",
    permissions: [
      { key: "reports.financial.view", label: "Финансовые отчеты" },
      { key: "reports.educational.view", label: "Учебные отчеты" },
    ],
  },
  {
    name: "Новости",
    permissions: [
      { key: "news.view", label: "Просмотр новостей" },
      { key: "news.create", label: "Создание новостей" },
      { key: "news.edit", label: "Редактирование новостей" },
      { key: "news.delete", label: "Удаление новостей" },
    ],
  },
  {
    name: "Настройки",
    permissions: [
      { key: "roles.view", label: "Просмотр ролей" },
      { key: "roles.manage", label: "Управление ролями" },
      { key: "regions.view", label: "Просмотр регионов" },
      { key: "languages.view", label: "Просмотр языков" },
      { key: "holidays.view", label: "Просмотр праздников" },
    ],
  },
];

const roles: Role[] = [
  {
    id: "1",
    name: "CEO",
    code: "ceo",
    description: "Полный доступ ко всем функциям системы",
    color: "#E91E63",
    usersCount: 1,
    permissions: ["*"],
    isSystem: true,
  },
  {
    id: "2",
    name: "Администратор",
    code: "admin",
    description: "Управление учебным центром и персоналом",
    color: "#1264EB",
    usersCount: 3,
    permissions: [
      "dashboard.view", "branches.view", "branches.create", "branches.edit",
      "employees.view", "employees.create", "employees.edit",
      "mentors.view", "mentors.create", "mentors.edit",
      "students.view", "students.create", "students.edit",
      "groups.view", "groups.create", "groups.edit",
      "courses.view", "courses.create", "courses.edit",
      "schedule.view", "schedule.create", "schedule.edit",
      "news.view", "news.create", "news.edit",
      "roles.view", "regions.view", "languages.view", "holidays.view",
    ],
    isSystem: true,
  },
  {
    id: "3",
    name: "Финансист",
    code: "financier",
    description: "Управление финансами и отчетностью",
    color: "#4CAF50",
    usersCount: 2,
    permissions: [
      "dashboard.view", "branches.view",
      "students.view",
      "finance.expenses.view", "finance.expenses.create",
      "finance.salary-settings.view", "finance.salary-settings.edit",
      "reports.financial.view",
    ],
    isSystem: true,
  },
  {
    id: "4",
    name: "Ментор",
    code: "mentor",
    description: "Преподавание и работа со студентами",
    color: "#FF9800",
    usersCount: 12,
    permissions: [
      "dashboard.view",
      "students.view",
      "groups.view",
      "courses.view",
      "schedule.view",
    ],
    isSystem: true,
  },
  {
    id: "5",
    name: "Ресепшионист",
    code: "receptionist",
    description: "Приём посетителей и регистрация студентов",
    color: "#9C27B0",
    usersCount: 4,
    permissions: [
      "dashboard.view",
      "students.view", "students.create",
      "groups.view",
      "schedule.view",
      "news.view",
    ],
    isSystem: true,
  },
];

export const RolesPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editPermissions, setEditPermissions] = useState<string[]>([]);

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setEditPermissions(role.permissions);
  };

  const hasPermission = (permKey: string) => {
    return editPermissions.includes("*") || editPermissions.includes(permKey);
  };

  const togglePermission = (permKey: string) => {
    if (editPermissions.includes(permKey)) {
      setEditPermissions(editPermissions.filter((p) => p !== permKey));
    } else {
      setEditPermissions([...editPermissions, permKey]);
    }
  };

  const getPermissionCount = (role: Role) => {
    if (role.permissions.includes("*")) return "Все";
    return role.permissions.length;
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Роли и права доступа
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление ролями пользователей и их правами
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Создать роль
        </Button>
      </Stack>

      {/* Roles Grid */}
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid key={role.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: role.color, width: 48, height: 48 }}>
                    <Shield size={24} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {role.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={role.code}
                      sx={{ bgcolor: `${role.color}20`, color: role.color, fontWeight: 500 }}
                    />
                  </Box>
                </Stack>
                {role.isSystem && (
                  <Chip size="small" label="Системная" variant="outlined" />
                )}
              </Stack>

              <Typography variant="body2" color="text.secondary" mb={2}>
                {role.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <People size={18} color="#6B7280" />
                  <Typography variant="body2" color="text.secondary">
                    {role.usersCount} пользователей
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Shield size={18} color="#6B7280" />
                  <Typography variant="body2" color="text.secondary">
                    {getPermissionCount(role)} прав
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Eye size={16} />}
                  onClick={() => handleViewRole(role)}
                  fullWidth
                >
                  Просмотр
                </Button>
                {!role.isSystem && (
                  <>
                    <IconButton size="small">
                      <Edit2 size={18} color="#FF9800" />
                    </IconButton>
                    <IconButton size="small">
                      <Trash size={18} color="#F44336" />
                    </IconButton>
                  </>
                )}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Role Details Dialog */}
      <Dialog open={!!selectedRole} onClose={() => setSelectedRole(null)} maxWidth="md" fullWidth>
        {selectedRole && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: selectedRole.color, width: 48, height: 48 }}>
                    <Shield size={24} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedRole.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedRole.description}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedRole(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Права доступа
              </Typography>

              {selectedRole.permissions.includes("*") ? (
                <Box sx={{ p: 3, bgcolor: "#E8F5E9", borderRadius: 2, textAlign: "center" }}>
                  <TickCircle size={32} color="#4CAF50" />
                  <Typography variant="h6" color="success.main" mt={1}>
                    Полный доступ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Эта роль имеет доступ ко всем функциям системы
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                  {permissionGroups.map((group) => (
                    <Accordion key={group.name} defaultExpanded={false}>
                      <AccordionSummary expandIcon={<ArrowDown2 size={18} />}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
                          <Typography fontWeight={500}>{group.name}</Typography>
                          <Chip
                            size="small"
                            label={`${group.permissions.filter((p) => hasPermission(p.key)).length}/${group.permissions.length}`}
                            color={group.permissions.some((p) => hasPermission(p.key)) ? "primary" : "default"}
                            variant="outlined"
                          />
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          {group.permissions.map((perm) => (
                            <Grid key={perm.key} size={{ xs: 12, sm: 6 }}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: hasPermission(perm.key) ? "rgba(76, 175, 80, 0.1)" : "#F9FAFB",
                                }}
                              >
                                {hasPermission(perm.key) ? (
                                  <TickCircle size={18} color="#4CAF50" />
                                ) : (
                                  <CloseSquare size={18} color="#9E9E9E" />
                                )}
                                <Typography
                                  variant="body2"
                                  color={hasPermission(perm.key) ? "text.primary" : "text.secondary"}
                                >
                                  {perm.label}
                                </Typography>
                              </Stack>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              {!selectedRole.isSystem && (
                <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                  Редактировать
                </Button>
              )}
              <Button variant="contained" onClick={() => setSelectedRole(null)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Создать роль
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField label="Название роли" size="small" fullWidth />
              <TextField label="Код роли" size="small" fullWidth placeholder="admin, mentor..." />
            </Stack>

            <TextField
              label="Описание"
              size="small"
              fullWidth
              multiline
              rows={2}
            />

            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Права доступа
              </Typography>
              <Box sx={{ maxHeight: 350, overflow: "auto" }}>
                {permissionGroups.map((group) => (
                  <Accordion key={group.name}>
                    <AccordionSummary expandIcon={<ArrowDown2 size={18} />}>
                      <Typography fontWeight={500}>{group.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={1}>
                        {group.permissions.map((perm) => (
                          <Grid key={perm.key} size={{ xs: 12, sm: 6 }}>
                            <FormControlLabel
                              control={<Checkbox size="small" />}
                              label={<Typography variant="body2">{perm.label}</Typography>}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
