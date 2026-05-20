import { IsNotEmpty, IsString } from "class-validator";

export class SendRequestDTO {
    @IsString()
    @IsNotEmpty({ message: 'Please right your question' })
    input: string;
}