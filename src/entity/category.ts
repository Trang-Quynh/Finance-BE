import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Transaction } from "./transaction";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: "text"})
    icon: string

    @Column()
    transactionType: string

    @OneToMany ( () => Transaction, (transaction) => transaction.category)
    transaction: Transaction[]
}