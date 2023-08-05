import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GetSpotDetailsFunc from "./components/GetSpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/users/:userId/spots">
            <ManageSpots />
          </Route>
          <Route path="/spots/:spotId/update">
            <UpdateSpot />
          </Route>
          <Route path="/spots/:spotId">
            <GetSpotDetailsFunc />
          </Route>
          <Route path="/spots">
            <CreateSpot />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
