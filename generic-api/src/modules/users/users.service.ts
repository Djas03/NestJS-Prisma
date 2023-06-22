import { Injectable } from '@nestjs/common';
import { userDTO } from './dto/user.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: userDTO) {
    const { email, username, password } = data;

    const userExists = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: email,
        username: username,
        password: bcrypt.hashSync(password, 8),
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('User not exists');
    }

    return userExists;
  }

  async findOneByEmail(email: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new Error('User not exists');
    }

    return userExists;
  }

  async update(id: string, data: userDTO) {
    const { email, username, password } = data;

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('User not exists');
    }

    const userUpdated = await this.prisma.user.update({
      data:{
        email: email,
        username: username,
        password: bcrypt.hashSync(password, 8),
      },
      where: {
        id: id,
      },
    });

    return userUpdated;
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('User not exists');
    }

    return await this.prisma.user.delete({
      where:{
        id: id,
      },
    });
  }
}
