import { createTheme } from "@mui/material/styles";

const baseTheme = {
  typography: {
    fontFamily: '"Gilroy", "Montserrat", sans-serif',
    fontWeightRegular: 700,
    fontWeightMedium: 700,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#DA4957",
      light: "#E47582",
      dark: "#B03A47",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#121212",
    },
    success: {
      main: "#07bc0c",
    },
    error: {
      main: "#e74c3c",
    },
    warning: {
      main: "#f1c40f",
    },
    info: {
      main: "#3498db",
    },
    grey: {
      500: "#F1F3F5",
    },
    text: {
      primary: "#71717A",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none" as const,
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
          "&:focus": {
            boxShadow: "none",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(4px)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
        },
        columnHeader: {
          backgroundColor: "#F9FAFB",
          fontWeight: 600,
        },
        columnHeaderTitle: {
          fontWeight: 600,
        },
        cell: {
          borderBottom: "1px solid #F0F0F0",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "light",
    background: {
      default: "#F1F3F5",
      paper: "#FFFFFF",
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "dark",
    background: {
      default: "#1A1A1A",
      paper: "#2D2D2D",
    },
  },
});
