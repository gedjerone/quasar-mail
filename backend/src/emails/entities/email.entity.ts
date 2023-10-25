import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('QEmails')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sentFrom: string;

  @Column()
  sentTo: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  type: string;

  @Column()
  date: string;

  @Column()
  isReaded: boolean;
}
