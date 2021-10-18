/* eslint-disable @typescript-eslint/ban-types */
import { DeleteUserInput } from './dto/delete-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Query(() => User)
  async findUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findUser(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('data') data: DeleteUserInput): Promise<Boolean> {
    const user = await this.userService.deleteUser(data);
    if (!user) {
      return false;
    }

    return true;
  }

  // TO-DO MUTATION UPDATE
}
