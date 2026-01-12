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
import type { Branch } from "../types/branches.types";

interface BranchesTableProps {
  branches: Branch[];
  isLoading: boolean;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
  onAdd: () => void;
}

export const BranchesTable: React.FC<BranchesTableProps> = ({
  branches,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const regions = useMemo(
    () => [...new Set(branches.map((b) => b.region))],
    [branches]
  );

  const districts = useMemo(() => {
    const filtered = selectedRegion
      ? branches.filter((b) => b.region === selectedRegion)
      : branches;
    return [...new Set(filtered.map((b) => b.district))];
  }, [branches, selectedRegion]);

  const filteredBranches = useMemo(() => {
    let result = branches;

    if (selectedRegion) {
      result = result.filter((b) => b.region === selectedRegion);
    }

    if (selectedDistrict) {
      result = result.filter((b) => b.district === selectedDistrict);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(({ name, region, district, address }) =>
        [name, region, district, address].some((field) =>
          field.toLowerCase().includes(query)
        )
      );
    }

    return result;
  }, [branches, searchQuery, selectedRegion, selectedDistrict]);

  const columns = useMemo<GridColDef<Branch>[]>(
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
          filteredBranches.findIndex((b) => b.id === params.row.id) + 1,
      },
      {
        field: "name",
        headerName: "Название филиала",
        flex: 1,
        minWidth: 180,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "region",
        headerName: "Регион",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "district",
        headerName: "Район",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "address",
        headerName: "Адрес",
        flex: 1,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "employeeCount",
        headerName: "Количество сотрудников",
        width: 180,
        type: "number",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "groupCount",
        headerName: "Количество групп",
        width: 150,
        type: "number",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "studentCount",
        headerName: "Количество студентов",
        width: 170,
        type: "number",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        headerName: "Действия",
        width: 120,
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
    [filteredBranches, onEdit, onDelete, theme]
  );

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        p: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
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
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDistrict("");
              }}
              displayEmpty
            >
              <MenuItem value="">Все регионы</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Все районы</MenuItem>
              {districts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
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
        rows={filteredBranches}
        columns={columns}
        loading={isLoading}
        autoHeight
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#F6F6F6",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #F0F0F0",
          },
        }}
      />
    </Box>
  );
};
