import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { Repository } from 'typeorm';
@Injectable()
export class EventUserService{
    constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event>){}
        async FindAllEventByUser(): Promise<Event[]>{
            return this.EventRepository.find({relations:["club"] , where:{status:"approve"}});
        }
    
        async FindEventNameByUser(eventName : string):Promise<Event[] | null>{
            const events = await this.EventRepository.find({ where: { eventName , status:"approve" } });
            return events.length > 0 ? events : null;
        }
}