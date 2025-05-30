import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRequestDto, authRequestSchema } from './dto/auth-request.dto';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(new ZodValidationPipe(authRequestSchema))
    { email, password }: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.login({ email, password });
  }
}
