import { FC } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { SlOptionsVertical } from "react-icons/sl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Component/ui/popover"
import { Button } from "../ui/button";
import { withUser } from "../hoc/withUser";

type P = {
  removeUser:()=>void
};

const Logo: FC<P> = ({ removeUser }) => {
  return (
    <div className="flex p-2 text-white py-4 gap-1 items-center justify-between text-lg border-b-2 border-black">
      <div className="flex items-center gap-1">
        <HiOutlineChatBubbleLeftRight size={25} />
        <div className="font-bold">Chat AI</div>
      </div>
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <Button variant={"outline"} className=""  ><SlOptionsVertical size={20} /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-full cursor-pointer " onClick={removeUser}>
          Log Out
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default withUser(Logo);
