import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'Return all tasks.', type: [Task] })
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    @ApiResponse({ status: 200, description: 'Return the task.', type: Task })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    findOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.update(+id, updateTaskDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.tasksService.remove(+id);
    }
}