import { Button } from "@/components/ui/button";

const PropertyControls = ({
  onDelete,
  onAdd,
  onEdit,
  hasSelectedProperty,
}: {
  onDelete: () => void;
  onAdd: () => void;
  onEdit: () => void;
  hasSelectedProperty: boolean;
}) => {
  return (
    <div className="flex flex-row sticky">
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onDelete} disabled={!hasSelectedProperty}>
        Delete
      </Button>
      <Button onClick={onEdit} disabled={!hasSelectedProperty}>
        Edit
      </Button>
    </div>
  );
};

export default PropertyControls;
