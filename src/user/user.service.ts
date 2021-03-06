import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problema para criar um usuário.');
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário com Id não encontrado.');
    }

    const changedUser = await this.userRepository.create({
      ...user,
      name: data?.name || user.name,
      email: data?.email || user.email,
    });
    const savedUser = await this.userRepository.save(changedUser);

    return savedUser;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteUser(data: DeleteUserInput): Promise<Boolean> {
    const user = await this.userRepository.delete(data);

    if (!user) {
      throw new NotFoundException('Usuário com Id não encontrado.');
    }

    return user.affected > 0;
  }
}
