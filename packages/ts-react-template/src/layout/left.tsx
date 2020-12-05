import React from 'react';
import style from './style/layout1.less';

export default (props: any) => (
  <div className={style.left}>
    {props.children}
  </div>
);
