import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfases/jwtPayload.interface';
import { AuthDB } from './entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthDB)
    private readonly authRepository: Repository<AuthDB>,
    private jwtService: JwtService,
  ) {}

  async create({ login, password }: CreateProfileDto) {
    if (await this.checkLogin(login)) {
      throw new HttpException(
        'User with this login exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const newUser = await this.authRepository.create({ login, password });
    const cretedUser = await this.authRepository.save(newUser);
    if (cretedUser) {
      throw new HttpException('User was created', HttpStatus.CREATED);
    }

    throw new HttpException('User not created', HttpStatus.NOT_FOUND);
  }

  async validateUser(login: string, password: string) {
    const user = await this.checkLogin(login);
    const isMatch = await compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthDB) {
    const payload: IJwtPayload = {
      login: user.login,
      sub: user.password,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async checkLogin(login: string): Promise<AuthDB | null> {
    const user = await this.authRepository.findOne({ login });

    return user;
  }
}
