import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id);
        Object.assign(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }

    async remove(id: number): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
}