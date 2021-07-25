import React from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PeopleIcon from '@material-ui/icons/People';
import NumberFormat from "react-number-format";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { openToast } from "../../shared/Toast";
import {
  saveDriver
} from "../../state/slices/driversSlice";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required").max(50),
  surname: Yup.string().required("Required").max(50),
  age: Yup.string().required("Required").max(4),
});

const AddDriver = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: "",
      surname: "",
      age: "",
    },
  });

  const { isSubmitting } = formState;
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, drivers } = useSelector((state) => state.drivers);
  const onSubmit = (data) => {
    let newDriver = {
      driverID: drivers.length + 1,
      first_name: data.first_name,
      surname: data.surname,
      age: data.age,
    };

    dispatch(saveDriver(newDriver));
    openToast("success", "Driver added successfully!");
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
              <Typography variant="h6">Add Driver</Typography>
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
                <Grid item xs={12}>
                  <div class="invisible-checkboxes">
                    <input type="checkbox" name="rGroup" value="1" id="r1" />
                    <label class="checkbox-alias" for="r1">Cargo Broker <PeopleIcon/>
                    </label>
                    <input type="checkbox" name="rGroup" value="2" id="r2" />
                    <label class="checkbox-alias" for="r2">Transporter</label>
                    <input type="checkbox" name="rGroup" value="3" id="r3" />
                    <label class="checkbox-alias" for="r3">Cargo Owner</label>
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
                Add
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

export default AddDriver;
