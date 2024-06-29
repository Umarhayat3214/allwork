import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, InputAdornment,  Stack, TextField, Typography, } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Signup() {
  // <<<<<<<<< Password Hook Copy from Login >>>>>>>>>>>>
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // <<<<<<<<< Confirm Password  >>>>>>>>>>>>
  const [showPasword, setShowPasword] = useState(false);
  const handleTogglePaswordVisibility = () => {
    setShowPasword(!showPasword);
  };
  const [pasword, setPasword] = useState('');
  const handlePaswordChange = (event) => {
    setPasword(event.target.value);
  };

  // <<<<<<<< Email Password Hook >>>>>>>>>>>>>>>
  const [emailValidator, setEmailValidator] = useState(false);
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    let emailValue = e.target.value
    setEmail(emailValue)
    let pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (emailValue.match(pattern)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  }
  const [firstName, setFirstName] = useState(''); // Define and initialize firstName state
  const handleFirstNameChange = (event) => {
    const inputValue = event.target.value;
    setFirstName(inputValue);
    // Regular expression pattern to match only alphabetic characters
    const pattern = /^[A-Za-z]+$/;
    if (pattern.test(firstName) || firstName === '') {
      // console.log("sai hai vaid ")
    }
  };

  const [lname, setLname] = useState('');
  const handleLastName = (ev) => {
    const lnamevariable = ev.target.value;
    setLname(lnamevariable);
    const pattern = /^[A-Za-z]+$/;
    if (pattern.test(lnamevariable) || lnamevariable === '') {
      // console.log("sai hai ")
    }

  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  let allTextFieldsNameAndData={
    first_Name:firstName,
    user_Email:email,
    last_Name:lname,
    user_Password:password,
    user_Contact:phoneNumber, 
  }
  const getAllValues =  () => {
 axios.post('http://192.168.10.15/PatientAPIs/api/Patient_L/CreateLogin',allTextFieldsNameAndData)
  };

  return (
    <>
      <Grid container p={5} >
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
          <Box sx={{ bgcolor: '#01619B', height: '500px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', }}>
              <Box sx={{ width: '200px' }}> <Typography variant='h6'>Welcome to the MEDIREMORTE PHR </Typography></Box> <Box sx={{ width: '300px', }}> A Brand of E-Healthcear systems and Wireless Communications.Current and Future Challenges</Box><Box sx={{ width: '310px', }}><Stack>Copyright&#169;2024 MEDIREMORTE.All Rights Reserved</Stack></Box></Box></Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >

          <Grid container p={'50px 20px'} sx={{ height: '500px' }} >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'grid', justifyContent: 'center' }} >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                <Box
                  component="img"
                  sx={{
                    height: 40,
                    width: 145
                  }}
                  alt="The house from the offer."
                  src="https://cdcssl.ibsrv.net/ibimg/smb/768x60_80/webmgr/1w/x/s/logo.png.webp?5738d45128bb3cbeba59593c583f249d"
                />
                <Typography color={'#1D7AD3'} variant='h5' >Sign-Up Here</Typography>
              </Box>
              <Typography sx={{ fontSize: 'small' }} >Enter Sign Up information for your accout</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <Stack color={'#1D7AD3'} sx={{ fontWeight: 'medium' }} variant='h4' >Step 1: Identify Your-Self</Stack>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <Stack color={'#1D7AD3'} sx={{ fontWeight: 'medium' }} variant='h4' >Step 2: Choose user name and password</Stack>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <TextField
                sx={{ width: '96%' }}
                id="outlined-basi"
                label="First Name*"
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
                error={!/^$|^[A-Za-z]+$/.test(firstName)} // Add error state based on validation
                helperText={!/^$|^[A-Za-z]+$/.test(firstName) ? "Only alphabetic characters allowed" : ""}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basc"
                label="Name / Email*"
                variant="outlined"
                onChange={handleEmailChange}
                value={email}
                error={emailValidator === true ? false : true}
                helperText={emailValidator === true ? "" : "Enter Correct Email"}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <TextField sx={{ width: '96%' }}
                onChange={handleLastName}
                value={lname}
                error={!/^$|^[A-Za-z]+$/.test(lname)}
                id="outlined-baic" label="Last Name*" variant="outlined"
                helperText={!/^$|^[A-Za-z]+$/.test(lname) ? "Only alphabetic characters allowed" : ""}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              {/* <<<<<<<<<<< Password Copy from login >>>>>>>>>>> */}
              <TextField
                id="password1"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                helperText={password.length < 6 ? 'Grather than 6 characters' : ''}
                error={password.length < 6 ? true : false}
                value={password}
                sx={{ width: '100%' }}
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
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
              <TextField
                sx={{ width: '96%' }}
                id="outlined-asic"
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={!/^$|^\d{11}$/.test(phoneNumber)}
                helperText={!/^$|^\d{11}$/.test(phoneNumber) ? "Please enter exactly 11 digits" : ""}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
            
              <TextField
                id="Cpassword"
                type={showPasword ? 'text' : 'pasword'}
                label="Confirm Password"
                helperText={(pasword.length < 6 || password !== pasword) ? 'Pasword Should be same ' : ''}
                error={(pasword.length < 6 || password !== pasword) ? true : false}
                value={pasword}
                sx={{ width: '100%' }}
                onChange={handlePaswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePaswordVisibility}>
                        {showPasword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
             <Link to="/login"
              style={{textDecoration:'none', color:'#1D7AD9', fontWeight:'bold'}}> Already Have an account? Login </Link>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}  >
              <Box sx={{ gap: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button variant="contained" disabled sx={{ bgcolor: 'black', color: 'white', borderRadius: '20px', textTransform: 'capitalize' }}>Cancel</Button>
             <Link to='/login'>
                <Button variant="contained" onClick={getAllValues} sx={{ bgcolor: 'black', color: 'white', borderRadius: '20px', textTransform: 'capitalize' }}>Create</Button></Link>
              </Box>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
    </>
  )
}

export default Signup
