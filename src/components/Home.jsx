import React from "react";
import { selectUser } from "../store/user/userAuthSlice";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

function Home() {
  const user = useSelector(selectUser);
  return (
    <div className="my-48">
      {user ? (
        <h1 className="text-primary p-4 text-center text-5xl font-bold">
          <span className="shadow-primary-700 outline-primary bg-slate-800 px-12 italic shadow-xl outline">
            {`Welcome !  `}
            <span className="animate-pulse duration-700">
              {user?.user?.fullname}
            </span>
          </span>
        </h1>
      ) : (
        <h1 className="shadow-primary-700 outline-primary text-primary bg-slate-800 px-12 py-2 text-5xl font-bold shadow-xl outline">
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
      )}
    </div>
  );
}

export default Home;
