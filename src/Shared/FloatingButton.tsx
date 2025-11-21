import icon from "../images/chatbot.png";

interface FloatingButtonProps {
  onClick: () => void;
}

function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <div
      className="fixed right-22 bottom-20 z-1 flex h-[90px] w-[90px] cursor-pointer items-center justify-center rounded-[50%] bg-[#E8F1FF]"
      onClick={onClick}
    >
      <img src={icon} className="w-[68px]"></img>
    </div>
  );
}

export default FloatingButton;
