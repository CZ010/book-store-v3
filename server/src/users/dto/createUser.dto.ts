export class CreateUserDto {
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly roleId: number;
}