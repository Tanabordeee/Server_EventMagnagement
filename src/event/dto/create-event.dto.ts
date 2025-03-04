export class CreateEventDto{
    readonly eventName:string;
    readonly eventDate:Date;
    readonly detail:string;
    readonly time:string;
    readonly image?:string;
}