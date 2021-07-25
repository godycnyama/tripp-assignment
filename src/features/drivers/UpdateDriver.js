import React from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Button
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NumberFormat from "react-number-format";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { useDispatch, useSelector } from "react-redux";
import { openToast } from "../../shared/Toast";
import {
  updateDriver
} from "../../state/slices/driversSlice";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required").max(50),
  surname: Yup.string().required("Required").max(50),
  age: Yup.string().required("Required").max(4)
});

const UpdateDriver = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { driver, loading } = useSelector((state) => state.drivers);
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: driver.first_name,
      surname: driver.surname,
      age: driver.age
    },
  });

  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    let  updatedDriver = {
      driverID: driver.driverID ,
      first_name: data.first_name,
      surname: data.surname,
      age: data.age
    }

    dispatch(updateDriver(updatedDriver));
    openToast("success", "Driver updated successfully!");
    history.goBack();
  };

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
              <Typography variant="h6">Update Driver</Typography>
              <Divider />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                  <NumberFormat
                    label="Age"
                    name="age"
                    customInput={TextField}
                    defaultValue={driver.age}
                    thousandSeparator={false}
                    decimalSeparator={"."}
                    decimalScale={0}
                    inputRef={register}
                    helperText={errors.age?.message}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 3 }}
                    fullWidth
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
                Update
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

export default UpdateDriver;
