import { FC, ReactNode } from "react";

type P ={
    children:ReactNode,

}

const Button:FC<P> = ({children})=>{
    return <button className="px-4 py-2 ">{children}</button>
}

export default Button;