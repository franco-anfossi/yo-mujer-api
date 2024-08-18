import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { User } from '../entities/user.entity';
import { UserProfileDto } from 'src/dto/user-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(userId: number): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user.profile) {
      throw new Error('Perfil no encontrado');
    }

    const profile = user.profile;

    const response: UserProfileDto = {
      id: profile.id,
      name: profile.name,
      age: profile.age,
      purpose: profile.purpose,
      fertilityAwarenessMethod: profile.fertilityAwarenessMethod,
      cycleRegularity: profile.cycleRegularity,
      cycleDuration: profile.cycleDuration,
      menstruationDuration: profile.menstruationDuration,
      lastMenstruationDate: profile.lastMenstruationDate,
      illnesses: profile.illnesses,
      weight: profile.weight,
      height: profile.height,
    };

    return response;
  }

  async createProfile(
    userId: number,
    profileData: Partial<UserProfile>,
  ): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.profile) {
      throw new Error('El perfil ya existe');
    }

    const profile = this.profileRepository.create(profileData);
    user.profile = profile;

    await this.userRepository.save(user);
    const profilesaved = await this.profileRepository.save(profile);

    const response: UserProfileDto = {
      id: profilesaved.id,
      name: profilesaved.name,
      age: profilesaved.age ?? null,
      purpose: profilesaved.purpose ?? null,
      fertilityAwarenessMethod: profilesaved.fertilityAwarenessMethod ?? null,
      cycleRegularity: profilesaved.cycleRegularity ?? null,
      cycleDuration: profilesaved.cycleDuration ?? null,
      menstruationDuration: profilesaved.menstruationDuration ?? null,
      lastMenstruationDate: profilesaved.lastMenstruationDate ?? null,
      illnesses: profilesaved.illnesses ?? null,
      weight: profilesaved.weight ?? null,
      height: profilesaved.height ?? null,
    };

    return response;
  }

  async updateProfile(
    userId: number,
    updateData: Partial<UserProfile>,
  ): Promise<UserProfileDto> {
    const profile = await this.getProfile(userId);

    Object.assign(profile, updateData);

    const savedProfile = await this.profileRepository.save(profile);

    const response: UserProfileDto = {
      id: savedProfile.id,
      name: savedProfile.name,
      age: savedProfile.age ?? null,
      purpose: savedProfile.purpose ?? null,
      fertilityAwarenessMethod: savedProfile.fertilityAwarenessMethod ?? null,
      cycleRegularity: savedProfile.cycleRegularity ?? null,
      cycleDuration: savedProfile.cycleDuration ?? null,
      menstruationDuration: savedProfile.menstruationDuration ?? null,
      lastMenstruationDate: savedProfile.lastMenstruationDate ?? null,
      illnesses: savedProfile.illnesses ?? null,
      weight: savedProfile.weight ?? null,
      height: savedProfile.height ?? null,
    };

    return response;
  }
}
