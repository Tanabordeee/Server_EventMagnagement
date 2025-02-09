import { Favorite } from "src/favorite/entities/favorite.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn , CreateDateColumn} from "typeorm";
import { Notification } from "src/notification/entities/notification.entity";
import { Club } from "src/club/entity/club.entity";
import { Admin } from "src/admin/entity/admin.entity";
@Entity("event")
export class Event{

    @PrimaryGeneratedColumn("uuid")
    eventID:string;

    @Column()
    eventName:string;

    @Column({type:"timestamp"})
    eventData:Date

    @Column({type:"time"})
    time:string;

    @Column()
    status:string;

    @CreateDateColumn()
    created:Date;

    @ManyToMany(type => User , (user) => user.events)
    user:User;

    @OneToMany(type => Favorite , (favorite) => favorite.events)
    favorite:Favorite[];

    @OneToMany(type => Notification , (notification) => notification.events)
    notification:Notification[];

    @ManyToOne(type => Club , (club) => club.events)
    club:Club;

    @ManyToMany(type => Admin , (admin) => admin.events)
    admin:Admin;
}