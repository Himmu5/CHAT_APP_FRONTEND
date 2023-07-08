import { ComponentType, useContext } from "react";
import { UserContext } from "../Context/UserContext";

export function withUser(IncomingComponent: ComponentType<any>) {
  function OutgoingComponent(props: any) {
    const data = useContext(UserContext);
    return <IncomingComponent {...props} {...data} />;
  }
  return OutgoingComponent;
}
