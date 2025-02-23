import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToClass } from 'class-transformer';
const nodemailer = require("nodemailer")
@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event> ,
     @InjectRepository(User) private readonly UserRepository : Repository<User>
    ){}
    // Register Subject
    async FavoriteEvent(email: string, eventID: string) {
      const user = await this.UserRepository.findOne({
        where: { email },
        relations: ["events"],
      });
      if (!user) return null;
      const event = await this.EventRepository.findOne({
        where: { eventID },
        relations: ["users"],
      });
      if (!event) return null;
      if (!user.events) user.events = [];
      if (!event.users) event.users = [];
      // เช็คว่าผู้ใช้ไม่ได้เพิ่มกิจกรรมนี้ไปแล้ว
      if (!event.users.some((u) => u.email === user.email)) {
        event.users.push(user);
      }
      try {
        await this.EventRepository.save(event);
      } catch (error) {
        console.log(error);
      }
      // บันทึกข้อมูลในตารางเชื่อมโยง (user_events_event)
      if (!user.events.some((e) => e.eventID === event.eventID)) {
        user.events.push(event);
        try{
          await this.UserRepository.save(user); // บันทึกข้อมูลที่เปลี่ยนแปลงใน User
        }catch(error){
          console.log(error)
        }
      }
      // ใช้ class-transformer เพื่อแปลงข้อมูลที่ไม่มีวงกลม
      return plainToClass(Event, event);
    }

    //Unregister Subject
    async UnFavoriteEvent(email:string , eventID:string){
        const user = await this.UserRepository.findOne({where:{email}, relations: ["events"] });
        if(!user) return null;
        const event = await this.EventRepository.findOne({where : {eventID}, relations: ["users"] });
        if(!event) return null;
        if(!user.events) user.events = [];
        if(!event.users) event.users = [];
        const index = event.users.findIndex(u => u.email === user.email);
        if(index > -1){
            event.users.splice(index , 1);
        }
        return this.EventRepository.save(event);
    }
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async NotificationEvent(){
        const today = new Date();
        const events = await this.EventRepository.find({ relations: ['users'] });
        if(!events) return null;
        for(const event of events){
            const eventDate = new Date(event.eventDate);
            const diffTime = eventDate.getTime() - today.getTime();
            const melisecondInOneDay = 1000*3600*24
            const diffDays = Math.ceil(diffTime/melisecondInOneDay);
            if(diffDays <= 1 && diffDays >= 0){
                if(Array.isArray(event.users)){
                    for(const user of event.users){
                        this.SendNotification(user.email , `Event ${event.eventName} is happening Tommorrow`)
                    }
                }else{
                    console.error('event.users is not an array');
                }
            }
        }
    }

    public SendNotification(email : string , message:string){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Event IS COMING!!!",
            text: message,
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error:', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
