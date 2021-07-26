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
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
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
  phone: Yup.string().required("Required").max(50)
});

const UpdateAccount = () => {
  const { account } = useSelector((state) => state.account);
  const [isCargoBroker, setIsCargoBroker] = useState(account.isCargoBroker);
  const [isTransporter, setIsTransporter] = useState(account.isTransporter);
  const [isCargoOwner, setIsCargoOwner] = useState(account.setIsCargoOwner);
  

  const { register, handleSubmit, errors, formState, control } =
    useForm({
      mode: "onTouched",
      resolver: yupResolver(validationSchema),
      defaultValues: {
        organisation_name: account.organisation_name,
        first_name: account.first_name,
        surname: account.surname,
        gender: account.gender,
        email_address: account.email_address,
        password: account.password,
        confirm_password: account.password,
        phone: account.phone
      },
    });

  const { isSubmitting } = formState;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const accountDetails = {
      organisation_name: data.organisation_name,
      first_name: data.first_name,
      surname: data.surname,
      gender: data.gender,
      email_address: data.email_address,
      password: data.password,
      phone: data.phone,
      isCargoBroker: isCargoBroker,
      isTransporter: isTransporter,
      isCargoOwner: isCargoOwner
    };
    
    //if no organisation type chosen, error out
    if(!isCargoBroker && !isTransporter && !isCargoOwner ){
      openToast("error", "Please choose at least one organisation type");
      return;
    }
    dispatch(saveAccount(accountDetails));
    openToast("success", "Account updated successfully!");

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ margin: 15 }}
            noValidate
          >
            <Typography variant="h6">Update Account</Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Organisation Name"
                  name="organisation_name"
                  inputRef={register}
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
                  helperText={errors.phone?.message}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">
                  Please select the type of organisation that you trade as
                </FormLabel>
                <div className="invisible-checkboxes">
                  <input
                    type="checkbox"
                    name="isCargoBroker"
                    value={isCargoBroker}
                    checked={isCargoBroker}
                    id="isCargoBroker"
                    onChange={() => setIsCargoBroker(!isCargoBroker)}
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
                    onChange={() => setIsTransporter(!isTransporter)}
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
                    onChange={() => setIsCargoOwner(!isCargoOwner)}
                  />
                  <label className="checkbox-alias" htmlFor="isCargoOwner">
                    Cargo Owner
                  </label>
                </div>
              </Grid>
            </Grid>
            <br />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              style={{ marginRight: 15, textTransform: "none" }}
            >
              Update
            </Button>
            <br />
            <br />
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UpdateAccount;
