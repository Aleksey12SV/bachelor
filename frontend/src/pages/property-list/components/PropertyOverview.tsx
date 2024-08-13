import { RealEstate } from "@/models/RealEstate";
import PropertyHeader from "./PropertyHeader";
import PropertyCarousel from "./PropertyCarousel";

const PropertyOverview = ({
  selectedProperty,
}: {
  selectedProperty: RealEstate;
}) => {
  return (
    <div className="flex flex-col w-full p-4 rounded-lg border border-neutral-200 overflow-auto scrollable flex-auto">
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
        bibendum magna libero turpis. Pellentesque lacus id aenean duis        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien sapien

        <var>        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien</var>

        v

        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v

        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapien
        v
        Lorem ipsum odor amet, consectetuer adipiscing elit. Nec iaculis
        eleifend fringilla ipsum curabitur accumsan dictumst. Eleifend volutpat
        bibendum magna libero turpis. Pellentesque lacus id aenean duis sapienv
        
      </div>
      <div>
        {selectedProperty.sellers.map((seller) => seller.firstName).join(", ")}
      </div>
    </div>
  );
};

export default PropertyOverview;
