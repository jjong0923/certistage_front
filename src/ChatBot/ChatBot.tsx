import chatBg from "../images/chatbot.png";
import sendBtn from "../images/sendBtn.png";
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

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
      sender: "user",
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
  };

  return (
    <div className="h-[520px] w-[550px] rounded-3xl shadow-[0_4px_5px_2px_rgba(0,0,0,0.15)]">
      <header className="flex h-[90px] items-start justify-between rounded bg-[#E8F1FF] pt-[10px] pr-[15px] pl-[15px] shadow-[0_4px_5px_2px_rgba(0,0,0,0.15)]">
        <div>
          <p className="text-2xl font-semibold">써티</p>
          <p className="mt-[5px] text-sm">
            AI 챗봇 써티에게 무엇이든 물어보세요
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-[20px] mr-[25px] text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </header>

      <div
        style={{
          backgroundImage: `url(${chatBg})`,
          backgroundSize: "300px 300px",
        }}
        className="relative flex h-[460px] flex-col rounded-b bg-cover bg-center bg-no-repeat"
      >
        <div className="flex-1 space-y-2 overflow-y-auto px-4 py-10">
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
                className={
                  "max-w-[70%] rounded-2xl px-3 py-3 text-sm " +
                  (msg.sender === "user"
                    ? "rounded-br-sm bg-[#E8F1FF]"
                    : "rounded-bl-sm border border-[#7B95BD] bg-white")
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="relative bottom-11 left-0 w-full px-4">
          <div className="rounded-full bg-white px-4 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full rounded-full border border-gray-300 px-4 py-2 pr-12 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              />
              <button
                onClick={handleClick}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                <img src={sendBtn} alt="send" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
