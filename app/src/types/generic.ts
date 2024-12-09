export interface FormData {
  totalSeats: number | undefined;
  }

  export interface IFormInputs {
    totalSeats: number;
    listValues: {
      list: {
        [key: string]: {
          value: number;
        };
      };
    };
  }
  
  export interface ListItem {
    id: number;
    name: string;
    color: keyof ColorMapType;
    totalSeats: number;
    date: string;
    count: {
      list: number;
      votes: number;
    }[];
    results: {
      list: number;
      seats: number;
    }[];
  }
  

export type ColorMapType = {
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

interface Count {
  list: number;
  votes: number;
  _id: string;
}

interface DHondtResult {
  list: number;
  seats: number;
}

interface Election {
  id: number;
  count: Count[];
  date: string;
  totalSeats: number;
  _id: string;
  __v: number;
}

export interface ApiResponse {
  mensaje: string;
  eleccion: Election;
  resultadosDHondt: DHondtResult[];
}
