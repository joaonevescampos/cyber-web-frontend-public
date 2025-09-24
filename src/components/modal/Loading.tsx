// components/Loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-10 w-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
