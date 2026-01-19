import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Add, Call, Edit2, Trash, UserTag, CloseCircle } from "iconsax-react";

// Lead status types (5 columns)
type LeadStatus = "new" | "contacted" | "interested" | "trial" | "enrolled";

// Lead interface
interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  source: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

// Status configuration
const statusConfig: Record<
  LeadStatus,
  { label: string; color: string; bgColor: string }
> = {
  new: { label: "Новый", color: "#1264EB", bgColor: "rgba(18, 100, 235, 0.1)" },
  contacted: {
    label: "Связались",
    color: "#FF9800",
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  interested: {
    label: "Заинтересован",
    color: "#9C27B0",
    bgColor: "rgba(156, 39, 176, 0.1)",
  },
  trial: {
    label: "Пробный урок",
    color: "#00BCD4",
    bgColor: "rgba(0, 188, 212, 0.1)",
  },
  enrolled: {
    label: "Записан",
    color: "#4CAF50",
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
};

// Sources
const leadSources = [
  "Instagram",
  "Telegram",
  "Facebook",
  "Сайт",
  "Рекомендация",
  "Визит",
  "Звонок",
];

// Courses (mock)
const courses = [
  "Бэкенд разработка",
  "Фронтенд разработка",
  "Английский язык",
  "Мобильная разработка",
];

// Initial mock data
const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Азиз Каримов",
    phone: "+998 90 123 45 67",
    course: "Бэкенд разработка",
    source: "Instagram",
    status: "new",
    createdAt: "2026-01-13",
    notes: "Интересуется курсом Java",
  },
  {
    id: "2",
    name: "Нилуфар Рахимова",
    phone: "+998 91 234 56 78",
    course: "Фронтенд разработка",
    source: "Telegram",
    status: "new",
    createdAt: "2026-01-13",
  },
  {
    id: "3",
    name: "Бобур Тошматов",
    phone: "+998 93 345 67 89",
    course: "Английский язык",
    source: "Сайт",
    status: "contacted",
    createdAt: "2026-01-12",
    notes: "Перезвонить завтра",
  },
  {
    id: "4",
    name: "Малика Усмонова",
    phone: "+998 94 456 78 90",
    course: "Бэкенд разработка",
    source: "Рекомендация",
    status: "contacted",
    createdAt: "2026-01-12",
  },
  {
    id: "5",
    name: "Жасур Алиев",
    phone: "+998 95 567 89 01",
    course: "Мобильная разработка",
    source: "Facebook",
    status: "interested",
    createdAt: "2026-01-11",
    notes: "Хочет записаться на Flutter",
  },
  {
    id: "6",
    name: "Дилноза Камалова",
    phone: "+998 90 678 90 12",
    course: "Фронтенд разработка",
    source: "Instagram",
    status: "interested",
    createdAt: "2026-01-11",
  },
  {
    id: "7",
    name: "Шохрух Мирзаев",
    phone: "+998 91 789 01 23",
    course: "Бэкенд разработка",
    source: "Визит",
    status: "trial",
    createdAt: "2026-01-10",
    notes: "Пробный урок 14 января",
  },
  {
    id: "8",
    name: "Гульнора Содикова",
    phone: "+998 93 890 12 34",
    course: "Английский язык",
    source: "Звонок",
    status: "trial",
    createdAt: "2026-01-10",
  },
  {
    id: "9",
    name: "Сардор Рахмонов",
    phone: "+998 94 901 23 45",
    course: "Бэкенд разработка",
    source: "Instagram",
    status: "enrolled",
    createdAt: "2026-01-08",
  },
  {
    id: "10",
    name: "Мадина Юнусова",
    phone: "+998 95 012 34 56",
    course: "Фронтенд разработка",
    source: "Telegram",
    status: "enrolled",
    createdAt: "2026-01-07",
  },
];

// Form data interface
interface LeadFormData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  source: string;
  status: LeadStatus;
  notes: string;
}

const initialFormData: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  course: "",
  source: "",
  status: "new",
  notes: "",
};

