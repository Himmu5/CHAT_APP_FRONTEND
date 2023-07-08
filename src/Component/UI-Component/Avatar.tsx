import { FC } from "react";

type P = {
  username: string;
  userId?: string;
};

const Avatar: FC<P> = ({ username }) => {
  return (
    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center ">
      <div className="w-full text-center">{username.charAt(0) || "H"}</div>
    </div>
  );
};

export default Avatar;
