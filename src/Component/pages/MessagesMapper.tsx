import { FC } from 'react'
import Scrollbars from 'react-custom-scrollbars-2';
import { Message } from '../models/message';
import { user } from '../models/user';
type P = {
    uniqueMessages : Message[];
    user : user;
    lastdivRef : React.MutableRefObject<null>;
}
const MessagesMapper: FC<P> = ({ uniqueMessages , user , lastdivRef}) => {
    return <div className=" flex-grow overflow-y-auto  w-full h-full max-w-3xl mx-auto ">

        <Scrollbars>
            {uniqueMessages.map((m) => {
                return (
                    <div
                        key={m._id}
                        className={
                            " m-2 my-3  " +
                            (user._id === m.sender
                                ? " text-right "
                                : " text-left ")
                        }
                    >
                        <div className="">
                            <div
                                className={
                                    " p-2 inline-block rounded-xl shadow-2xl max-w-xs  " +
                                    (m.sender === user._id
                                        ? " bg-blue-500 text-white "
                                        : "  bg-gray-700  text-white ")
                                }
                            >
                                {m.text}
                            </div>
                        </div>

                    </div>
                );
            })}
            <div ref={lastdivRef}></div>
        </Scrollbars>
    </div>
}
export default MessagesMapper;