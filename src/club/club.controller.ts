import { Controller ,    Body,
    Param,
    Post,
    Get,
    Patch,
    Delete,
    UseGuards,
    Request} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('club')
export class ClubController {
      constructor(private readonly ClubService: ClubService) {}
    
      @Post("/register")
      create(@Body() CreateClubDto: CreateClubDto) {
        return this.ClubService.Create(CreateClubDto)
      }
    
      @Get('/profile')
      @UseGuards(JwtAuthGuard)
      findOne(@Request() req) {
        const Club = this.ClubService.findByEmail(req.user.email);
        return Club;
      }
    
      @Patch("/update")
      @UseGuards(JwtAuthGuard)
      update(@Request() req, @Body() UpdateClubDto: UpdateClubDto) {
        return this.ClubService.update(req.user.email , UpdateClubDto);
      }
    
      @Delete('/delete')
      @UseGuards(JwtAuthGuard)
      remove(@Request() req) {
        return this.ClubService.remove(req.user.email);
      }
}
