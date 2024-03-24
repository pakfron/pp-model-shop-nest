import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common"
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs"

interface ClassConstructor {
    new (...arg:any[]):{}
}

export function UserOutput(dto: ClassConstructor){
    return UseInterceptors(new UserInterCeptor(dto)) 
}

export class UserInterCeptor implements NestInterceptor{
    constructor(private dto:any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
              return plainToClass(this.dto, data, {
                excludeExtraneousValues: true,
              });
            }),
          );   
    }
}