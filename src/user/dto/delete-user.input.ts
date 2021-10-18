import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Favor inserir um Id válido' })
  id: string;
}
