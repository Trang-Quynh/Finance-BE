import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Wallet } from "./wallet";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({ default: 'image.jpg' })
    image: string

    @Column({ default: 'default' })
    job: string

    @OneToMany( () => Wallet, (wallet) => wallet.user)
    wallet: Wallet[]
}