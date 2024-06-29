export class UserCreationFailedException extends Error {
  constructor() {
    super("Failed to create user.");
    this.name = "UserCreationFailedException";
  }
}

export class EmailAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`Email '${email}' already exists.`);
    this.name = "EmailAlreadyExistsException";
  }
}

export class UserWithThisEmailNotExistException extends Error {
  constructor(email: string) {
    super(`User with email ${email} not exist.`);
    this.name = "UserCreationFailedException";
  }
}
