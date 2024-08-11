import { RealEstate } from "@/models/RealEstate";
import PropertyHeader from "./PropertyHeader";
import PropertyCarousel from "./PropertyCarousel";
import { useEffect, useState } from "react";

const PropertyOverview = ({
  selectedProperty,
}: {
  selectedProperty: RealEstate;
}) => {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setHeight(entry.target.clientHeight - 16);
    });
    const mainContainer = document.querySelector("#main-container");
    if (mainContainer) {
      resizeObserver.observe(mainContainer);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full p-4 rounded-lg border border-neutral-200 overflow-auto scrollable"
      style={{ height }}
    >
      <PropertyHeader
        title={
          selectedProperty.propertyType.name +
          " - " +
          selectedProperty.description
        }
        size={selectedProperty.size}
        price={selectedProperty.price}
        priceSqM={selectedProperty.price / selectedProperty.size}
        location={selectedProperty.building.district.city.name}
      />
      <PropertyCarousel propertyId={selectedProperty.id.toString()} />
      <div>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
      </div>
      <div>
        {selectedProperty.sellers.map((seller) => seller.firstName).join(", ")}
      </div>
    </div>
  );
};

export default PropertyOverview;
