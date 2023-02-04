import type { ErrorType } from "./ErrorType.enum";

export const ErrorMessages: Record<ErrorType, string> = {
    EMPTY_EMAIL: "Email is empty",
    EMPTY_PASSWORD: "Password is empty",
    INVALID_EMAIL: "Email is invalid",
    INVALID_PASSWORD: "Incorrect password or email",
    SERVER_ERROR: "Unknown server error"
};