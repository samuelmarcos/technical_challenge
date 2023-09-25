import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';
import { EmailValidatorAdapter } from '@/infra/validators/email-validator.adapter';

export const makeGetUserInfoValidator = (): ValidationComposite => {
  const validations: Validation[] = [];

  validations.push(new RequiredFieldValidation('email'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
