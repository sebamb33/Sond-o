import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Formulary } from "./Formulary";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ default: "" })
  password: string;

  @Column({ nullable: true })
  mail?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  verifiedAccount: boolean;

  @OneToMany(() => Formulary, (formulary) => formulary.user)
  formularies: Formulary[];
}
