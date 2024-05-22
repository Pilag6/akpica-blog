/* eslint-disable react/prop-types */
const CategoryImgCard = ({ Bgimage, title }) => {
    return (
        <>
            <article
                className="flex justify-center items-center text-center w-[48%] md:w-[290px] h-[130px] "
                style={{
                    backgroundImage: `url(${Bgimage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="bg-gradient-to-t from-akpica-black/90 to-akpica-black/10 w-full h-full flex justify-center items-center">
                    <h3 className="text-white text-xl font-[700] font-akpica-heading tracking-wide">
                        {title}
                    </h3>
                </div>
            </article>
        </>
    );
};
export default CategoryImgCard;
