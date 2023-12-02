import {FC, ReactNode} from 'react'
import { withUser } from '../hoc/withUser'
import { user } from '../models/user'
import { Navigate } from 'react-router-dom'
type P = {
    user : user;
    children : ReactNode
}
const UserRoute:FC<P> =({ user , children })=>{

    if(!user){
        return <Navigate to={"/"} />
    }

  return <div>
    {children}
</div>
}
export default withUser(UserRoute);