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
import { useTranslation } from "react-i18next";

const Sellers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedSeller, setSelectedSeller] = useState<ExtendedSeller>();
  const {
    t,
    i18n: { language },
  } = useTranslation();
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
            title: t("deleteError"),
            description: t("associatedPropertiesToSellerError"),
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
        <TableCaption>{t("listSellers")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("firstName")}</TableHead>
            <TableHead>{t("lastName")}</TableHead>
            <TableHead>{t("phoneNumber")}</TableHead>
            <TableHead>{t("associatedRealEstates")}</TableHead>
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
                        <p className="font-medium pr-1">{t('id')}:</p> {realEstate.id},
                        <p className="font-medium pl-1">{t('title')}:</p>
                        <p className="pl-1">
                          {language === "en"
                            ? realEstate.titleEN
                            : realEstate.titleBG}
                        </p>
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
