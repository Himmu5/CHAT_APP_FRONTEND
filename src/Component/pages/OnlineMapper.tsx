import { FC } from 'react'
import { user } from '../models/user'
import OnlinePerson from '../UI-Component/OnlinePerson'
import { withUser } from '../hoc/withUser';
type P = {
    onlineUsers : { userId: string; username: string; }[];
    selectUserId : string;
    selectUser : (s: string) => void;
    user:any
}
const OplineMapper: FC<P> = ({ onlineUsers , selectUser , selectUserId, user }) => {
    return <>
        {onlineUsers.map((person, id) => {
            return person?.username && user._id != person.userId && (
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
export default withUser(OplineMapper);