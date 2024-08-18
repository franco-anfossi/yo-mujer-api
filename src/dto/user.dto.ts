export class RegisterUserDto {
  id: number;
  email: string;
  isAdmin: boolean;
  message: string;
}

export class LoginResponseDto {
  access_token: string;
  expires_in: number;
  message: string;
}
