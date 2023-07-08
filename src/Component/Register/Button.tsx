import { ButtonHTMLAttributes, FC } from "react";

type P = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<P> = ({ children , ...rest }) => {
  return (
    <button {...rest} className=" bg-indigo-500 hover:bg-indigo-600 px-2 py-1 text-white rounded-md ">
      {children}
    </button>
  );
};

export default Button;
