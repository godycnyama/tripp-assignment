import React from "react";
import { useHistory } from "react-router-dom";
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
  FormLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import MuiPhoneNumber from "material-ui-phone-number";
import ReactPhoneInput from "react-phone-input-material-ui";
import Busy from "../../shared/Busy";
import { openToast } from "../../shared/Toast";

const useStyles = makeStyles((theme) => ({
  field: {
    margin: "10px 0",
  },
  countryList: {
    ...theme.typography.body1,
  },
}));

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required").max(50),
  last_name: Yup.string().required("Required").max(50),
  gender: Yup.string().required("Required").max(10),
  email_address: Yup.string().email().required("Required").max(150),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().required("Required").max(50),
});

const CreateUser = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      email_address: "",
      password: "",
      confirm_password: "",
      phone: "",
    },
  });

  const { isSubmitting } = formState;
  const history = useHistory();
  const classes = useStyles();
  const { loading } = useSelector((state) => state.drivers);

  const onSubmit = (data) => {};

  return (
    <div>
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
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Paper>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: 15 }}
              noValidate
            >
              <Typography variant="h6">Add User</Typography>
              <Divider />
              <br />
              <Grid container spacing={2}>
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
                    label="Last Name"
                    name="last_name"
                    inputRef={register}
                    helperText={errors.last_Name?.message}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      inputRef={register}
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
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
                  <ReactPhoneInput
                    label="Phone"
                    name="phone"
                    inputRef={register}
                    defaultCountry={"gb"}
                    helperText={errors.phone?.message}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    component={TextField}
                  />
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
                Save User
              </Button>
              <br />
              <br />
            </form>
            <Busy open={loading} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateUser;
