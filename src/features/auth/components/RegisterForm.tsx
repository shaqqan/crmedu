import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../hooks/useAuth";

export const RegisterForm: React.FC = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      return;
    }

    try {
      await register({ name, email, password, confirmPassword });
    } catch {
      // Error is handled in store
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
        Ro'yxatdan o'tish
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Parol"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Parolni tasdiqlash"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
        error={password !== confirmPassword && confirmPassword.length > 0}
        helperText={
          password !== confirmPassword && confirmPassword.length > 0
            ? "Parollar mos kelmaydi"
            : ""
        }
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading || password !== confirmPassword}
        sx={{ mt: 3, borderRadius: "8px", height: 48 }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Ro'yxatdan o'tish"}
      </Button>
    </Box>
  );
};
