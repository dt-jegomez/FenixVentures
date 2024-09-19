import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
    @ApiProperty({
        description: 'The title of the task',
        example: 'Complete project proposal'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'A detailed description of the task',
        example: 'Write a comprehensive project proposal including timeline, budget, and deliverables.'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The current status of the task',
        enum: TaskStatus,
        example: TaskStatus.PENDING
    })
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}