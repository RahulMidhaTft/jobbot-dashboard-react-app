import humps from "humps";
import { path } from "ramda";
import { PROBLEMS } from "../../constants";

const errorCodes = Object.freeze({
  defaultError: "defaultError",
  serverError: "serverError",
  networkError: "networkError",
  candidateExists: "candidateExists",
  emailNotUnique: "emailNotUnique",
  wrongPassword: "wrongPassword",
});

const alertMappings = {
  [errorCodes.defaultError]: {
    message:
      "Sorry, an error has occurred. We will take care of it. Please try later.",
  },
  [errorCodes.serverError]: {
    message:
      "Oops! Sorry, our servers seem to be a bit busy at the moment. Please try again later.",
  },
  [errorCodes.networkError]: {
    message: "Please check your internet connection and try again.",
  },
  [errorCodes.candidateExists]: {
    title: "Sorry, we couldn't send the invite",
    message: "It looks like this candidate already exists on MoBerries.",
  },
  [errorCodes.emailNotUnique]: {
    message:
      "Sorry, we already have an account with this email address. Please try another one.",
  },
  [errorCodes.wrongPassword]: {
    message: "Please review your password.",
  },
};

const getClientErrorCode = (err) => {
  let errorCode = null;

  errorCode = path(["response", "data", "code"], err);

  if (!errorCode) {
    errorCode = path(["code"], err);
  }

  if (
    errorCode &&
    errorCode === "validation_error" &&
    path(["response", "data", "fieldErrors"], err)
  ) {
    Object.values(err.response.data.fieldErrors).forEach((value) => {
      if (value && value.length) {
        errorCode = value[0].code;
      }
    });
  }

  if (
    path(["response", "data", "nonFieldErrors"], err) &&
    err.response.data.nonFieldErrors.length
  ) {
    errorCode = err.response.data.nonFieldErrors[0].code;
  }

  return humps.camelize(errorCode);
};

const getErrorCode = (err) => {
  switch (path(["problem"], err)) {
    case PROBLEMS.CLIENT_ERROR:
      return getClientErrorCode(err);

    case PROBLEMS.SERVER_ERROR:
      return "serverError";

    case PROBLEMS.CONNECTION_ERROR:
    case PROBLEMS.TIMEOUT_ERROR:
    case PROBLEMS.NETWORK_ERROR:
      return "networkError";

    case PROBLEMS.CANCEL_ERROR:
    case PROBLEMS.UNKNOWN_ERROR:
    default:
      return "defaultError";
  }
};

export const getServerErrorText = (err) => {
  const code = getErrorCode(err);
  return alertMappings[code] || alertMappings[errorCodes.defaultError];
};
