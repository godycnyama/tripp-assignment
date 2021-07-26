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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { openToast } from "../../shared/Toast";
import {
  saveTruck
} from "../../state/slices/trucksSlice";

const validationSchema = Yup.object().shape({
  registration: Yup.string().required("Required").max(50),
  make: Yup.string().required("Required").max(50),
  model: Yup.string().required("Required").max(50)
});

const AddTruck = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      registration: "",
      make: "",
      model: ""
    },
  });

  const { isSubmitting } = formState;
  const { loading, trucks } = useSelector((state) => state.trucks);
  const onSubmit = (data) => {
    let newTruck = {
      truckID: trucks.length + 1,
      registration: data.registration,
      make: data.make,
      model: data.model,
    };
    dispatch(saveTruck(newTruck));
    openToast("success", "Truck added successfully!");
    history.goBack();
  };

  return (
    <div>
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
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Paper>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: 15 }}
              noValidate
            >
              <Typography variant="h6">Add Truck</Typography>
              <Divider />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Registration"
                    name="registration"
                    inputRef={register}
                    helperText={errors.registration?.message}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Make"
                    name="make"
                    inputRef={register}
                    helperText={errors.make?.message}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Model"
                    name="model"
                    inputRef={register}
                    helperText={errors.model?.message}
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

export default AddTruck;
