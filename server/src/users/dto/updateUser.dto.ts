export class UpdateUserDto {
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly roleId: number;
  readonly status: boolean;
}