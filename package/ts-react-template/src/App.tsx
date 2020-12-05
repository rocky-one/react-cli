import React from 'react';
import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import Layout from './layout';
import './style/app.scss';

setConfig({
	showReactDomPatchNotification: false,
});

// process.env.NODE_ENV
// process.env.NODE_ENV_APP
 
function App(props: any) {
	return <Layout {...props} />;
}

export default hot(App);
