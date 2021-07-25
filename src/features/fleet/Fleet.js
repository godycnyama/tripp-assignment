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
import Busy from "../../shared/Busy";
import { setTruck, deleteTruck } from "../../state/slices/trucksSlice";
import { setTrailer, deleteTrailer } from "../../state/slices/trailersSlice";
import { setDriver, deleteDriver } from "../../state/slices/driversSlice";

const ManageFleet = () => {
  const [currentTruck, setCurrentTruck] = useState({});
  const [openTruckDialog, setOpenTruckDialog] = useState(false);
  const [confirmTruckDialog, setConfirmTruckDialog] = useState(false);
  const [truckDialogTitle, setTruckDialogTitle] = useState("");
  const [truckDialogDescription, setTruckDialogDescription] = useState("");
  const [currentTrailer, setCurrentTrailer] = useState({});
  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);
  const [confirmTrailerDialog, setConfirmTrailerDialog] = useState(false);
  const [trailerDialogTitle, setTrailerDialogTitle] = useState("");
  const [trailerDialogDescription, setTrailerDialogDescription] = useState("");
  const [currentDriver, setCurrentDriver] = useState({});
  const [openDriverDialog, setOpenDriverDialog] = useState(false);
  const [confirmDriverDialog, setConfirmDriverDialog] = useState(false);
  const [driverDialogTitle, setDriverDialogTitle] = useState("");
  const [driverDialogDescription, setDriverDialogDescription] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { trucks } = useSelector((state) => state.trucks);
  const { trailers } = useSelector((state) => state.trailers);
  const { drivers } = useSelector((state) => state.drivers);

  const updateTruck = (truck) => {
    dispatch(setTruck(truck));
    history.push("/update-truck");
  };

  const handleTruckDialogClose = (value) => {
    setOpenTruckDialog(false);
    setConfirmTruckDialog(value);
    if (value) {
      dispatch(deleteTruck(currentTruck.truckID));
      openToast("success", "Truck deleted successfully!");
    }
  };

  const handleDeleteTruck = (truck) => {
    setCurrentTruck(truck);
    setTruckDialogTitle("Delete Truck");
    setTruckDialogDescription(
      `Are you sure you want delete ${truck.first_name} ${truck.surname}?`
    );
    setOpenTruckDialog(true);
  };

  const updateTrailer = (trailer) => {
    dispatch(setTrailer(trailer));
    history.push("/update-trailer");
  };

  const handleTrailerDialogClose = (value) => {
    setOpenTrailerDialog(false);
    setConfirmTrailerDialog(value);
    if (value) {
      dispatch(deleteTrailer(currentTrailer.trailerID));
      openToast("success", "Trailer deleted successfully!");
    }
  };

  const handleDeleteTrailer = (trailer) => {
    setCurrentTrailer(trailer);
    setTrailerDialogTitle("Delete Trailer");
    setTrailerDialogDescription(
      `Are you sure you want delete trailer with registration ${trailer.registration}?`
    );
    setOpenTrailerDialog(true);
  };

  const updateDriver = (driver) => {
    dispatch(setDriver(driver));
    history.push("/update-driver");
  };

  const handleDriverDialogClose = (value) => {
    setOpenDriverDialog(false);
    setConfirmDriverDialog(value);
    if (value) {
      dispatch(deleteDriver(currentDriver.driverID));
      openToast("success", "Driver deleted successfully!");
    }
  };

  const handleDeleteDriver = (driver) => {
    setCurrentDriver(driver);
    setDriverDialogTitle("Delete Driver");
    setDriverDialogDescription(
      `Are you sure you want delete ${driver.first_name} ${driver.surname}?`
    );
    setOpenDriverDialog(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 10,
      }}
    >
      <Paper>
        <div
          style={{
            padding: 10,
          }}
        >
          <Typography variant="h6">My Trucks</Typography>
          <Divider />
          <br />
          <br />
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
        </div>
      </Paper>
      <Paper>
        <div
          style={{
            padding: 10,
          }}
        >
          <Typography variant="h6">My Trailers</Typography>
          <Divider />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
              gap: 10,
            }}
          >
            {trailers.map((trailer, index) => (
              <Paper style={{ padding: 20 }} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Registration"
                      name="registration"
                      value={trailer.registration}
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
                      value={trailer.make}
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Trailer Type"
                      name="trailerType"
                      value={trailer.trailerType}
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
                <div>
                  <Tooltip title="Update trailer" placement="top" arrow>
                    <IconButton
                      aria-label="update"
                      color="primary"
                      onClick={() => updateTrailer(trailer)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete trailer" placement="top" arrow>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => handleDeleteTrailer(trailer)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </Paper>
      <Paper>
        <div
          style={{
            padding: 10,
          }}
        >
          <Typography variant="h6">My Drivers</Typography>
          <Divider />
          <br />
          <br />
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
        </div>
      </Paper>
      <AlertDialogSlide
        confirmAlert={confirmTruckDialog}
        open={openTruckDialog}
        onClose={handleTruckDialogClose}
        title={truckDialogTitle}
        description={truckDialogDescription}
      />
      <AlertDialogSlide
        confirmAlert={confirmTrailerDialog}
        open={openTrailerDialog}
        onClose={handleTrailerDialogClose}
        title={trailerDialogTitle}
        description={trailerDialogDescription}
      />
      <AlertDialogSlide
        confirmAlert={confirmDriverDialog}
        open={openDriverDialog}
        onClose={handleDriverDialogClose}
        title={driverDialogTitle}
        description={driverDialogDescription}
      />
    </div>
  );
};

export default ManageFleet;
