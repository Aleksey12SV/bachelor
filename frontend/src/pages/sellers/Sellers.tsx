import { deleteSeller, getSellersWithProperties } from "@/api/sellers";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import ControlButtons from "@/components/common/ControlButtons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExtendedSeller } from "@/models/Seller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellersUpdateOverview from "./SellersUpdateOverview";
import { toast } from "@/hooks/use-toast";

const Sellers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedSeller, setSelectedSeller] = useState<ExtendedSeller>();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: sellers } = useQuery({
    queryKey: ["sellersWithProperties"],
    queryFn: getSellersWithProperties,
    initialData: [],
  });
  const { hasRole } = useKeycloak();
  const deleteSellerMutation = useMutation({
    mutationFn: async () => {
      if (selectedSeller?.id) {
        await deleteSeller(selectedSeller.id).catch(() =>
          toast({
            title: "Deleting Error",
            description:
              "The seller is associated with some real estates. Please remove him from the real estates first.",
          })
        );
        await queryClient.invalidateQueries({
          queryKey: ["sellersWithProperties"],
        });
      }
    },
  });

  return (
    <div className="flex-auto flex flex-col p-4 gap-4 scrollable">
      {hasRole([Roles.ADMIN]) && (
        <ControlButtons
          onDelete={() =>
            deleteSellerMutation
              .mutateAsync()
              .then(() => setSelectedSeller(undefined))
          }
          isDisabled={!selectedSeller}
          onAdd={() => {
            setIsEditing(false);
            setIsAdding(true);
            setSelectedSeller(undefined);
          }}
          onEdit={() => {
            setIsEditing(true);
            setIsAdding(false);
          }}
          onClose={
            isAdding || isEditing
              ? () => {
                  setIsAdding(false);
                  setIsEditing(false);
                }
              : undefined
          }
        />
      )}
      {(isAdding || isEditing) && (
        <SellersUpdateOverview
          onSubmit={() => {
            setIsAdding(false);
            setIsEditing(false);
          }}
          selectedSeller={isAdding ? undefined : selectedSeller}
          isEditing={isEditing}
        />
      )}
      <Table>
        <TableCaption>A list of all sellers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Associated real estates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller) => (
            <TableRow
              key={seller.id}
              className={selectedSeller?.id === seller.id ? "bg-slate-300" : ""}
              onClick={() => setSelectedSeller(seller)}
            >
              <TableCell className="font-medium">{seller.firstName}</TableCell>
              <TableCell>{seller.lastName}</TableCell>
              <TableCell>{seller.phoneNumber}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  {seller.realEstates.map((realEstate) => (
                    <div key={realEstate.id}>
                      <button
                        className="flex flex-row hover:underline"
                        onClick={() =>
                          navigate(`/property-list/${realEstate.id}`)
                        }
                      >
                        <p className="font-medium pr-1">Id:</p> {realEstate.id},
                        <p className="font-medium pl-1">Title:</p>
                        <p className="pl-1">{realEstate.title}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Sellers;
