import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

describe('TasksService', () => {
    let service: TasksService;
    let repo: Repository<Task>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(Task),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        repo = module.get<Repository<Task>>(getRepositoryToken(Task));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should successfully create a task', async () => {
            const dto: CreateTaskDto = { title: 'Test task', description: 'Test description', status: TaskStatus.PENDING };
            const task = { id: 1, ...dto };

            (repo.create as jest.Mock).mockReturnValue(task);
            (repo.save as jest.Mock).mockResolvedValue(task);

            const result = await service.create(dto);
            expect(result).toEqual(task);
        });
    });

    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const tasks = [{ id: 1, title: 'Test task', description: 'Test description', status: TaskStatus.PENDING }];
            (repo.find as jest.Mock).mockResolvedValue(tasks);

            const result = await service.findAll();
            expect(result).toEqual(tasks);
        });
    });

    describe('findOne', () => {
        it('should get a single task', async () => {
            const task = { id: 1, title: 'Test task', description: 'Test description', status: TaskStatus.PENDING };
            (repo.findOne as jest.Mock).mockResolvedValue(task);

            const result = await service.findOne(1);
            expect(result).toEqual(task);
        });
    });

    describe('update', () => {
        it('should update a task', async () => {
            const task = { id: 1, title: 'Test task', description: 'Test description', status: TaskStatus.PENDING };
            (repo.findOne as jest.Mock).mockResolvedValue(task);
            (repo.save as jest.Mock).mockResolvedValue({ ...task, title: 'Updated task' });

            const result = await service.update(1, { title: 'Updated task' });
            expect(result.title).toEqual('Updated task');
        });
    });

    describe('remove', () => {
        it('should remove a task', async () => {
            (repo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

            await service.remove(1);
            expect(repo.delete).toHaveBeenCalledWith(1);
        });
    });
});