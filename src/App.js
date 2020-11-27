import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SingleDraft from "./pages/SingleDraft";
import MultiDraft from "./pages/MultiDraft";
import MomentDraft from "./pages/MomentDraft";
import ReadOnlyDraft from './pages/ReadOnlyDraft';

const App = () => {
  return (
    <Switch>
      <Route component={SingleDraft} path="/single-draft" exact/>
      <Route component={MultiDraft} path="/multi-draft" exact/>
      <Route component={MomentDraft} path="/moment-draft" exact/>
      <Route component={ReadOnlyDraft} path="/read-only-draft" exact/>
      <Route component={Home} path="/" exact/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default App;