import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DataGrid } from "@mui/x-data-grid";
import { CancelRounded, PendingSharp } from "@mui/icons-material";
import UpdateIcon from "@mui/icons-material/Update";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

function Commonuser() {
  const [editFormData, setEditFormData] = useState({});
  const [get, setGet] = useState([]);
  const [getphone, setGetphone] = useState();
  const [Apiname, setApiname] = useState();
  const [updatevalue, setUdatevalue] = useState(dayjs());

  const updatedataonclick = async () => {
    await axios.put(
      `http://192.168.10.15/PatientAPIs/api/Appoinment_Schedule/UpdateUser?serial_No=${editFormData.serial_No}`,
      {
        patient_Name: Apiname,
        doctor_Name: "Dr.Uzair",
        patient_Contact: getphone,
        appointment_Status: "pending",
        appoinment_Date_Time: updatevalue,
      }
      );
      getappointdata();
  };
  const updateAppointment = () => {
    updatedataonclick();
    handleClose();
  };
  //modal ka styled before fuction
  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "15px",
    
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // <<<<<<<<<<<<<<Open PopupModel's function >>>>>>>>>>>>>>>>>
  const OpenPopupModel = (rowData) => {
    setEditFormData(rowData.row);
    // console.log(editFormData)
    handleOpen();
  };
  // <<<<<<<<<<<<<<Close PopupModel's function >>>>>>>>>>>>>>>>>
  const modalClose = () => {
    handleClose();
  };

  // console.log("iss time hamary parms mein y cheez pari hai ",useParams())
  let { user_id } = useParams();
  // console.log("userki  id ",user_id);

  const getappointdata = async () => {
    try {
      const appoint = await axios.get(
        `http://192.168.10.15/PatientAPIs/api/Appoinment_Schedule/GetUserByID?user_ID=${user_id}`
      );
      // setGettime(appoint.data.result.Schedule[0].appoinment_Date_Time);
      setApiname(appoint.data.result.Schedule[0].patient_Name);
      setGetphone(appoint.data.result.Schedule[0].patient_Contact);
      setGet(appoint.data.result.Schedule);
      // console.log(appoint.data.result.Schedule);
    } catch (error) {
      console.error("Error ki waja", error);
    }
  };

  useEffect(() => {
    getappointdata();
    // eslint-disable-next-line
  }, []);

  
  const [value, setValue] = React.useState(dayjs(new Date()));
  // console.log(value)
  const funpost = async () => {
    const dateAsString = value.toDate().toISOString();
    const apiFormate = {
      user_Id: user_id,
      patient_Name: Apiname,
      doctor_Name: "Dr.Uzair",
      patient_Contact: getphone,
      appointment_Status: "pending",
      appoinment_Date_Time: dateAsString,
    };
    try {
      await axios.post(
        ` http://192.168.10.15/PatientAPIs/api/Appoinment_Schedule/AddAppoinment`,
        apiFormate
      );
      // console.log("Yeh original data h", apiFormate)
      // console.log(apiresultvariable);
    } catch (error) {
      console.log("error reason", error);
    }
  };

  const setAppointment = () => {
    funpost();
    getappointdata();
  };

  const columns = [
    { field: "user_ID", headerName: "ID", width: 90 },
    {
      field: "patient_Name",
      headerName: "Patient Name",
      width: 150,
      editable: true,
    },

    {
      field: "patient_Contact",
      headerName: "Phone#",
      width: 130,
    },

    {
      field: "appoinment_Date_Time",
      headerName: "Appointment-Time",
      width: 190,
      editable: true,
    },
    {
      field: "changetime",
      headerName: "Change-Time",
      width: 150,

      renderCell: (params) => {
        // setSrno(params.row.serial_No);
        return (
          <IconButton>
          <DeleteIcon/>
          </IconButton>
        );
      },
    },
    {
      field: "appointment_Status",
      headerName: "Appointment-Status",
      width: 140,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              borderRadius: "20px",
              display: "flex",
              bgcolor: "#FFFF00",
              height: "30px",
              alignItems: "center",
              m: "20px",
            }}
          >
            <PendingSharp sx={{ color: "#000000", m: "3px" }} />
            <Stack sx={{ fontSize: "13px", color: "#000000" }}>
              {params.row.appointment_Status}
            </Stack>
          </Box>
        );
      },
    },
  ];

  const rows = get;
  return (
    <>
      <Typography variant="h4" align="center">
        User Details for taking Appointment
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
        <Box>
          <Typography variant="2px" sx={{ fontSize: "30px" }}>
            Please Select Date:
          </Typography>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Set Your Appointment"
                value={value}
                disablePast
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box>
          <Button variant="contained"  onClick={setAppointment}>

            Set Appointment
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          getRowId={(rows) => rows.serial_No}
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
                height: "auto",
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
                <Typography color={"white"}>Update Your Appointment</Typography>
                <IconButton>
                  <CancelRounded onClick={modalClose} sx={{ color: "white" }} />
                </IconButton>
              </Box>
              <Box sx={{ p: "5px" }}>
                <Grid container p={1} spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "7px",
                        width: "100%",
                        ml: "7px",
                        minWidth:'400px'
                      
                        
                      }}
                    >
                      <h5>
                        Your perivous time is that: 
                        { editFormData.appoinment_Date_Time}
                      </h5>

                      <Box>
                        <Typography variant="2px" sx={{ fontSize: "15px" }}>
                          Please Select Date:
                        </Typography>
                      </Box>
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Update Your Appointment"
                              disablePast 
                              value={value}
                              onChange={(newValue) => setUdatevalue(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                      <Box>
                        <Button variant="contained" onClick={updateAppointment}>
                          Update Appointment
                        </Button>
                      </Box>
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

export default Commonuser;
