import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import CreateAccountService from './CreateAccountService';

let fakeHashProvider: FakeHashProvider;
let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeAccountsRepository: FakeAccountsRepository;
let createAccount: CreateAccountService;

describe('Create Account', () => {
  beforeEach(async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeAccountsRepository = new FakeAccountsRepository();

    createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );
  });

  it('Should be able to create a new account.', async () => {
    const account = await createAccount.execute({
      name: 'John Doe',
      email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
    });

    expect(account).toHaveProperty('id');
  });

  it('Should not be able to create a new account with same e-mail from another.', async () => {
    await createAccount.execute({
      name: 'John Doe',
      email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
    });

    await expect(
      createAccount.execute({
        name: 'John Doe',
        email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
