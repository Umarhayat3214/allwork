import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingSharpIcon from '@mui/icons-material/PendingSharp';
import { Stack } from '@mui/material';


const columns = [
    { field: 'id', headerName: 'User Id' , width: 140},
    { field: 'firstName', headerName: 'First name', width: 140 },
    { field: 'lastName', headerName: 'Last name', width: 140 },
    {
        field: 'phoneNo',
        headerName: 'Phone#',
        width: 140,
        
    },
    {
        field: 'email',
        headerName: 'E-mail',
        description: 'This column has a value getter and is not sortable.',
        width: 200,
    },
    {
        field: 'actionbtn',
        headerName: 'Action-Buttons',
        width: 150,
        renderCell:()=>{
            return  (<Box> 
                <RemoveRedEyeIcon/>
                <EditIcon  sx={{color:'#1976D2'}}/>
                <GridDeleteIcon sx={{color:'#008000'}}/>
                <InfoIcon/>
            </Box>)}
    },
    {
        field: 'apoint',
        headerName: 'Appointment Handlers',
        width: 190,
        renderCell:()=>{
            return  (<Box sx={{alignContent:'center',m:'40px'}}> 
               <AddCircleIcon sx={{color:'#008000'}}/>
               <CheckCircleIcon sx={{color:'#1976D2'}}/>
            </Box>)}
    },
    {
        field: 'status',
        headerName: 'Appointment Status',
        width: 180,
        renderCell:()=>{
            return(<Box sx={{borderRadius:'20px',display:'flex', width:'100px', bgcolor:'#EBEBEB',height:'30px',alignItems:'center',m:'20px' }}><PendingSharpIcon sx={{color:'#616161',m:'3px'}}/><Stack sx={{fontSize:'13px'}}>Pending...</Stack></Box>)
        }
    }
];

const rows = [  
    { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNo: 43535 ,email:'umar@gmail.com',},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNo: 42 ,email:'umar@gmail.com',},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNo: 45 ,email:'umar@gmail.com',},
    { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNo: 16 ,email:'umar@gmail.com',},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNo: null ,email:'umar@gmail.com',},
    { id: 6, lastName: 'Melisandre', firstName: null, phoneNo: 150 ,email:'umar@gmail.com',},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNo: 44 ,email:'umar@gmail.com',},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNo: 36 ,email:'umar@gmail.com',actionbtn:<RemoveRedEyeIcon/>},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNo: 65 ,email:'umar@gmail.com',},
];


function Apbar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Dark's-PHR-WebApp!
                        </Typography>
                        <Typography variant="h7" align='right' m={2} component="div" sx={{ flexGrow: 1 }}>
                            ADD-PATIENTS
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[10, 12]}
                  
                />
            </Box>
        </>
    )
}

export default Apbar
