// THIS ONE IS JUST EXAMPLE FOR TOOLKIT USAGE

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../../store/counterSlice';

const Counter = () => {
    // Use useSelector to get the current counter value from the store
    const count = useSelector((state) => state.counter.value);

    // Use useDispatch to create dispatch actions
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
};

export default Counter;