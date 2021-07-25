import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import './App.css';
import PageTransitionAnimation from './shared/PageTransitionAnimation';
import CreateAccount from './features/account/CreateAccount';
import UpdateAccount from './features/account/UpdateAccount';
import ViewAccount from './features/account/ViewAccount';
import AddDriver from './features/drivers/AddDriver';
import ManageDrivers from './features/drivers/ManageDrivers';
import UpdateDriver from './features/drivers/UpdateDriver';
import AddTrailer from './features/trailers/AddTrailer';
import ManageTrailers from './features/trailers/ManageTrailers';
import UpdateTrailer from './features/trailers/UpdateTrailer';
import AddTruck from './features/trucks/AddTruck';
import ManageTrucks from './features/trucks/ManageTrucks';
import UpdateTruck from './features/trucks/UpdateTruck';
import Fleet from './features/fleet/Fleet';
import Dashboard from './features/account/Dashboard';

function App() {
  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={PageTransitionAnimation(CreateAccount)}/>
        <Route path="/update-account" component={PageTransitionAnimation(UpdateAccount)} />
        <Route path="/view-account" component={PageTransitionAnimation(ViewAccount)} />
        <Route path="/dashboard" component={PageTransitionAnimation(Dashboard)} />
        <Route path="/fleet" component={PageTransitionAnimation(Fleet)}/>
        <Route path="/add-driver" component={PageTransitionAnimation(AddDriver)}/>
        <Route path="/manage-drivers" component={PageTransitionAnimation(ManageDrivers)}/>
        <Route path="/update-driver" component={PageTransitionAnimation(UpdateDriver)}/>
        <Route path="/add-trailer" component={PageTransitionAnimation(AddTrailer)}/>
        <Route path="/manage-trailers" component={PageTransitionAnimation(ManageTrailers)}/>
        <Route path="/update-trailer" component={PageTransitionAnimation(UpdateTrailer)}/>
        <Route path="/add-truck" component={PageTransitionAnimation(AddTruck)}/>
        <Route path="/manage-trucks" component={PageTransitionAnimation(ManageTrucks)}/>
        <Route path="/update-truck" component={PageTransitionAnimation(UpdateTruck)}/>
      </Switch>
    </Layout>
  );
}

export default App;
