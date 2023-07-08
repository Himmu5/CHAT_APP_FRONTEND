import { FC, InputHTMLAttributes } from "react";

type P = {} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<P> = (props) => {
  return (
    <input className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-400 " {...props} />
  );
};

export default Input;
