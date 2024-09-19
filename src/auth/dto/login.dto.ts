import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '1234',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}