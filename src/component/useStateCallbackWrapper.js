import React, {
  useState, useEffect
} from "react";
import {useStateCallbackWrapper} from '../utils/common'

export default () => {
  const [cnt, updCnt] = useStateCallbackWrapper(0)
  const [cnt2, updCnt2] = useStateCallbackWrapper(10)

  useEffect(() => {
    console.log(`[component] mount`)
        
    setInterval(()=>{        
      updCnt({
        setState: state => state+1,
        useLayoutEffect: state => console.log('useLayoutEffect', state),
        useEffect: state => console.log('useEffect', state)
      })

      updCnt2({
        setState: state => state+1,
        useLayoutEffect: state => console.log('useLayoutEffect', state),
        useEffect: state => console.log('useEffect', state)
      })
    }, 1000)

    return ()=>{
      console.log(`[component] unmount`)
    }
  }, []);

  // rander()
  return (
    <div className="App">
      cnt={cnt}<br/>
      cnt2={cnt2}
    </div>
  );
};
