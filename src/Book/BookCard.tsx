type BookCardProps = {
    image: string;
    title: string,
    publisher: string,
    price: string;
};

function BookCard({ image, title, publisher, price }: BookCardProps) {
    return (
        <div className="ml-[80px] mt-[30px] mb-[20px] mr-[25px]">
            {image ? (<img src={image} className="w-[100px] h-[145px] object-cover rounded-[5px] mb-[10px]" />) :
                (<div className="w-[100px] h-[145px] bg-[#D9D9D9] mb-[10px] shrink-0"></div>)}
            <p>{title}</p>
            <p className="text-xs text-gray-400"> {publisher} </p>
            <p>{price}</p>
        </div>
    );
}

export default BookCard;
