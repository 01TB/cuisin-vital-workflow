import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email, deleted_at: null },
      relations: ['role'],
    });

    if (user && await bcrypt.compare(password, user.mot_de_passe)) {
      const { mot_de_passe, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role.nom };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role.nom,
      },
    };
  }

  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
    const user = this.userRepository.create({
      ...userData,
      mot_de_passe: hashedPassword,
    });
    
    const savedUser = await this.userRepository.save(user);
    const { mot_de_passe, ...result } = savedUser[0];
    return result;
  }
}