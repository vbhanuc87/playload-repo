import { EntityRepository, Repository } from "typeorm";
import { Meta } from "../models/Meta.model";

@EntityRepository(Meta)
export class MetaRepository extends Repository<Meta> {

    public bulkCreate(Metas: Meta[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(Meta).values(Metas).execute();
    }

    public async removeById(id: number): Promise<Meta> {
        const itemToRemove: Meta = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

    public findByText(text: string): Promise<Meta[]> {
        return this.manager.find(Meta, {where: {text}});
    }

    public findOneById(id: number): Promise<Meta> {
        return this.manager.findOne(Meta, {where: {id}});
    }
}
