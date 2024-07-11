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
import SeiSeiDB from "./../Assets/SeiSei-DB.png";

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
  const [language, setLanguage] = useState("en");
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);

    const formData = new FormData();
    formData.append("language", language);
    formData.append("text", textInput);
    formData.append("speaker_reference_file", audioFile);
    formData.append("speaker_reference_url", "");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "https://test.rgenai-azure.devtest.truefoundry.tech/api/tts_inference/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "audio/wav" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "output.wav";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("Audio File Downloaded!");
    } catch (error) {
      console.error("Error uploading the file: ", error);
    } finally {
      setLoader(false);
      window.location.reload();
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
            <img src={SeiSeiDB} alt="SeiSei DB" style={{ width: "40%" }} />
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
        <Container maxWidth="sm">
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
            <b style={{ textAlign: "center", fontSize: "22px" }}>
              Try Our Text-to-Speech API
            </b>
            <p
              style={{
                fontSize: "12px",
                marginTop: "2%",
                textAlign: "center",
                color: "gray",
              }}
            >
              Write your creative content and upload a reference audio in WAV
              format. And let our model do the rest. You can see your text to
              speech output in the downloads!
            </p>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <label>
                <b>Select Language: </b>
                <b style={{ color: "red" }}>*</b>
                <div style={{ marginTop: "6px" }}>
                  <label>
                    <input
                      type="radio"
                      value="en"
                      checked={language === "en"}
                      onChange={handleLanguageChange}
                    />
                    English
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      value="hi"
                      checked={language === "hi"}
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
              <br />
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
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Generate Audio
                </button>
                {loader && (
                  <p style={{ color: "red" }}>Generating. Please Wait!</p>
                )}
              </center>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
