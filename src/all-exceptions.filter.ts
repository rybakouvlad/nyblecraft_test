import {
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const message = exception.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(`${exception} URL: ${request.url}`, '', 'ExceptionFilter');

    const response = ctx.getResponse<Response>();

    response.status(status).json({
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
