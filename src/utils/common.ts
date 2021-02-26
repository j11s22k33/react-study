import { useEffect, useLayoutEffect, useRef, useState } from "react"

/**
 * @returns [state, setState, cbRef]
 * @param initVal 
 */

interface UseStateCallbackList {
  effect: Function;
  layoutEffect: Function;
}

const useStateCallbackWrapper = (initVal:any):[any, React.Dispatch<any>, React.MutableRefObject<UseStateCallbackList>] => {
  const [state, setState] = useState(initVal)
  const cbRef = useRef<UseStateCallbackList>({ effect: null, layoutEffect: null })

  useLayoutEffect(() => {
    cbRef.current.layoutEffect?.(state)
  }, [state])

  useEffect(() => {
    cbRef.current.effect?.(state)
  }, [state])
  
  return [state, setState, cbRef]
}
export {
  useStateCallbackWrapper
}