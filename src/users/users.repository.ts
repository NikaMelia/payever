import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Avatar, AvatarDocument, User, UserDocument } from "./schemas/users.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class AvatarRepository{
    constructor(
        @InjectModel(Avatar.name) private readonly avatarModel:Model<Avatar>){

        }
    async findOne(userFilterQuery: FilterQuery<User>) : Promise<User> {
        return this.avatarModel.findOne(userFilterQuery)
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]>{
        return this.avatarModel.find(userFilterQuery)
    }
    
    async findOneAndRemove(user: User): Promise<User>{
        return this.avatarModel.findOneAndRemove(user);
    }

    async createAvatar(avatar: Avatar): Promise<Avatar>{
        const newUser = new this.avatarModel(avatar)
        return newUser.save();
    }

    async findAvatar(userFilterQuery: FilterQuery<Avatar>) : Promise<Avatar> {
        return this.avatarModel.findOne(userFilterQuery)
    }

    async remove(id: string) {
        const filter  = { userId: id };
    
        //const deleted = await this.avatarModel.softDelete(filter);
        //return deleted;
    
        //return this.bookModel.deleteOne(filter);
        //return this.bookModel.;
      }

}