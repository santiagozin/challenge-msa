import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DialogConfirmProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  listValues: { [key: string]: { value: number } };
  handleSentResults: () => void;
  setSteps: (steps: number) => void;
}

const DialogConfirm = ({
  open,
  setOpen,
  listValues,
  handleSentResults,
  setSteps,
}: DialogConfirmProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await handleSentResults();
    setLoading(false);
    setOpen(false);
    setSteps(3);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-h-[20rem]">
        {!loading ? (
          <>
            <DialogHeader>
              <DialogTitle>
                ¿Estás seguro de enviar los siguientes datos?
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-4 border-2 rounded-lg my-4 border-slate-200 p-5 justify-center">
              {Object.entries(listValues).map(([key, value]) => (
                <div className="w-32 mr-2 text-black relative" key={key}>
                  <span className="font-semibold text-md">Lista {key}:</span>
                  <span className="text-slate-700 absolute right-5">
                    {" "}
                    {value.value}
                  </span>
                </div>
              ))}
            </div>

            <DialogFooter>
              <div className="flex gap-4 justify-center mx-auto w-full">
                <Button
                  className="w-full border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-600 text-white focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="w-full bg-slate-700 text-white border hover:border-slate-700"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  Confirmar
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <svg
              className="animate-spin h-5 w-5 mr-3"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Calculando resultados...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirm;
