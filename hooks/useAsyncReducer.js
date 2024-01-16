import { useState } from 'react';

export const useAsyncReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);

  const dispatch = async (action) => {
    const result = reducer(state, action);
    if (typeof result.then === 'function') {
      try {
        const newState = await result;
        setState(newState);
      } catch (e) {
        setState({ ...state, error: e });
        console.log('error from dispatch', e);
      }
    } else {
      setState(result);
    }
  };

  return [state, dispatch];
};
