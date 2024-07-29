const PropertyHeader = ({
  title,
  location,
  price,
  priceSqM,
  size,
}: {
  title: string;
  location: string;
  size: number;
  price: number;
  priceSqM: number;
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <h3>{title}</h3>
        <span>{location}</span>
      </div>
      <div>{size}</div>
      <div className="flex flex-col">
        <span>{price}</span>
        <span>{priceSqM}</span>
      </div>
    </div>
  );
};

export default PropertyHeader;
