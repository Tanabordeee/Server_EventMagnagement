import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Event } from './entity/event.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entity/admin.entity';
import { UpdateEventDto } from './dto/update-event.dto';
@Injectable()
export class EventAdminService{
    constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event> ,
         @InjectRepository(Admin) private readonly AdminRepository:Repository<Admin>,){}
    async ApproveEventByAdmin(email : string , eventID:string , status:string): Promise<Event | null>{
            const Admin = await this.AdminRepository.findOne({where:{email}});
            if(!Admin) return null;
            const event = await this.EventRepository.findOne({where:{eventID}});
            if(!event) return null;
            event.status = status;
            return await this.EventRepository.save(event);
        }
    
        async FindAllEventByAdmin(email:string): Promise<Event[] | null>{
            const Admin = await this.AdminRepository.findOne({where:{email}});
            if(!Admin) return null;
            const events = await this.EventRepository.find({relations:["club" , "users" , "admin"]});
            return events.length > 0 ? events : null;
        }
    
        async FindEventNameByAdmin(email:string , eventName : string):Promise<Event[] | null>{
            const Admin = await this.AdminRepository.findOne({where:{email}});
            if(!Admin) return null;
            const events = await this.EventRepository.find({ where: { eventName } , relations:["club" , "users" , "admin"]});
            return events.length > 0 ? events : null;
        }
    
        async DeleteEventByAdmin(email : string , eventID : string): Promise<Event | null>{
            const Admin = await this.AdminRepository.findOne({where:{email}});
            if(!Admin) return null;
            const event = await this.EventRepository.findOne({where : {eventID}});
            if(!event) return null;
            return await this.EventRepository.remove(event);
        }
    
        async UpdateEventByAdmin(email: string , eventID:string , UpdateEventDto : UpdateEventDto): Promise<Event | null>{
            const Admin = await this.AdminRepository.findOne({where:{email}});
            if(!Admin) return null;
            const event = await this.EventRepository.findOne({where : {eventID}});
            if(!event) return null;
            Object.assign(event, UpdateEventDto);
            return await this.EventRepository.save(event);
        }
    
}