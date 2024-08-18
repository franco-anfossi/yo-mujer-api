import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DailyRecord } from '../entities/daily-record.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class DailyRecordService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRecordRepository: Repository<DailyRecord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createDailyRecord(
    userId: number,
    data: Partial<DailyRecord>,
  ): Promise<DailyRecord> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dailyRecord = this.dailyRecordRepository.create({ ...data, user });
    return this.dailyRecordRepository.save(dailyRecord);
  }

  async updateDailyRecord(
    id: number,
    data: Partial<DailyRecord>,
  ): Promise<DailyRecord> {
    const dailyRecord = await this.dailyRecordRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!dailyRecord) {
      throw new NotFoundException('Daily record not found');
    }

    Object.assign(dailyRecord, data);
    return this.dailyRecordRepository.save(dailyRecord);
  }

  async getDailyRecords(userId: number): Promise<DailyRecord[]> {
    return this.dailyRecordRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }

  async getDailyRecordById(id: number): Promise<DailyRecord> {
    const dailyRecord = await this.dailyRecordRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!dailyRecord) {
      throw new NotFoundException('Daily record not found');
    }
    return dailyRecord;
  }

  async getTodayDailyRecord(userId: number): Promise<DailyRecord> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.dailyRecordRepository.findOne({
      where: {
        user: { id: userId },
        date: today,
      },
    });
  }

  async getWeekDailyRecords(userId: number): Promise<DailyRecord[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    return this.dailyRecordRepository.find({
      where: {
        user: { id: userId },
        date: Between(weekAgo, today),
      },
      order: { date: 'ASC' },
    });
  }

  async getMonthDailyRecords(userId: number): Promise<DailyRecord[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    return this.dailyRecordRepository.find({
      where: {
        user: { id: userId },
        date: Between(monthAgo, today),
      },
      order: { date: 'ASC' },
    });
  }

  async getDailyRecordByDate(userId: number, date: Date): Promise<DailyRecord> {
    const dailyRecord = await this.dailyRecordRepository.findOne({
      where: {
        user: { id: userId },
        date,
      },
    });
    if (!dailyRecord) {
      throw new NotFoundException('Daily record not found');
    }
    return dailyRecord;
  }

  async getDailyRecordByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<DailyRecord[]> {
    return this.dailyRecordRepository.find({
      where: {
        user: { id: userId },
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC' },
    });
  }
}
