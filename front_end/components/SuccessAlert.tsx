import React from "react";

const SuccessAlert = ({
  isFailure,
  description,
}: {
  isFailure: boolean;
  description: string;
}) => {
  return (
    <div className="mt-5 w-fit mx-auto">
      <div
        className={`flex p-2 lg:p-3 text-sm  ${
          isFailure
            ? "text-red-800 border border-red-300 rounded-lg bg-transparent bg-red-50  dark:text-red-400 dark:border-red-800"
            : "text-green-800 border border-green-300 rounded-lg bg-transparent bg-green-50  dark:text-green-400 dark:border-green-800"
        }`}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only"></span>
        <div>
          <span className="font-medium">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
