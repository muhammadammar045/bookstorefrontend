import React from "react";
import { selectUser } from "../store/user/userAuthSlice";
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
        <div className="my-10 flex h-screen items-center justify-center rounded-lg border-4 border-gray-800 bg-gray-200 dark:border-gray-200 dark:bg-gray-900">
          <h1 className="px-12 py-2 text-7xl font-bold text-gray-900 shadow-md shadow-sky-500 outline outline-sky-500 dark:text-sky-400 dark:shadow-sky-400 dark:outline-sky-400">
            <span className="flex items-center justify-center italic">
              <span> Login To </span>
              <Typewriter
                options={{
                  wrapperClassName: "text-red-400 ml-4 dark:text-red-300",
                  strings: ["Read", "Add", "Update", "Delete"],
                  autoStart: true,
                  loop: true,
                }}
              />{" "}
              <span className="ml-2"> Books</span>
            </span>
          </h1>
        </div>
      )}
    </>
  );
}

export default Home;
