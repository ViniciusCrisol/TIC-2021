export const defaultError = {
  status: 400,
  message: 'Error, check your send information, and try again!',
};

export const templateError = {
  status: 404,
  message: 'Error, template name not found!',
};

export const emailAlreadyInUse = {
  status: 400,
  message: 'Error, email address already in use!',
};

export const authenticationFail = {
  status: 401,
  message: 'Error, incorrect email/password combination!',
};

export const jwtIsMissing = {
  status: 401,
  message: 'Error, JWT token is missing!',
};

export const jwtIsInvalid = {
  status: 401,
  message: 'Error, JWT token is invalid!',
};
