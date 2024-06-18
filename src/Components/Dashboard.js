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
import { styled } from "@mui/material/styles";
import axios from "axios";
import SeiSeiLogo from "./../Assets/SeiSei-Logo.png";

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

const Dashboard = () => {
  const [language, setLanguage] = useState("English");
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "audio/wav") {
      setAudioFile(file);
    } else {
      alert("Please upload a valid .wav file.");
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setAudioUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("language", language);
    formData.append("text", textInput);
    formData.append("speaker_reference_file", audioFile);
    formData.append("Speaker_reference_url", null);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post("https://test.rgenai-azure.devtest.truefoundry.tech/api/tts_inference/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
            <b style={{ textAlign: "left", fontSize: "20px" }}>Welcome to Text-to-Speech API</b>
            <p style={{ fontSize: "16px", marginTop: "2%" }}>
              Please fill the details
            </p>
            <br/>
            <form onSubmit={handleSubmit}>
              <label>
                <b>Select Language: </b>
                <b style={{ color: "red" }}>*</b>
                <div style={{ marginTop: "6px" }}>
                  <label>
                    <input
                      type="radio"
                      value="English"
                      checked={language === "English"}
                      onChange={handleLanguageChange}
                    />
                    English
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      value="Hindi"
                      checked={language === "Hindi"}
                      onChange={handleLanguageChange}
                    />
                    Hindi
                  </label>
                </div>
              </label>
              <br />
              <label>
                <b>Enter Text: </b>
                <b style={{ color: "red" }}>*</b>
                <br />
                <textarea
                  value={textInput}
                  onChange={handleTextInputChange}
                  rows={4}
                  cols={50}
                  placeholder="Hello World"
                  required
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "1%",
                  }}
                />
              </label>
              <br />
              <br />
              <label>
                <b>Upload .wav File:</b>
                <br />
                <input
                  type="file"
                  accept=".wav"
                  onChange={handleFileChange}
                  style={{ marginTop: "10px" }}
                />
              </label>
              {/* <br />
              <br />
              <label>
                <b>Provide .wav file URL:</b>
                <br />
                <input
                  type="url"
                  placeholder="https://example.com/audio.wav"
                  onChange={handleUrlChange}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "1%",
                  }}
                />
              </label> */}
              <br />
              <br />
              <br />
              <center>
                <button
                  type="submit"
                  style={{
                    padding: "4% 5%",
                    borderRadius: "20px",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  Generate Audio
                </button>
              </center>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
