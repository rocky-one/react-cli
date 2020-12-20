import React, { Suspense } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';

export default function CreateRouter(wprops) {
    return (
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          {wprops.routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              render={(props) => (
                <route.component {...wprops} {...props} routes={route.routes} />
                )} />
            ))}
        </Suspense>
      </Switch>
    );
}
