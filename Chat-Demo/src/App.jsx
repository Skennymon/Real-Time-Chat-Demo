import { useState, useEffect } from 'react'
import './App.css'
import Chat from './assets/Components/Chat'
import { io, Socket } from 'socket.io-client'
const socket = io("http://localhost:3000/");

function App() {  
  const[messages, setMessages] = useState([""]);
  const[currentTypedMessage, setCurrentTypedMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // This prevents the page from reloading everytime we submit
    setMessages([...messages, currentTypedMessage]);
    socket.emit("updateMessage", [...messages, `User ${socket.id.charAt(0)}: ` + currentTypedMessage]);
    setCurrentTypedMessage("");
    console.log(messages);
    
  }

  socket.on("receiveArray", (dataArray) => {
    setMessages(dataArray);
  });

  useEffect(() => {
    socket.emit("getMessages");
  }, [])

  return (
    <>
      <div className='border flex flex-col items-center justify-center min-h-screen gap-7'>
        <h1 className='text-7xl font-bold'>Chat Room</h1>
        <Chat messages={messages}></Chat>
        <div className='flex flex-row gap-5'>
          <form className='gap-7 flex' onSubmit={handleSubmit}>
            <input className='border min-w-96 min-h-12 rounded-2xl' onChange={(e) => setCurrentTypedMessage(e.target.value)} value={currentTypedMessage}></input>
            <button className='bg-gray-600 min-w-20 border rounded-full hover:bg-gray-400 cursor-pointer' type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default App


