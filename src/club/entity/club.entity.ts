import { Column, Entity, OneToMany, PrimaryGeneratedColumn  , CreateDateColumn} from "typeorm";
import { Event } from "src/event/entity/event.entity";
@Entity("Club")
export class Club{
    @PrimaryGeneratedColumn("uuid")
    clubID:string;

    @Column({nullable: false })
    clubName:string;

    @Column()
    description:string;

    @Column({nullable: false , unique: true})
    email:string;

    @Column({nullable: false })
    username:string;

    @Column({nullable: false })
    password:string;

    @CreateDateColumn()
    created:Date;

    @OneToMany(type => Event , (events) => events.club)
    events:Event[];
}