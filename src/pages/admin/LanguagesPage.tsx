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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Add,
  SearchNormal1,
  Edit2,
  Trash,
  Eye,
  LanguageSquare,
  Book1,
  Profile2User,
} from "iconsax-react";

// Language interface
interface Language {
  id: string;
  name: string;
  code: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  coursesCount: number;
  studentsCount: number;
  description: string;
}

// Mock languages data
const initialLanguages: Language[] = [
  {
    id: "1",
    name: "Английский",
    code: "en",
    nativeName: "English",
    flag: "🇬🇧",
    isActive: true,
    coursesCount: 12,
    studentsCount: 456,
    description: "Международный язык общения",
  },
  {
    id: "2",
    name: "Корейский",
    code: "ko",
    nativeName: "한국어",
    flag: "🇰🇷",
    isActive: true,
    coursesCount: 6,
    studentsCount: 234,
    description: "Язык Южной Кореи",
  },
  {
    id: "3",
    name: "Немецкий",
    code: "de",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    isActive: true,
    coursesCount: 4,
    studentsCount: 156,
    description: "Официальный язык Германии, Австрии и Швейцарии",
  },
  {
    id: "4",
    name: "Французский",
    code: "fr",
    nativeName: "Français",
    flag: "🇫🇷",
    isActive: true,
    coursesCount: 3,
    studentsCount: 98,
    description: "Язык любви и дипломатии",
  },
  {
    id: "5",
    name: "Испанский",
    code: "es",
    nativeName: "Español",
    flag: "🇪🇸",
    isActive: true,
    coursesCount: 2,
    studentsCount: 67,
    description: "Второй по распространённости язык в мире",
  },
  {
    id: "6",
    name: "Японский",
    code: "ja",
    nativeName: "日本語",
    flag: "🇯🇵",
    isActive: true,
    coursesCount: 2,
    studentsCount: 45,
    description: "Язык Страны восходящего солнца",
  },
  {
    id: "7",
    name: "Китайский",
    code: "zh",
    nativeName: "中文",
    flag: "🇨🇳",
    isActive: false,
    coursesCount: 0,
    studentsCount: 0,
    description: "Самый распространённый язык в мире",
  },
  {
    id: "8",
    name: "Итальянский",
    code: "it",
    nativeName: "Italiano",
    flag: "🇮🇹",
    isActive: false,
    coursesCount: 0,
    studentsCount: 0,
    description: "Язык искусства и музыки",
  },
  {
    id: "9",
    name: "Турецкий",
    code: "tr",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    isActive: true,
    coursesCount: 1,
    studentsCount: 34,
    description: "Официальный язык Турции",
  },
  {
    id: "10",
    name: "Арабский",
    code: "ar",
    nativeName: "العربية",
    flag: "🇸🇦",
    isActive: false,
    coursesCount: 0,
    studentsCount: 0,
    description: "Язык Корана и арабского мира",
  },
];

interface LanguageFormData {
  id?: string;
  name: string;
  code: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  description: string;
}

const initialFormData: LanguageFormData = {
  name: "",
  code: "",
  nativeName: "",
  flag: "",
  isActive: true,
  description: "",
};

// Flag options
const flagOptions = [
  { flag: "🇬🇧", name: "Великобритания" },
  { flag: "🇺🇸", name: "США" },
  { flag: "🇰🇷", name: "Корея" },
  { flag: "🇩🇪", name: "Германия" },
  { flag: "🇫🇷", name: "Франция" },
  { flag: "🇪🇸", name: "Испания" },
  { flag: "🇯🇵", name: "Япония" },
  { flag: "🇨🇳", name: "Китай" },
  { flag: "🇮🇹", name: "Италия" },
  { flag: "🇹🇷", name: "Турция" },
  { flag: "🇸🇦", name: "Саудовская Аравия" },
  { flag: "🇷🇺", name: "Россия" },
  { flag: "🇧🇷", name: "Бразилия" },
  { flag: "🇵🇹", name: "Португалия" },
  { flag: "🇮🇳", name: "Индия" },
];

