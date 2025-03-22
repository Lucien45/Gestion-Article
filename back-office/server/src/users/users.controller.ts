/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './media/profiles',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Photo de profile:', file);
    return this.usersService.register(createUserDto, file);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { identification, password } = body;

    if (!identification || typeof identification !== 'string') {
      throw new BadRequestException(
        'Le champ "identification" est requis et doit être une chaîne.',
      );
    }
    if (!password || typeof password !== 'string') {
      throw new BadRequestException(
        'Le champ "password" est requis et doit être une chaîne.',
      );
    }

    return this.usersService.login({ identifier: identification, password });
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getUserConnected(@Req() req: any) {
    console.log('User payload:', req.user); // Debugging
    console.log(JSON.stringify(req.user, null, 2));
    const userId = Number(req.user.sub);
    if (!userId || isNaN(userId)) {
      throw new BadRequestException(
        'Impossible de récupérer le profil utilisateur.',
      );
    }
    // return this.usersService.getUserConnected(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './media/profiles',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
