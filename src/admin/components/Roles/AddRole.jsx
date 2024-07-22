import React from "react";
import { Button, Input } from "../../../components/AllComponents";

function AddRole() {
  return (
    <>
      <div class="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add Role
        </h5>
        {/* <Input /> */}
        <div className="mt-4">
          {/* <Button
            type="submit"
            bgColor="outline-none hover:bg-primary"
            padding="px-5 py-2"
            rounded="rounded-lg"
            textColor="text-primary hover:text-black"
            className="shadow-lg outline dark:outline-cyan-600 dark:hover:shadow-primary"
          >
            Add Role
          </Button> */}
        </div>
      </div>
    </>
  );
}

export default AddRole;
