import { ScrollArea } from "@/components/ui/scroll-area";
import { RealEstate } from "@/models/RealEstate";
import PropertyHeader from "./PropertyHeader";
import PropertyCarousel from "./PropertyCarousel";

const PropertyOverview = ({
  selectedProperty,
}: {
  selectedProperty: RealEstate;
}) => {
  return (
    <ScrollArea className="w-full h-full bg-slate-300 p-4 rounded-lg border border-neutral-200">
      <PropertyHeader
        title={selectedProperty.propertyType.name + ' - ' + selectedProperty.description}
        size={selectedProperty.size}
        price={selectedProperty.price}
        priceSqM={selectedProperty.price / selectedProperty.size}
        location={selectedProperty.building.district.city.name}
      />
      <PropertyCarousel propertyId={selectedProperty.id.toString()} />
    </ScrollArea>
  );
};

export default PropertyOverview;
