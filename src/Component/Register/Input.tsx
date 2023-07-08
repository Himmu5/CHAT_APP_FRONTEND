import { FC, InputHTMLAttributes } from "react";

type P = {
  extraClass?:string
} & InputHTMLAttributes<HTMLInputElement>

const Input: FC<P> = ({placeholder , extraClass , ...rest}) => {
  return (<input placeholder={placeholder} {...rest} className={"px-4 py-2 border focus:border-indigo-500 focus:outline-none "+extraClass }  />);
};

export default Input;
