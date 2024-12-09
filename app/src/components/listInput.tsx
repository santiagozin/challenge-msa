import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { memo } from "react";

interface ListInputProps {
  itemId: string;
  getErrorMessage: (id: string) => string;
}

const ListInput = memo(({ itemId, getErrorMessage }: ListInputProps) => {
  const { register, formState: { errors } } = useFormContext();
    
  return (
    <div className="relative w-full">
      <Input
        type="number"
        placeholder="0"
        className="w-full"
        {...register(`listValues.list.${itemId}.value`)}
      />
      {errors && getErrorMessage(itemId) && (
        <span className="text-sm text-red-500 mt-1 absolute left-0 bottom-[-20px]">
          {getErrorMessage(itemId)}
        </span>
      )}
    </div>
  );
});

ListInput.displayName = "ListInput";

export default ListInput;