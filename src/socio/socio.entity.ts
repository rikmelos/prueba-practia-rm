import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Club } from '../club/club.entity';

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

  @ManyToMany(() => Club, (club) => club.socios)
  @JoinTable()
  clubs: Club[];
}
