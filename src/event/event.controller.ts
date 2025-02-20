import { Body, Controller, Delete, Get, Post , Request , Param , Patch, UseGuards , Put , Query} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService){}
    @Get("/byuser")
    @UseGuards(JwtAuthGuard)
    getEvents(){
        return this.eventService.FindAllEventByUser();
    }

    @Get("/namebyuser")
    @UseGuards(JwtAuthGuard)
    getEventName(@Query("eventName") eventName: string){
        return this.eventService.FindEventNameByUser(eventName);
    }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    CreateEvent(@Request() req , @Body() CreateEventDto:CreateEventDto){
        return this.eventService.CreateEventByClub(req.user.email , CreateEventDto);
    }

    @Delete("/deletebyclub:eventID")
    @UseGuards(JwtAuthGuard)
    DeleteEventByClub(@Request() req , @Param("eventID") eventID:string){
        return this.eventService.DeleteEventByClub(req.user.email , eventID);
    }

    @Patch("/updatebyclub:eventID")
    @UseGuards(JwtAuthGuard)
    UpdateEventByClub(@Request() req ,  @Param("eventID") eventID:string , UpdateEventDto:UpdateEventDto){
        return this.eventService.UpdateEventByClub(req.user.email , eventID , UpdateEventDto);
    }

    @Get("/getallbyclub")
    @UseGuards(JwtAuthGuard)
    GetAllEventByClub(@Request() req){
        return this.eventService.FindAllEventByClub(req.user.email);
    }

    @Get("/getonebyclub:eventID")
    @UseGuards(JwtAuthGuard)
    GetOneEventByClub(@Request() req , @Param("eventID") eventID:string){
        return this.eventService.FindOneEventByClub(req.user.email , eventID);
    }

    @Put("/approvebyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    ApproveEventByAdmin(@Request() req , @Param('eventID') eventID: string, @Body("status") status:string){
        return this.eventService.ApproveEventByAdmin(req.user.email , eventID , status);
    }

    @Get("/getallbyadmin")
    @UseGuards(JwtAuthGuard)
    GetAllEventByAdmin(@Request() req){
        return this.eventService.FindAllEventByAdmin(req.user.email);
    }

    @Get("/getnamebyadmin")
    @UseGuards(JwtAuthGuard)
    GetNameEventByAdmin(@Request() req , @Body("eventName") eventName : string){
        return this.eventService.FindEventNameByAdmin(req.user.email , eventName);
    }

    @Delete("/deleteeventbyadmin:eventID")
    @UseGuards(JwtAuthGuard)
    DeleteeventByAdmin(@Request() req , @Param("eventID") eventID:string){
        return this.eventService.DeleteEventByAdmin(req.user.email , eventID);
    }

    @Patch("/updateeventbyadmin:eventID")
    @UseGuards(JwtAuthGuard)
    UpdateeventByAdmin(@Request() req , @Param("eventID") eventID:string ,  UpdateEventDto : UpdateEventDto){
        return this.eventService.UpdateEventByAdmin(req.user.email ,eventID ,UpdateEventDto);
    }
}
