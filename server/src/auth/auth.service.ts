import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async signup(dto: SignUpDto) {
        const existing = await this.prisma.user.findUnique({
            where: {email: dto.email},
        })

        if(existing) {
            throw new ConflictException("Email already in use!");
        }

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                spark: 0,
                password: hashed
            }
        })

        const token = await this.jwt.signAsync({ userId: user.id });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                spark: user.spark
            }
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if(!user)
            throw new UnauthorizedException('Invalid Credentials!');

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if(!isMatch)
            throw new UnauthorizedException('Invalid Password!');

        const token = await this.jwt.signAsync({ userId: user.id });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                spark: user.spark,
            },
        }
    }
}
