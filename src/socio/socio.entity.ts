import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;
}
