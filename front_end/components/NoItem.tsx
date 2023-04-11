import React from "react";

const NoItem = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-12">
            No NFT found.
          </p>
          <p className="md:text-lg lg:text-xl mt-8">
            Sorry, there is no NFT listed now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoItem;
