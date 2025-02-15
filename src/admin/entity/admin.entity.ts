import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn, ManyToMany, JoinTable , BeforeInsert , BeforeUpdate} from "typeorm";
import { Event } from "src/event/entity/event.entity";
import * as bcrypt from "bcrypt";
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
        @BeforeInsert()
        @BeforeUpdate()
        async hashpassword(){
            if(this.password){
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password , salt);
            }
        }
}