import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { Repository } from 'typeorm';
import { Club } from 'src/club/entity/club.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
@Injectable()
export class EventClubService {
  constructor(
    @InjectRepository(Event)
    private readonly EventRepository: Repository<Event>,
    @InjectRepository(Club) private readonly ClubRepository: Repository<Club>,
  ) {}
  async CreateEventByClub(
    email: string,
    CreateEventDto: CreateEventDto,
  ): Promise<Event | null> {
    const club = await this.ClubRepository.findOne({ where: { email } });
    if (!club) return null;
    const event = this.EventRepository.create({
      ...CreateEventDto,
      club,
    });
    return await this.EventRepository.save(event);
  }

  async DeleteEventByClub(
    email: string,
    eventID: string,
  ): Promise<Event | null> {
    const club = await this.ClubRepository.findOne({ where: { email } });
    if (!club) return null;
    const event = await this.EventRepository.findOne({
      where: { eventID, club },
    });
    if (!event) return null;
    return await this.EventRepository.remove(event);
  }

  async UpdateEventByClub(
    email: string,
    eventID: string,
    UpdateEventDto: UpdateEventDto,
  ): Promise<Event | null> {
    const club = await this.ClubRepository.findOne({ where: { email } });
    if (!club) return null;
    const event = await this.EventRepository.findOne({
      where: { eventID, club },
    });
    if (!event) return null;
    Object.assign(event, UpdateEventDto);
    return await this.EventRepository.save(event);
  }

  async FindAllEventByClub(email: string): Promise<Event[] | null> {
    const club = await this.ClubRepository.findOne({ where: { email } });
    if (!club) return null;
    const events = await this.EventRepository.find({ where: { club } });
    return events.length > 0 ? events : null;
  }

  async FindOneEventByClub(
    email: string,
    eventID: string,
  ): Promise<Event | null> {
    const club = await this.ClubRepository.findOne({ where: { email } });
    if (!club) return null;
    return await this.EventRepository.findOne({ where: { eventID, club } });
  }
}
