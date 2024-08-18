import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

import {
  Menstruation,
  CervicalMucus,
  Intimacy,
  Sensations,
  Mood,
  PhysicalSymptoms,
} from '../enums/daily-records.enums';

@Entity('daily_records')
export class DailyRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dailyRecords, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'float', nullable: true })
  temperature: number;

  @Column({
    type: 'enum',
    enum: CervicalMucus,
    nullable: true,
    enumName: 'cervical_mucus',
  })
  cervicalMucus: CervicalMucus;

  @Column({
    type: 'enum',
    enum: Intimacy,
    nullable: true,
    enumName: 'intimacy',
  })
  intimacy: Intimacy;

  @Column({
    type: 'enum',
    enum: Sensations,
    nullable: true,
    enumName: 'sensations',
  })
  sensations: Sensations;

  @Column({ type: 'boolean', nullable: true })
  lhTest: boolean;

  @Column({ type: 'float', nullable: true })
  progesteroneLevels: number;

  @Column({
    type: 'enum',
    enum: Mood,
    array: true,
    nullable: true,
    enumName: 'mood',
  })
  mood: Mood;

  @Column({
    type: 'enum',
    enum: PhysicalSymptoms,
    array: true,
    nullable: true,
    enumName: 'physical_symptoms',
  })
  physicalSymptoms: PhysicalSymptoms[];

  @Column({ type: 'boolean', nullable: true })
  pregnancyTest: boolean;

  @Column({
    type: 'enum',
    enum: Menstruation,
    nullable: true,
    enumName: 'menstruation',
  })
  menstruation: Menstruation;

  @Column({ type: 'text', nullable: true })
  dailyNotes: string;
}
