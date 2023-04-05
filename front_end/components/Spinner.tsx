import React from "react";

const Spinner = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 128 128"
      >
        <circle cx="64" cy="64" r="63.31" fill="#ffffff" />
        <g>
          <path
            d="M3.13 44.22a64 64 0 1 0 80.65-41.1 64 64 0 0 0-80.65 41.1zm34.15-4.83a10.63 10.63 0 1 1-13.4 6.8 10.63 10.63 0 0 1 13.4-6.8zm7.85 82.66A61.06 61.06 0 0 1 5.7 45.86 30.53 30.53 0 0 0 64 64a30.53 30.53 0 0 1 58.3 18.12l.35-1.14-.58 1.9a61.06 61.06 0 0 1-76.94 39.2zM106.9 73.2A10.63 10.63 0 1 0 93.5 80a10.63 10.63 0 0 0 13.4-6.8z"
            fill="#000000"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="-360 64 64"
            dur="2700ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
