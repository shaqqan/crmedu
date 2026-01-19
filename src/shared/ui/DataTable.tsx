import { ReactNode } from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  Paper,
  Grid2 as Grid,
} from "@mui/material";
import { Add, SearchNormal1 } from "iconsax-react";

// Statistika elementi uchun tip
export interface StatItem {
  id: string | number;
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
}

// DataTable props
export interface DataTableProps<T extends { id: string | number }>
  extends Omit<DataGridProps<T>, "rows" | "columns"> {
  rows: T[];
  columns: GridColDef<T>[];
  loading?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  containerSx?: SxProps<Theme>;
  disableRowSelectionOnClick?: boolean;

  // Statistika
  stats?: StatItem[];
  statsColumns?: { xs?: number; sm?: number; md?: number; lg?: number };

  // Qidiruv
  searchEnabled?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  // Qo'shish tugmasi
  addButtonEnabled?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;

  // Custom filterlar
  renderFilters?: () => ReactNode;

  // Toolbar (search + button) ni yashirish
  toolbarEnabled?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50],
  containerSx,
  disableRowSelectionOnClick = true,
  // Statistika
  stats,
  statsColumns = { xs: 6, md: 3 },
  // Qidiruv
  searchEnabled = true,
  searchValue,
  searchPlaceholder = "Поиск...",
  onSearchChange,
  // Qo'shish tugmasi
  addButtonEnabled = true,
  addButtonText = "Добавить",
  onAddClick,
  // Custom filterlar
  renderFilters,
  // Toolbar
  toolbarEnabled = true,
  ...props
}: DataTableProps<T>) {
  const showToolbar = toolbarEnabled && (searchEnabled || addButtonEnabled);

  return (
    <Stack direction="column" spacing={2}>
      {/* Statistika */}
      {stats && stats.length > 0 && (
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid key={stat.id} size={statsColumns}>
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: stat.bgColor }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Custom filterlar */}
      {renderFilters && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ bgcolor: "white", borderRadius: 3, p: 2 }}
        >
          {renderFilters()}
        </Stack>
      )}

      {/* Jadval */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: 3,
          overflow: "hidden",
          ...containerSx,
        }}
      >
        {/* Toolbar: Search + Add Button */}
        {showToolbar && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            {searchEnabled ? (
              <TextField
                variant="outlined"
                placeholder={searchPlaceholder}
                size="small"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                sx={{ minWidth: 250 }}
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
            ) : (
              <Box />
            )}

            {addButtonEnabled && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add size={20} color="#FFFFFF" />}
                onClick={onAddClick}
              >
                {addButtonText}
              </Button>
            )}
          </Box>
        )}

        {/* DataGrid */}
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={pageSizeOptions}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } },
          }}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#F9FAFB",
              borderBottom: "1px solid #E5E7EB",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              color: "#374151",
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F3F4F6",
              py: 1.5,
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: "#F9FAFB",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E5E7EB",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
          }}
          {...props}
        />
      </Box>
    </Stack>
  );
}
