import { useEffect, useState } from "react";
import BookCard from "./BookCard";

type Book = {
    id: number;
    title: string;
    author: string;
    price: number;
    thumbnailUrl: string | null;
    purchaseUrl: string;
    salesRank: number;
};

const API_BASE_URL = "https://certistage-production.up.railway.app";

async function fetchBooks(certificateId: number): Promise<Book[]> {
    const res = await fetch(
        `${API_BASE_URL}/api/textbooks?certificateId=${certificateId}`
    );

    if (!res.ok) {
        throw new Error("책 목록을 가져오지 못했습니다.");
    }

    const data = await res.json();
    console.log("받은 책 개수:", data.length);
    return data;
}

function BookReccomend() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    //  certificateId를 고정값, 나중에 select랑 연결하기
    const certificateId = 1;

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchBooks(certificateId);
                setBooks(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [certificateId]);

    if (loading) {
        return (
            <div className="ml-[15%] mt-[30px] w-[1100px] min-w-[800px] rounded-[5px] shadow-[0px_4px_2.6px_0_rgba(0,0,0,0.25)]">
                <div className="shrink-0 pt-[20px] pl-[30px] font-semibold">
                    합격 스테이지로 가는 책
                </div>
                <p className="px-[30px] py-[20px] text-sm text-gray-500">
                    추천 책 불러오는 중...
                </p>
            </div>
        );
    }

    return (
        <div className="ml-[15%] mt-[30px] w-[1100px] min-w-[800px] rounded-[5px] shadow-[0px_4px_2.6px_0_rgba(0,0,0,0.25)]">
            <div className="shrink-0 pt-[20px] pl-[30px] mb-[10px] font-semibold">
                합격 스테이지로 가는 책
            </div>

            <div className="flex overflow-hidden pl-[80px]">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        image={book.thumbnailUrl}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        purchaseUrl={book.purchaseUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookReccomend;