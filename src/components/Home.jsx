import React from "react";
import { selectUser } from "../store/user/userAuthSlice";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

function Home() {
  const user = useSelector(selectUser);
  return (
    <div className="my-48">
      {user ? (
        <h1 className="p-4 text-center text-5xl font-bold text-white">
          <span className="bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
            {`Welcome ! ${user?.user?.fullname}`}
          </span>
        </h1>
      ) : (
        <h1 className="p-4 text-5xl font-bold text-white">
          <span className="flex items-center justify-center bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
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
