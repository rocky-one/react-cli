import { useState } from 'react';
import { createContainer } from 'unstated-next';

// 这里作为共享的数据
function useCount() {
    const [count, setCount] = useState(-0);
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    return { count, setCount, decrement, increment };
}

export default createContainer(useCount);
