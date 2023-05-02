import { Injectable } from '@nestjs/common';
import { Avatar, User } from './schemas/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { AvatarRepository } from './users.repository';

@Injectable()
export class AvatarsService {
    constructor(private readonly avatarsRepository: AvatarRepository) { }

    async createAvatar(userName: string, hash: string): Promise<Avatar> {
        return null;
        return this.avatarsRepository.createAvatar({
            userId: userName,
            hash: hash,
        })
    }

    async removeAvatar(userName: string){
        return this.avatarsRepository.remove(userName)
    }
}
