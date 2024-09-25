import { RealEstate } from "@/models/RealEstate";
import { UseFormReturn } from "react-hook-form";

const validatePropertyForm = ({
  form,
  data,
}: {
  form: UseFormReturn<Partial<RealEstate>, unknown, undefined>;
  data: Partial<RealEstate>;
}) => {
  let check = 0;
  const fieldsToCheck = [
    "price",
    "titleBG",
    "titleEN",
    "building",
    "propertyType",
    "sellers"
  ];

  fieldsToCheck.forEach((field) => {
    if (data[field as keyof typeof data] === undefined) {
      form.setError(field as keyof typeof data, {});
      check = 1;
    }
  });
  return check;
};

export default validatePropertyForm;
