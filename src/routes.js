import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

const AlbumList = lazy(() => import("./components/AlbumList"));

const routes = (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={AlbumList} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default routes;
