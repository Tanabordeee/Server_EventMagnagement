import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Event } from "src/event/entity/event.entity";
@Entity("admin")
export class Admin{
    @PrimaryGeneratedColumn("uuid")
    adminID:string;

    @Column()
    adminName:string;

    @Column({nullable: false , unique:true})
    email:string;

    @Column({nullable: false })
    password:string;

    @CreateDateColumn()
    created:Date;

    @ManyToMany(type => Event , (events) => events.admin)
    @JoinTable()
    events:Event[];
}