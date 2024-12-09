import { getHistorial } from "@/services/api";
import { ListItem } from "@/types/generic";
import { useEffect, useState } from "react";

const Historial = () => {
  const [historial, setHistorial] = useState<ListItem[] | null>(null);

  useEffect(() => {
    getHistorial()
      .then((data) => {
        setHistorial(data);
      })
      .catch((error) => {
        console.error("Error al obtener el historial:", error);
        setHistorial(null);
      });
  }, []);

  return (
    <div className="flex mt-20 flex-wrap gap-2 justify-center">
      <h1 className="text-2xl font-bold w-full text-center mb-5">Historial de votaciones</h1>
      {historial?.map((item) => {
        const { count, results } = item;
        return (
          <div
            className="flex flex-col gap-4 border-2 border-slate-700 p-4 rounded-md bg-slate-100 w-1/4 min-w-[400px]"
            key={item.id}
          >
            <h2>
              Total de escaños:{" "}
              <span className="font-bold">{item.totalSeats}</span>
            </h2>
            <h2>
              Fecha de creación: {new Date(item.date).toLocaleDateString()}
            </h2>
            <div className="flex flex-col gap-2 items-center">
              {count.map((item) => (
                <>
                  <div className="flex gap-2 w-full justify-around" key={item.list}>
                    <div className="flex items-start gap-2">
                      <p>List {item.list}:</p>
                      <p><span className="font-bold">{item.votes}</span> votos</p>
                    </div>
                    <div className="flex items-center gap-2 ml-10">
                      <p className="font-bold">
                        {
                          results.find(
                            (result: { list: number }) =>
                              result.list === item.list
                          )?.seats
                        }
                      </p>
                      <span>Escaños</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Historial;
