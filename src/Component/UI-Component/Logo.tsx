import { FC } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

type P = {};

const Logo: FC<P> = () => {
  return (
    <div className="flex p-2 text-white py-4 gap-1 text-lg border-b-2 border-black">
      <HiOutlineChatBubbleLeftRight size={25} />
      <div className="font-bold">Telegram clone</div>
    </div>
  );
};

export default Logo;
