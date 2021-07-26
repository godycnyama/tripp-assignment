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
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { useSelector, useDispatch } from "react-redux";
import { openToast } from "../../shared/Toast";
import {
  updateTruck
} from "../../state/slices/trucksSlice";

const validationSchema = Yup.object().shape({
  registration: Yup.string().required("Required").max(50),
  make: Yup.string().required("Required").max(50),
  model: Yup.string().required("Required").max(50)
});

const UpdateTruck = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { truck, loading } = useSelector((state) => state.trucks);
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      registration: truck.registration,
      make: truck.make,
      model: truck.model
    },
  });

  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    let updatedTruck = {
      truckID: truck.truckID,
      registration: data.registration,
      make: data.make,
      model: data.model,
    };
    dispatch(updateTruck(updatedTruck));
    openToast("success", "Truck updated successfully!");
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
              <Typography variant="h6">Update Truck</Typography>
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

export default UpdateTruck;
