/* eslint-disable react-hooks/rules-of-hooks */
import { FC, FormEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../Context/ChatContext';
import axios from 'axios';
import { Message } from '../models/message';
import { Navigate } from 'react-router-dom';
import { withUser } from '../hoc/withUser';
import { user } from '../models/user';
import lodash from 'lodash';
type P = {
    children: ReactNode;
    user: user
}
const ChatProvider: FC<P> = ({ children, user }) => {

    if (!user) {
        return <div>Loading...</div>
    }

    const [ws, setWS] = useState<WebSocket>();
    const [message, setMessage] = useState("");
    const lastdivRef = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState<
        { userId: string; username: string }[]
    >([]);

    const [selectUserId, setSelectUserId] = useState<string>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [gptMessages, setGptMessages] = useState<Message[]>([]);


    useEffect(() => {
        connect();
    }, []);


    useEffect(() => {
        const div = lastdivRef.current as any;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    useEffect(() => {
        if (selectUserId && selectUserId !== "GPT") {
            axios.get("/messages/" + selectUserId).then((res) => {
                const { data } = res;
                setMessages(data);
            });
        }
    }, [selectUserId]);

    // if (!user) {
    //     return <Navigate to={"/"} />;
    // }


    function connect() {
        const ws = new WebSocket("ws://localhost:1000/");
        setWS(ws);

        ws.addEventListener("message", handleMessage);
        ws.addEventListener("close", () => {
            connect();
        });
    }



    function seeOnlinePeople(people: {
        online: { userId: string; username: string }[];
    }) {
        const onlinePeopleObj: {
            [key: string]: { userId: string; username: string };
        } = people["online"].reduce((prev, current) => {
            return { ...prev, [current.userId]: current };
        }, {});

        let onlinePeople = Object.keys(onlinePeopleObj).map(
            (key: string) => onlinePeopleObj[key]
        );
        onlinePeople = onlinePeople.filter((per) => per.username !== user?.username);
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
        if (id === "GPT") {
            setMessages([]);
        }
        setSelectUserId(id);
    }

    function sendMessage(e: FormEvent<HTMLFormElement>) {
        setMessages((prev) => [...prev, { text: message, _id: Math.random(), recipient: Math.random().toString(), sender: user._id }]);
        e.preventDefault();
        if (selectUserId === "GPT") {
            axios.post("/chat", { query: message }).then((res) => {
                const { data } = res;
                const newData = { text: data.response.content as string, _id: Math.random(), recipient: Math.random().toString(), sender: Math.random().toString() }
                setMessages((prev) => [...prev, newData]);
                setMessage("");
            });
        } else {
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
                        sender: user._id,
                        recipient: selectUserId!,
                        _id: Date.now(),
                    },
                ]);
            }
        }
    }

    const uniqueMessages = lodash.uniqBy(messages, "_id");

    return <ChatContext.Provider value={{ message, user, onlineUsers, setMessage, lastdivRef, selectUser, setSelectUserId, sendMessage, uniqueMessages, selectUserId,  }} >
        {children}
    </ChatContext.Provider>
}
export default withUser(ChatProvider);