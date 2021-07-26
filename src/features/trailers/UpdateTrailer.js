import React from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { useSelector, useDispatch } from "react-redux";
import { openToast } from "../../shared/Toast";
import { trailerTypeOptions } from "../../shared/constants";
import {
  updateTrailer
} from "../../state/slices/trailersSlice";

const validationSchema = Yup.object().shape({
  registration: Yup.string().required("Required").max(50),
  make: Yup.string().required("Required").max(50),
  trailerType: Yup.string().required("Required").max(50)
});

const UpdateTrailer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { trailer, loading } = useSelector((state) => state.trailers);
  const { register, handleSubmit, errors, formState, control } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      registration: trailer.registration,
      make: trailer.make,
      trailerType: trailer.trailerType
    },
  });

  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    let updatedTrailer = {
      trailerID: trailer.trailerID,
      registration: data.registration,
      make: data.make,
      trailerType: data.trailerType,
    };
    dispatch(updateTrailer(updatedTrailer));
    openToast("success", "Trailer updated successfully!");
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
              <Typography variant="h6">Update Trailer</Typography>
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
                  <Controller
                    name="trailerType"
                    as={
                      <TextField
                        label="Trailer Type"
                        select
                        helperText={errors.trailerType?.message}
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                      >
                        {trailerTypeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    }
                    control={control}
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
                Update Trailer
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

export default UpdateTrailer;
