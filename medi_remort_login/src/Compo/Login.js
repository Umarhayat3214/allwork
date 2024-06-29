import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    let passwordValue = event.target.value;
    setPassword(passwordValue);
    // console.log(passwordValue);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [emailValidator, setEmailValidator] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    let emailValue = e.target.value;
    setEmail(emailValue);
    // console.log(emailValue);

    let pattern =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailValue.match(pattern)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  const checkUserfromdata = async () => {
    const resp = await axios.get(
      `http://192.168.10.15/PatientAPIs/api/Patient_L/Login?UserEmail=${email}&UserPassword=${password}`
    );
    if (resp.data.result === null) {
      alert("Email or Password incorrect");
    } else {
      const idNo = resp.data.result.user_ID;
      resp.data.result.role === "frontend"
        ? navigate("/")
        : navigate(`/commonuser/` + idNo);
    }
  };
  return (
    <>
      <Grid container p={5}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Box
            sx={{
              m: "1rem auto",
              display: "flex",
              flexDirection: "column ",
              justifyContent: "center",
              color: "#FFFFFF",
              textAlign: "center",
              width: "350px",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 40,
                width: 145,
                alignSelf: "center",
                mb: "3rem",
              }}
              alt="The house from the offer."
              src="https://cdcssl.ibsrv.net/ibimg/smb/768x60_80/webmgr/1w/x/s/logo.png.webp?5738d45128bb3cbeba59593c583f249d"
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <TextField
                // error={emailValidator===true?true:false}
                error={emailValidator === true ? false : true}
                id="outlined-error-helper-text"
                label="Email"
                helperText={
                  emailValidator === true ? "" : "Enter Correct Email"
                }
                onChange={handleEmailChange}
                value={email}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                helperText={
                  password.length < 6 ? " grather than 6 characters" : ""
                }
                error={password.length < 6 ? true : false}
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                disabled={password.length < 6 ? true : false}
                onClick={checkUserfromdata}
                sx={{
                  bgcolor: "#155E9B",
                  color: "#CAD5DA",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  width: "100%",
                }}
              >
                Login
              </Button>
              <Link
                to="/signup"
                style={{ color: "#1D7AD3", textDecoration: "none" }}
              >
                Create a new account
              </Link>
            
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#E8F4FD",
              display: "flex",
              flexDirection: "row",
              textJustify: "center",
              m: "2.5rem 0.5rem",
            }}
          >
            <Box>
              <IconButton>
                <InfoOutlined />
              </IconButton>
              <Typography variant="body">
                Incase of any issues & concerns please contact adminstrator.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
          bgcolor={"#155E9B"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ width: "300px" }}>
            <Typography variant="h4" sx={{ color: "#FFFFFF;" }}>
              Welcome to the MEDIREMORTE
            </Typography>
          </Box>
          <Box sx={{ width: "300px" }}>
            <Typography
              variant="body"
              sx={{ color: "#FFFFFF;", fontSize: "12px" }}
            >
              A Brand of E-Healthcear systems and Wireless
              Communications.Current and Future Challenges <br />
              Copyright&#169;2024 MEDIREMORTE.All Rights Reserved{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
