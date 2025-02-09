import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entity/event.entity";
@Entity("favorite")
export class Favorite{
    @PrimaryGeneratedColumn("uuid")
    favoriteID:string;

    @CreateDateColumn()
    created:Date;

    @ManyToMany(type => User , (user)=> user.favorite)
    user:User;
    
    @ManyToOne(type => Event , (events) => events.favorite)
    events:Event;
}