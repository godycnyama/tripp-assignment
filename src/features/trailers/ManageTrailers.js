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
import { setTrailer, deleteTrailer } from "../../state/slices/trailersSlice";

const ManageTrailers = () => {
  const [currentTrailer, setCurrentTrailer] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { trailers } = useSelector((state) => state.trailers);

  const updateTrailer = (trailer) => {
    dispatch(setTrailer(trailer));
    history.push("/update-trailer");
  };

  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (value) => {
    setOpenAlert(false);
    setConfirmAlert(value);
    if (value) {
      dispatch(deleteTrailer(currentTrailer.trailerID));
      openToast("success", "Trailer deleted successfully!");
    }
  };

  const handleDeleteTrailer = (trailer) => {
    setCurrentTrailer(trailer);
    setAlertTitle("Delete Trailer");
    setAlertDescription(`Are you sure you want delete trailer with registration ${trailer.registration}?`);
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
            <Typography variant="h6">My Trailers</Typography>
            <Divider />
            <br />
            <br />
            <Button
              variant="text"
              color="primary"
              style={{ marginLeft: 15, textTransform: "none" }}
              startIcon={<AddIcon />}
              component={Link}
              to="/add-trailer"
              naked="true"
            >
              Add Trailer
            </Button>
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

export default ManageTrailers;
