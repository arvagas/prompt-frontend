// library imports
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// component imports
import Month from '../calendar/Month';
// context imports
import { UserContext } from '../../contexts/UserContext';

const AppRouter = () => {
  const [token, setToken] = useState(false);

  return (
    <UserContext.Provider userValues={userValues}>
      <Switch>
        <Route exact path="/" component={Month} />
      </Switch>
    </UserContext.Provider>
  );
};

export default AppRouter;