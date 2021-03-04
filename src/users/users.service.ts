import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
