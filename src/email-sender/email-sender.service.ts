import { Injectable, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSenderService {
    constructor(private mailService: MailerService) { }

    async plainTextEmail(@Query('toemail') toEmail) {
        var response = await this.mailService.sendMail({
            to: toEmail,
            from: "nikolozmelia@gmail.com",            
            subject: 'User added',
            text: 'Hi, you have added the user',
        
        });
        return response;
    }
}
