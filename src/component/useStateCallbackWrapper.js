import React, {
  useState, useEffect
} from "react";
import {useStateCallbackWrapper} from '../utils/common'

export default () => {
  const [cnt, setCnt, cb] = useStateCallbackWrapper(0)
  const [cnt2, setCnt2, cb2] = useStateCallbackWrapper(10)

  useEffect(() => {
    console.log(`[component] mount`)
    
    
    setInterval(()=>{
      cb.current.effect = state => {
        console.log(`effect`, state)
      }
      cb2.current.effect = state => {
        console.log(`effect2`, state)
      }
      setCnt(c=>c+1)
      setCnt2(c=>c+1)
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
