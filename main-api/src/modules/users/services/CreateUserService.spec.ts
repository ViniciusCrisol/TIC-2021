import AppError from '@shared/errors/AppError';

import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeBackofficeProvider,
    );
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same e-mail from another.', async () => {
    await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        password: 'password',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
