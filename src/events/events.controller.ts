import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any) {
    return this.eventsService.create(body);
  }

  @Get(':id/messages')
  messages(@Param('id') id: string) {
    return this.eventsService.getMessages(parseInt(id, 10));
  }
}
