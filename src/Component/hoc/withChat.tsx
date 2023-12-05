import { ComponentType, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

export function withChat(IncomingComponent: ComponentType<any>) {
  function OutgoingComponent(props: any) {
    const data = useContext(ChatContext);
    return <IncomingComponent {...props} {...data} />;
  }
  return OutgoingComponent;
}
