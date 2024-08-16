import { Controller, Put, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfile } from '../entities/user-profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateProfile(
    @Request() req,
    @Body() profileData: Partial<UserProfile>,
  ): Promise<UserProfile> {
    return this.profileService.updateProfile(req.user.id, profileData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req): Promise<UserProfile> {
    return this.profileService.getProfile(req.user.id);
  }
}
