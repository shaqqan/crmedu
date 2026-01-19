import React, { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/shared/ui";
import {
  IconButton,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit2, Trash } from "iconsax-react";
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

  const renderFilters = () => (
    <>
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
    </>
  );

  return (
    <DataTable
      rows={filteredBranches}
      columns={columns}
      loading={isLoading}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Поиск..."
      addButtonText="Добавить"
      onAddClick={onAdd}
      renderFilters={renderFilters}
    />
  );
};
