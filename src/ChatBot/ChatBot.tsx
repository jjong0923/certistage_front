import chatBg from "../images/chatbot.png";
import sendBtn from "../images/sendBtn.png";
import { useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react";

type ChatBotProps = {
    onClose: () => void;
};

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
};

function ChatBot({ onClose }: ChatBotProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const addBotReply = (userText: string) => {
        const reply = `"${userText}"라고 보내셨습니다.`;
        const botMsg: Message = {
            id: Date.now() + 1,
            text: reply,
            sender: "bot",
        };
        setMessages((prev) => [...prev, botMsg]);
    };

    const sendMessage = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg: Message = {
            id: Date.now(),
            text: trimmed,
            sender: "user"
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        addBotReply(trimmed);
    };


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sendMessage();
    }

    return (
        <div className="w-[550px] h-[550px] mt-[40px] ml-[50px] rounded shadow-[0_4px_5px_2px_rgba(0,0,0,0.15)] mb-[80px]">
            <header className="h-[90px] bg-[#E8F1FF] rounded pt-[10px] pl-[15px] pr-[15px] shadow-[0_4px_5px_2px_rgba(0,0,0,0.15)] flex justify-between items-start">
                <div>
                    <p className="text-2xl font-semibold">써티</p>
                    <p className="text-sm mt-[5px]">AI 챗봇 써티에게 무엇이든 물어보세요</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold mr-[25px] mt-[20px]"
                >
                    ✕
                </button>
            </header>


            <div
                style={{
                    backgroundImage: `url(${chatBg})`, backgroundSize: "300px 300px"
                }}
                className="h-[460px] bg-cover bg-no-repeat bg-center rounded-b relative flex flex-col"
            >
                <div className="flex-1 px-4 py-10 overflow-y-auto space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={
                                msg.sender === "user"
                                    ? "flex justify-end"
                                    : "flex justify-start"
                            }
                        >
                            <div
                                className={"max-w-[70%] px-3 py-3 text-sm rounded-2xl " +
                                    (msg.sender === "user"
                                        ? "bg-[#E8F1FF] rounded-br-sm"
                                        : "bg-white border border-[#7B95BD] rounded-bl-sm")}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative bottom-4 left-0 w-full px-4">
                    <div className="bg-white px-4 py-3 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요..."
                                value={input}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400" />
                            <button
                                onClick={handleClick}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <img src={sendBtn} alt="send" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChatBot;