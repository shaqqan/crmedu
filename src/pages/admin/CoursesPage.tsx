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
} from "iconsax-react";

// Course status
type CourseStatus = "active" | "inactive" | "draft";

// Course interface
interface Course {
  id: string;
  name: string;
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
  {
    id: "1",
    name: "English Beginner",
    language: "Английский",
    level: "A1",
    duration: 3,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 800000,
    description: "Курс английского языка для начинающих",
    status: "active",
    studentsCount: 156,
    groupsCount: 8,
  },
  {
    id: "2",
    name: "English Elementary",
    language: "Английский",
    level: "A2",
    duration: 3,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 900000,
    description: "Курс английского языка для продолжающих",
    status: "active",
    studentsCount: 134,
    groupsCount: 7,
  },
  {
    id: "3",
    name: "English Intermediate",
    language: "Английский",
    level: "B1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 1000000,
    description: "Курс английского языка среднего уровня",
    status: "active",
    studentsCount: 98,
    groupsCount: 5,
  },
  {
    id: "4",
    name: "English Upper-Intermediate",
    language: "Английский",
    level: "B2",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 1100000,
    description: "Курс английского языка выше среднего",
    status: "active",
    studentsCount: 67,
    groupsCount: 4,
  },
  {
    id: "5",
    name: "IELTS Preparation",
    language: "Английский",
    level: "IELTS",
    duration: 3,
    lessonsPerWeek: 4,
    lessonDuration: 120,
    price: 1500000,
    description: "Подготовка к экзамену IELTS",
    status: "active",
    studentsCount: 89,
    groupsCount: 5,
  },
  {
    id: "6",
    name: "Korean Beginner",
    language: "Корейский",
    level: "A1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 900000,
    description: "Курс корейского языка для начинающих",
    status: "active",
    studentsCount: 112,
    groupsCount: 6,
  },
  {
    id: "7",
    name: "Korean Elementary",
    language: "Корейский",
    level: "A2",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 1000000,
    description: "Курс корейского языка для продолжающих",
    status: "active",
    studentsCount: 78,
    groupsCount: 4,
  },
  {
    id: "8",
    name: "German Beginner",
    language: "Немецкий",
    level: "A1",
    duration: 4,
    lessonsPerWeek: 3,
    lessonDuration: 90,
    price: 850000,
    description: "Курс немецкого языка для начинающих",
    status: "active",
    studentsCount: 67,
    groupsCount: 4,
  },
  {
    id: "9",
    name: "French Beginner",
    language: "Французский",
    level: "A1",
    duration: 4,
    lessonsPerWeek: 2,
    lessonDuration: 90,
    price: 750000,
    description: "Курс французского языка для начинающих",
    status: "inactive",
    studentsCount: 23,
    groupsCount: 2,
  },
  {
    id: "10",
    name: "Japanese Beginner",
    language: "Японский",
    level: "A1",
    duration: 6,
    lessonsPerWeek: 2,
    lessonDuration: 90,
    price: 950000,
    description: "Курс японского языка для начинающих",
    status: "draft",
    studentsCount: 0,
    groupsCount: 0,
  },
];

interface CourseFormData {
  id?: string;
  name: string;
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

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = !filterLanguage || course.language === filterLanguage;
      const matchesStatus = !filterStatus || course.status === filterStatus;

      return matchesSearch && matchesLanguage && matchesStatus;
    });
  }, [courses, searchQuery, filterLanguage, filterStatus]);

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
  };

  const hasFilters = searchQuery || filterLanguage || filterStatus;

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
              {filteredCourses.map((course) => (
                <TableRow
                  key={course.id}
                  sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1.5,
                          bgcolor: "rgba(18, 100, 235, 0.1)",
                        }}
                      >
                        <Book1 size={20} color="#1264EB" />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {course.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {course.groupsCount} групп
                        </Typography>
                      </Box>
                    </Stack>
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
              ))}
              {filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
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
