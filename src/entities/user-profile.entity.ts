import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  purpose: string;

  @Column({ nullable: true })
  cycleRegularity: string;

  @Column({ nullable: true })
  cycleDuration: number;

  @Column({ nullable: true })
  menstruationDuration: number;

  @Column({ nullable: true })
  lastMenstruationDate: Date;

  @Column({ nullable: true })
  illnesses: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  @JoinColumn()
  user: User;
}
