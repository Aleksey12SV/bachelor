import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ControlButtons = ({
  onDelete,
  onAdd,
  onEdit,
  onClose,
  isDisabled,
}: {
  onDelete: () => void;
  onAdd: () => void;
  onEdit: () => void;
  onClose?: () => void;
  isDisabled: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row sticky gap-4 top-0 bg-white py-2">
      <Button onClick={onAdd}>{t("add")}</Button>
      <Button onClick={onDelete} disabled={isDisabled}>
        {t("delete")}
      </Button>
      <Button onClick={onEdit} disabled={isDisabled}>
        {t("edit")}
      </Button>
      {onClose && <Button onClick={onClose}>{t("close")}</Button>}
    </div>
  );
};

export default ControlButtons;
