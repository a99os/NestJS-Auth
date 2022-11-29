import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UnknownConstraintError } from 'sequelize';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Foydalanuvchi avtorizatsiyadan o`tmagan',
        });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      if (req.method == 'DELETE' || req.method == 'PUT') {
        console.log(user);
        let role = true;
        user.roles.forEach((val) => {
          if (val.value == 'ADMIN') role = false;
        });
        if (req.params.id != user.id && role) {
          throw new UnauthorizedException({
            message: 'Sizga mumkin emas',
          });
        }
      }
      console.log(user);
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: error.message || 'Foydalanuvchi avtorizatsiyadan o`tmagan',
      });
    }
  }
}
