import React, {
  useEffect, // 랜더링 후 불림
  useLayoutEffect, // 랜더링 도중 불림
  useState, // 상태값. 변경되면 리랜더링 한다
  useRef, // 참조값. 값 유지한다. 변경되어도 리랜더링 안한다
  useCallback, // 캐시 함수
  useMemo, // 캐시 변수
  useContext,
  useDebugValue,
  useImperativeHandle,
  useReducer
} from "react";
import { useParams } from "react-router";

console.log(`컴포넌트 외부`);
let extCount = 0;

// 값 유지하려면 useState, useRef 사용
export default ()=>{
  console.log(`컴포넌트 내부`);
  let localCount = 0;

  const p = useParams()
  console.log(p)

  const [tmp, setTmp] = useState(0);
  const [countState, setCountState] = useState(0); //
  const countRef = useRef(0); // Number
  const axisRef = useRef({x:1, y:2}); // Number
  const timerRef = useRef(); // setInterval
  const divRef = useRef(); // HTMLElement

  function logToString() {
    return `
      extCount: ${extCount}
      localCount: ${localCount}
      countState: ${countState}
      countRef: ${countRef.current}
      divRef: ${divRef.current}
    `
  }

  const myMemo = useMemo(() => {
    console.log(`[myMemo] called`);
    return extCount * 2;
  }, [extCount]); // countState값이 변경되었을때만 계산 후 캐시

  const doubleCountMemo = useMemo(() => {
    console.log(`[doubleCountMemo] called`);
    return countState * 2;
  }, [countState]); // countState값이 변경되었을때만 계산 후 캐시

  const threeCountCallback = useCallback((var1) => {
      console.log(`[threeCountCallback] called`);
      return countState * 3;
    }, [countState]);  // countState값이 변경되었을때만 계산 후 캐시

  useEffect(() => {
    console.log(`useEffect[] /// ` + logToString());

    timerRef.current = setInterval(() => {
      console.log(`
        -------- setInterval -------- 
      `);
      setCountState((c) => { return c + 1; });
      ++extCount;
      ++localCount;
      ++countRef.current;
      divRef.current.style.width = countRef.current + "px";

      console.log(logToString());

      // 랜더링 하려면 state값 변경이 일어나야 하기 때문에 ... 아무런 의미없는 state값 변경
      setTmp((n) => n + 1);
    }, 5000);

    return () => {
      console.log(`useEffect[] cleanUp /// ` + logToString());
      clearInterval(timerRef.current);
    };
  }, [myMemo]);

  useLayoutEffect(() => {
    console.log(`useLayoutEffect
      extCount: ${extCount}
      localCount: ${localCount}
      countState: ${countState}
      countRef: ${countRef.current}
      divRef: ${divRef.current}
    `);

    if (extCount === 3) {
      clearInterval(timerRef.current);
    }
  });

  return (
    <div className="App">
      {/* countState={countState}*/}
      extCount={extCount}<br />
      localCount={localCount}<br />
      countRef.current={countRef.current}<br />
      <div ref={divRef}></div>
    </div>
  );
}
