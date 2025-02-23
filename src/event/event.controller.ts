import { Body, Controller, Delete, Get, Post , Request , Param , Patch, UseGuards , Put , Query} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {EventUserService } from './EventUser.service';
import { EventClubService } from './EventClub.service';
import { EventAdminService } from './EventAdmin.service';
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService , private readonly EventUserService : EventUserService , private readonly EventClubService : EventClubService,
        private readonly EventAdminService : EventAdminService
    ){}
    @Get("/byuser")
    @UseGuards(JwtAuthGuard)
    getEvents(){
        return this.EventUserService.FindAllEventByUser();
    }

    @Get("/namebyuser")
    @UseGuards(JwtAuthGuard)
    getEventName(@Query("eventName") eventName: string){
        return this.EventUserService.FindEventNameByUser(eventName);
    }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    CreateEvent(@Request() req , @Body() CreateEventDto:CreateEventDto){
        return this.EventClubService.CreateEventByClub(req.user.email , CreateEventDto);
    }

    @Delete("/deletebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    DeleteEventByClub(@Request() req , @Param("eventID") eventID:string){
        return this.EventClubService.DeleteEventByClub(req.user.email , eventID);
    }

    @Patch("/updatebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    UpdateEventByClub(@Request() req ,  @Param("eventID") eventID:string , UpdateEventDto:UpdateEventDto){
        return this.EventClubService.UpdateEventByClub(req.user.email , eventID , UpdateEventDto);
    }

    @Get("/getallbyclub")
    @UseGuards(JwtAuthGuard)
    GetAllEventByClub(@Request() req){
        return this.EventClubService.FindAllEventByClub(req.user.email);
    }

    @Get("/getonebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    GetOneEventByClub(@Request() req , @Param("eventID") eventID:string){
        return this.EventClubService.FindOneEventByClub(req.user.email , eventID);
    }

    @Put("/approvebyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    ApproveEventByAdmin(@Request() req , @Param('eventID') eventID: string, @Body("status") status:string){
        return this.EventAdminService.ApproveEventByAdmin(req.user.email , eventID , status);
    }

    @Get("/getallbyadmin")
    @UseGuards(JwtAuthGuard)
    GetAllEventByAdmin(@Request() req){
        return this.EventAdminService.FindAllEventByAdmin(req.user.email);
    }

    @Get("/getnamebyadmin")
    @UseGuards(JwtAuthGuard)
    GetNameEventByAdmin(@Request() req , @Body("eventName") eventName : string){
        return this.EventAdminService.FindEventNameByAdmin(req.user.email , eventName);
    }

    @Delete("/deleteeventbyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    DeleteeventByAdmin(@Request() req , @Param("eventID") eventID:string){
        return this.EventAdminService.DeleteEventByAdmin(req.user.email , eventID);
    }

    @Patch("/updateeventbyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    UpdateeventByAdmin(@Request() req , @Param("eventID") eventID:string ,  UpdateEventDto : UpdateEventDto){
        return this.EventAdminService.UpdateEventByAdmin(req.user.email ,eventID ,UpdateEventDto);
    }

    @Patch("/favorites/:eventID")
    @UseGuards(JwtAuthGuard)
    Favorites(@Request() req , @Param("eventID") eventID:string){
        return this.eventService.FavoriteEvent(req.user.email , eventID);
    }

    @Patch("/unfavorite/:eventID")
    @UseGuards(JwtAuthGuard)
    Unfavorites(@Request() req , @Param("eventID") eventID:string){
        return this.eventService.UnFavoriteEvent(req.user.email , eventID);
    }
}
