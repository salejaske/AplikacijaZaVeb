import * as Validator from 'class-validator';

export class ChangeOrderStatusDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.IsIn(["prihvacena", "odbijena", "na cekanju"])
    newStatus: "prihvacena" | "odbijena" | "na cekanju";
}
