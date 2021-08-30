import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDB } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDB)
    private readonly userRepository: Repository<UserDB>,
  ) {}

  async create(image: Express.Multer.File, createUserDto: CreateUserDto) {
    if (!image) {
      throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      image: image.filename,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
