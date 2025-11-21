import { PureComponent } from "react";

type BookCardProps = {
    image?: string | null;
    title: string;
    author: string;
    price: number;
    purchaseUrl: string;
};

function BookCard({ image, title, author, price }: BookCardProps) {
    return (
        <a
            href='{PureComponent}'
            target="_blank"
        >
            <div className="mt-[30px] mb-[20px] mr-[25px]">
                {image ? (<img src={image} className="w-[100px] h-[145px] object-cover rounded-[5px] mb-[10px]" />) :
                    (<div className="w-[100px] h-[145px] bg-[#D9D9D9] mb-[10px] shrink-0"></div>)}
                <p className="w-[250px]">{title}</p>
                <p className="text-xs text-gray-400"> {author} </p>
                <p>{price.toLocaleString()}원</p>
            </div>
        </a>

    );
}

export default BookCard;
