import React from 'react';
import {
	Link,
} from 'react-router-dom';
import CreateRouter from '../../router/createRouter';
import reduceAdd from '../../utils/index';

reduceAdd([]);
export default function Page2(props: any) {
	return (
  <div>
    Page2
    <div>
      <Link to="/page2/page2_1">跳到:/page2/page2_1</Link>
    </div>
    {
			props.routes ? <CreateRouter routes={props.routes} /> : null
		}
  </div>
);
}
