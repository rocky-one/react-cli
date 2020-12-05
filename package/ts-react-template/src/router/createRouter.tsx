import React, { Suspense } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { RouteInterface } from './config';

export default function CreateRouter(wprops: any) {
    return (
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          {wprops.routes.map((route: RouteInterface) => (
            <Route
              key={route.path}
              path={route.path}
              render={(props: any) => (
                <route.component {...wprops} {...props} routes={route.routes} />
                        )} />
                ))}
        </Suspense>
      </Switch>
    );
}
