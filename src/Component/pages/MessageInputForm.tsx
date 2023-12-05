import { FC } from 'react'
import { Button } from '../ui/button';
import { AiOutlineSend } from 'react-icons/ai';
import Input from '../Register/Input';
type P = {
    selectUserId ?: string;
    message: string;
    setMessage: (s: string) => void;
    sendMessage: (e: any) => void;
}
const MessageInputForm: FC<P> = ({ selectUserId , sendMessage ,  message , setMessage }) => {
    if(!selectUserId){
        return <div></div>
    }
    return  <form
            className="flex items-center gap-2 p-3 bg-transparent"
            onSubmit={sendMessage}
        >
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                extraClass="flex-grow rounded-md "
                placeholder="Enter your message here"
            />
            <Button>
                <AiOutlineSend size={30} />
            </Button>
        </form>
}
export default MessageInputForm;