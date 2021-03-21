import { container } from 'tsyringe';
import './providers';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';

import IBusinessRolesRepository from '@modules/businessRoles/repositories/IBusinessRolesRepository';
import BusinessRolesRepository from '@modules/businessRoles/infra/typeorm/repositories/BusinessRolesRepository';

import IMainThingsRepository from '@modules/mainThings/repositories/IMainThingsRepository';
import MainThingsRepository from '@modules/mainThings/infra/typeorm/repositories/MainThingsRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<IBusinessRolesRepository>(
  'BusinessRolesRepository',
  BusinessRolesRepository,
);

container.registerSingleton<IMainThingsRepository>(
  'MainThingsRepository',
  MainThingsRepository,
);
