import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthRequestDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
  private readonly jwtExpiresIn: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpiresIn = +configService.getOrThrow<number>('JWT_EXPIRATION');
  }

  async login({ email, password }: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneBy({ email });

    if (!user) throw new NotFoundException('User not found');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.jwtExpiresIn,
    };
  }
}
