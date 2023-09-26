import { EmailValidator } from '@/validation/protocols/email-validator'
import { EmailValidation } from '@/validation/validators/email-validation';
import { mockEmailValidator } from '@/tests/mocks/validation';
import { InvalidParamError } from '@/presentation/errors';

type SutTypes = {
  sut: EmailValidation;
  emailValidatoStub: EmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatoStub = mockEmailValidator();

  const sut = new EmailValidation('email', emailValidatoStub);

  return { sut, emailValidatoStub };
};

describe('Email Validation', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatoStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatoStub, 'isValid');

    sut.validate({ email: 'any_email@email.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatoStub } = makeSut();

    jest.spyOn(emailValidatoStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });

  test('should return a InvalidParamError if a email is not valid', () => {
    const { sut, emailValidatoStub } = makeSut();
    jest.spyOn(emailValidatoStub, 'isValid').mockReturnValueOnce(null);
    const validateResult = sut.validate({ email: 'any_email@email.com' });
    expect(validateResult).toEqual(new InvalidParamError('email'))
  });
});
