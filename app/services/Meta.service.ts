import { getCustomRepository } from "typeorm";
import { Meta } from "../models/Meta.model";
import { MetaRepository } from "../repository/Meta.repository";

export class MetaService {
    public static FindByText(text: string): Promise<Meta[]> {
        return getCustomRepository(MetaRepository).findByText(text);
    }

    public static BulkCreate(Metas: Meta[]): Promise<Meta[]> {
        return getCustomRepository(MetaRepository).bulkCreate(Metas);
    }

    public static FindOneById(id: number): Promise<Meta> {
        return getCustomRepository(MetaRepository).findOneById(id);
    }

    public static Find(): Promise<Meta[]> {
        return getCustomRepository(MetaRepository).find();
    }

    public static Remove(sample: Meta): Promise<Meta> {
        return getCustomRepository(MetaRepository).remove(sample);
    }

    public static RemoveById(id: number): Promise<Meta> {
        return getCustomRepository(MetaRepository).removeById(id);
    }

    public static Save(sample: Meta): Promise<Meta> {
        return getCustomRepository(MetaRepository).save(sample);
    }
}
