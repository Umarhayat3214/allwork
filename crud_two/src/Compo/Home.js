import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { AppBar, Box, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';



function Home() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [addnewstu, setAddnewstu] = useState({
    stuname:'',
    email:''
  });
  
  useEffect(()=>{
    getAllStudents();    
  },[])
  
  const getAllStudents = async () =>{
    try {
      const response = await axios.get("http://localhost:3333/students")
      setStudents(response.data);
    } catch (error) {
      console.log("Reason", error)
    }
  };

  const postNewData = async () =>{
    try {
      const resp = await axios.post(`http://localhost:3333/students`,addnewstu)
      console.log(resp.data)
    } catch (error) {
      console.log("reson")
    }
    getAllStudents();
    }
  const onTextFeildChange = (e) =>{
    setAddnewstu({
     ...addnewstu, [e.target.name]: e.target.value
    })
  }
  const handleDelete = async (id) =>{
  await axios.delete(`http://localhost:3333/students/${id}`)
  getAllStudents();
  }
  const compoPdf = useRef();
  const generatepdf = useReactToPrint({
    content: ()=>compoPdf.current,
    documentTitle:'DataFromReact',
    //Underline is optional
    // onAfterPrint:()=>alert("saved to pdf ")
  }) 

  return (
    <>
    
<AppBar position="static">  
  <Toolbar>
    <Typography variant='h5'> React Crud with mui</Typography>
  </Toolbar>
</AppBar>

<Grid container justify="center">
<Grid item md={6} xs={12} > 
  <Box sx={{display:'flex',flexDirection:'column',width:'500px', gap:'13px',justifyContent:'center', m:'15px auto'}}>
      <Typography variant='h5'>Add Student</Typography>
      <TextField name="stuname" label="Name"variant="outlined"  onChange={onTextFeildChange} />
      <TextField name="email" label="Email" variant="outlined" onChange={onTextFeildChange} /> 
      <Button variant='contained' onClick={postNewData}>Add</Button>
    </Box></Grid>
<Grid item md={6} xs={12} >
<Box sx={{display:'flex',flexDirection:'column',width:'500px', gap:'13px',justifyContent:'center', m:'15px auto'}}>
  <Box sx={{display:'flex', justifyContent:'space-between'}}>
<Typography variant='h5'>Student List</Typography> 
<Button variant='contained' onClick={generatepdf}>PDF</Button>
</Box>
<TableContainer>
  <div ref={compoPdf}>
<Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            students.map((copydata)=>{
              return(
              <TableRow key={copydata.id}>
              <TableCell>{copydata.id}</TableCell>
              <TableCell>{copydata.stuname}</TableCell>
              <TableCell>{copydata.email} </TableCell>
              <TableCell>
                <IconButton onClick={()=>navigate(`/view/${copydata.id}`)}> <RemoveRedEye/> </IconButton>
                <IconButton onClick={()=>navigate(`/edit/${copydata.id}`)}> <Edit/> </IconButton>
                <IconButton onClick={()=>handleDelete(copydata.id)} > <Delete/> </IconButton>
              </TableCell>
            </TableRow>
            )})
          }
       
        </TableBody>
        </Table>
        </div> 
</TableContainer>
</Box> 
</Grid>
</Grid>
    </>
  )
}

export default Home
