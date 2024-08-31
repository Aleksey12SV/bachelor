import { getSellersWithProperties } from "@/api/sellers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Sellers = () => {
  const navigate = useNavigate();
  const { data: sellers } = useQuery({
    queryKey: ["sellersWithProperties"],
    queryFn: getSellersWithProperties,
    initialData: [],
  });
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Associated real estates</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map((seller) => (
          <TableRow key={seller.id}>
            <TableCell className="font-medium">{seller.firstName}</TableCell>
            <TableCell>{seller.lastName}</TableCell>
            <TableCell>{seller.phoneNumber}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                {seller.realEstates.map((realEstate) => (
                  <button
                    className="flex flex-row gap-4 hover:underline"
                    onClick={() => navigate(`/property-list/${realEstate.id}`)}
                  >
                    <p>
                      <b>Id:</b> {realEstate.id},

                      <b>Title:</b> {realEstate.title}
                    </p>
                  </button>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Sellers;
