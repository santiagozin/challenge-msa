import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import CountSeats from "./countSeats";
import { ApiResponse, IFormInputs } from "@/types/generic";
import { useState } from "react";
import CountList from "./countList";
import DialogConfirm from "./custom/dialogConfirm";
import { postResults } from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import ResultContent from "./resultContent";

const schema = yup.object({
  totalSeats: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Este campo es requerido")
    .min(1, "Debe ser al menos 1")
    .max(300, "No puede exceder 300"),
  listValues: yup.object({
    list: yup.object().shape({
      ...Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          (i + 1).toString(),
          yup.object({
            value: yup
              .number()
              .transform((value) => (isNaN(value) ? undefined : value))
              .required("Este campo es requerido")
              .min(0, "No puede ser negativo")
              .typeError("Debe ser un número"),
          }),
        ])
      ),
    }),
  }),
});

const FormContainer: React.FC = () => {
  const [steps, setSteps] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<ApiResponse | null>(null);

  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      totalSeats: undefined,
      listValues: {
        list: {},
      },
    },
    mode: "onChange",
  });
  const listValues = methods.watch("listValues.list") as {
    [key: string]: { value: number };
  };
  const seats = methods.getValues("totalSeats");

  const onSubmit = () => {
    if (steps === 1) {
      setSteps(2);
    } else {
      setOpen(true);
    }
  };

  const handleSentResults = async () => {
    const response = await postResults(seats, listValues);
    if (response) {
      methods.reset();
      setTotalResults(response);
    }
  };

  return (
    <Card className="min-w-[34rem] shadow-lg py-6 mt-10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {steps === 1 ? (
                <motion.div
                  key="countSeats"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CountSeats setSteps={setSteps} />
                </motion.div>
              ) : steps === 2 ? (
                <motion.div
                  key="countList"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CountList setSteps={setSteps} />
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResultContent totalResults={totalResults} setStep={setSteps} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </form>
      </FormProvider>
      <DialogConfirm
        open={open}
        setOpen={setOpen}
        listValues={listValues}
        handleSentResults={handleSentResults}
        setSteps={setSteps}
      />
    </Card>
  );
};

export default FormContainer;
