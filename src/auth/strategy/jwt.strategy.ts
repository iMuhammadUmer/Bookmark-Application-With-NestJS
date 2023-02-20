import { PrismaService } from './../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.password;
    return user;
  }
}
