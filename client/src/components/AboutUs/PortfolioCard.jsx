

const PortfolioCard = ({ imageUrl, image, altTitle }) => {
  return (
    <article className="flex flex-col items-center">
      <a href={imageUrl} target="_blank">
        <img
          src={image}
          alt={altTitle}
          className="w-44 h-28 object-cover object-center mb-5 hover:cursor-pointer hover:filter hover:contrast-50 transition ease-in-out duration-200"
        />
      </a>
    </article>
  );
};

export default PortfolioCard;
