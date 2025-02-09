import { Column, Entity, OneToMany, PrimaryGeneratedColumn  , CreateDateColumn} from "typeorm";
import { Event } from "src/event/entity/event.entity";
@Entity("Club")
export class Club{
    @PrimaryGeneratedColumn("uuid")
    clubID:string;

    @Column()
    clubName:string;

    @Column()
    description:string;

    @Column()
    email:string;

    @Column()
    username:string;

    @Column()
    password:string;

    @CreateDateColumn()
    created:Date;

    @OneToMany(type => Event , (events) => events.club)
    events:Event[];
}