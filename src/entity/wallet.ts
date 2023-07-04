import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import { User } from "./user";
import {Transaction} from "./transaction";

@Entity()
export class Wallet {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    total: number

    @ManyToOne( () => User, (user) => user.wallet)
    @JoinColumn()
    user: User[]

    @OneToMany(()=>Transaction, (transaction)=>transaction.wallet)
    transaction: Transaction[]
}