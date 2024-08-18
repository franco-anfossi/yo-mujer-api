import {
  Controller,
  Post,
  Put,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { DailyRecordService } from './daily-record.service';
import { AuthGuard } from '@nestjs/passport';
import { DailyRecord } from '../entities/daily-record.entity';

@Controller('daily-records')
export class DailyRecordController {
  constructor(private readonly dailyRecordService: DailyRecordService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createDailyRecord(
    @Request() req,
    @Body() data: Partial<DailyRecord>,
  ): Promise<DailyRecord> {
    return this.dailyRecordService.createDailyRecord(req.user.id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateDailyRecord(
    @Param('id') id: number,
    @Body() data: Partial<DailyRecord>,
  ): Promise<DailyRecord> {
    return this.dailyRecordService.updateDailyRecord(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getDailyRecords(@Request() req): Promise<DailyRecord[]> {
    return this.dailyRecordService.getDailyRecords(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getDailyRecordById(@Param('id') id: number): Promise<DailyRecord> {
    return this.dailyRecordService.getDailyRecordById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('today')
  async getTodayDailyRecord(@Request() req): Promise<DailyRecord> {
    return this.dailyRecordService.getTodayDailyRecord(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('week')
  async getWeekDailyRecords(@Request() req): Promise<DailyRecord[]> {
    return this.dailyRecordService.getWeekDailyRecords(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('month')
  async getMonthDailyRecords(@Request() req): Promise<DailyRecord[]> {
    return this.dailyRecordService.getMonthDailyRecords(req.user.id);
  }
}
