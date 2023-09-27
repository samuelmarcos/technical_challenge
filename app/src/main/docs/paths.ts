import {
  signUpPath,
  infoUpPath,
  countPath,
  increasePath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/info/{email}': infoUpPath,
  '/count': countPath,
  '/increase': increasePath
}
