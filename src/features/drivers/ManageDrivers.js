import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { Tooltip, IconButton, TextField } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AlertDialogSlide from "../../shared/dialog";
import { openToast } from "../../shared/Toast";
import { setDriver, deleteDriver } from "../../state/slices/driversSlice";

const ViewDriver = () => {
  const [currentDriver, setCurrentDriver] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { drivers } = useSelector((state) => state.drivers);

  const updateDriver = (driver) => {
    dispatch(setDriver(driver));
    history.push("/update-driver");
  };

  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (value) => {
    setOpenAlert(false);
    setConfirmAlert(value);
    if (value) {
      dispatch(deleteDriver(currentDriver.driverID));
      openToast("success", "Driver deleted successfully!");
    }
  };

  const handleDeleteDriver = (driver) => {
    setCurrentDriver(driver);
    setAlertTitle("Delete Driver");
    setAlertDescription(`Are you sure you want delete ${driver.first_name} ${driver.surname}?`);
    openAlertDialog();
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <Button
          variant="text"
          color="primary"
          startIcon={<KeyboardBackspaceIcon />}
          style={{ marginLeft: 0, textTransform: "none" }}
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>
        <br />
        <Paper>
          <div style={{ margin: 15 }}>
            <Typography variant="h6">My Drivers</Typography>
            <Divider />
            <br />
            <br />
            <Button
              variant="text"
              color="primary"
              style={{ marginLeft: 15, textTransform: "none" }}
              startIcon={<AddIcon />}
              component={Link}
              to="/add-driver"
              naked="true"
            >
              Add Driver
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 5,
                gap: 10,
              }}
            >
              {drivers.map((driver, index) => (
                <Paper style={{ padding: 20 }} key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="first_name"
                        value={driver.first_name}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Surname"
                        name="surname"
                        value={driver.surname}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Age"
                        name="age"
                        value={driver.age}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <div>
                    <Tooltip title="Update driver" placement="top" arrow>
                      <IconButton
                        aria-label="update"
                        color="primary"
                        onClick={() => updateDriver(driver)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete driver" placement="top" arrow>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => handleDeleteDriver(driver)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Paper>
              ))}
            </div>
            <br />
          </div>
          <AlertDialogSlide
            confirmAlert={confirmAlert}
            open={openAlert}
            onClose={handleAlertClose}
            title={alertTitle}
            description={alertDescription}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewDriver;
