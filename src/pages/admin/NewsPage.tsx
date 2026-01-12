import React, { useState, useMemo } from "react";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  Button,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Tabs,
  Tab,
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Calendar,
  Clock,
  Notification,
  Document,
  Gallery,
  Send,
  TickCircle,
} from "iconsax-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  category: "announcement" | "event" | "achievement" | "update";
  status: "published" | "draft" | "scheduled";
  author: string;
  publishedAt: string;
  scheduledAt?: string;
  views: number;
  targetAudience: string[];
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Новые курсы корейского языка",
    content: "Мы рады объявить о запуске новых курсов корейского языка для начинающих...",
    excerpt: "Запуск новых курсов корейского языка с носителями языка",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400",
    category: "announcement",
    status: "published",
    author: "Иванов А.",
    publishedAt: "2026-01-10",
    views: 245,
    targetAudience: ["students", "mentors"],
  },
  {
    id: "2",
    title: "Результаты IELTS экзамена",
    content: "Поздравляем наших студентов с отличными результатами IELTS...",
    excerpt: "15 студентов получили балл 7.0 и выше",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    category: "achievement",
    status: "published",
    author: "Петрова М.",
    publishedAt: "2026-01-08",
    views: 189,
    targetAudience: ["students", "mentors", "parents"],
  },
  {
    id: "3",
    title: "Новогодний праздник в центре",
    content: "Приглашаем всех на новогодний праздник 25 декабря...",
    excerpt: "Праздничное мероприятие для студентов и их родителей",
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400",
    category: "event",
    status: "published",
    author: "Сидоров К.",
    publishedAt: "2025-12-20",
    views: 312,
    targetAudience: ["students", "parents"],
  },
  {
    id: "4",
    title: "Обновление расписания занятий",
    content: "С 15 января изменяется расписание для групп английского языка...",
    excerpt: "Новое расписание для групп English B1 и B2",
    category: "update",
    status: "published",
    author: "Козлова А.",
    publishedAt: "2026-01-05",
    views: 156,
    targetAudience: ["students", "mentors"],
  },
  {
    id: "5",
    title: "Летний интенсив 2026",
    content: "Открыта регистрация на летние интенсивные курсы...",
    excerpt: "3-месячные интенсивные программы по всем языкам",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    category: "announcement",
    status: "scheduled",
    author: "Иванов А.",
    publishedAt: "2026-01-15",
    scheduledAt: "2026-01-15T10:00",
    views: 0,
    targetAudience: ["students"],
  },
  {
    id: "6",
    title: "Вакансия: Преподаватель немецкого",
    content: "Ищем опытного преподавателя немецкого языка...",
    excerpt: "Требования: опыт от 2 лет, уровень C1+",
    category: "announcement",
    status: "draft",
    author: "Морозов Д.",
    publishedAt: "",
    views: 0,
    targetAudience: ["mentors"],
  },
];

const categoryLabels: Record<string, string> = {
  announcement: "Объявление",
  event: "Мероприятие",
  achievement: "Достижение",
  update: "Обновление",
};

const categoryColors: Record<string, "primary" | "secondary" | "success" | "info"> = {
  announcement: "primary",
  event: "secondary",
  achievement: "success",
  update: "info",
};

const statusLabels: Record<string, string> = {
  published: "Опубликовано",
  draft: "Черновик",
  scheduled: "Запланировано",
};

const statusColors: Record<string, "success" | "default" | "warning"> = {
  published: "success",
  draft: "default",
  scheduled: "warning",
};

const categories = ["Все", "announcement", "event", "achievement", "update"];

