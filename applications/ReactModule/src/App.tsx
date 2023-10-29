import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./router/index.ts";
console.log(routes);
function App() {
  return <Router routes={routes}></Router>;
}

export default App;
