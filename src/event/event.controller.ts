import { Body, Controller, Delete, Get, Post , Request , Param , Patch, UseGuards , Put , Query, HttpException, HttpStatus} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    async getEventName(@Query("eventName") eventName: string){
        const result = await this.EventUserService.FindEventNameByUser(eventName);
        if(!result){
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    async CreateEvent(@Request() req , @Body() CreateEventDto:CreateEventDto){
        const result = await this.EventClubService.CreateEventByClub(req.user.email , CreateEventDto);
        if(!result){
            throw new HttpException("Club or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Delete("/deletebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    async DeleteEventByClub(@Request() req , @Param("eventID") eventID:string){
        const result = await this.EventClubService.DeleteEventByClub(req.user.email , eventID);
        if(!result){
            throw new HttpException("Club or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Patch("/updatebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    async UpdateEventByClub(@Request() req ,  @Param("eventID") eventID:string ,@Body() UpdateEventDto:UpdateEventDto){
        const result = await this.EventClubService.UpdateEventByClub(req.user.email , eventID , UpdateEventDto);
        if(!result){
            throw new HttpException("Club or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Get("/getallbyclub")
    @UseGuards(JwtAuthGuard)
    async GetAllEventByClub(@Request() req){
        const result = await this.EventClubService.FindAllEventByClub(req.user.email);
        if(!result){
            throw new HttpException("Club or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Get("/getonebyclub/:eventID")
    @UseGuards(JwtAuthGuard)
    async GetOneEventByClub(@Request() req , @Param("eventID") eventID:string){
        const result = await this.EventClubService.FindOneEventByClub(req.user.email , eventID);
        if(!result){
            throw new HttpException("Club or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Put("/approvebyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    async ApproveEventByAdmin(@Request() req , @Param('eventID') eventID: string, @Body("status") status:string){
        const result = await this.EventAdminService.ApproveEventByAdmin(req.user.email , eventID , status);
        if(!result){
            throw new HttpException("Admin or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Get("/getallbyadmin")
    @UseGuards(JwtAuthGuard)
    async GetAllEventByAdmin(@Request() req){
        const result = await this.EventAdminService.FindAllEventByAdmin(req.user.email);
        if(!result){
            throw new HttpException("Admin or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Get("/getnamebyadmin")
    @UseGuards(JwtAuthGuard)
    async GetNameEventByAdmin(@Request() req , @Body("eventName") eventName : string){
        const result = await this.EventAdminService.FindEventNameByAdmin(req.user.email , eventName);
        if(!result){
            throw new HttpException("Admin or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Delete("/deleteeventbyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    async DeleteeventByAdmin(@Request() req , @Param("eventID") eventID:string){
        const result = await this.EventAdminService.DeleteEventByAdmin(req.user.email , eventID);
        if(!result){
            throw new HttpException("Admin or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Patch("/updateeventbyadmin/:eventID")
    @UseGuards(JwtAuthGuard)
    async UpdateeventByAdmin(@Request() req , @Param("eventID") eventID:string ,@Body()  UpdateEventDto : UpdateEventDto){
        const result = await this.EventAdminService.UpdateEventByAdmin(req.user.email ,eventID ,UpdateEventDto);
        if(!result){
            throw new HttpException("Admin or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Patch("/favorites/:eventID")
    @UseGuards(JwtAuthGuard)
    async Favorites(@Request() req , @Param("eventID") eventID:string){
        const result = await this.eventService.FavoriteEvent(req.user.email , eventID);
        if(result == null){
            throw new HttpException("User or Event or UUID not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @Patch("/unfavorite/:eventID")
    @UseGuards(JwtAuthGuard)
    async Unfavorites(@Request() req , @Param("eventID") eventID:string){
        const result = await this.eventService.UnFavoriteEvent(req.user.email , eventID);
        if(result == null){
            throw new HttpException("User or Event not found" , HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
