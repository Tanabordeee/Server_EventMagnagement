import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Event } from "src/event/entity/event.entity";
@Entity("notification")
export class Notification{
    @PrimaryGeneratedColumn("uuid")
    notificationID:string;

    @Column()
    message:string;

    @CreateDateColumn()
    created:Date;

    @ManyToOne(type => User , (user)=> user.notifications)
    user:User;

    @ManyToOne(type => Event , (events) => events.notification)
    events:Event;
}