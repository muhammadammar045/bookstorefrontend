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
        <>
          <div className="mt-10">
            <h1 className="p-4 text-center text-5xl font-bold text-primary">
              <span className="shadow-primary-700 bg-slate-800 px-12 italic shadow-xl outline outline-primary">
                {`Welcome !  `}
                <span className="animate-pulse duration-700">
                  {user?.user?.fullname}
                </span>
              </span>
            </h1>
            <AllBooks />
          </div>
        </>
      ) : (
        <>
          <div className="my-48">
            <h1 className="shadow-primary-700 bg-slate-800 px-12 py-2 text-5xl font-bold text-primary shadow-xl outline outline-primary">
              <span className="flex items-center justify-center italic">
                <span> Login To </span>
                <Typewriter
                  options={{
                    wrapperClassName: "text-red-400 ml-4",
                    strings: ["Read", "Add", "Update", "Delete"],
                    autoStart: true,
                    loop: true,
                  }}
                />{" "}
                <span className="ml-2"> Books</span>
              </span>
            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
