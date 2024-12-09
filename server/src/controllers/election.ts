import { Request, Response } from 'express';
import { ElectionModel, initialLists } from "../models/Elections";
import applyDHondt from '../services/elections';

interface ListValue {
  value: number;
}

export const createElection = async (req: Request, res: Response) => {
  try {
    const { listValues, totalSeats } = req.body;

    if (!listValues || !totalSeats) {
      return res.status(400).json({ 
        mensaje: 'Los valores de las listas y el total de escaños son requeridos' 
      });
    }

    const countArray = Object.entries(listValues).map(([listId, data]) => ({
      list: listId,
      votes: (data as ListValue).value
    }));

    const dhondtResults = applyDHondt(countArray, totalSeats);

    const lastElection = await ElectionModel.findOne({}, { id: 1 }).sort({ id: -1 });
    const newId = lastElection ? lastElection.id + 1 : 1;

    const newElection = new ElectionModel({
      id: newId,
      date: new Date(),
      count: countArray,
      totalSeats,
      results: dhondtResults
    });

    const savedElection = await newElection.save();

    res.status(201).json({  
      mensaje: 'Elección creada exitosamente',
      eleccion: savedElection,
      resultadosDHondt: dhondtResults
    });
  } catch (error) {
    console.error('Error al crear elección:', error);
    res.status(500).json({
      mensaje: 'Error al crear la elección',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getElections = async (req: Request, res: Response) => {
  try {
    const elections = await ElectionModel.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener elecciones',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};


export const getLists = async (req: Request, res: Response) => {
    try {
      const lists = await initialLists;
      res.json(lists);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener las listas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  
