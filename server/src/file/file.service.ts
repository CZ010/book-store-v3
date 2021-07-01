import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';


@Injectable()
export class FileService {

  async create(file: Express.Multer.File): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', 'images');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;

    } catch (e) {
      throw new HttpException('Ошибка при сохранении файла!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
