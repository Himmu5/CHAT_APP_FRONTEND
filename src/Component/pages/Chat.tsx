/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from "react";
import { withUser } from "../hoc/withUser";
import { user } from "../models/user";
import Logo from "../UI-Component/Logo";
import OnlinePerson from "../UI-Component/OnlinePerson";
import { AiOutlineArrowLeft } from "react-icons/ai";
import MessagesMapper from "./MessagesMapper";
import MessageInputForm from "./MessageInputForm";
import OnlineMapper from "./OnlineMapper";
import { Message } from "../models/message";
import { withChat } from "../hoc/withChat";


type P = {
  user: user;
  selectUser: (id: string) => void;
  selectUserId: string;
  onlineUsers: user[]
  uniqueMessages: Message[];
  lastdivRef : React.MutableRefObject<any>;
  sendMessage : (e : any)=>void;
  message : string;
  setMessage : (a:string)=>void;
};

const Chat: FC<P> = ({ user, selectUser, selectUserId , onlineUsers ,uniqueMessages , lastdivRef , sendMessage , message , setMessage}) => {

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-800 shadow-xl  flex flex-col justify-between">
          <div>
            <Logo />

            <OnlineMapper selectUser={selectUser} selectUserId={selectUserId!} onlineUsers={onlineUsers} />
          </div>
          <div className="my-2 text-sm">
            <OnlinePerson
              key={"GPT"}
              selectUserId={"GPT"}
              selectUser={selectUser}
              person={{ userId: "GPT", username: "GPT" }}
            />
          </div>
        </div>
        <div className="bg-blue-100 w-3/4 flex flex-col bg-current ">
          {!selectUserId ? (
            <div className="flex-grow flex items-center justify-center gap-1 text-gray-500 ">
              <AiOutlineArrowLeft /> <p>Selected Person's Chat</p>
            </div>
          ) : (
            <MessagesMapper user={user} uniqueMessages={uniqueMessages} lastdivRef={lastdivRef} />
          )}

          <MessageInputForm sendMessage={sendMessage} message={message} setMessage={setMessage} selectUserId={selectUserId} />

        </div >
      </div >
    </>
  );
};

export default withChat(Chat);
