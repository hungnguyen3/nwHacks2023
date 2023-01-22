import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { decrement, increment } from '../../slices/CounterSlice';

export const Counter = () => {
	const count = useAppSelector(state => state.counter.value);
	const dispatch = useAppDispatch();

	// omit rendering logic
	return (
		<div>
			<button onClick={() => dispatch(increment())}>increment</button>
			<span>{count}</span>
			<button onClick={() => dispatch(decrement())}>increment</button>
		</div>
	);
};
