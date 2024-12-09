import { ApiResponse } from "@/types/generic";
import { Armchair, FileUser } from "lucide-react";
import { Button } from "./ui/button";


const ResultContent = ({ totalResults, setStep }: { totalResults: ApiResponse | null, setStep: (step: number) => void }) => {

  return (
    <div>
      <h2 className="text-center text-xl font-normal border-b border-slate-700 pb-2 w-full">
        Total de escaños:{" "}
        <span className="font-bold">{totalResults?.eleccion?.totalSeats}</span>
      </h2>
      {totalResults?.resultadosDHondt.map((result) => (
        <div
          key={result.list}
          className="flex items-center justify-around border-b border-slate-200 pb-2 py-4"
        >
          <div className="flex items-center gap-2 relative">
            <FileUser size={20} className="absolute top-[0px] left-[-30px]" />
            <span>List {result.list}</span>
          </div>
          <span>=</span>
          <div className="flex justify-between items-center relative">
            <Armchair
              size={20}
              className="absolute top-[0px] left-[-30px]"
            />
            <p>Escaños <span className="font-bold">{result.seats}</span></p>
          </div>
      
        </div>
      ))}
          <Button className="bg-slate-700 text-white w-full border-slate-700 focus:border-slate-700 mt-8 hover:border-slate-700" onClick={() => {
            setStep(1)
          }}>
            Reiniciar
          </Button>
    </div>
  );
};

export default ResultContent;
