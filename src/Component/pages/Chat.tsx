import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { withUser } from "../hoc/withUser";
import { user } from "../models/user";
import { Navigate } from "react-router-dom";
import Input from "../Register/Input";
import { AiOutlineSend } from "react-icons/ai";
import Button from "../Register/Button";
import Logo from "../UI-Component/Logo";
import OnlinePerson from "../UI-Component/OnlinePerson";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Message } from "../models/message";
import * as lodash from "lodash";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";

type P = {
  user: user;
};

const Chat: FC<P> = ({ user }) => {
  console.log("Users : " , user);
  const [ws, setWS] = useState<WebSocket>();
  const [message, setMessage] = useState("");
  const lastdivRef = useRef(null);

  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; username: string }[]
  >([]);

  console.log("onlineUsers ", onlineUsers);
  const [selectUserId, setSelectUserId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    connect();
  }, []);

  function connect() {
    const ws = new WebSocket("ws://localhost:1000");
    setWS(ws);

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      connect();
    });
  }

  useEffect(() => {
    const div = lastdivRef.current as any;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectUserId) {
      axios.get("/messages/" + selectUserId).then((res) => {
        const { data } = res;
        setMessages(data);
      });
    }
  }, [selectUserId]);

  function seeOnlinePeople(people: {
    online: { userId: string; username: string }[];
  }) {
    const onlinePeopleObj: {
      [key: string]: { userId: string; username: string };
    } = people["online"].reduce((prev, current) => {
      return { ...prev, [current.userId]: current };
    }, {});

    console.log(onlinePeopleObj, "onlinePeople");
    let onlinePeople = Object.keys(onlinePeopleObj).map(
      (key: string) => onlinePeopleObj[key]
    );

    onlinePeople = onlinePeople.filter((per) => per.username !== user.username);
    setOnlineUsers(onlinePeople);
  }

  function handleMessage(e: MessageEvent<any>) {
    const data = JSON.parse(e.data);
    if ("online" in data) {
      seeOnlinePeople(data);
    } else if ("text" in data) {
      setMessages((prev) => [...prev, { ...data }]);
    }
  }

  function selectUser(id: string) {
    setSelectUserId(id);
  }

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.length > 0) {
      ws?.send(
        JSON.stringify({
          recipient: selectUserId,
          text: message,
        })
      );
      setMessage("");
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          sender: user.userId,
          recipient: selectUserId!,
          _id: Date.now(),
        },
      ]);
    }
  }

  const uniqueMessages = lodash.uniqBy(messages, "_id");

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-800 shadow-xl  ">
          <Logo />

          {onlineUsers.map((person, id) => {
            return (
              <OnlinePerson
                key={id}
                selectUserId={selectUserId!}
                selectUser={selectUser}
                person={person}
              />
            );
          })}
        </div>
        <div className="bg-blue-100 w-3/4 flex flex-col bg-Chat bg-current ">
          {!selectUserId ? (
            <div className="flex-grow flex items-center justify-center gap-1 text-gray-500 ">
              <AiOutlineArrowLeft /> <p>Selected Person's Chat</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto w-full h-full max-w-3xl mx-auto ">
              <Scrollbars>
                {uniqueMessages.map((m) => {
                  return (
                    <div
                      key={m._id}
                      className={
                        " m-2 my-3  " +
                        (user.userId === m.sender
                          ? " text-right "
                          : " text-left ")
                      }
                    >
                      <div className="">
                        <div
                          className={
                            " p-2 inline-block rounded-xl shadow-2xl  " +
                            (m.sender === user.userId
                              ? " bg-blue-500 text-white "
                              : "  bg-gray-700  text-white ")
                          }
                        >
                          <p>{m.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={lastdivRef}></div>
              </Scrollbars>
            </div>
          )}
          {!!selectUserId && (
            <form
              className="flex items-center gap-2 p-3 bg-transparent"
              onSubmit={sendMessage}
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                extraClass="flex-grow rounded-md "
                placeholder="Enter your message here"
              />
              <Button>
                <AiOutlineSend size={30} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default withUser(Chat);
