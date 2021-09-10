// library imports
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// component imports
import Month from '../calendar/Month';

const AppRouter = () => {

  return (
    <Switch>
      <Route exact path="/" component={Month} />
    </Switch>
  );
};

export default AppRouter;