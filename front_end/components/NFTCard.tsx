import Tilt from "react-parallax-tilt";
import React from "react";

interface NFTCardProps {
  imageUrl: string;
  metadata: string;
}

const NFTCard = ({ imageUrl, metadata }: NFTCardProps) => {
  return (
    <Tilt className="mt-10">
      {imageUrl == "" ? (
        <div className="h-[250px] w-full bg-primary p-[2px] border border-1 border-white rounded-lg">
          <div className="h-full w-full flex items-center justify-center">
            <div className="py-5 px-5 select-none rounded-full border-4 border-dash-array-4 border-dashed border-gray-300">
              Your NFT will show here
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[250px] w-full nft-card-gradient-border p-[2px] rounded-lg">
          <div className="w-full h-full bg-transparent overflow-hdden">
            <img
              src={imageUrl}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </Tilt>
  );
};

export default NFTCard;
