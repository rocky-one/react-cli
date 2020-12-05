import ReactDOM from 'react-dom';
import React from 'react';
import {
	HashRouter as Router,
	withRouter,
} from 'react-router-dom';
import App from './App';

const render = (Component: React.ComponentType) => {
	ReactDOM.render(
  <Router>
    <Component />
  </Router>,
		document.getElementById('app'),
	);
};

render(withRouter(App));
