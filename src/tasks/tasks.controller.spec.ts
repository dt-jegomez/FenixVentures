import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';

describe('TasksController', () => {
    let controller: TasksController;
    let service: TasksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<TasksController>(TasksController);
        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new task', async () => {
            const createTaskDto: CreateTaskDto = { title: 'Test task', description: 'Test description', status: TaskStatus.PENDING };
            const task = { id: 1, ...createTaskDto };

            (service.create as jest.Mock).mockResolvedValue(task);

            const result = await controller.create(createTaskDto);
            expect(result).toEqual(task);
        });
    });

    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const tasks = [{ id: 1, title: 'Test task', description: 'Test description', status: TaskStatus.PENDING }];
            (service.findAll as jest.Mock).mockResolvedValue(tasks);

            const result = await controller.findAll();
            expect(result).toEqual(tasks);
        });
    });

    describe('findOne', () => {
        it('should get a single task', async () => {
            const task = { id: 1, title: 'Test task', description: 'Test description', status: TaskStatus.PENDING };
            (service.findOne as jest.Mock).mockResolvedValue(task);

            const result = await controller.findOne('1');
            expect(result).toEqual(task);
        });
    });

    describe('update', () => {
        it('should update a task', async () => {
            const updateTaskDto: UpdateTaskDto = { title: 'Updated task' };
            const task = { id: 1, title: 'Updated task', description: 'Test description', status: TaskStatus.PENDING };

            (service.update as jest.Mock).mockResolvedValue(task);

            const result = await controller.update('1', updateTaskDto);
            expect(result).toEqual(task);
        });
    });

    describe('remove', () => {
        it('should remove a task', async () => {
            (service.remove as jest.Mock).mockResolvedValue(undefined);

            const result = await controller.remove('1');
            expect(result).toBeUndefined();
        });
    });
});