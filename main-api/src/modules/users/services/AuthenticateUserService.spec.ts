import AppError from '@shared/errors/AppError';

import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import User from '../infra/typeorm/entities/User';

let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;
let user: User;

describe('Authenticate User', () => {
  beforeEach(async () => {
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeBackofficeProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await createUser.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
    });
  });

  it('Should be able to authenticate.', async () => {
    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with a wrong email.', async () => {
    await expect(
      authenticateUser.execute({
        password: 'password',
        email: 'wrongJohn@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateUser.execute({
        password: 'wrongPassword',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
