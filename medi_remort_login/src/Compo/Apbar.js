import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingSharpIcon from "@mui/icons-material/PendingSharp";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Box,Button, Grid,IconButton,Modal,Stack,TextField,Toolbar,Typography,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelRounded from "@mui/icons-material/CancelRounded";

function Apbar() {

  const navigate = useNavigate();
    //modal ka styled before fuction
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 450,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      borderRadius: "15px",
    };

  const [editFormData, setEditFormData] = useState({
    user_ID: "",
    first_Name: "",
    last_Name: "",
    user_Contact: "",
    user_Email: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // <<<<<<<<<<<<<<Open PopupModel's function >>>>>>>>>>>>>>>>>
  const OpenPopupModel = (rowData) => {
    // console.log("pencil py click krny py  ",rowData) // console.log(rowData)
    setEditFormData(rowData.row); // Set the data for the edit form fields
    console.log(rowData); // Set the data for the edit form fields

    handleOpen();
  };
  // <<<<<<<<<<<<<<Close PopupModel's function >>>>>>>>>>>>>>>>>
  const modalClose = () => {
    handleClose();
  };


  // <<<<<<<<<<<<<<<<<<UseState of Data Grid table>>>>>>>>>>>>>>>>>>>>>
  const [get, setget] = useState([]);
  const columns = [
    { field: "user_ID", headerName: "User Id", width: 140 },
    { field: "first_Name", headerName: "First name", width: 140 },
    { field: "last_Name", headerName: "Last name", width: 140 },
    {
      field: "user_Contact",headerName: "Phone#", width: 140},
    {
      field: "user_Email",headerName: "E-mail", description: "This column has a value getter and is not sortable.",
      width: 200,
    },
    {
      field: "actionbtn",
      headerName: "Action-Buttons",
      width: 160,
      // <<<<<<<<<<<<<<<<<< Icon ko cell mn show krny ky liy >>>>>>>>>>>>>>>
      renderCell: (params) => {
        // console.log(para)
        return (
          <>
            <IconButton>
              <RemoveRedEyeIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <EditIcon
                onClick={() => OpenPopupModel(params)}
                sx={{ color: "#1976D2" }}
              />
            </IconButton>
            <IconButton>
              <GridDeleteIcon onClick={()=>{rowDelete(params)}} sx={{ color: "#FF0000" }} />
            </IconButton>
            <IconButton>
              <InfoIcon sx={{ color: "black" }} />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "apoint",
      headerName: "Appointment Handlers",
      width: 190,
      renderCell: () => {
        return (
          <Box sx={{ alignContent: "center", m: "40px" }}>
            <AddCircleIcon sx={{ color: "#008000" }} />
            <CheckCircleIcon sx={{ color: "#1976D2" }} />
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Appointment Status",
      width: 180,
      renderCell: () => {
        return (
          <Box
            sx={{
              borderRadius: "20px",
              display: "flex",
              width: "100px",
              bgcolor: "#EBEBEB",
              height: "30px",
              alignItems: "center",
              m: "20px",
            }}
          >
            <PendingSharpIcon sx={{ color: "#616161", m: "3px" }} />
            <Stack sx={{ fontSize: "13px" }}> Pending... </Stack>
          </Box>
        );
      },
    },
  ];
  const rows = get;
  // <<<<<<<<<< Fetch api function >>>>>>>>>>>>>
  // api ko get krny ky liay server sy request kr rhy hn fetch k function use kr ky
  const fetchbythen = () => {
    fetch(`http://192.168.10.15/PatientAPIs/api/Patient_L/GetUser`).then(
      (response) => {
        response.json().then((pk) => {
          // console.log(pk.result.role);
          setget(pk.result);
        });
      }
    );
  };
 //     // <<<<<<<<<<< Update api function >>>>>>>>>>>>>
 const updateData = async () => {
  await axios.put(
    `http://192.168.10.15/PatientAPIs/api/Patient_L/UpdateUser?user_ID=${editFormData.user_ID}`,
    editFormData
  );
  fetchbythen();
  navigate('/')
  handleClose(); //Close the modal after successful update
};
const rowDelete = async (rowData) => {
  await axios.delete(
    `http://192.168.10.15/PatientAPIs/api/Patient_L/DeleteUser?user_ID=${rowData.row.user_ID}`
  );
  fetchbythen();
  navigate('/')
};
  // console.log(get);
  // <<<<<<<<<<< server k api request's response ko hm useEffect kehty hn
  useEffect(() => {
    fetchbythen();
  }, []);

 
 
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
            <Typography
              variant="h7"
              align="right"
              m={2}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              ADD-PATIENTS
            </Typography>

            <Link to={"/login"}>
              <Button sx={{ color: "white" }}>Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        //  <<<<<<api marzi say user id dinay k liay yeh line add krna hogi ni to MUI id ko accept krta h >>>>>>>
          getRowId={(rows) => rows.user_ID}
        />
      </Box>

      {/* <<<<<<< popup modal >>>>>>>>>> */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <<<<<<<<<Pup Design>>>>>>>>> */}
          <Box sx={style}>
            <Box
              sx={{
                width: "50%",
                minWidth: "100%",
                height: "300px",
                m: "auto",
                borderRadius: "15px ",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  justifyContent: "space-between",
                  bgcolor: "#2B5690",
                  alignItems: "center",
                  p: "10px",
                  borderRadius: "15px 15px 0px 0",
                }}
              >
                <Typography color={"white"}>Edit Patient</Typography>
                <IconButton>
                  <CancelRounded onClick={modalClose} sx={{ color: "white" }} />
                </IconButton>
              </Box>
              <Box sx={{ p: "5px" }}>
                <Grid container p={1} spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box
                      sx={{
                        gap: "6px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="User ID"
                        disabled
                        value={editFormData.user_ID}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            user_ID: e.target.value,
                          })
                        }
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        value={editFormData.last_Name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            last_Name: e.target.value,
                          })
                        }
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Phone Number"
                        value={editFormData.user_Contact}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            user_Contact: e.target.value,
                          })
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={updateData}
                          sx={{
                            bgcolor: "black",
                            color: "white",
                            borderRadius: "18px",
                            width: "auto",
                            height: "35px",
                          }}
                        >
                          Save
                        </Button>
                        <Button
                        onClick={()=>{handleClose()}}
                          variant="contained"
                          sx={{
                            bgcolor: "#808080",
                            color: "white",
                            borderRadius: "18px",
                            width: "90px",
                            height: "35px",
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box
                      sx={{
                        gap: "6px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        value={editFormData.first_Name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            first_Name: e.target.value,
                          })
                        }
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Email Address"
                        value={editFormData.user_Email}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            user_Email: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Apbar;
