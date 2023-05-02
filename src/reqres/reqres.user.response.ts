export class Data {
    id : number;
    email: string;
    firstName: string;
    lastName:string;
    avatar: string;
}

export class Support {
    url : string;
    text: string;
}

export class ReqresResponse{
    data: Data;
    support: Support;
}