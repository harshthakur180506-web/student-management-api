import{
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable , tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();
    const method = request.method;
    const url = request.url;

    const start = Date.now();

    console.log(
      `Request:${request.method} ${request.url}| Status: ${response.statusCode}| Time:${Date.now()-now} ms `,
    );

    return next.handle().pipe(
      tap(()=>{
        const end = Date.now();

        console.log(
          `Request Complete in ${end-start} ms`,
        );
      }),
    );
  }
}
