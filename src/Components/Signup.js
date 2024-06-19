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
import GoogleIcon from "@mui/icons-material/Google";
import SeiSeiLogo from "./../Assets/SeiSei-Logo.png";
import {
  Cases,
  CorporateFare,
  Person,
  PersonPinCircleOutlined,
} from "@mui/icons-material";
import axios from "axios";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  color: "#03a65f",
  backgroundColor: "#fff",
  border: "2px solid #03a65f",
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
  color: "black",
  backgroundColor: "#e0e0e0",
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

const Signup = () => {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization", organization);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "https://tts-backend-ho81.onrender.com/signup",
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
        alert("Incorrect Signup");
      }
    } catch (error) {
      alert("Incorrect Signup");
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
              Getting Started
            </b>
            <p style={{ fontSize: "16px", marginTop: "2%" }}>
              Create an account to continue!
            </p>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <StyledButton startIcon={<GoogleIcon />} fullWidth>
                Signup with Google
              </StyledButton>
              <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.300" }} />
                <Typography variant="caption" sx={{ mx: 2 }}>
                  Or signup with email
                </Typography>
                <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.300" }} />
              </Box>
              <br />
              <LoginTextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ color: "#03a65f" }}
                    >
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <LoginTextField
                margin="normal"
                fullWidth
                id="organization"
                label="Organization"
                name="organization"
                autoComplete="organization"
                autoFocus
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ color: "#03a65f" }}
                    >
                      <CorporateFare />
                    </InputAdornment>
                  ),
                }}
              />
              <LoginTextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
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
                      style={{ color: "#03a65f" }}
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
                label="Password"
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
                      style={{ color: "#03a65f" }}
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
                        style={{ color: "#03a65f" }}
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
                <b>Signup</b>
              </StyledSubmitButton>
              <center>
                <Box
                  sx={{ justifyContent: "space-between", mt: 3 }}
                  style={{ marginTop: "3%" }}
                >
                  Already Registered?
                  <Link
                    href="/"
                    style={{ color: "#03a65f", textDecoration: "none" }}
                  >
                    <b> {"Login"}</b>
                  </Link>
                </Box>
              </center>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Signup;
