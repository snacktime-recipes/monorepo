import type { ErrorType } from "./ErrorType.enum";

export const ErrorMessages: Record<ErrorType, string> = {
    INVALID_PASSWORD_OR_EMAIL: "Invalid password or email",
    EMPTY_USERNAME: "Username is empty",
    EMPTY_EMAIL: "Email is empty",
    EMPTY_PASSWORD: "Password is empty",
    INVALID_EMAIL: "Email is invalid",
    INVALID_PASSWORD: "Incorrect password or email",
    SERVER_ERROR: "Unknown server error"
};