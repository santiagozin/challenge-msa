import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Armchair } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const CountSeats = ({ setSteps }: { setSteps: (steps: number) => void }) => {
  const { register, formState: { errors }, watch } = useFormContext();

  const totalSeats = watch("totalSeats");
  
  const renderSeats = (): JSX.Element => {
    const numSeats: number = Math.min(Number(totalSeats) || 1, 300);
    const asientosAMostrar = Math.min(6, numSeats);

    return (
      <motion.div
        key="seats-group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 bg-slate-100 rounded-lg p-2"
      >
        {[...Array(asientosAMostrar)].map((_, index) => (
          <Armchair
            key={index}
            size={35}
            className="border-b border-slate-500 text-slate-700"
          />
        ))}
        {numSeats > 6 && (
          <span className="flex items-center text-slate-600">
            <Plus size={16} />
            {numSeats - 6}
          </span>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-start mx-auto w-full h-72 max-w-96 justify-start relative">
        <div className="flex flex-col items-center gap-2 w-full">
          <h2 className="font-normal text-2xl text-center">Escaños a disputarse</h2>
          <div className="flex mb-4 p-6 rounded-lg flex-wrap justify-center">
            <AnimatePresence>{renderSeats()}</AnimatePresence>
          </div>
        </div>
        <div className="relative">
        <Label htmlFor="totalSeats" className="text-md">
          Ingrese la cantidad total a disputarse (máximo 300)
        </Label>
        <Input
          id="totalSeats"
          type="number"
          min="1"
          max="300"
          placeholder="100"
          className={`mt-1 no-arrows text-lg ${
            errors.totalSeats ? "border-red-500" : ""
          }`}
          aria-label="Cantidad de escaños"
          {...register("totalSeats", {
            valueAsNumber: true,
            required: true,
            min: 1,
            max: 300
          })}
        />
        {errors.totalSeats && (
          <span className="text-sm text-red-500 mt-1 absolute bottom-[-20px] left-0">
              {errors.totalSeats?.message as string}
            </span>
          )}
        </div>
         <Button className="bg-slate-700 text-white max-w-96 mx-auto w-full mt-10 hover:border-slate-700" disabled={!totalSeats} onClick={() => setSteps(2)}>Continuar</Button>
      </div>
     
    </>
  );
};

export default CountSeats;
