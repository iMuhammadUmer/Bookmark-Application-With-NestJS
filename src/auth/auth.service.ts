import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return 'signed up';
  }
  signin() {
    return 'signed in';
  }
}
