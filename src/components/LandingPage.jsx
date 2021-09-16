// library imports
import React from 'react';
// component imports
import AccountBar from './accounts/AccountBar';
import Month from './calendar/Month';

const LandingPage = () => {

  return (
    <div>
      <AccountBar />
      <Month />
    </div>
  );
};

export default LandingPage;