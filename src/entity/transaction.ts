import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { Category } from "./category";
import { Wallet} from "./wallet";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column({type:'date'})
    date: string

    @Column()
    note: string

    @ManyToOne ( () => Category, (category) => category.transaction)
    @JoinColumn()
    category: Category

    @ManyToOne ( () => Wallet, (wallet) => wallet.transaction)
    @JoinColumn()
    wallet: Wallet
}