import { HttpModule, HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import { ReqresResponse } from './reqres.user.response';
import axios from 'axios';

@Injectable()
export class ReqresService {
    constructor(private readonly httpService: HttpService) { }

    async getUser(userId: string): Promise<ReqresResponse> {
        const data = this.httpService.get(`https://reqres.in/api/users/${userId}`)
            .pipe(
                map(response => response.data),
            );
        const value = await firstValueFrom(data)
        return value
    }

    async getAvatar(userId: string): Promise<string> {
        const user = await this.getUser(userId)
        console.log(user.data.avatar)
        const imageToBase64 = require('image-to-base64');
        let base64Image = ""
        const imageLink = user.data.avatar
        await imageToBase64(imageLink)
            .then((response) => {
                base64Image = `${response}`
                console.log(base64Image);
            })
            .catch((error) => {
                console.log(error);
            })
        // this.avatarRepository.create({
        //     hash: base64Image,
        //     userId: user.data.id
        // });
        return base64Image;
    }
}
