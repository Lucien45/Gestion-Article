/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<Users> {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('Email exist deja !');

    const hashedPassword: string = await bcrypt.hash(password, 10);

    let profilePath: string | null = null;
    if (file) {
      const fileName = `profiles/${Date.now()}-${file.originalname}`;
      const { error } = await this.supabaseService.uploadFile(
        fileName,
        file.buffer,
      );

      if (error) throw new Error('Erreur upload couverture ➜ ' + error.message);

      profilePath = fileName;
    }

    const user = new Users();
    Object.assign(user, createUserDto);
    user.password = hashedPassword;
    user.date_creation = new Date();
    user.lastLogin = null;
    user.profile = file ? profilePath : null;
    return await this.userRepository.save(user);
  }

  async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
    if (!user)
      throw new UnauthorizedException(
        'Aucun utilisateur trouvé avec cet identifiant.',
      );

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Mot de passe incorrect.');

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user?.profile,
        role: user.role,
      },
    };
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findUserById(userId: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles'],
    });

    if (!user) {
      throw new NotFoundException(`User avec ID ${userId} est introuvable`);
    }
    return user;
  }

  async getUserConnected(userId: number): Promise<Users> {
    return this.findUserById(userId);
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ): Promise<Users> {
    const user = await this.findUserById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    let profilePath = user?.profile;

    if (file) {
      // updateUserDto.profile = `media/profiles/${file.filename}`;
      const fileName = `profiles/${Date.now()}-${file.originalname}`;
      const { error } = await this.supabaseService.uploadFile(
        fileName,
        file.buffer,
      );
      if (error) throw new Error('Erreur upload couverture ➜ ' + error.message);

      profilePath = fileName;
    }

    if (updateUserDto.password && updateUserDto.password.trim() !== '') {
      if (user.password !== updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      } else {
        updateUserDto.password = user.password;
      }
    } else {
      delete updateUserDto.password;
    }

    updateUserDto.profile = profilePath;

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async removeUser(userId: number): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user)
      throw new NotFoundException(`User avec ID ${userId} est introuvable`);
    await this.userRepository.remove(user);
  }
}
