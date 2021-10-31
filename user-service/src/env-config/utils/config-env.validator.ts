import { plainToClass } from 'class-transformer';
import { ConfigEnvModel } from '../models/config-env.model';
import { validateSync } from 'class-validator';

export const configEnvValidator = (data: Record<string, unknown>) => {
  const configEnvModel = plainToClass(ConfigEnvModel, data);

  const errors = validateSync(configEnvModel);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return configEnvModel;
};
