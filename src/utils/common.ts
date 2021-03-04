import { useEffect, useLayoutEffect, useRef, useState } from "react"

/**
 * ```
 * // 예제
 * const [cnt, updateCnt] = useStateCallbackWrapper(0)
 *
 * updateCnt({
 *    setState: oldState => oldState+1,
 *    useLayoutEffect: newState => console.log(newState),
 *    useEffect: newState => console.log(newState)
 * })
 *
 * ```
 * @param initialState
 * @returns [state, updateState]
 */
const _emptyFn = state => { };
const useStateCallbackWrapper = <T extends unknown>(initialState?: T): [T, Function] => {
  const [_state, _setState] = useState(initialState);
  const _ref = useRef({ effect: _emptyFn, layoutEffect: _emptyFn });

  useLayoutEffect(() => {
    _ref.current.layoutEffect(_state);
  }, [_state]);

  useEffect(() => {
    _ref.current.effect(_state);
  }, [_state]);

  function _udateState({ setState, useLayoutEffect = _emptyFn, useEffect = _emptyFn }) {
    _ref.current.effect = useEffect;
    _ref.current.layoutEffect = useLayoutEffect;
    _setState(setState);
  }

  return [_state, _udateState];
}

export {
  useStateCallbackWrapper
}