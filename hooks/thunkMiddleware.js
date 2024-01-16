import { useEffect } from 'react';
import axios from 'axios';

const ThunkContext = createContext(null);

export const ThunkProvider = ({ children }) => {
  // HAS PLACEHOLDER VALUES
  const thunk = useThunk(reducer, { count: 0, loading: false, error: null });
  return (
    <ThunkContext.Provider value={thunk}>{children}</ThunkContext.Provider>
  );
};

const useThunk = (reducer, initialState) => {
  const mounted = useRef(true);
  useEffect(() => () => (mounted.current = false), []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const mountedDispatch = (action) => {
    if (mounted.current) {
      dispatch(action);
    }
  };

  const thunk = (options, actions, payload = {}, callback) => {
    mountedDispatch({ type: actions[0], payload });
    axios
      .get(options)
      .then((response) => {
        mountedDispatch({ type: actions[1], response, payload });
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        mountedDispatch({ type: actions[2], error, payload });
      });
  };

  return [state, thunk, mountedDispatch];
};
