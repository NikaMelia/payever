import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { ApiBadRequestResponse, ApiNotImplementedResponse } from '@nestjs/swagger';
import { ReqresService } from 'src/reqres/reqres.service';
import * as fs from 'fs'
import { AvatarsService } from './users.service';
import { promisify } from 'util';

const nodemailer = require("nodemailer");

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
    const fullpath= __dirname+"/Avatars/"+path;
    return fs.existsSync(fullpath);
};

export const deleteFile = async (path: string): Promise<void> => {
    const fullpath= __dirname+"/Avatars/"+path;

    const unlink = promisify(fs.unlink);

    return await unlink(fullpath);
};

export const createFile = async (
    path: string,
    fileName: string,
    data: string,
): Promise<void> => {
    const fullpath= __dirname+"/Avatars/"+path;

    if (!checkIfFileOrDirectoryExists(fullpath)) {
        fs.mkdirSync(fullpath);
    }
}

@Controller('api/users')
export class UsersController {
    @Inject(ReqresService)
    @Inject(AvatarsService)
    @Inject(EmailSenderService)
    private readonly reqresService: ReqresService
    private readonly usersService: AvatarsService
    private readonly emailSender: EmailSenderService

    @Delete(':userId/avatar')
    async deleteUserAvatar(@Param('userId') userId: string) {
        if (!checkIfFileOrDirectoryExists(userId))
            return ApiBadRequestResponse();

        const user = await this.usersService.removeAvatar(userId);
        await deleteFile(`/avatars${userId}`)
        return userId
    }

    @Get(':userId/')
    async getUser(@Param('userId') userId: string) {
        return await this.reqresService.getUser(userId);
    }

    @Get(':userId/avatar')
    async getAvatar(@Param('userId') userId: string) {
        if (checkIfFileOrDirectoryExists(userId))
            return ApiBadRequestResponse();
        else {
            const avatar = await this.reqresService.getAvatar(userId);
            await this.usersService.createAvatar(userId, avatar);
            const path = `Avatars`
            await createFile(path, userId, avatar);
            return avatar;
        }

    }


}
