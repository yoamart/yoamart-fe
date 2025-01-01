import {
  Dialog,
  DialogContent,
 
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteForm from "./DeleteForm";
import AddEditProduct from "./AddEditProduct";
import AddEditCategory from "./AddEditCategory";
import { Category, Product } from "@/lib/types";

export function CustomDialog({
  open,
  onOpenChange,
  title,
  type,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  type: string;
  data: Product | Category | undefined;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger></DialogTrigger>

      <DialogContent
        className={` ${
          title === "delete" ? "sm:max-w-[400px]" : "max-w-[600px]"
        }`}
      >
        <DialogTitle></DialogTitle>
        {title === "product" && (type === "edit" || type === "add") && (
          <AddEditProduct onClose={onOpenChange} data={data} type={type} />
        )}
        {title === "category" && (type === "edit" || type === "add") && (
          <AddEditCategory onClose={onOpenChange} data={data} type={type} />
        )}
        {type === "delete" && (
          <DeleteForm title={title} onClose={onOpenChange} data={data} />
        )}
      </DialogContent>
    </Dialog>
  );
}
