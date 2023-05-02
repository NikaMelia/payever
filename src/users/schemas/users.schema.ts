import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document
export type AvatarDocument = Avatar & Document

@Schema()
export class User {
    @Prop()
    userId: String;
    @Prop()
    email: String;
    @Prop()
    firstName: String;
    @Prop()
    lastName: String;
    @Prop()
    avatar: String;
}

@Schema()
export class Avatar {
    @Prop()
    userId: String;
    @Prop()
    hash: String;
}

export const UserSchema = SchemaFactory.createForClass(User)
export const AvatarSchema = SchemaFactory.createForClass(Avatar)