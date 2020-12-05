import React from 'react';
import loadable from '@loadable/component';

const Page1 = loadable(() => import(/* webpackChunkName: "page1" */ '../pages/page1'));
const Page2_1 = loadable(() => import(/* webpackChunkName: "page2_1" */ '../pages/page2/page2_1'));
const Page2 = loadable(() => import(/* webpackChunkName: "page2" */ '../pages/page2'));
// const Page3 = loadable(() => import('../pages/page3'))
const Page3 = React.lazy(() => import(/* webpackChunkName: "page3" */ '../pages/page3'));

export interface RouteInterface {
    path: string,
    component: React.ComponentType,
    routes?: Array<RouteInterface>,
}

export const routeConfig = [
    {
        path: '/page1',
        component: Page1,
    },
    {
        path: '/page2',
        component: Page2,
        routes: [
            {
                path: '/page2/page2_1',
                component: Page2_1,
            },
        ],
    },
    {
        path: '/page3',
        component: Page3,
    },
];
