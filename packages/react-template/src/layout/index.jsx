import React from 'react';
import CreateRouter from '../router/createRouter';
import { routeConfig } from '../router/config';
import style from './style/layout.scss';

const navs = [{
  path: '/page1',
  name: 'page1',
}, {
  path: '/page2',
  name: 'page2',
}, {
  path: '/page3',
  name: 'page3',
}];

function onChangeHistory(history, path) {
  history.push(path);
}

export default (props) => (
  <div style={{ height: '100%', display: 'flex' }}>
    <div className={style.left}>
      {
        navs.map(
          (item) => (
            <div
              className={style.nav}
              key={item.path}
              onClick={() => onChangeHistory(props.history, item.path)}>
              {item.name}
            </div>
          ),
        )
      }
    </div>
    <div>
      <CreateRouter routes={routeConfig} />
    </div>
  </div>
);
