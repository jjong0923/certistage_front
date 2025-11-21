import BookCard from "./BookCard";

function BookReccomend() {
  return (
    <div className="ml-[50px] w-[1100px] min-w-[800px] rounded-[5px] shadow-[0px_4px_2.6px_0_rgba(0,0,0,0.25)]">
      <div className="shrink-0 pt-[20px] pl-[30px] font-semibold">
        합격 스테이지로 가는 책
      </div>
      <div className="flex overflow-hidden">
        <BookCard image="" title="책이름1" publisher="출판사" price="11111원" />
        <BookCard image="" title="책이름1" publisher="출판사" price="11111원" />
        <BookCard image="" title="책이름1" publisher="출판사" price="11111원" />
        <BookCard image="" title="책이름1" publisher="출판사" price="11111원" />
        <BookCard image="" title="책이름1" publisher="출판사" price="11111원" />
      </div>
    </div>
  );
}

export default BookReccomend;
