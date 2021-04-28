import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { ApplicationViews } from "./ApplicationViews";

export const App = () => {
  return (
    <Router>
      <UserProvider>
        <ApplicationViews />
      </UserProvider>
    </Router>
  )
}
