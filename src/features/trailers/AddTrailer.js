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
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import Busy from "../../shared/Busy";
import { openToast } from "../../shared/Toast";
import { trailerTypeOptions } from "../../shared/constants";
import {
  saveTrailer
} from "../../state/slices/trailersSlice";

const validationSchema = Yup.object().shape({
  registration: Yup.string().required("Required").max(50),
  make: Yup.string().required("Required").max(50),
  trailerType: Yup.string().required("Required").max(50)
});

const AddTrailer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState, control } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      registration: "",
      make: "",
      trailerType: ""
    },
  });

  const { isSubmitting } = formState;
  const { loading, trailers } = useSelector((state) => state.trailers);
  const onSubmit = (data) => {
    let newTrailer = {
      trailerID: trailers.length + 1,
      registration: data.registration,
      make: data.make,
      trailerType: data.trailerType,
    };
    dispatch(saveTrailer(newTrailer));
    openToast("success", "Trailer added successfully!");
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
              <Typography variant="h6">Add Trailer</Typography>
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
                Add Trailer
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

export default AddTrailer;
