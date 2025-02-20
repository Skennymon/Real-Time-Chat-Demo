export default function Chat({ messages }) {
    return(
        <div className='border min-w-[50%] min-h-80 max-h-80 flex flex-col overflow-auto pl-1.5 gap-2'>
            {messages.map((message, index) => (
                <h1 key={index}>{message}</h1>
            ))}
        </div>
    )
}