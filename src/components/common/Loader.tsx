import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className={`lg:h-[calc(100vh-248px)] md:h-[calc(100vh-60px)] h-[calc(100vh-135px)] justify-center items-center flex`}
    >
      <ClipLoader
        className={`w-5 h-5`}
        color="#333333"
        cssOverride={{}}
        loading
        size={35}
        speedMultiplier={0.7}
      />
    </div>
  );
};
export default Loader;
