import React from 'react';
import style from './style/layout.scss';

export default (props) => (
  <div className={style.left}>
    {props.children}
  </div>
);
