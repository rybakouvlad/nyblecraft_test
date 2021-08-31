import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    callback(
      new HttpException('Сheck the file extension', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  let fileExtension = '';
  if (file.mimetype.indexOf('jpeg') > -1) {
    fileExtension = 'jpg';
  } else if (file.mimetype.indexOf('png') > -1) {
    fileExtension = 'png';
  }
  const originalName = file.originalname.split('.')[0];
  callback(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
};
