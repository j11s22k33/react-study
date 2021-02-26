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
const useStateCallbackWrapper = (initialState:any):[any, Function] => {
  const [_state, _setState] = useState(initialState)
  const _ref = useRef({ effect: null, layoutEffect: null })

  useLayoutEffect(() => {
    _ref.current.layoutEffect?.(_state)
  }, [_state])

  useEffect(() => {
    _ref.current.effect?.(_state)
  }, [_state])

  function _udateState({setState, useLayoutEffect, useEffect}) {
    _ref.current.effect = useEffect
    _ref.current.layoutEffect = useLayoutEffect
    _setState(setState)
  }
  
  return [_state, _udateState]
}

export {
  useStateCallbackWrapper
}