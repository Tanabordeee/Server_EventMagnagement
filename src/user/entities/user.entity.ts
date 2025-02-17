import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Notification } from "src/notification/entities/notification.entity";
import { Favorite } from "src/favorite/entities/favorite.entity";
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

    @OneToMany(type => Notification , (notifications) => notifications.user)
    notifications: Notification[];

    @ManyToMany(type => Favorite , (favorite)=> favorite.user)
    @JoinTable()
    favorite: Favorite[];


    @BeforeInsert()
    @BeforeUpdate()
    async hashpassword(){
        if(this.password){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password , salt);
        }
    }
}