import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

function Task() {
  const [valuefeild, setValuefeild] = useState();
  const [valuefeld, setValuefeld] = useState();
  const [display, setDisplay] = useState();

  const changing = (event) => {
    let lo = (event.target.value)
    setValuefeild(lo);
  };
  const changingfeild = (event) => {
   let log = (event.target.value)
    setValuefeld(log);
  };
  const clickBtn = (event) =>{
    if (condition) {
      
    } else {
      setDisplay( valuefeild+" " + valuefeld);
      
    }
    }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          m: "5px",
        }}
      >
        <TextField
          id="filled-basic"
          onChange={changing}
          value={valuefeild}
          label="First Name"
          variant="filled"
        />
        <br></br>
        <TextField
          id="filled-basic"
          onChange={changingfeild}
          value={valuefeld}
          label="Last Name"
          variant="filled"
        />
       
        <Button variant="contained" onClick={clickBtn} sx={{mt:'4px'}}>
          Click me
        </Button>
        <h2> { display}  </h2>
      </Box>
    </>
  );
}

export default Task;
