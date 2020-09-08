import { IUsersRepository } from "../../repositories/IUsersRepository";

import { User } from '../../entities/Users';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {

    }

    async execute (data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExists) {
            throw new Error('This e-mail is already in use')
        }

        const user = new User(data);

        await this.usersRepository.save(user);
    }
}
