import axios from "axios";
import { ApiResponse, ListItem } from "@/types/generic";

export const getLists = async (): Promise<ListItem[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/lists`
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    throw error;
  }
};

export const getHistorial = async (): Promise<ListItem[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/history`
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    throw error;
  }
};

export const postResults = async (
  seats: number,
  listValues: { [key: string]: { value: number } }
) => {
  const results = {
    totalSeats: seats,
    listValues: listValues,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/results`,
      results
    );
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Error al enviar los resultados:", error);
    throw error;
  }
};
