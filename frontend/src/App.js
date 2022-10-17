import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './index.css'
import SpotsPage from "./components/SpotsPage";
import SpotDetails from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <SpotsPage />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route>
            404 Page Not Found
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
