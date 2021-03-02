import React, { useState, useEffect, useLayoutEffect } from "react";
import { useStateCallbackWrapper } from "../utils/common";

export default () => {
  const [cnt, updCnt] = useStateCallbackWrapper<number>(0);

  useEffect(() => {
    console.log(`----> useEffect`, cnt);
  }, [cnt]);

  useLayoutEffect(() => {
    console.log(`----> useLayoutEffect`, cnt);
  }, [cnt]);

  useEffect(() => {
    console.log(`[component] mount`);

    setInterval(() => {
      updCnt({
        setState: (state) => state + 1,
        useLayoutEffect: (state) => console.log("useLayoutEffect", state),
        useEffect: (state) => console.log("useEffect", state)
      });
    }, 1000);

    return () => {
      console.log(`[component] unmount`);
    };
  }, []);

  // rander()
  return <div className="App">cnt={cnt}</div>;
};