export const LanguagesPage: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState<LanguageFormData>(initialFormData);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  // Filter languages
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const matchesSearch =
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && lang.isActive) ||
        (filterStatus === "inactive" && !lang.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [languages, searchQuery, filterStatus]);

  // Stats
  const activeCount = languages.filter((l) => l.isActive).length;
  const totalStudents = languages.reduce((sum, l) => sum + l.studentsCount, 0);
  const totalCourses = languages.reduce((sum, l) => sum + l.coursesCount, 0);

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
    setSelectedLanguage(null);
  };

  // View language
  const handleView = (language: Language) => {
    setSelectedLanguage(language);
    setViewDialogOpen(true);
  };

  // Edit language
  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setFormData({
      id: language.id,
      name: language.name,
      code: language.code,
      nativeName: language.nativeName,
      flag: language.flag,
      isActive: language.isActive,
      description: language.description,
    });
    setEditDialogOpen(true);
  };

  // Delete language
  const handleDeleteClick = (language: Language) => {
    setSelectedLanguage(language);
    setDeleteDialogOpen(true);
  };

  // Toggle language status
  const handleToggleStatus = (language: Language) => {
    setLanguages((prev) =>
      prev.map((l) => (l.id === language.id ? { ...l, isActive: !l.isActive } : l))
    );
  };

  // Save new language
  const handleSave = () => {
    if (!formData.name || !formData.code || !formData.nativeName) return;

    const newLanguage: Language = {
      id: String(Date.now()),
      name: formData.name,
      code: formData.code,
      nativeName: formData.nativeName,
      flag: formData.flag,
      isActive: formData.isActive,
      description: formData.description,
      coursesCount: 0,
      studentsCount: 0,
    };

    setLanguages((prev) => [...prev, newLanguage]);
    handleDialogClose();
  };

  // Update language
  const handleUpdate = () => {
    if (!formData.id || !formData.name || !formData.code || !formData.nativeName) return;

    setLanguages((prev) =>
      prev.map((l) =>
        l.id === formData.id
          ? {
              ...l,
              name: formData.name,
              code: formData.code,
              nativeName: formData.nativeName,
              flag: formData.flag,
              isActive: formData.isActive,
              description: formData.description,
            }
          : l
      )
    );
    handleDialogClose();
  };

  // Delete language
  const handleDelete = () => {
    if (!selectedLanguage) return;
    setLanguages((prev) => prev.filter((l) => l.id !== selectedLanguage.id));
    handleDialogClose();
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
  };

  const hasFilters = searchQuery || filterStatus !== "all";

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Языки
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={handleAddClick}
        >
          Добавить язык
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <Paper sx={{ p: 2, borderRadius: 3, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
              <LanguageSquare size={24} color="#1264EB" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {languages.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Всего языков
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 3, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
              <LanguageSquare size={24} color="#4CAF50" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {activeCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Активных
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 3, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
              <Book1 size={24} color="#FF9800" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {totalCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Курсов
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 3, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(233, 30, 99, 0.1)" }}>
              <Profile2User size={24} color="#E91E63" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {totalStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Студентов
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            placeholder="Поиск по названию..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal1 size={20} color="#6B7280" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
              label="Статус"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="inactive">Неактивные</MenuItem>
            </Select>
          </FormControl>

          {hasFilters && (
            <Button variant="outlined" color="error" size="small" onClick={handleClearFilters}>
              Сбросить
            </Button>
          )}

          <Chip
            label={`${filteredLanguages.length} языков`}
            color="primary"
            size="small"
            sx={{ ml: "auto" }}
          />
        </Stack>
      </Paper>

      {/* Languages Table */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                <TableCell sx={{ fontWeight: 600 }}>Язык</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Код</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Курсы</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Студенты</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Статус</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLanguages.map((language) => (
                <TableRow key={language.id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h5" sx={{ lineHeight: 1 }}>
                        {language.flag}
                      </Typography>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {language.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {language.nativeName}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={language.code.toUpperCase()} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Book1 size={16} color="#6B7280" />
                      <Typography variant="body2">{language.coursesCount}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Profile2User size={16} color="#6B7280" />
                      <Typography variant="body2">{language.studentsCount}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={language.isActive}
                      onChange={() => handleToggleStatus(language)}
                      size="small"
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Просмотр">
                        <IconButton size="small" onClick={() => handleView(language)}>
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <IconButton size="small" onClick={() => handleEdit(language)}>
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(language)}
                        >
                          <Trash size={18} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLanguages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">Языки не найдены</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Language Dialog */}
      <Dialog open={addDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить язык</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Флаг</InputLabel>
                <Select
                  value={formData.flag}
                  onChange={(e) => setFormData((prev) => ({ ...prev, flag: e.target.value }))}
                  label="Флаг"
                >
                  {flagOptions.map((option) => (
                    <MenuItem key={option.flag} value={option.flag}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <span style={{ fontSize: 20 }}>{option.flag}</span>
                        <span>{option.name}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Название"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                fullWidth
                required
                placeholder="Например: Английский"
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Код языка"
                value={formData.code}
                onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                fullWidth
                required
                placeholder="en, ko, de..."
              />
              <TextField
                label="Название на языке"
                value={formData.nativeName}
                onChange={(e) => setFormData((prev) => ({ ...prev, nativeName: e.target.value }))}
                fullWidth
                required
                placeholder="English, 한국어..."
              />
            </Stack>

            <TextField
              label="Описание"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
              placeholder="Краткое описание языка..."
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  color="success"
                />
              }
              label="Активный"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name || !formData.code || !formData.nativeName}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Language Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4" sx={{ lineHeight: 1 }}>
              {selectedLanguage?.flag}
            </Typography>
            <Box>
              <Typography variant="h6">{selectedLanguage?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedLanguage?.nativeName}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedLanguage && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Код языка
                  </Typography>
                  <Typography variant="body1">{selectedLanguage.code.toUpperCase()}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Статус
                  </Typography>
                  <Box>
                    <Chip
                      label={selectedLanguage.isActive ? "Активный" : "Неактивный"}
                      color={selectedLanguage.isActive ? "success" : "default"}
                      size="small"
                    />
                  </Box>
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Описание
                </Typography>
                <Typography variant="body1">{selectedLanguage.description || "—"}</Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Paper sx={{ p: 2, flex: 1, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Book1 size={20} color="#1264EB" />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedLanguage.coursesCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Курсов
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Profile2User size={20} color="#E91E63" />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedLanguage.studentsCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Студентов
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
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
              if (selectedLanguage) handleEdit(selectedLanguage);
            }}
          >
            Редактировать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Language Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Редактировать язык</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Флаг</InputLabel>
                <Select
                  value={formData.flag}
                  onChange={(e) => setFormData((prev) => ({ ...prev, flag: e.target.value }))}
                  label="Флаг"
                >
                  {flagOptions.map((option) => (
                    <MenuItem key={option.flag} value={option.flag}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <span style={{ fontSize: 20 }}>{option.flag}</span>
                        <span>{option.name}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Название"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                fullWidth
                required
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Код языка"
                value={formData.code}
                onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Название на языке"
                value={formData.nativeName}
                onChange={(e) => setFormData((prev) => ({ ...prev, nativeName: e.target.value }))}
                fullWidth
                required
              />
            </Stack>

            <TextField
              label="Описание"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  color="success"
                />
              }
              label="Активный"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!formData.name || !formData.code || !formData.nativeName}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Удалить язык?</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить язык "{selectedLanguage?.name}"?
          </Typography>
          {selectedLanguage && selectedLanguage.coursesCount > 0 && (
            <Typography color="error" sx={{ mt: 1 }}>
              Внимание: с этим языком связано {selectedLanguage.coursesCount} курсов!
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
