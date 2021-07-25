import React from "react";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewUser = () => {
  const history = useHistory();
  const { user } = useSelector(state => state.users);
  
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
        <br/>
        <Paper>
          <div style={{ margin: 15 }}>
            <Typography variant="h6">User Detail</Typography>
            <Divider />
            <br />
            <p>
              <b>First Name:</b> {user.first_Name}
            </p>
            <p>
              <b>Last Name:</b> {user.last_Name}
            </p>
            <p>
              <b>Date Of Birth:</b> {user.date_Of_Birth}
            </p>
            <p>
              <b>Email Address:</b> {user.email_Address}
            </p>
            <p>
              <b>Address:</b> {user.address}
            </p>
            <p>
              <b>City:</b> {user.city}
            </p>
            <p>
              <b>Zip Code:</b> {user.zip_Code}
            </p>
            <p>
              <b>Country:</b> {user.country}
            </p>
            <br/>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewUser;
