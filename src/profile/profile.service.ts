import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(
    userId: number,
    profileData: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let profile = user.profile;

    if (!profile) {
      profile = this.profileRepository.create(profileData);
      profile.user = user;
    } else {
      profile = this.profileRepository.merge(profile, profileData);
    }

    return this.profileRepository.save(profile);
  }

  async getProfile(userId: number): Promise<UserProfile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new Error('Perfil no encontrado');
    }

    return profile;
  }
}
