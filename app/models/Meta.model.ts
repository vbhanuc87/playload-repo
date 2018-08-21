import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("meta")
export class Meta extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public text: string;

    @Column("text")
    @IsEmail()
    public email: string;
}
