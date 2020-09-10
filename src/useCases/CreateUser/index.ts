import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const mailtrapMailProvider = new MailTrapMailProvider();
const postgressUsersRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    postgressUsersRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController };
