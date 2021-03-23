import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import {
  emailAlreadyInUse,
  mainThingNotExists,
  businessRoleNotExists,
} from '@shared/errors/messages';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IBackofficeProvider from '@shared/container/providers/BackofficeProvider/models/IBackofficeProvider';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../infra/typeorm/entities/Account';

interface IRequest {
  name: string;
  email: string;
  password: string;
  account_name: string;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('BackofficeProvider')
    private backofficeProvider: IBackofficeProvider,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    account_name,
  }: IRequest): Promise<Account> {
    const checkAccountExists = await this.accountsRepository.findByEmail(email);
    if (checkAccountExists) {
      throw new AppError(emailAlreadyInUse.message);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const account = await this.accountsRepository.create({
      name,
      email,
      account_name,
      password_hash: hashedPassword,
    });

    this.backofficeProvider.sendWelcomeMail(account.id);
    return account;
  }
}

export default CreateAccountService;
