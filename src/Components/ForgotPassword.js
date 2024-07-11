import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { styled } from "@mui/material/styles";
import SeiSeiLogo from "./../Assets/SeiSei-Logo.png";
import axios from "axios";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  color: "#4e88f2",
  backgroundColor: "#fff",
  border: "2px solid #4e88f2",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f6f6f6",
    border: "1px solid #dadce0",
  },
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  color: "white",
  backgroundColor: "#4e88f2",
  borderRadius: "10px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

const LoginTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "https://tts-backend-ho81.onrender.com/forgotPassword",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        window.location.href = "/";
      } else {
        alert("Incorrect");
      }
    } catch (error) {
      alert("Incorrect");
      console.error(error);
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {matches && (
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "center", marginTop: "30%" }}>
            <img src={SeiSeiLogo} alt="SeiSei Logo" style={{ width: "40%" }} />
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2">
              © Rgen Ai Technologies Private Limited 2023
              <br />
              All rights reserved
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={6}
        component="main"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={0}
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
            style={{ padding: "5% 10%" }}
          >
            <b style={{ textAlign: "left", fontSize: "20px" }}>
              Forgot Password?
            </b>
            <p style={{ fontSize: "16px", marginTop: "2%" }}>
              Set a new password
            </p>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <br />
              <LoginTextField
                margin="normal"
                fullWidth
                id="email"
                label="Registered Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ color: "#4e88f2" }}
                    >
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <LoginTextField
                margin="normal"
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ color: "#4e88f2" }}
                    >
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        style={{ color: "#4e88f2" }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledSubmitButton
                fullWidth
                style={{ marginTop: "10%" }}
                onClick={handleSubmit}
              >
                <b>Reset Password</b>
              </StyledSubmitButton>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
