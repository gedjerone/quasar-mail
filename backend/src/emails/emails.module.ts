import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { EmailEntity } from './entities/email.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService],
  imports: [TypeOrmModule.forFeature([EmailEntity])],
})
export class EmailsModule {}
