import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import {
  Add,
  SearchNormal1,
  Edit2,
  Trash,
  Eye,
  Book1,
  Clock,
  DollarCircle,
  LanguageSquare,
  Hierarchy,
  ArrowRight3,
} from "iconsax-react";

// Course status
type CourseStatus = "active" | "inactive" | "draft";

// Course type
type CourseType = "online" | "offline" | "videocourse";

// Course interface
interface Course {
  id: string;
  name: string;
  parentId: string | null; // Parent course ID for hierarchy
  type: CourseType;
  language: string;
  level: string;
  duration: number; // in months
  lessonsPerWeek: number;
  lessonDuration: number; // in minutes
  price: number;
  description: string;
  status: CourseStatus;
  studentsCount: number;
  groupsCount: number;
}

// Course type labels
const courseTypeLabels: Record<CourseType, string> = {
  online: "Онлайн",
  offline: "Оффлайн",
  videocourse: "Видеокурс",
};

// Course type colors
const courseTypeColors: Record<CourseType, string> = {
  online: "#1264EB",
  offline: "#4CAF50",
  videocourse: "#FF9800",
};

// Languages
const languages = [
  { id: "1", name: "Английский" },
  { id: "2", name: "Корейский" },
  { id: "3", name: "Немецкий" },
  { id: "4", name: "Французский" },
  { id: "5", name: "Испанский" },
  { id: "6", name: "Японский" },
  { id: "7", name: "Китайский" },
];

// Levels
const levels = ["A1", "A2", "B1", "B2", "C1", "C2", "IELTS", "TOEFL"];

// Mock courses data
const initialCourses: Course[] = [
  // Parent courses (no parentId)
  {
    id: "1",
    name: "Backend Development",
    parentId: null,
    type: "offline",
    language: "Английский",
    level: "B1",
    duration: 6,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2000000,
    description: "Основы бэкенд разработки",
    status: "active",
    studentsCount: 245,
    groupsCount: 12,
  },
  {
    id: "2",
    name: "Frontend Development",
    parentId: null,
    type: "offline",
    language: "Английский",
    level: "B1",
    duration: 5,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1800000,
    description: "Основы фронтенд разработки",
    status: "active",
    studentsCount: 189,
    groupsCount: 9,
  },
  {
    id: "3",
    name: "Mobile Development",
    parentId: null,
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 6,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2200000,
    description: "Мобильная разработка",
    status: "active",
    studentsCount: 134,
    groupsCount: 7,
  },
  {
    id: "4",
    name: "English Course",
    parentId: null,
    type: "offline",
    language: "Английский",
    level: "A1",
    duration: 3,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 800000,
    description: "Курсы английского языка",
    status: "active",
    studentsCount: 456,
    groupsCount: 20,
  },
  // Backend children
  {
    id: "5",
    name: "Java",
    parentId: "1",
    type: "offline",
    language: "Английский",
    level: "B1",
    duration: 6,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2000000,
    description: "Java backend разработка",
    status: "active",
    studentsCount: 89,
    groupsCount: 4,
  },
  {
    id: "6",
    name: "Python",
    parentId: "1",
    type: "offline",
    language: "Английский",
    level: "B1",
    duration: 5,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1900000,
    description: "Python backend разработка",
    status: "active",
    studentsCount: 78,
    groupsCount: 4,
  },
  {
    id: "7",
    name: "Node.js",
    parentId: "1",
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1800000,
    description: "Node.js backend разработка",
    status: "active",
    studentsCount: 56,
    groupsCount: 3,
  },
  {
    id: "8",
    name: "Go",
    parentId: "1",
    type: "videocourse",
    language: "Английский",
    level: "B2",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2100000,
    description: "Go backend разработка",
    status: "draft",
    studentsCount: 0,
    groupsCount: 0,
  },
  // Frontend children
  {
    id: "9",
    name: "React",
    parentId: "2",
    type: "offline",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1700000,
    description: "React frontend разработка",
    status: "active",
    studentsCount: 98,
    groupsCount: 5,
  },
  {
    id: "10",
    name: "Vue.js",
    parentId: "2",
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1600000,
    description: "Vue.js frontend разработка",
    status: "active",
    studentsCount: 45,
    groupsCount: 2,
  },
  {
    id: "11",
    name: "Angular",
    parentId: "2",
    type: "videocourse",
    language: "Английский",
    level: "B1",
    duration: 5,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1800000,
    description: "Angular frontend разработка",
    status: "inactive",
    studentsCount: 23,
    groupsCount: 1,
  },
  // Mobile children
  {
    id: "12",
    name: "Flutter",
    parentId: "3",
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 5,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2000000,
    description: "Flutter мобильная разработка",
    status: "active",
    studentsCount: 67,
    groupsCount: 3,
  },
  {
    id: "13",
    name: "React Native",
    parentId: "3",
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 1900000,
    description: "React Native мобильная разработка",
    status: "active",
    studentsCount: 45,
    groupsCount: 2,
  },
  {
    id: "14",
    name: "Swift (iOS)",
    parentId: "3",
    type: "videocourse",
    language: "Английский",
    level: "B2",
    duration: 6,
    lessonsPerWeek: 3,
    lessonDuration: 120,
    price: 2400000,
    description: "iOS разработка на Swift",
    status: "draft",
    studentsCount: 0,
    groupsCount: 0,
  },
  // English children
  {
    id: "15",
    name: "English Beginner",
    parentId: "4",
    type: "offline",
    language: "Английский",
    level: "A1",
    duration: 3,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 800000,
    description: "Английский для начинающих",
    status: "active",
    studentsCount: 156,
    groupsCount: 8,
  },
  {
    id: "16",
    name: "English Intermediate",
    parentId: "4",
    type: "online",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 1000000,
    description: "Английский средний уровень",
    status: "active",
    studentsCount: 134,
    groupsCount: 7,
  },
  {
    id: "17",
    name: "IELTS Preparation",
    parentId: "4",
    type: "offline",
    language: "Английский",
    level: "IELTS",
    duration: 3,
    lessonsPerWeek: 4,
    lessonDuration: 120,
    price: 1500000,
    description: "Подготовка к IELTS",
    status: "active",
    studentsCount: 89,
    groupsCount: 5,
  },
];

