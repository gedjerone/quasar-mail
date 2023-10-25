import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('emails')
@ApiTags('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('create')
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.create(createEmailDto);
  }

  @Post('update')
  update(@Query('id') id: number, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update(id, updateEmailDto);
  }

  @Post('generate')
  generate(@Query('amount') amount: number) {
    return this.emailsService.generate(amount);
  }

  @Get()
  findAll() {
    return this.emailsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.emailsService.findOneBy(id);
  }
}
