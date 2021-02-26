import React, {
  useEffect, // 랜더링 후 불림
  useLayoutEffect, // 랜더링 도중 불림
  useState, // DOM update 및 useEffect,useLayoutEffect 호출. 변경된 state 값은 useEffect,useLayoutEffect,rander() 에서 확인가능
  useRef // rander() 제외 변경된값 바로 적용.
} from "react";

export default () => {
  console.log(`[component]`);
  
  const el = useRef()
  const timer = useRef({
    id: 0,
    repeatTime: 3000,
    cnt: 0,
    limitCnt: 3
  });
  const [tmp, setTmp] = useState(0);

  /*
    state 변경되어야 불린다
    rander() -> DOM update -> useEffect
  */
  useEffect(() => {
    console.log(`[useEffect] timer.current.cnt=${timer.current.cnt}`, el.current.innerHTML);
  }, [timer.current.cnt]);

  /*
    state 변경되어야 불린다
    rander() -> useLayoutEffect -> DOM update
  */
  useLayoutEffect(() => {
    console.log(`[useLayoutEffect] timer.current.cnt=${timer.current.cnt}`, el.current.innerHTML);
  }, [timer.current.cnt]);

  useEffect(() => {
    console.log(`[component] mount`)
    
    timer.current.id = setInterval(() => {
      console.log(`[interval] timer.current.cnt=${timer.current.cnt}`, el.current);

      if (++timer.current.cnt === timer.current.limitCnt) {
        clearInterval(timer.current.id);
        setTmp((c) => c + 1);
      }
    }, timer.current.repeatTime);

    return ()=>{
      console.log(`[component] unmount`)
    }
  }, []);

  // rander()
  return (
    <div className="App">
      <div ref={el}>timer.current.cnt: {timer.current.cnt}</div>
    </div>
  );
};
