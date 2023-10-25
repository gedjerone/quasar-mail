import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailEntity } from './entities/email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const randString = () => {
  return Math.random().toString(32).substring(2, 12);
};

const addZeroAsFirst = (val) => {
  return val < 10 ? '0'.concat(val) : val;
};

export const dateFormater = (date) => {
  const year = date.getFullYear();
  const month = addZeroAsFirst(date.getMonth() + 1);
  const day = addZeroAsFirst(date.getDate());
  const hour = addZeroAsFirst(date.getHours());
  const minutes = addZeroAsFirst(date.getMinutes());
  const seconds = addZeroAsFirst(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

const getRandomEmail = () => {
  const sentFrom = randString().concat('@qmail.com');
  const subject = randString();
  const body = randString().concat(' ').repeat(16);

  return {
    sentFrom: sentFrom,
    sentTo: 'me@qmail.com',
    subject: subject.charAt(0).toUpperCase() + subject.slice(1),
    body: body,
    type: 'inbox',
    date: dateFormater(randomDate(new Date(2012, 0, 1), new Date())),
    isReaded: false,
  };
};

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(EmailEntity)
    private repository: Repository<EmailEntity>,
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    try {
      await this.repository.save(createEmailDto);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    try {
      const emailData = await this.findOneBy(id);
      emailData.sentFrom = updateEmailDto.sentFrom;
      emailData.sentTo = updateEmailDto.sentTo;
      emailData.subject = updateEmailDto.subject;
      emailData.body = updateEmailDto.body;
      emailData.type = updateEmailDto.type;
      emailData.isReaded = updateEmailDto?.isReaded;

      await this.repository.save(emailData);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async generate(amount: number) {
    const createEmailDtoArray: Array<CreateEmailDto> = [];

    for (let i = 0; i < amount; i++) {
      createEmailDtoArray.push(getRandomEmail());
    }

    createEmailDtoArray.map(async (dto) => await this.repository.save(dto));
  }

  async findAll() {
    return this.repository.find();
  }

  async findOneBy(id: number) {
    return this.repository.findOneBy({ id });
  }
}
