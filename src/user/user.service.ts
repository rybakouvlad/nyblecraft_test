import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDB } from './entities/user.entity';
import * as PDFDocument from 'pdfkit';

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

  async findAll(): Promise<UserDB[] | null> {
    const users = await this.userRepository.find({});
    if (users) {
      return users;
    }
    return null;
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
