const cardTag = ({ tag, color, size }) => {
    return (
        <>
            <p className={`${color} ${size} w-fit px-2 py-[2px] font-semibold`}>
                {tag}
            </p>
        </>
    );
};
export default cardTag;
