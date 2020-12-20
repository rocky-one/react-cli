import React from 'react';
import CountContainer from '../../store/count';

export default function Count() {
    return (
      <div>
        <CountContainer.Provider>
          <CountChild />
          <CountChild2 />
        </CountContainer.Provider>
      </div>

    );
}
function CountChild() {
    const counter = CountContainer.useContainer();
    return (
      <div>
        <button onClick={counter.decrement}>-</button>
        <p>
          You clicked
          {' '}
          {counter.count}
          {' '}
          times
        </p>
        <button onClick={counter.increment}>+</button>
      </div>
    );
}
function CountChild2() {
    const counter = CountContainer.useContainer();
    return (
      <div>
        <p>
          You clicked
          {' '}
          {counter.count}
          {' '}
          times2
        </p>
      </div>
    );
}