interface CourseFormData {
  id?: string;
  name: string;
  parentId: string | null;
  type: CourseType;
  language: string;
  level: string;
  duration: number;
  lessonsPerWeek: number;
  lessonDuration: number;
  price: number;
  description: string;
  status: CourseStatus;
}

const initialFormData: CourseFormData = {
  name: "",
  parentId: null,
  type: "offline",
  language: "",
  level: "",
  duration: 3,
  lessonsPerWeek: 3,
  lessonDuration: 90,
  price: 0,
  description: "",
  status: "draft",
};

const statusLabels: Record<CourseStatus, string> = {
  active: "Активный",
  inactive: "Неактивный",
  draft: "Черновик",
};

const statusColors: Record<CourseStatus, "success" | "error" | "default"> = {
  active: "success",
  inactive: "error",
  draft: "default",
};

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price) + " сум";
};

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterStatus, setFilterStatus] = useState<CourseStatus | "">("");
  const [filterType, setFilterType] = useState<CourseType | "">("");
  const [filterParent, setFilterParent] = useState<string>("");

  // Get parent courses (courses without parentId)
  const parentCourses = useMemo(() => {
    return courses.filter((c) => c.parentId === null);
  }, [courses]);

  // Get children count for a parent course
  const getChildrenCount = (parentId: string) => {
    return courses.filter((c) => c.parentId === parentId).length;
  };

  // Get parent course name
  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    const parent = courses.find((c) => c.id === parentId);
    return parent?.name || null;
  };

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Filter and organize courses hierarchically
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = !filterLanguage || course.language === filterLanguage;
      const matchesStatus = !filterStatus || course.status === filterStatus;
      const matchesType = !filterType || course.type === filterType;
      const matchesParent = !filterParent ||
        course.id === filterParent ||
        course.parentId === filterParent;

      return matchesSearch && matchesLanguage && matchesStatus && matchesType && matchesParent;
    });

    // Organize hierarchically: parents first, then their children
    const organized: Course[] = [];
    const parents = filtered.filter((c) => c.parentId === null);
    const children = filtered.filter((c) => c.parentId !== null);

    parents.forEach((parent) => {
      organized.push(parent);
      const parentChildren = children.filter((c) => c.parentId === parent.id);
      organized.push(...parentChildren);
    });

    // Add orphan children (whose parent is not in filtered list)
    const addedIds = new Set(organized.map((c) => c.id));
    children.forEach((child) => {
      if (!addedIds.has(child.id)) {
        organized.push(child);
      }
    });

    return organized;
  }, [courses, searchQuery, filterLanguage, filterStatus, filterParent]);

  // Open add dialog
  const handleAddClick = () => {
    setFormData(initialFormData);
    setAddDialogOpen(true);
  };

  // Close all dialogs
  const handleDialogClose = () => {
    setAddDialogOpen(false);
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setFormData(initialFormData);
    setSelectedCourse(null);
  };

  // View course
  const handleView = (course: Course) => {
    setSelectedCourse(course);
    setViewDialogOpen(true);
  };

  // Edit course
  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      id: course.id,
      name: course.name,
      parentId: course.parentId,
      type: course.type,
      language: course.language,
      level: course.level,
      duration: course.duration,
      lessonsPerWeek: course.lessonsPerWeek,
      lessonDuration: course.lessonDuration,
      price: course.price,
      description: course.description,
      status: course.status,
    });
    setEditDialogOpen(true);
  };

  // Delete course
  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    setDeleteDialogOpen(true);
  };

  // Save new course
  const handleSave = () => {
    if (!formData.name || !formData.language || !formData.level) return;

    const newCourse: Course = {
      id: String(Date.now()),
      name: formData.name,
      parentId: formData.parentId,
      type: formData.type,
      language: formData.language,
      level: formData.level,
      duration: formData.duration,
      lessonsPerWeek: formData.lessonsPerWeek,
      lessonDuration: formData.lessonDuration,
      price: formData.price,
      description: formData.description,
      status: formData.status,
      studentsCount: 0,
      groupsCount: 0,
    };

    setCourses((prev) => [...prev, newCourse]);
    handleDialogClose();
  };

  // Update course
  const handleUpdate = () => {
    if (!formData.id || !formData.name || !formData.language || !formData.level) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.id === formData.id
          ? {
              ...c,
              name: formData.name,
              parentId: formData.parentId,
              type: formData.type,
              language: formData.language,
              level: formData.level,
              duration: formData.duration,
              lessonsPerWeek: formData.lessonsPerWeek,
              lessonDuration: formData.lessonDuration,
              price: formData.price,
              description: formData.description,
              status: formData.status,
            }
          : c
      )
    );
    handleDialogClose();
  };

  // Delete course
  const handleDelete = () => {
    if (!selectedCourse) return;
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    handleDialogClose();
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterLanguage("");
    setFilterStatus("");
    setFilterType("");
    setFilterParent("");
  };

  const hasFilters = searchQuery || filterLanguage || filterStatus || filterType || filterParent;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Курсы
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={handleAddClick}
        >
          Добавить курс
        </Button>
      </Stack>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            placeholder="Поиск по названию..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal1 size={20} color="#6B7280" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Язык</InputLabel>
            <Select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              label="Язык"
            >
              <MenuItem value="">Все языки</MenuItem>
              {languages.map((lang) => (
                <MenuItem key={lang.id} value={lang.name}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as CourseStatus | "")}
              label="Статус"
            >
              <MenuItem value="">Все статусы</MenuItem>
              <MenuItem value="active">Активный</MenuItem>
              <MenuItem value="inactive">Неактивный</MenuItem>
              <MenuItem value="draft">Черновик</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Тип</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as CourseType | "")}
              label="Тип"
            >
              <MenuItem value="">Все типы</MenuItem>
              <MenuItem value="offline">Оффлайн</MenuItem>
              <MenuItem value="online">Онлайн</MenuItem>
              <MenuItem value="videocourse">Видеокурс</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Родительский курс</InputLabel>
            <Select
              value={filterParent}
              onChange={(e) => setFilterParent(e.target.value)}
              label="Родительский курс"
            >
              <MenuItem value="">Все курсы</MenuItem>
              {parentCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {hasFilters && (
            <Button variant="outlined" color="error" size="small" onClick={handleClearFilters}>
              Сбросить
            </Button>
          )}

          <Chip
            label={`${filteredCourses.length} курсов`}
            color="primary"
            size="small"
            sx={{ ml: "auto" }}
          />
        </Stack>
      </Paper>

      {/* Courses Table */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                <TableCell sx={{ fontWeight: 600 }}>Название</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Тип</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Язык</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Уровень</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Длительность</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Цена</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Студенты</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Статус</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => {
                const isChild = course.parentId !== null;
                const childrenCount = getChildrenCount(course.id);
                const parentName = getParentName(course.parentId);

                return (
                <TableRow
                  key={course.id}
                  sx={{
                    "&:hover": { bgcolor: "#F9FAFB" },
                    bgcolor: isChild ? "rgba(0, 0, 0, 0.02)" : "transparent",
                  }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      {/* Indent for child courses */}
                      {isChild && (
                        <Box sx={{ pl: 2, display: "flex", alignItems: "center" }}>
                          <ArrowRight3 size={16} color="#9CA3AF" />
                        </Box>
                      )}
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1.5,
                          bgcolor: isChild
                            ? "rgba(156, 163, 175, 0.1)"
                            : "rgba(18, 100, 235, 0.1)",
                        }}
                      >
                        {isChild ? (
                          <Book1 size={20} color="#6B7280" />
                        ) : (
                          <Hierarchy size={20} color="#1264EB" />
                        )}
                      </Box>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" fontWeight={isChild ? 400 : 600}>
                            {course.name}
                          </Typography>
                          {!isChild && childrenCount > 0 && (
                            <Chip
                              label={`${childrenCount} подкурсов`}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: 11,
                                bgcolor: "primary.main",
                                color: "white",
                              }}
                            />
                          )}
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {isChild && parentName ? `${parentName} → ` : ""}
                          {course.groupsCount} групп
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={courseTypeLabels[course.type]}
                      size="small"
                      sx={{
                        bgcolor: `${courseTypeColors[course.type]}15`,
                        color: courseTypeColors[course.type],
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LanguageSquare size={16} color="#6B7280" />
                      <Typography variant="body2">{course.language}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={course.level} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Clock size={16} color="#6B7280" />
                      <Typography variant="body2">{course.duration} мес.</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DollarCircle size={16} color="#6B7280" />
                      <Typography variant="body2" fontWeight={500}>
                        {formatPrice(course.price)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{course.studentsCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[course.status]}
                      color={statusColors[course.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Просмотр">
                        <IconButton size="small" onClick={() => handleView(course)}>
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <IconButton size="small" onClick={() => handleEdit(course)}>
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(course)}
                        >
                          <Trash size={18} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
                );
              })}
              {filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">Курсы не найдены</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Course Dialog */}
      <Dialog open={addDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить курс</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Название курса"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
              required
              placeholder="Например: English Beginner"
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Родительский курс</InputLabel>
                <Select
                  value={formData.parentId || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentId: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  label="Родительский курс"
                >
                  <MenuItem value="">
                    <em>Нет (основной курс)</em>
                  </MenuItem>
                  {parentCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Тип курса</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value as CourseType }))
                  }
                  label="Тип курса"
                >
                  <MenuItem value="offline">Оффлайн</MenuItem>
                  <MenuItem value="online">Онлайн</MenuItem>
                  <MenuItem value="videocourse">Видеокурс</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Язык</InputLabel>
                <Select
                  value={formData.language}
                  onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                  label="Язык"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.id} value={lang.name}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={formData.level}
                  onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}
                  label="Уровень"
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Длительность (мес.)"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Занятий в неделю"
                type="number"
                value={formData.lessonsPerWeek}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lessonsPerWeek: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Длит. занятия (мин.)"
                type="number"
                value={formData.lessonDuration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lessonDuration: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 30 }}
              />
            </Stack>

            <TextField
              label="Цена (сум)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Описание"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
              placeholder="Краткое описание курса..."
            />

            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value as CourseStatus }))
                }
                label="Статус"
              >
                <MenuItem value="draft">Черновик</MenuItem>
                <MenuItem value="active">Активный</MenuItem>
                <MenuItem value="inactive">Неактивный</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name || !formData.language || !formData.level}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Course Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
              <Book1 size={24} color="#1264EB" />
            </Box>
            <span>{selectedCourse?.name}</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {selectedCourse.parentId && (
                <Box sx={{ p: 1.5, bgcolor: "#F3F4F6", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Родительский курс
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {getParentName(selectedCourse.parentId)}
                  </Typography>
                </Box>
              )}
              {getChildrenCount(selectedCourse.id) > 0 && (
                <Box sx={{ p: 1.5, bgcolor: "rgba(18, 100, 235, 0.08)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Подкурсы
                  </Typography>
                  <Typography variant="body1" fontWeight={500} color="primary">
                    {getChildrenCount(selectedCourse.id)} подкурсов
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Тип курса
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={courseTypeLabels[selectedCourse.type]}
                    size="small"
                    sx={{
                      bgcolor: `${courseTypeColors[selectedCourse.type]}15`,
                      color: courseTypeColors[selectedCourse.type],
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </Box>

              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Язык
                  </Typography>
                  <Typography variant="body1">{selectedCourse.language}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Уровень
                  </Typography>
                  <Typography variant="body1">{selectedCourse.level}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Длительность
                  </Typography>
                  <Typography variant="body1">{selectedCourse.duration} месяцев</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Занятий в неделю
                  </Typography>
                  <Typography variant="body1">{selectedCourse.lessonsPerWeek}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Длительность занятия
                  </Typography>
                  <Typography variant="body1">{selectedCourse.lessonDuration} минут</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Цена
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {formatPrice(selectedCourse.price)}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Описание
                </Typography>
                <Typography variant="body1">
                  {selectedCourse.description || "—"}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Chip
                  icon={<Book1 size={16} />}
                  label={`${selectedCourse.groupsCount} групп`}
                  variant="outlined"
                />
                <Chip
                  icon={<Book1 size={16} />}
                  label={`${selectedCourse.studentsCount} студентов`}
                  variant="outlined"
                />
                <Chip
                  label={statusLabels[selectedCourse.status]}
                  color={statusColors[selectedCourse.status]}
                />
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Закрыть</Button>
          <Button
            variant="contained"
            onClick={() => {
              setViewDialogOpen(false);
              if (selectedCourse) handleEdit(selectedCourse);
            }}
          >
            Редактировать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Редактировать курс</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Название курса"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
              required
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Родительский курс</InputLabel>
                <Select
                  value={formData.parentId || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentId: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  label="Родительский курс"
                >
                  <MenuItem value="">
                    <em>Нет (основной курс)</em>
                  </MenuItem>
                  {parentCourses
                    .filter((c) => c.id !== formData.id) // Exclude self
                    .map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Тип курса</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value as CourseType }))
                  }
                  label="Тип курса"
                >
                  <MenuItem value="offline">Оффлайн</MenuItem>
                  <MenuItem value="online">Онлайн</MenuItem>
                  <MenuItem value="videocourse">Видеокурс</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Язык</InputLabel>
                <Select
                  value={formData.language}
                  onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                  label="Язык"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.id} value={lang.name}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={formData.level}
                  onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}
                  label="Уровень"
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Длительность (мес.)"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Занятий в неделю"
                type="number"
                value={formData.lessonsPerWeek}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lessonsPerWeek: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Длит. занятия (мин.)"
                type="number"
                value={formData.lessonDuration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lessonDuration: Number(e.target.value) }))
                }
                fullWidth
                inputProps={{ min: 30 }}
              />
            </Stack>

            <TextField
              label="Цена (сум)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Описание"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />

            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value as CourseStatus }))
                }
                label="Статус"
              >
                <MenuItem value="draft">Черновик</MenuItem>
                <MenuItem value="active">Активный</MenuItem>
                <MenuItem value="inactive">Неактивный</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!formData.name || !formData.language || !formData.level}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Удалить курс?</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить курс "{selectedCourse?.name}"?
          </Typography>
          {selectedCourse && selectedCourse.studentsCount > 0 && (
            <Typography color="error" sx={{ mt: 1 }}>
              Внимание: в этом курсе {selectedCourse.studentsCount} студентов!
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
