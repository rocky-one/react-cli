import { useState } from 'react';
import { createContainer } from 'unstated-next';
import uesRequest from '../hooks/useRequest';

// 这里作为共享的数据
function useInfo() {
    const [count, setCount] = useState({});
}

export const CountContainer = createContainer(useInfo);
