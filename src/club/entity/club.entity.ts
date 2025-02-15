import { Column, Entity, OneToMany, PrimaryGeneratedColumn  , CreateDateColumn , BeforeInsert , BeforeUpdate} from "typeorm";
import { Event } from "src/event/entity/event.entity";
import * as bcrypt from "bcrypt";
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
    password:string;

    @CreateDateColumn()
    created:Date;

    @OneToMany(type => Event , (events) => events.club)
    events:Event[];

        @BeforeInsert()
        @BeforeUpdate()
        async hashpassword(){
            if(this.password){
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password , salt);
            }
        }
}