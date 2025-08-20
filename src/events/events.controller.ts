import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any) {
    return this.eventsService.create(body);
  }

  @Get('user/:id')
  forUser(@Param('id') id: string) {
    return this.eventsService.forUser(parseInt(id, 10));
  }

  @Get(':id/messages')
  messages(@Param('id') id: string) {
    return this.eventsService.getMessages(parseInt(id, 10));
  }
}
