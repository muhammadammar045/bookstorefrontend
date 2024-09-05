import React from "react";
import { selectUser } from "@storeVars";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { AllProducts } from "@userComponents";
import { Heading } from "@commonPartials";

function Home() {
  const user = useSelector(selectUser);

  return (
    <>
      {user ? (
        <div>
          <AllProducts />
        </div>
      ) : (
        <div className="flex h-[71dvh] items-center justify-center rounded-lg bg-white dark:bg-gray-900">
          <Heading>
            <span className="flex items-center justify-center italic">
              <span> Login To </span>
              <Typewriter
                options={{
                  wrapperClassName: "text-red-400 ml-4 dark:text-red-300",
                  strings: [
                    "View Products ",
                    "Add Products",
                    "Update Products",
                    "Delete Products",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />{" "}
            </span>
          </Heading>
        </div>
      )}
    </>
  );
}

export default Home;
