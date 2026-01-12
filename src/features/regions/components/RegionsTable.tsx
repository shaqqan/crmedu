import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit2, Trash, SearchNormal1, Add } from "iconsax-react";
import type { Region } from "../types/regions.types";

interface RegionsTableProps {
  regions: Region[];
  isLoading: boolean;
  onEdit: (region: Region) => void;
  onDelete: (region: Region) => void;
  onAdd: () => void;
}

export const RegionsTable: React.FC<RegionsTableProps> = ({
  regions,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "region" | "district">(
    "all"
  );

  const filteredRegions = useMemo(() => {
    let result = regions;

    if (typeFilter === "region") {
      result = result.filter((r) => r.parent_id === null);
    } else if (typeFilter === "district") {
      result = result.filter((r) => r.parent_id !== null);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(({ name }) => name.toLowerCase().includes(query));
    }

    return result;
  }, [regions, searchQuery, typeFilter]);

  const getParentName = (parentId: number | null): string => {
    if (parentId === null) return "-";
    const parent = regions.find((r) => r.id === parentId);
    return parent?.name || "-";
  };

  const columns = useMemo<GridColDef<Region>[]>(
    () => [
      {
        field: "rowNumber",
        headerName: "№",
        width: 60,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) =>
          filteredRegions.findIndex((r) => r.id === params.row.id) + 1,
      },
      {
        field: "name",
        headerName: "Регион",
        flex: 1,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        flex: 1,
        field: "parent_id",
        headerName: "Район",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => getParentName(row.parent_id),
      },
      {
        field: "created_at",
        headerName: "Дата создания",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
      },
      {
        field: "actions",
        headerName: "Действия",
        width: 200,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton size="small" onClick={() => onEdit(row)}>
              <Edit2 size={18} color={theme.palette.primary.main} />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(row)}>
              <Trash size={18} color={theme.palette.error.main} />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [filteredRegions, regions, onEdit, onDelete, theme]
  );

  return (
    <Box
      sx={{
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        bgcolor="white"
        borderRadius={3}
        p={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Поиск..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 250 }}
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

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "all" | "region" | "district")
              }
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="region">Регионы</MenuItem>
              <MenuItem value="district">Районы</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={onAdd}
        >
          Добавить
        </Button>
      </Stack>

      <DataGrid
        rows={filteredRegions}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        sx={{ mt: 3 }}
      />
    </Box>
  );
};
