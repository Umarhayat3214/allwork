import { Box, Button, TextField, Typography, } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
 const navigate = useNavigate();
 const {id} = useParams();
const [textfeild,setTextfeild] =useState({
  id:"",
  stuname:"",
  email:""
})
const gettextvalue = (e) =>{
  setTextfeild({...textfeild,[e.target.name]:e.target.value})
}
const getOneData = async () =>{
  try {
    const response = await axios.get(`http://localhost:3333/students/${id}`)
    setTextfeild(response.data)
    // console.log(response.data)
  } catch (error) {
    console.log("reason", error)
  }
}
useEffect(() => {
  getOneData();
  // eslint-disable-next-line
},[]);

 const putfunction = async () =>{
  try {
    const response = await axios.put(`http://localhost:3333/students/${id}`,textfeild)
    console.log(response.data)
  } catch (error) {
    console.log("Reason",error)
  }
 } ;

  return (
    <>
      <Box sx={{display:'flex',flexDirection:'column',width:'500px', gap:'13px',justifyContent:'center', m:'15px auto'}}>
      <Typography variant='h5'>Edit Student</Typography>
      <TextField name="id" value={textfeild.id} disabled label="Id"variant="outlined"  />
      <TextField name="stuname" value={textfeild.stuname} onChange={gettextvalue} label="Name"variant="outlined"  />
      <TextField name="email" value={textfeild.email} onChange={gettextvalue} label="Email" variant="outlined"  /> 
      <Button variant='contained' onClick={putfunction} >Update</Button> 
    </Box> 
    <Button variant='contained' onClick={()=>{navigate('/')}}>Back to home</Button>
    </>
  )
}

export default Edit
