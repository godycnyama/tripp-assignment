import React from "react";
import { Paper, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewAccount = () => {
  const history = useHistory();
  const { account } = useSelector((state) => state.account);
  console.log(account);

  const updateAccount = () => {
    history.push("/update-account");
  };
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <Button
          variant="text"
          color="primary"
          startIcon={<EditIcon />}
          style={{ marginLeft: 0, textTransform: "none" }}
          onClick={() => {
            updateAccount();
          }}
        >
          Update Account
        </Button>
        <br />
        <Paper>
          <div style={{ margin: 15 }}>
            <Typography variant="h6">Account Details</Typography>
            <Divider />
            <br />
            <p>
              <b>Organisation Name:</b> {account.organisation_name}
            </p>
            {account.isCargoBroker && (
              <p>
                <b>Is Cargo Broker:</b> Yes
              </p>
            )}
            {account.isTransporter && (
              <p>
                <b>Is Transporter:</b> Yes
              </p>
            )}
            {account.isCargoOwner && (
              <p>
                <b>Is Cargo Owner:</b> Yes
              </p>
            )}
            <p>
              <b>First Name:</b> {account.first_name}
            </p>
            <p>
              <b>Surname:</b> {account.surname}
            </p>
            <p>
              <b>Email Address:</b> {account.email_address}
            </p>
            <p>
              <b>Phone:</b> {account.phone}
            </p>
            <br />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewAccount;
