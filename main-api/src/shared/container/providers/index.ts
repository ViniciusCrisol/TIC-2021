import { container } from 'tsyringe';

import IBackofficeProvider from './BackofficeProvider/models/IBackofficeProvider';
import BackofficeProvider from './BackofficeProvider/implementations/BackofficeProvider';

container.registerSingleton<IBackofficeProvider>(
  'BackofficeProvider',
  BackofficeProvider,
);
