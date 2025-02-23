import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entity/event.entity";
import * as bcrypt from "bcrypt";
@Entity("user")
export class User{
    @PrimaryGeneratedColumn("uuid")
    userId:string;
    
    @Column({nullable: false})
    username:string;
    
    @Column({nullable: false , unique: true})
    email:string;
    
    @Column({nullable: false})
    password:string;
    
    @CreateDateColumn()
    created:Date;

    @ManyToMany(() => Event, (event) => event.users) 
    @JoinTable({
        name: 'user_events_event',  
        joinColumn: {
          name: 'userUserId',        
          referencedColumnName: 'userId', 
        },
        inverseJoinColumn: {
          name: 'eventEventID',      
          referencedColumnName: 'eventID', 
        },
      })
    events: Event[];


    @BeforeInsert()
    @BeforeUpdate()
    async hashpassword(){
        if(this.password){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password , salt);
        }
    }
}