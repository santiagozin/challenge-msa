import { useFormContext, FieldErrors } from "react-hook-form";
import { Input } from "./ui/input";
import { FileUser, Info } from "lucide-react";
import { IFormInputs } from "@/types/generic";
import { Button } from "./ui/button";
import { getLists } from "@/services/api";
import { useEffect, useState } from "react";
import { ListItem } from "@/types/generic";


type ColorMapType = {
  [key in
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "orange"
    | "pink"
    | "gray"
    | "brown"
    | "black"]: string;
};

const CountList = ({ setSteps }: { setSteps: (step: number) => void }) => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext<IFormInputs>();

  const listValues = watch("listValues.list") || {};

  const [lists, setLists] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      const dataList = await getLists();

      setLists(dataList);
    };
    fetchLists();
  }, []);

  const total = Object.values(listValues).reduce(
    (sum: number, item: { value?: number }) => {
      return sum + (Number(item?.value) || 0);
    },
    0
  );

  const colorMap: ColorMapType = {
    red: "bg-gradient-to-r from-red-400 to-red-800",
    blue: "bg-gradient-to-r from-sky-400 to-blue-800",
    green: "bg-gradient-to-r from-emerald-300 to-emerald-700",
    yellow: "bg-gradient-to-r from-amber-200 to-yellow-500",
    purple: "bg-gradient-to-r from-violet-400 to-violet-600",
    orange: "bg-gradient-to-r from-orange-300 to-amber-600",
    pink: "bg-gradient-to-r from-pink-300 to-rose-400",
    gray: "bg-gradient-to-r from-gray-300 to-gray-400",
    brown: "bg-gradient-to-r from-amber-500 to-amber-800",
    black: "bg-gradient-to-r from-zinc-500 to-zinc-800",
  };

  const getListError = (itemId: number) => {
    const fieldTouched = touchedFields?.listValues?.list?.[itemId]?.value;
    const error = (errors as FieldErrors<IFormInputs>)?.listValues?.list?.[itemId]?.value;
    return fieldTouched ? error : undefined;
  };

  return (
    <div>
      <h2 className="font-medium text-2xl text-center border-b border-slate-200 pb-4 bg-">
        Listas de candidatos
      </h2>
      <div className="mt-4 text-center"></div>
      <span>Ingrese la cantidad de votos de cada lista</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {lists.length > 0 ? lists.map((item) => (
          <div
            key={item.id}
            className={`shadow-md p-4 rounded-lg gap-4 ${
              colorMap[item.color as keyof ColorMapType] || "bg-gray-300"
            } min-h-48 flex flex-col relative`}
          >
            <div className="relative text-white">
              <FileUser size={25} className="absolute top-[0px] left-0" />
              <h3 className="font-bold text-xl text-md mb-2">{item.name}</h3>
            </div>
            <span className="text-white">Cantidad de votos</span>
            <Input
              type="number"
              placeholder="0"
              min={0}
              className={`w-full ${
                getListError(item.id) ? "border-red-500 border-2" : ""
              }`}
              {...register(`listValues.list.${item.id}.value`, {
                valueAsNumber: true,
                required: "Este campo es requerido",
                min: {
                  value: 0,
                  message: "No puede ser negativo",
                },
              })}
            />
            {getListError(item.id) && (
                <>
    
              <div className="text-sm text-white mt-1 absolute bottom-[10px] left-3 flex items-center ">
              <Info size={16} />
                <span className="ml-1">{getListError(item.id)?.message}</span>
              </div>
              </>
            )}
          </div>
        )) : <span>No hay listas disponibles</span>}
      </div>
      <p className="text-xl font-semibold mb-4 text-slate-700 mt-8 border-t border-slate-200 pt-4">
        Total de votos: {total}
      </p>
      <div className="flex gap-4">
      <Button
        className="bg-transparent text-black text-md border-slate-200 border-2 max-w-96 mx-auto w-full hover:bg-slate-200 hover:border-slate-200"
        onClick={() => setSteps(1)}
      >
        Volver
      </Button>
      <Button
        className="bg-slate-700 text-white max-w-96 mx-auto w-full text-md hover:bg-slate-800 hover:border-slate-800"
        type="submit"
      >
        Enviar
        </Button>
      </div>
    </div>
  );
};

export default CountList;
