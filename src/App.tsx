import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import BookReccomend from "./Book/BookReccomend";
import ChatBot from "./ChatBot/ChatBot";
import { useState } from "react";

function App() {
  const [showChat, setShowChat] = useState(true);

  return (

//    <BrowserRouter>
//      <Routes>
//        <Route path="/" element={<MainPage />} />
//      </Routes>
//    </BrowserRouter>

    <>
      <header className="bg-[#023685] h-[105px] flex justify-center items-center ">
        <img
          src="src\images\certistageLogo.png"
          alt="logo"
          className=" h-[110px]"
        />
      </header>
      <select name="major" defaultValue="" className="w-[650px] h-[40px] ml-[250px] mt-[30px] pl-[30px] border border-[#023685] rounded">
        <option value="" disabled>전공을 선택해주세요</option>
        <option value="컴퓨터공학과">컴퓨터공학과</option>
        <option value="경영학과">경영학과</option>
      </select >
      <div>
        {showChat && (<ChatBot onClose={() => setShowChat(false)} />
        )}
      </div>
      <BookReccomend />
    </>

  );
}

export default App;
