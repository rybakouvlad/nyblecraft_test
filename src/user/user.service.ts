import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDB } from './entities/user.entity';
import * as PDFDocument from 'pdfkit';
import { IuserResponse } from './userResponce.interface';

const IMG_PATH = './files/';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDB)
    private readonly userRepository: Repository<UserDB>,
  ) {}

  async create(
    image: Express.Multer.File,
    createUserDto: CreateUserDto,
  ): Promise<UserDB> {
    if (await this.userRepository.findOne({ email: createUserDto.email })) {
      throw new HttpException(
        'Such user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
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

  async createPdf(createPdfDto: CreatePdfDto) {
    const email = createPdfDto.email;
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return { load: false };
    }

    const doc = new PDFDocument({ bufferPages: true });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      user.pdf = Buffer.from('\\x' + Buffer.concat(buffers).toString('base64'));

      await this.userRepository.save(user);
    });
    doc.fontSize(30);
    doc.text(user.firstName, { align: 'center' });
    doc.moveDown();
    doc.text(user.lastName, { align: 'center' });
    doc.moveDown();
    doc.image(IMG_PATH + user.image, { align: 'center', width: 400 });
    doc.end();
    return { load: true };
  }

  async findAll(): Promise<IuserResponse[] | null> {
    const users = await this.userRepository.find({});
    if (users) {
      return users.map((user) => {
        return UserDB.toResponse(user);
      });
    }
    return null;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return UserDB.toResponse(user);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(
    id: string,
    image: Express.Multer.File,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
      image: image.filename,
    });
    return UserDB.toResponse(newUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      await this.userRepository.delete(id);
      throw new HttpException('User was deleted', HttpStatus.OK);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
