import { FC } from "react";
import Avatar from "./Avatar";

type person = {
  userId: string;
  username: string;
};

type P = {
  selectUserId: string;
  person: person;
  selectUser: (s: string) => void;
};

const OnlinePerson: FC<P> = ({ selectUserId, person, selectUser }) => {
  return (
    <div
      className={
        " flex w-full text-white  text-xl  rounded-xl py-2 " +
        (selectUserId == person.userId ? " bg-indigo-700  " : "hover:bg-gray-500")
      }
    >
      
      <div
        className={" flex p-2 gap-2 items-center w-full cursor-pointer "}
        onClick={() => selectUser(person.userId)}
      >
        <Avatar username={person.username} userId={person.userId} />
        <p>{person.username}</p>
      </div>
    </div>
  );
};

export default OnlinePerson;
