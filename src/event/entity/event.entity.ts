import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne , PrimaryGeneratedColumn , CreateDateColumn , JoinTable} from "typeorm";
import { Club } from "src/club/entity/club.entity";
import { Admin } from "src/admin/entity/admin.entity";
@Entity("event")
export class Event{

    @PrimaryGeneratedColumn("uuid")
    eventID:string;

    @Column({nullable: false})
    eventName:string;

    @Column({type:"timestamp"})
    eventDate:Date

    @Column({type:"time"})
    time:string;

    @Column({type : "text"})
    image:string;

    @Column({ default: 'not approve' })
    status:string;

    @CreateDateColumn()
    created:Date;

    @ManyToMany(() => User, (user) => user.events)
    @JoinTable({
        name: "user_events_event",
        joinColumn: {
          name: "eventEventID",
          referencedColumnName: "eventID",
        },
        inverseJoinColumn: {
          name: "userUserId",
          referencedColumnName: "userId",
        }
      })
    users: User[];

    @ManyToOne(type => Club , (club) => club.events)
    club:Club;

    @ManyToMany(type => Admin , (admin) => admin.events)
    admin:Admin;
}