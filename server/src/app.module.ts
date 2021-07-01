import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {RolesModule} from './roles/roles.module';
import {User} from './users/user.entity';
import {Role} from './roles/role.entity';
import {BooksModule} from './books/books.module';
import {CategoriesModule} from './categories/categories.module';
import {Category} from './categories/category.entity';
import {FileModule} from './file/file.module';
import {Book} from './books/book.entity';
import * as path from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import {CartsModule} from './carts/carts.module';
import {Cart} from './carts/cart.entity';
import {OrdersModule} from './orders/orders.module';
import {Order} from './orders/order.entity';
import {OrderItem} from './orders/orderItem.entity';
import {AuthModule} from './auth/auth.module';
import {CartItem} from './carts/cartItem.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Category, Book, Cart, Order, OrderItem],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    UsersModule,
    RolesModule,
    BooksModule,
    CategoriesModule,
    FileModule,
    CartsModule,
    OrdersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
