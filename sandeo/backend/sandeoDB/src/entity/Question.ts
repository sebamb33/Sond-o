import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Formulary } from "./Formulary";
import { Choice } from "./Choice";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  questionText?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  timeSecond?: number;

  @Column({ nullable: true })
  haveRespond?: number;

  @Column()
  formularyId: number;

  @Column({ nullable: true })
  order?: number;

  @Column({ default: false })
  hasManyChoice: boolean;

  @ManyToOne(() => Formulary, (formulary) => formulary.questions)
  formulary: Formulary;

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
