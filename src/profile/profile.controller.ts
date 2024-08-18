import {
  Controller,
  Put,
  Body,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileDto } from 'src/dto/user-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req): Promise<UserProfileDto> {
    return this.profileService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProfile(
    @Request() req,
    @Body() profileData: Partial<UserProfile>,
  ): Promise<UserProfileDto> {
    return this.profileService.createProfile(req.user.id, profileData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateProfile(
    @Request() req,
    @Body() profileData: Partial<UserProfile>,
  ): Promise<UserProfileDto> {
    return this.profileService.updateProfile(req.user.id, profileData);
  }
}
