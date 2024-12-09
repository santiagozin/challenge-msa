import mongoose from "mongoose";
import type { Request, Response } from "express";

export const checkServicesHealth = async (req: Request, res: Response) => {
    const CHECK_TIMESTAMP: number = Date.now();

    const health = { mongodb: { checked_at: CHECK_TIMESTAMP, alive: false } };

    try {
        const health_collection = mongoose.connection.db?.collection("health");

        await health_collection?.insertOne({ checked_at: CHECK_TIMESTAMP });

        const db_health = await health_collection?.find({}).sort({ _id: -1 }).limit(1).toArray();

        if (db_health && db_health.length > 0 && db_health[0].checked_at === CHECK_TIMESTAMP) {
            health.mongodb.checked_at = db_health[0].checked_at;
            health.mongodb.alive = true;
        }
    } catch (error) {
        console.error("Error checking MongoDB health", error);
    }

    return res.json(health);
};
