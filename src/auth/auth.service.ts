import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.users.create({
      data: { name: dto.name, email: dto.email, password: hash},
    });
    return user;
  }
  signin() {
    return 'signed in';
  }
}
