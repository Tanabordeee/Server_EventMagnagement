export class CreateEventDto{
    readonly eventName:string;
    readonly eventDate:Date;
    readonly time:string;
    readonly image?:string;
}