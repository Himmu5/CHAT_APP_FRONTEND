import { FC } from 'react'
import { user } from '../models/user'
import OnlinePerson from '../UI-Component/OnlinePerson'
type P = {
    onlineUsers : { userId: string; username: string; }[];
    selectUserId : string;
    selectUser : (s: string) => void;
}
const OplineMapper: FC<P> = ({ onlineUsers , selectUser , selectUserId }) => {
    return <>
        {onlineUsers.map((person, id) => {
            return person?.username && (
                <>
                    <OnlinePerson
                        key={id}
                        selectUserId={selectUserId!}
                        selectUser={selectUser}
                        person={person}
                    />

                </>
            );
        })}
    </>
}
export default OplineMapper;