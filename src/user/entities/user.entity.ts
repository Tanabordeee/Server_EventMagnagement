import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Notification } from "src/notification/entities/notification.entity";
import { Favorite } from "src/favorite/entities/favorite.entity";
import { Event } from "src/event/entity/event.entity";
@Entity("user")
export class User{
    @PrimaryGeneratedColumn("uuid")
    userId:string;
    
    @Column()
    userName:string;
    
    @Column()
    email:string;
    
    @Column()
    password:string;
    
    @CreateDateColumn()
    created:Date;

    @OneToMany(type => Notification , (notifications) => notifications.user)
    notifications: Notification[];

    @ManyToMany(type => Favorite , (favorite)=> favorite.user)
    @JoinTable()
    favorite: Favorite[];

    @ManyToMany(type => Event , (events) => events.user)
    @JoinTable()
    events:Event[];
}