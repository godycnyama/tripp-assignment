import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import MuiPhoneNumber from "material-ui-phone-number";
import ReactPhoneInput from "react-phone-input-material-ui";
import Busy from "../../shared/Busy";
import { openToast } from "../../shared/Toast";
import { saveAccount } from "../../state/slices/accountSlice";

const validationSchema = Yup.object().shape({
  organisation_name: Yup.string().required("Required").max(50),
  first_name: Yup.string().required("Required").max(50),
  surname: Yup.string().required("Required").max(50),
  gender: Yup.string().required("Required").max(10),
  email_address: Yup.string().email().required("Required").max(150),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().required("Required").max(50),
});

const CreateAccount = () => {
  const { account } = useSelector((state) => state.account);
  const [activeStep, setActiveStep] = useState(0);
  const [isCargoBroker, setIsCargoBroker] = useState(false);
  const [isTransporter, setIsTransporter] = useState(false);
  const [isCargoOwner, setIsCargoOwner] = useState(false);

  const accountDetails = {
    organisation_name: "",
    first_name: "",
    surname: "",
    gender: "Male",
    email_address: "",
    password: "",
    phone: "",
    isCargoBroker: false,
    isTransporter: false,
    isCargoOwner: false,
  };

  const { register, handleSubmit, errors, formState, control } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      organisation_name: account.first_name,
      first_name: account.first_name,
      surname: account.surname,
      gender: account.gender,
      email_address: account.email_address,
      password: account.password,
      confirm_password: account.password,
      phone: account.phone,
    },
  });

  const { isSubmitting } = formState;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setActiveStep(activeStep + 1);
    accountDetails.organisation_name = data.organisation_name;
    accountDetails.first_name = data.first_name;
    accountDetails.surname = data.surname;
    accountDetails.gender = data.gender;
    accountDetails.email_address = data.email_address;
    accountDetails.password = data.password;
    accountDetails.phone = data.phone;
    accountDetails.isCargoBroker = isCargoBroker;
    accountDetails.isTransporter = isTransporter;
    accountDetails.isCargoOwner = isCargoOwner;
    console.log(accountDetails);
    dispatch(saveAccount(accountDetails));
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const createAccount = () => {
    accountDetails.isCargoBroker = isCargoBroker;
    accountDetails.isTransporter = isTransporter;
    accountDetails.isCargoOwner = isCargoOwner;
    console.log(accountDetails);
    dispatch(saveAccount(accountDetails));
    openToast("success", "Account created successfully!");

    //if cargo broker only
    if (isCargoBroker && !isTransporter && !isCargoOwner) {
      history.push("/dashboard");
    }

    //if transporter only
    if (!isCargoBroker && isTransporter && !isCargoOwner) {
      history.push("/fleet");
    }

    //if cargo owner only
    if (!isCargoBroker && !isTransporter && isCargoOwner) {
      history.push("/dashboard");
    }

    //if transporter and cargo broker only
    if (isCargoBroker && isTransporter) {
      history.push("/fleet");
    }

    //if transporter and cargo owner only
    if (isTransporter && isCargoOwner) {
      history.push("/fleet");
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <Paper>
          <div style={{ margin: 15 }}>
            <Typography variant="h6">Create Account</Typography>
            <Divider />
            <br />
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{ width: "100%" }}
            >
              <Step>
                <StepLabel>Step 1</StepLabel>
              </Step>
              <Step>
                <StepLabel>Step 2</StepLabel>
              </Step>
            </Stepper>
            {activeStep === 0 && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: 15 }}
                noValidate
              >
                <Typography variant="h6">Add Account Details</Typography>
                <Divider />
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Organisation Name"
                      name="organisation_name"
                      inputRef={register}
                      defaultValue={account.organisation_name}
                      helperText={errors.organisation_name?.message}
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      inputRef={register}
                      defaultValue={account.first_name}
                      helperText={errors.first_name?.message}
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Surname"
                      name="surname"
                      inputRef={register}
                      defaultValue={account.surname}
                      helperText={errors.surname?.message}
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <Controller
                        control={control}
                        defaultValue={account.gender}
                        name="gender"
                        as={
                          <RadioGroup row>
                            <FormControlLabel
                              value="Male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="Female"
                              control={<Radio />}
                              label="Female"
                            />
                          </RadioGroup>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      label="Email Address"
                      name="email_address"
                      inputRef={register}
                      defaultValue={account.email_address}
                      helperText={errors.email_address?.message}
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 150 }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      inputRef={register}
                      defaultValue={account.password}
                      helperText={errors.password?.message}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="password"
                      label="Confirm Password"
                      name="confirm_password"
                      inputRef={register}
                      defaultValue={account.password}
                      helperText={errors.confirm_password?.message}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone"
                      name="phone"
                      inputRef={register}
                      defaultValue={account.phone}
                      helperText={errors.phone?.message}
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 15, textTransform: "none" }}
                >
                  Continue
                </Button>
                <br />
                <br />
              </form>
            )}
            {activeStep === 1 && (
              <form style={{ margin: 15 }} noValidate>
                <Typography variant="h6">Type of Organisation</Typography>
                <Divider />
                <br />
                <span>
                  Please select the type of organisation that you trade as
                </span>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="invisible-checkboxes">
                      <input
                        type="checkbox"
                        name="isCargoBroker"
                        value={isCargoBroker}
                        checked={isCargoBroker}
                        id="isCargoBroker"
                        onChange={(e) => setIsCargoBroker(e.target.value)}
                      />
                      <label className="checkbox-alias" htmlFor="isCargoBroker">
                        Cargo Broker
                      </label>
                      <input
                        type="checkbox"
                        name="isTransporter"
                        value={isTransporter}
                        checked={isTransporter}
                        id="isTransporter"
                        onChange={(e) => setIsTransporter(e.target.value)}
                      />
                      <label className="checkbox-alias" htmlFor="isTransporter">
                        Transporter
                      </label>
                      <input
                        type="checkbox"
                        name="isCargoOwner"
                        value={isCargoOwner}
                        checked={isCargoOwner}
                        id="isCargoOwner"
                        onChange={(e) => setIsCargoOwner(e.target.value)}
                      />
                      <label className="checkbox-alias" htmlFor="isCargoOwner">
                        Cargo Owner
                      </label>
                    </div>
                  </Grid>
                </Grid>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 15, textTransform: "none" }}
                  onClick={() => previousStep()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={() => createAccount()}
                >
                  Continue
                </Button>
                <br />
                <br />
              </form>
            )}
            <br />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
