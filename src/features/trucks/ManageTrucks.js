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
import { setTruck, deleteTruck } from "../../state/slices/trucksSlice";

const ManageTrucks = () => {
  const [currentTruck, setCurrentTruck] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { trucks } = useSelector((state) => state.trucks);

  const updateTruck = (truck) => {
    dispatch(setTruck(truck));
    history.push("/update-truck");
  };

  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (value) => {
    setOpenAlert(false);
    setConfirmAlert(value);
    if (value) {
      dispatch(deleteTruck(currentTruck.truckID));
      openToast("success", "Truck deleted successfully!");
    }
  };

  const handleDeleteTruck = (truck) => {
    setCurrentTruck(truck);
    setAlertTitle("Delete Truck");
    setAlertDescription(`Are you sure you want delete ${truck.first_name} ${truck.surname}?`);
    openAlertDialog();
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <Button
          variant="contained"
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
            <Typography variant="h6">My Trucks</Typography>
            <Divider />
            <br />
            <br />
            <Button
              variant="text"
              color="primary"
              style={{ marginLeft: 15, textTransform: "none" }}
              startIcon={<AddIcon />}
              component={Link}
              to="/add-truck"
              naked="true"
            >
              Add Truck
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 5,
                gap: 10,
              }}
            >
              {trucks.map((truck, index) => (
                <Paper style={{ padding: 20 }} key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Registration"
                        name="registration"
                        value={truck.registration}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Make"
                        name="make"
                        value={truck.make}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Model"
                        name="model"
                        value={truck.model}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <div>
                    <Tooltip title="Update truck" placement="top" arrow>
                      <IconButton
                        aria-label="update"
                        color="primary"
                        onClick={() => updateTruck(truck)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete truck" placement="top" arrow>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => handleDeleteTruck(truck)}
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

export default ManageTrucks;
