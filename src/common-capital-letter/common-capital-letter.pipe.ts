import {
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CapitalLetterPipe
  implements PipeTransform {

  transform(value: string) {

    return (
      value.charAt(0).toUpperCase() +
      value.slice(1)
    );
  }
} 