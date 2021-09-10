// library imports
import React, { Suspense } from "react";
// component imports
import AppRouter from "./components/router/AppRouter";
// styles
import "./index.css"

// gives context api a chance to load needed values
// const AppRouter = React.lazy(() => {
//   return Promise.all([
//     import('./components/router/AppRouter'),
//     new Promise(res => setTimeout(res, 1500))
//   ])
//   .then(([moduleExports]) => moduleExports)
// })

const App = () => {
  return (
    <div>
      {/* <Suspense fallback={<h1>Loading...</h1>}> */}
        <AppRouter />
      {/* </Suspense> */}
    </div>
  );
};

export default App;