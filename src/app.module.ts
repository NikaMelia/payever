import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ReqresService } from './reqres/reqres.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'./env',      
    }),
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/payever',
      {
        connectionName: 'myWorldDb'
      }
    ),
    
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/payever'),
    MailerModule.forRoot({
      transport:{
        host:"smtp.sendgrid.net",
        auth:{
          user:'apikey',
          pass:"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"
        }
      }
    },
    ),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [],
})
export class AppModule {}
