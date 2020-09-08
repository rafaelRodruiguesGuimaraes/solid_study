import { IUsersRepository } from "../../repositories/IUsersRepository";

import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {

    }

    async execute ({ email }: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new Error('This e-mail is already in use')
        }
    }
}
