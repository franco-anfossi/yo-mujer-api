import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  Purpose,
  FertilityAwarenessMethod,
  CycleRegularity,
} from '../enums/user-profile.enums';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'float', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: Purpose, nullable: true, enumName: 'purpose' })
  purpose: Purpose;

  @Column({
    type: 'enum',
    enum: FertilityAwarenessMethod,
    nullable: true,
    enumName: 'fertility_awareness_method',
  })
  fertilityAwarenessMethod: FertilityAwarenessMethod;

  @Column({
    type: 'enum',
    enum: CycleRegularity,
    nullable: true,
    enumName: 'cycle_regularity',
  })
  cycleRegularity: CycleRegularity;

  @Column({ type: 'float', nullable: true })
  cycleDuration: number;

  @Column({ type: 'float', nullable: true })
  menstruationDuration: number;

  @Column({ type: 'date', nullable: true })
  lastMenstruationDate: Date;

  @Column({ type: 'text', nullable: true })
  illnesses: string;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;
}