export const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);

  // Filters
  const [filterCourse, setFilterCourse] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("");

  // Get filtered leads by status
  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => {
      if (lead.status !== status) return false;
      if (filterCourse && lead.course !== filterCourse) return false;
      if (filterSource && lead.source !== filterSource) return false;
      return true;
    });
  };

  // Get total filtered leads count
  const filteredLeadsCount = leads.filter((lead) => {
    if (filterCourse && lead.course !== filterCourse) return false;
    if (filterSource && lead.source !== filterSource) return false;
    return true;
  }).length;

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    e.dataTransfer.setData("text/plain", lead.id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      setDraggedLead(lead);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, newStatus: LeadStatus) => {
    e.preventDefault();
    e.stopPropagation();

    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId && lead.status !== newStatus
            ? { ...lead, status: newStatus }
            : lead
        )
      );
    }
    setDraggedLead(null);
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
  };

  // Dialog handlers
  const handleAddClick = () => {
    setFormData(initialFormData);
    setAddDialogOpen(true);
  };

  const handleEditClick = (lead: Lead) => {
    setFormData({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email || "",
      course: lead.course,
      source: lead.source,
      status: lead.status,
      notes: lead.notes || "",
    });
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.course ||
      !formData.source
    )
      return;

    const newLead: Lead = {
      id: String(Date.now()),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      course: formData.course,
      source: formData.source,
      status: formData.status,
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLeads((prev) => [newLead, ...prev]);
    handleDialogClose();
  };

  const handleUpdate = () => {
    if (!formData.id || !formData.name || !formData.phone) return;

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === formData.id
          ? {
              ...lead,
              name: formData.name,
              phone: formData.phone,
              email: formData.email || undefined,
              course: formData.course,
              source: formData.source,
              status: formData.status,
              notes: formData.notes || undefined,
            }
          : lead
      )
    );
    handleDialogClose();
  };

  const handleDelete = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  // Lead card component
  const LeadCard: React.FC<{ lead: Lead }> = ({ lead }) => (
    <Paper
      draggable="true"
      onDragStart={(e) => handleDragStart(e, lead)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        p: 2,
        mb: 1.5,
        borderRadius: 2,
        cursor: "grab",
        border: "1px solid #E5E7EB",
        transition: "all 0.2s",
        opacity: draggedLead?.id === lead.id ? 0.4 : 1,
        transform: draggedLead?.id === lead.id ? "scale(1.02)" : "scale(1)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderColor: statusConfig[lead.status].color,
        },
        "&:active": {
          cursor: "grabbing",
        },
        userSelect: "none",
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={1.5}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: statusConfig[lead.status].bgColor,
            color: statusConfig[lead.status].color,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {lead.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {lead.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mt: 0.5 }}
          >
            <Call size={12} color="#6B7280" />
            <Typography variant="caption" color="text.secondary" noWrap>
              {lead.phone}
            </Typography>
          </Stack>
          <Chip
            label={lead.course}
            size="small"
            sx={{
              mt: 1,
              height: 20,
              fontSize: 10,
              bgcolor: "#F3F4F6",
            }}
          />
          {lead.notes && (
            <Tooltip title={lead.notes} arrow placement="top">
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mt: 1,
                  fontStyle: "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  cursor: "help",
                }}
              >
                {lead.notes}
              </Typography>
            </Tooltip>
          )}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #F3F4F6" }}
      >
        <Stack direction="row" spacing={0.5}>
          <Chip
            label={lead.source}
            size="small"
            sx={{ height: 18, fontSize: 10 }}
          />
        </Stack>
        <Stack direction="row" spacing={0}>
          <IconButton size="small" onClick={() => handleEditClick(lead)}>
            <Edit2 size={14} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(lead.id)}
          >
            <Trash size={14} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );

  // Column component
  const Column: React.FC<{ status: LeadStatus }> = ({ status }) => {
    const columnLeads = getLeadsByStatus(status);
    const config = statusConfig[status];
    const isDragOver = draggedLead && draggedLead.status !== status;

    return (
      <Box
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={(e) => handleDrop(e, status)}
        sx={{
          flex: 1,
          minWidth: 280,
          maxWidth: 320,
          bgcolor: isDragOver ? `${config.color}10` : "#F9FAFB",
          borderRadius: 3,
          p: 2,
          height: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          border: isDragOver
            ? `2px dashed ${config.color}`
            : "2px solid transparent",
          transition: "all 0.2s ease",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: config.color,
              }}
            />
            <Typography variant="subtitle2" fontWeight={600}>
              {config.label}
            </Typography>
          </Stack>
          <Chip
            label={columnLeads.length}
            size="small"
            sx={{
              height: 22,
              minWidth: 22,
              bgcolor: config.bgColor,
              color: config.color,
              fontWeight: 600,
            }}
          />
        </Stack>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#D1D5DB",
              borderRadius: 2,
            },
          }}
        >
          {columnLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
          {columnLeads.length === 0 && (
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                border: "2px dashed #E5E7EB",
                borderRadius: 2,
                color: "text.secondary",
              }}
            >
              <Typography variant="caption">Нет лидов</Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Лиды
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Перетащите для изменения статуса
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            icon={<UserTag size={16} color="currentColor" />}
            label={`${filteredLeadsCount} лидов`}
            color="primary"
            variant="outlined"
          />
          <Button
            variant="contained"
            startIcon={<Add size={20} color="#FFFFFF" />}
            onClick={handleAddClick}
          >
            Добавить лид
          </Button>
        </Stack>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Курс</InputLabel>
          <Select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            label="Курс"
          >
            <MenuItem value="">Все курсы</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Источник</InputLabel>
          <Select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            label="Источник"
          >
            <MenuItem value="">Все источники</MenuItem>
            {leadSources.map((source) => (
              <MenuItem key={source} value={source}>
                {source}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {(filterCourse || filterSource) && (
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setFilterCourse("");
              setFilterSource("");
            }}
          >
            Сбросить
          </Button>
        )}
      </Stack>

      {/* Kanban Board */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#D1D5DB", borderRadius: 4 },
        }}
      >
        <Column status="new" />
        <Column status="contacted" />
        <Column status="interested" />
        <Column status="trial" />
        <Column status="enrolled" />
      </Stack>

      {/* Add Lead Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <UserTag size={24} color="#1264EB" />
            <span>Добавить нового лида</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Имя"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Телефон"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                fullWidth
                required
                placeholder="+998 90 123 45 67"
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Курс</InputLabel>
                <Select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, course: e.target.value }))
                  }
                  label="Курс"
                >
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Источник</InputLabel>
                <Select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, source: e.target.value }))
                  }
                  label="Источник"
                >
                  {leadSources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label="Заметка"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !formData.name ||
              !formData.phone ||
              !formData.course ||
              !formData.source
            }
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Edit2 size={24} color="#1264EB" />
              <span>Редактировать лид</span>
            </Stack>
            <IconButton onClick={handleDialogClose}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Имя"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Телефон"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                fullWidth
                required
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Курс</InputLabel>
                <Select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, course: e.target.value }))
                  }
                  label="Курс"
                >
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Источник</InputLabel>
                <Select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, source: e.target.value }))
                  }
                  label="Источник"
                >
                  {leadSources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as LeadStatus,
                  }))
                }
                label="Статус"
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <MenuItem key={key} value={key}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: config.color,
                        }}
                      />
                      <span>{config.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Заметка"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!formData.name || !formData.phone}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
