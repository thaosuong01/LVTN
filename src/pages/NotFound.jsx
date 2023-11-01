import React from "react";
import { Link } from "react-router-dom";
import { path } from "../utils/path.js";

const NotFoundPage = () => {
  return (
    <>
      <div class="h-screen w-screen flex items-center">
        <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md">
            <div>
              <img src="/../src/assets/404.jpg" alt="" />
            </div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{" "}
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to={path.HOME}
              class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent focus:outline-none focus:shadow-outline-blue bg-primary active:bg-primary hover:bg-hover"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
