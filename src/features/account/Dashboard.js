import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import GroupIcon from "@material-ui/icons/Group";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { trucks } = useSelector((state) => state.trucks);
    const { trailers } = useSelector((state) => state.trailers);
    const { drivers } = useSelector((state) => state.drivers);
    
    return (
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Typography variant="h6">Dashboard</Typography>
            <Paper>
              <div className="grid">
                <Link to="/manage-trucks" className="card">
                  <LocationCityIcon />
                  <span> My Trucks</span>
                  <span>{trucks.length}</span>
                </Link>
      
                <Link to="/manage-trailers" className="card">
                  <GroupIcon />
                  <span>My Trailers</span>
                  <span>{trailers.length}</span>
                </Link>
      
                <Link to="/manage-drivers" className="card">
                  <PeopleIcon />
                  <span>My Drivers</span>
                  <span>{drivers.length}</span>
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      );
}

export default Dashboard;
