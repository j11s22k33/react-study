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
const $emptyFn = (state) => { };
const useStateCallbackWrapper = <T extends unknown>(initialState?: T): [T, Function] => {
  const [$state, $setState] = useState(initialState);
  const $res = useRef({ effect: $emptyFn, layoutEffect: $emptyFn });

  useLayoutEffect(() => {
    $res.current.layoutEffect($state);
  }, [$state]);

  useEffect(() => {
    $res.current.effect($state);
  }, [$state]);

  function $udateState({ setState, useLayoutEffect = $emptyFn, useEffect = $emptyFn }) {
    $res.current.effect = useEffect;
    $res.current.layoutEffect = useLayoutEffect;
    $setState(setState);
  }

  return [$state, $udateState];
}

export {
  useStateCallbackWrapper
}