export const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Все");
  const [tabValue, setTabValue] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const getFilteredByStatus = (status: string | null) => {
    let result = newsItems;

    if (status) {
      result = result.filter((n) => n.status === status);
    }

    if (categoryFilter !== "Все") {
      result = result.filter((n) => n.category === categoryFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.excerpt.toLowerCase().includes(query)
      );
    }

    return result;
  };

  const filteredNews = useMemo(() => {
    const statusMap = [null, "published", "draft", "scheduled"];
    return getFilteredByStatus(statusMap[tabValue]);
  }, [searchQuery, categoryFilter, tabValue]);

  // Stats
  const publishedCount = newsItems.filter((n) => n.status === "published").length;
  const draftCount = newsItems.filter((n) => n.status === "draft").length;
  const scheduledCount = newsItems.filter((n) => n.status === "scheduled").length;
  const totalViews = newsItems.reduce((sum, n) => sum + n.views, 0);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Новости
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление новостями и объявлениями
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Создать новость
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {publishedCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Опубликовано
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="text.secondary">
            {draftCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Черновиков
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="warning.main">
            {scheduledCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Запланировано
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {totalViews}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Всего просмотров
          </Typography>
        </Box>
      </Stack>

      {/* Filters & Tabs */}
      <Box sx={{ bgcolor: "white", borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" p={2} pb={0}>
          <TextField
            placeholder="Поиск по заголовку..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 280 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal1 size={20} color="#9E9E9E" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat === "Все" ? "Все категории" : categoryLabels[cat]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ px: 2 }}>
          <Tab label={`Все (${newsItems.length})`} />
          <Tab label={`Опубликовано (${publishedCount})`} />
          <Tab label={`Черновики (${draftCount})`} />
          <Tab label={`Запланировано (${scheduledCount})`} />
        </Tabs>
      </Box>

      {/* News Grid */}
      <Grid container spacing={3}>
        {filteredNews.map((news) => (
          <Grid key={news.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              {news.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={news.image}
                  alt={news.title}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} mb={1}>
                  <Chip
                    size="small"
                    label={categoryLabels[news.category]}
                    color={categoryColors[news.category]}
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={statusLabels[news.status]}
                    color={statusColors[news.status]}
                  />
                </Stack>

                <Typography variant="h6" fontWeight={600} gutterBottom sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {news.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2} sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {news.excerpt}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                      {news.author.charAt(0)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {news.author}
                    </Typography>
                  </Stack>
                  {news.publishedAt && (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Calendar size={12} color="#9E9E9E" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(news.publishedAt).toLocaleDateString("ru-RU")}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {news.status === "published" && (
                  <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                    <Eye size={12} color="#9E9E9E" />
                    <Typography variant="caption" color="text.secondary">
                      {news.views} просмотров
                    </Typography>
                  </Stack>
                )}
              </CardContent>

              <Stack direction="row" spacing={1} p={2} pt={0}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Eye size={16} />}
                  onClick={() => setSelectedNews(news)}
                  fullWidth
                >
                  Просмотр
                </Button>
                <IconButton size="small">
                  <Edit2 size={18} color="#FF9800" />
                </IconButton>
                <IconButton size="small">
                  <Trash size={18} color="#F44336" />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredNews.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Notification size={48} color="#9E9E9E" />
          <Typography color="text.secondary" mt={2}>
            Новости не найдены
          </Typography>
        </Box>
      )}

      {/* News Details Dialog */}
      <Dialog open={!!selectedNews} onClose={() => setSelectedNews(null)} maxWidth="md" fullWidth>
        {selectedNews && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Stack direction="row" spacing={1} mb={1}>
                    <Chip
                      size="small"
                      label={categoryLabels[selectedNews.category]}
                      color={categoryColors[selectedNews.category]}
                    />
                    <Chip
                      size="small"
                      label={statusLabels[selectedNews.status]}
                      color={statusColors[selectedNews.status]}
                    />
                  </Stack>
                  <Typography variant="h5" fontWeight={600}>
                    {selectedNews.title}
                  </Typography>
                </Box>
                <IconButton onClick={() => setSelectedNews(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              {selectedNews.image && (
                <Box
                  component="img"
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  sx={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 2, mb: 2 }}
                />
              )}

              <Typography variant="body1" paragraph>
                {selectedNews.content}
              </Typography>

              <Stack spacing={2} mt={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {selectedNews.author.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedNews.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Автор
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={3}>
                  {selectedNews.publishedAt && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Calendar size={16} color="#6B7280" />
                      <Typography variant="body2">
                        {new Date(selectedNews.publishedAt).toLocaleDateString("ru-RU")}
                      </Typography>
                    </Stack>
                  )}
                  {selectedNews.status === "published" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Eye size={16} color="#6B7280" />
                      <Typography variant="body2">
                        {selectedNews.views} просмотров
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Целевая аудитория
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {selectedNews.targetAudience.map((aud) => (
                      <Chip
                        key={aud}
                        size="small"
                        label={aud === "students" ? "Студенты" : aud === "mentors" ? "Менторы" : "Родители"}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                Редактировать
              </Button>
              {selectedNews.status === "draft" && (
                <Button variant="contained" startIcon={<Send size={18} />}>
                  Опубликовать
                </Button>
              )}
              <Button variant="outlined" onClick={() => setSelectedNews(null)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add News Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Создать новость
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField label="Заголовок" size="small" fullWidth />

            <TextField
              label="Краткое описание"
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="Короткое описание для превью..."
            />

            <TextField
              label="Содержание"
              size="small"
              fullWidth
              multiline
              rows={6}
              placeholder="Полный текст новости..."
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Категория</InputLabel>
                <Select label="Категория" defaultValue="">
                  <MenuItem value="announcement">Объявление</MenuItem>
                  <MenuItem value="event">Мероприятие</MenuItem>
                  <MenuItem value="achievement">Достижение</MenuItem>
                  <MenuItem value="update">Обновление</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Целевая аудитория</InputLabel>
                <Select label="Целевая аудитория" multiple defaultValue={[]}>
                  <MenuItem value="students">Студенты</MenuItem>
                  <MenuItem value="mentors">Менторы</MenuItem>
                  <MenuItem value="parents">Родители</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <TextField
              label="URL изображения"
              size="small"
              fullWidth
              placeholder="https://..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Gallery size={18} color="#9E9E9E" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select label="Статус" defaultValue="draft">
                  <MenuItem value="draft">Черновик</MenuItem>
                  <MenuItem value="published">Опубликовать сразу</MenuItem>
                  <MenuItem value="scheduled">Запланировать</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Дата публикации"
                size="small"
                fullWidth
                type="datetime-local"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="outlined" startIcon={<Document size={18} />}>
            Сохранить черновик
          </Button>
          <Button variant="contained" startIcon={<Send size={18} />}>
            Опубликовать
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
