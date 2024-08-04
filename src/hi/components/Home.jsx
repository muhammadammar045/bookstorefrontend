import React from "react";
import { selectUser } from "@store/user/userAuthSlice";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { AllBooks } from "./AllComponents";

function Home() {
  const user = useSelector(selectUser);

  return (
    <>
      {user ? (
        <div>
          <AllBooks />
        </div>
      ) : (
        <div className="bg-gray-200dark:bg-gray-900 mt-10 flex h-[412px] items-center justify-center rounded-lg">
          <h1 className="px-12 py-2 text-7xl font-bold text-gray-900 shadow-md shadow-sky-500 outline outline-sky-500 dark:text-sky-400 dark:shadow-sky-400 dark:outline-sky-400">
            <span className="flex items-center justify-center italic">
              <span> Login To </span>
              <Typewriter
                options={{
                  wrapperClassName: "text-red-400 ml-4 dark:text-red-300",
                  strings: [
                    "Read Books ",
                    "Add Books",
                    "Update Books",
                    "Delete Books",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />{" "}
            </span>
          </h1>
        </div>
      )}
    </>
  );
}

export default Home;
