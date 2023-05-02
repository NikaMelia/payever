import { Module } from '@nestjs/common';
import { Avatar, AvatarSchema, User, UserSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReqresService } from 'src/reqres/reqres.service';
import { HttpModule } from '@nestjs/axios'
import { ReqresModule } from 'src/reqres/reqres.module';
import { AvatarsService } from './users.service';
import { AvatarRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [HttpModule,ReqresModule,
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema , collection:Avatar.name}]),
    MailerModule.forRoot({
      transport:{
        host:"smtp.sendgrid.net",
        auth:{
          user:'apikey',
          pass:"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"
        }
      }
    })],
    providers: [ConfigService, AvatarsService, AvatarRepository, EmailSenderService,ReqresService],

})
export class UsersModule { }
