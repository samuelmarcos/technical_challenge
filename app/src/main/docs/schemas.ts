import {
  accountSchema,
  infoPathParams,
  errorSchema,
  countSchema,
  signUpParamsSchema,
  increaseCountResultSchema,
  userInfoSchema
} from './schemas/'

export default {
  userInfoSchema: userInfoSchema,
  account: accountSchema,
  infoPathParams: infoPathParams,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  count: countSchema,
  increaseCountResult: increaseCountResultSchema
}
