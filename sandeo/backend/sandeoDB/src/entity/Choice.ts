import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  choiceText?: string;

  @Column()
  questionId!: number;

  @Column({ default: false })
  goodResponse!: boolean;

  @Column({ default: 0 })
  chooseCounter!: number;

  @ManyToOne(() => Question, (question) => question.choices)
  question!: Question;
}
