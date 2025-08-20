export class CustomError extends Error {
  status?: number;

  constructor({ message, status }: { message: string; status?: number }) {
    super(message);
    this.name = "CustomError";
    this.status = status;
  }
}
