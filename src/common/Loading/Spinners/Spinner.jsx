import React from "react";
import { HashLoader } from "react-spinners";

function Spinner() {
  return (
    <>
      <div className="mx-auto my-10 flex h-[500px] w-full items-center justify-center rounded-3xl bg-gray-100 dark:bg-gray-800">
        <HashLoader
          color="green"
          size={80}
        />
      </div>
    </>
  );
}

export default Spinner;
