import React, { useState } from "react";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const query = new URLSearchParams(location.search);
  const template = query.get("template");
  const liteLink =
    template === "laravel"
      ? "https://github.com/cruip/laravel-tailwindcss-admin-dashboard-template"
      : "https://github.com/cruip/tailwind-dashboard-template";

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full md:bottom-8 md:right-12 md:w-auto">
          <div className="flex justify-between border border-transparent bg-gray-800 p-3 text-sm text-gray-50 shadow-lg md:rounded dark:border-gray-700/60">
            <div className="inline-flex text-gray-500">
              <a
                className="font-medium text-gray-50 hover:underline"
                href={liteLink}
                target="_blank"
                rel="noreferrer"
              >
                Download<span className="hidden sm:inline"> on GitHub</span>
              </a>{" "}
              <span className="px-1.5 italic">or</span>{" "}
              <a
                className="font-medium text-emerald-400 hover:underline"
                href="https://cruip.com/mosaic/"
                target="_blank"
                rel="noreferrer"
              >
                Check Premium Version
              </a>
            </div>
            <button
              className="ml-3 border-l border-gray-700/60 pl-2 text-gray-500 hover:text-gray-400"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-4 w-4 shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
