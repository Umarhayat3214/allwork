import { AppBar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

function View() {
  const navigate = useNavigate();
  const [getDataById, setGetDataById] = useState([]);
  // console.log(getDataById)
  const {id} = useParams()
  // console.log(id)
  useEffect(()=>{
  getOneData()
  // eslint-disable-next-line
  },[])
  const getOneData = async () =>{
    try {
      const response = await axios.get(`http://localhost:3333/students/${id}`)
      setGetDataById(response.data)
      // console.log(response.data)
    } catch (error) {
      console.log("reason", error)
    }
  }
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar><Typography>Student Details</Typography></Toolbar>
        </AppBar> 
        <TableContainer>
<Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>{getDataById.id}</TableCell>
            <TableCell>{getDataById.stuname}</TableCell>
            <TableCell>{getDataById.email}</TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableBody>
        </Table>
</TableContainer>
<Button variant='contained' onClick={()=>{navigate("/")}}> Back to Home</Button>
    </>
  )
}

export default View
