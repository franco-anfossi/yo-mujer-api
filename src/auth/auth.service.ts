import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, LoginResponseDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<RegisterUserDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está en uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const response: RegisterUserDto = {
      id: savedUser.id,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      message: 'User registered successfully.',
    };

    return response;
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const payload = { email: user.email, sub: user.id };
    const accesToken = this.jwtService.sign(payload);

    const response: LoginResponseDto = {
      access_token: accesToken,
      expires_in: 3600,
      message: 'Login successful.',
    };

    return response;
  }

  async validateUser(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
