import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { UserProfile } from './user-profile.entity';
import { DailyRecord } from './daily-record.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => UserProfile, { cascade: true })
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => DailyRecord, (dailyRecord) => dailyRecord.user)
  dailyRecords: DailyRecord[];
}
