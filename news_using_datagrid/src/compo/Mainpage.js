import React, { useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';
// import { Card, CardActions, CardContent, CardMedia } from '@mui/material';


function Mainpage() {
  const [post, setPost] = useState([]);
  const contry='us';
  const fetchbythen = (() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=${contry}&apiKey=b929cac20490417a90181ea0da2a576f`).then((response) => {
      response.json().then((pk) => {
        console.log(pk.articles);
        setPost(pk.articles);
        // console.log(post)
      })
    })
  })
  useEffect(() => {
    fetchbythen();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  const rows = post;
  // console.log(post)
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
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10]}
        getRowId={(rows) => rows.title}
        disableRowSelectionOnClick
      />
    </Box> 
      {/* <Box sx={{ display: 'flex', justifyContent:'space-evenly',flexWrap: 'wrap' }}>
      
                <Card sx={{ width:'300px', ml:'1rem', mr:'1rem', gap:'0', mt:'1rem'}}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={"https://www.whitehouse.gov/wp-content/uploads/2021/01/wh_social-share.png"}
                  />
                  <Box sx={{ height:'230px'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >umar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">hayat
                    </Typography>
                    
                  </CardContent>
                  </Box>
                  <CardActions>
                    <Box sx={{width:'100%', justifyContent:'center', display:'flex', }}>
                    <Button variant="contained"  sx={{alignSelf:'self-end',}}>Read More</Button>
                    </Box>
                  </CardActions>
                </Card>
      </Box>       */}
   </>
  )
}

export default Mainpage
