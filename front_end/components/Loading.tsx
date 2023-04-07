import React from "react";
import Spinner from "./Spinner";

const Loading = ({ title }: { title: string }) => {
  return (
    <div className="mt-5 flex items-center gap-2">
      <div className="w-8 h-8">
        <Spinner />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default Loading;
