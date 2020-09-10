import { IUsersRepository } from "../../repositories/IUsersRepository";

import { User } from '../../entities/Users';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private MailProvider: IMailProvider,
    ) {}

    async execute (data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExists) {
            throw new Error('This e-mail is already in use')
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.MailProvider.sendMail({
            to: {
                 name: data.name,
                 address: data.email,
            } ,
            from: {
                name: 'Test',
                address: 'test_to@test.com',
            },
            subject: 'teste subject',
            body: '<p>Hello world!</p>'         
        })
    }
}
