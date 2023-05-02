import { useCallback, useState } from "react";

function useToggle(defaultState: boolean = false): [boolean, any] {
  const [state, setState] = useState<boolean>(defaultState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
}

export default useToggle;
