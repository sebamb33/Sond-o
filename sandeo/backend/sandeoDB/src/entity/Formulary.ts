import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {User} from "./User";
import {Question} from "./Question";

@Entity()
export class Formulary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  userId!: number;

  @Column({ nullable: true })
  status?: string;

  @Column({ default: false })
  isNoted!: boolean;

  @Column({ default: false })
  isPrivate!: boolean;

  @ManyToOne(() => User, (user) => user.formularies)
  user!: User;

  @OneToMany(() => Question, (question) => question.formulary)
  questions!: Question[];
}
