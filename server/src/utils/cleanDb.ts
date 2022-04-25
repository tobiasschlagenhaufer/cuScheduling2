import path from "path";
import { UserAccount } from "../entities/UserAccount";
import { Section } from "../entities/Section";
import { TimeSlot } from "../entities/TimeSlot";
import { createConnection, getConnection } from "typeorm";

export const cleanDb = async () => {

    // Fetch all the entities
    const conn = await getConnection();
    const entities = conn.entityMetadatas;

    for (const entity of entities) {
        const repository = conn.getRepository(entity.name); // Get repository
        await repository.createQueryBuilder().delete().execute();
    }
};