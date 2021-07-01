import {Module} from '@nestjs/common';
import {BooksController} from './books.controller';
import {BooksService} from './books.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './book.entity';
import {FileModule} from '../file/file.module';
import {FileService} from '../file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    FileModule
  ],
  controllers: [BooksController],
  providers: [BooksService, FileService]
})
export class BooksModule {
}
