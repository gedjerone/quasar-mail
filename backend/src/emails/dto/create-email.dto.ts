import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({
    default: 'test.from@gmail.com',
  })
  sentFrom: string;
  @ApiProperty({
    default: 'test.to@gmail.com',
  })
  sentTo: string;
  @ApiProperty({
    default: 'Test Subject',
  })
  subject: string;
  @ApiProperty({
    default: 'Test body text',
  })
  body: string;
  @ApiProperty({
    default: 'drafts',
  })
  type: string;
  @ApiProperty({
    default: '2023-10-25 04:39:12',
  })
  date: string;
  @ApiProperty({
    default: false,
  })
  isReaded: boolean;
}
