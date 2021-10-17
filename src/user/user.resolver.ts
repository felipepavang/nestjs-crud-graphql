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

  // TO-DO MUTATION DELETE AND UPDATE
}
