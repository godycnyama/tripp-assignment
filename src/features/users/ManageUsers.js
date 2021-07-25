import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import AlertDialogSlide from "../../shared/dialog";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Tooltip, IconButton } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import LaunchIcon from "@material-ui/icons/Launch";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import {
  GET_ALL_USERS,
  GET_USERS_BY_FIRST_NAME,
  GET_USERS_BY_LAST_NAME,
  DELETE_USER,
} from "../../graphql-operations/usersGraphQLOperations";
import { openToast } from "../../shared/Toast";
import Busy from "../../shared/Busy";
import {
  setUserSearchFilters,
  setUser,
  setSearchBy,
  setSearchTerm,
  getUsersSuccess,
  deleteUserSuccess,
} from "../../state/slices/usersSlice";

const validationSchema = Yup.object().shape({
  searchBy: Yup.string().required("Required"),
  searchTerm: Yup.string(),
});

const searchByOptions = ["All", "First Name", "Last Name"];

const ManageUsers = () => {
  const {
    users,
    usersSearchFilters: {
      searchBy,
      searchTerm,
      pageSize,
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
      totalResults,
    },
  } = useSelector((state) => state.users);

  const { register, handleSubmit, errors, control, watch, formState } = useForm(
    {
      mode: "onTouched",
      resolver: yupResolver(validationSchema),
      defaultValues: {
        searchBy: searchBy,
        searchTerm: searchTerm,
      },
    }
  );
  const watchSearchBy = watch("searchBy");
  const { touched } = formState;
  const [currentUser, setCurrentUser] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const [getAllUsers, { loading: getAllUsersLoading }] = useLazyQuery(
    GET_ALL_USERS,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.users.totalCount === 0) {
          openToast("error", "No user records founds!");
          return;
        }
        let filters = {
          searchBy: searchBy,
          searchTerm: searchTerm,
          pageSize: pageSize,
          startCursor: data.users.pageInfo.startCursor,
          endCursor: data.users.pageInfo.endCursor,
          hasNextPage: data.users.pageInfo.hasNextPage,
          hasPreviousPage: data.users.pageInfo.hasPreviousPage,
          totalResults: data.users.totalCount,
        };
        dispatch(setUserSearchFilters(filters));
        dispatch(getUsersSuccess(data.users.nodes));
      },
      onError: (error) => {
        if(error.message){
          openToast("error", error.message);
          return;
        }
        if(error.networkError){
          openToast("error", error.networkError.result.errors[0].message);
        }
      },
    }
  );

  const [getUsersByFirstName, { loading: getUsersByFirstNameLoading }] =
    useLazyQuery(GET_USERS_BY_FIRST_NAME, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.users.totalCount === 0) {
          openToast("error", "No user records founds!");
          return;
        }
        let filters = {
          searchBy: searchBy,
          searchTerm: searchTerm,
          pageSize: pageSize,
          startCursor: data.users.pageInfo.startCursor,
          endCursor: data.users.pageInfo.endCursor,
          hasNextPage: data.users.pageInfo.hasNextPage,
          hasPreviousPage: data.users.pageInfo.hasPreviousPage,
          totalResults: data.users.totalCount,
        };
        dispatch(setUserSearchFilters(filters));
        dispatch(getUsersSuccess(data.users.nodes));
      },
      onError: (error) => {
        if(error.message){
          openToast("error", error.message);
          return;
        }
        if(error.networkError){
          openToast("error", error.networkError.result.errors[0].message);
        }
      },
    });

  const [getUsersByLastName, { loading: getUsersByLastNameLoading }] =
    useLazyQuery(GET_USERS_BY_LAST_NAME, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.users.totalCount === 0) {
          openToast("error", "No user records founds!");
          return;
        }
        let filters = {
          searchBy: searchBy,
          searchTerm: searchTerm,
          pageSize: pageSize,
          startCursor: data.users.pageInfo.startCursor,
          endCursor: data.users.pageInfo.endCursor,
          hasNextPage: data.users.pageInfo.hasNextPage,
          hasPreviousPage: data.users.pageInfo.hasPreviousPage,
          totalResults: data.users.totalCount,
        };
        dispatch(setUserSearchFilters(filters));
        dispatch(getUsersSuccess(data.users.nodes));
      },
      onError: (error) => {
        if(error.message){
          openToast("error", error.message);
          return;
        }
        if(error.networkError){
          openToast("error", error.networkError.result.errors[0].message);
        }
      },
    });

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_USER,
    {
      onCompleted: (data) => {
        dispatch(deleteUserSuccess(currentUser.userID));
        openToast("success", data.deleteUser.message);
      },
      onError: (error) => {
        if(error.message){
          openToast("error", error.message);
          return;
        }
        if(error.networkError){
          openToast("error", error.networkError.result.errors[0].message);
        }
      },
    }
  );

  const viewUser = (user) => {
    dispatch(setUser(user));
    history.push("/view-user");
  };

  const updateUser = (user) => {
    dispatch(setUser(user));
    history.push("/update-user");
  };

  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (value) => {
    setOpenAlert(false);
    setConfirmAlert(value);
    if (value) {
      deleteUser({
        userID: currentUser.userID,
      });
    }
  };

  const initialSearch = () => {
    if (searchBy === "All") {
      getAllUsers({
        variables: {
          first: pageSize,
          after: null,
          last: null,
          before: null
        }
      });
    }

    if (searchBy === "First Name") {
      getUsersByFirstName({
        variables: {
          first_Name: searchTerm,
          first: pageSize,
          after: null,
          last: null,
          before: null
        }
      });
    }

    if (searchBy === "Last Name") {
      getUsersByLastName({
        variables: {
          last_Name: searchTerm,
          first: pageSize,
          after: null,
          last: null,
          before: null
        }
      });
    }
  };

  const next = () => {
    if (searchBy === "All") {
      getAllUsers({
        variables: {
          first: pageSize,
          after: endCursor,
          last: null,
          before: null
        }
      });
    }

    if (searchBy === "First Name") {
      getUsersByFirstName({
        variables: {
          first_Name: searchTerm,
          first: pageSize,
          after: endCursor,
          last: null,
          before: null
        }
      });
    }

    if (searchBy === "Last Name") {
      getUsersByLastName({
        variables: {
          last_Name: searchTerm,
          first: pageSize,
          after: endCursor,
          last: null,
          before: null
        }
      });
    }
  };

  const previous = () => {
    if (searchBy === "All") {
      getAllUsers({
        variables: {
          first: null,
          after: null,
          last: pageSize,
          before: startCursor
        }
      });
    }

    if (searchBy === "First Name") {
      getUsersByFirstName({
        variables: {
          first_Name: searchTerm,
          first: null,
          after: null,
          last: pageSize,
          before: startCursor
        },
      });
    }

    if (searchBy === "Last Name") {
      getUsersByLastName({
        variables: {
          last_Name: searchTerm,
          first: null,
          after: null,
          last: pageSize,
          before: startCursor
        },
      });
    }
  };

  const handleDeleteUser = (row) => {
    setCurrentUser(row);
    setAlertTitle("Delete User");
    setAlertDescription("Are you sure you want delete user?");
    openAlertDialog();
  };

  const onSubmit = (data) => {
    dispatch(setSearchBy(data.searchBy));
    dispatch(setSearchTerm(data.searchTerm));
    initialSearch();
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Paper>
            <Typography
              variant="h6"
              style={{ marginLeft: 15, marginRight: 15 }}
            >
              Users
            </Typography>
            <Divider style={{ marginLeft: 15, marginRight: 15 }} />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: 15, textTransform: "none" }}
              startIcon={<AddIcon />}
              component={Link}
              to="/create-user"
              naked="true"
            >
              Add User
            </Button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: 15 }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Controller
                    name="searchBy"
                    as={
                      <TextField
                        label="Search By"
                        select
                        helperText={errors.searchBy?.message}
                        variant="outlined"
                        size="small"
                        fullWidth
                      >
                        {searchByOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    }
                    control={control}
                  />
                </Grid>
                {watchSearchBy !== "All" && (
                  <Grid item xs={4}>
                    <TextField
                      label={watchSearchBy}
                      name="searchTerm"
                      inputRef={register}
                      helperText={
                        errors.searchTerm &&
                        touched.searchTerm &&
                        errors.searchTerm
                      }
                      margin="normal"
                      variant="outlined"
                      size="small"
                      inputProps={{ maxLength: 200 }}
                      style={{ marginTop: -1 }}
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none", marginTop: 2 }}
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 15,
              }}
            >
              {totalResults !== 0 && <p>Total Results: {totalResults}</p>}
              <Tooltip title="Refresh" placement="top" arrow>
                <IconButton
                  aria-label="refresh"
                  color="primary"
                  onClick={() => initialSearch()}
                >
                  <AutorenewIcon />
                </IconButton>
              </Tooltip>
              <ButtonGroup size="small" variant="contained" color="primary">
                <Button onClick={() => previous()} disabled={!hasPreviousPage}>
                  <ArrowLeftIcon />
                </Button>
                <Button onClick={() => next()} disabled={!hasNextPage}>
                  <ArrowRightIcon />
                </Button>
              </ButtonGroup>
            </div>
            <Grid container>
              {users.map((row) => (
                <Grid item xs={12} key={row.userID}>
                  <Paper>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between", 
                        padding: 15
                      }}
                    >
                      <div>
                        <span>
                          {row.first_Name} {row.last_Name}
                        </span>
                      </div>
                      <div>
                        <Tooltip title="View user" placement="top" arrow>
                          <IconButton
                            aria-label="view"
                            color="primary"
                            onClick={() => viewUser(row)}
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update user" placement="top" arrow>
                          <IconButton
                            aria-label="update"
                            color="primary"
                            onClick={() => updateUser(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete user" placement="top" arrow>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => handleDeleteUser(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <AlertDialogSlide
              confirmAlert={confirmAlert}
              open={openAlert}
              onClose={handleAlertClose}
              title={alertTitle}
              description={alertDescription}
            />
            <Busy
              open={
                getAllUsersLoading ||
                getUsersByFirstNameLoading ||
                getUsersByLastNameLoading ||
                deleteUserLoading
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageUsers;
