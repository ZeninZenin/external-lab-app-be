import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { AppConfigService } from '../../config/configuration';
import { DbService } from '../db/db.service';
import { CreateUserDto, User, UserDocument } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly dbService: DbService,
  ) {}

  connectToUsersCollection = async () => {
    const { db, client } = await this.dbService.connectToMongoDb();
    return {
      usersCollection: db.collection<UserDocument>('Users'),
      client,
      db,
    };
  };

  findAll = async () => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    const users = await usersCollection.find().toArray();
    await client.close();

    return users.map(({ login, roles }) => ({
      login,
      roles,
    }));
  };

  findOne = async (login: string) => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    const user = await usersCollection.findOne({ login });
    await client.close();

    return {
      login: user.login,
      role: user.roles,
    };
  };

  findOneOrCreate = async (record: CreateUserDto) => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    try {
      let result = await usersCollection.findOne({ login: record.login });

      if (!result) {
        await usersCollection.insertOne({
          isLocked: false,
          roles: ['guest'],
          ...record,
        });

        result = await usersCollection.findOne({ login: record.login });
      }

      await client.close();
      return omit(result, '_id');
    } catch (err) {
      await client.close();
      throw new Error(err);
    }
  };

  verifyUser = async ({ login, roles }: User) => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    await usersCollection.findOneAndUpdate({ login }, { $set: { roles } });
    await client.close();
  };

  lockUser = async (login: string) => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    await usersCollection.findOneAndUpdate(
      { login },
      { $set: { isLocked: true } },
    );
    await client.close();
  };

  unlockUser = async (login: string) => {
    const { usersCollection, client } = await this.connectToUsersCollection();
    await usersCollection.findOneAndUpdate(
      { login },
      { $set: { isLocked: false } },
    );
    await client.close();
  };
}
