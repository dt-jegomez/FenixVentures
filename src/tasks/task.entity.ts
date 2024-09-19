import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
    @ApiProperty({
        description: 'The unique identifier of the task',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The title of the task',
        example: 'Complete project proposal'
    })
    @Column()
    title: string;

    @ApiProperty({
        description: 'A detailed description of the task',
        example: 'Write a comprehensive project proposal including timeline, budget, and deliverables.'
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'The current status of the task',
        enum: TaskStatus,
        example: TaskStatus.PENDING
    })
    @Column({
        type: 'simple-enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING
    })
    status: TaskStatus;
}