import { Module } from '@nestjs/common';
import { DailyRecordController } from './daily-record.controller';
import { DailyRecordService } from './daily-record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DailyRecord } from '../entities/daily-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, DailyRecord])],
  controllers: [DailyRecordController],
  providers: [DailyRecordService],
})
export class DailyRecordModule {}
