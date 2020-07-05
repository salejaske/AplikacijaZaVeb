import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
  getHIndex(): string {
    return 'Home page!';
  }
  

  
}
