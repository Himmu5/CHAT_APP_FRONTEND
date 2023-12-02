import {FC, ReactNode} from 'react'
import { withUser } from '../hoc/withUser'
import { user } from '../models/user'
import { Navigate } from 'react-router-dom'
type P = {
    user : user;
    children : ReactNode
}
const AuthRoute:FC<P> =({ user , children })=>{

    if(user){
        return <Navigate to={"/Chat"} />
    }

  return <div>
    {children}
</div>
}
export default withUser(AuthRoute);