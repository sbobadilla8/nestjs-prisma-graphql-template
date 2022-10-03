import { InputType, Int, Field } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";

@InputType()
export class CreateCatInput {
   @Field({ nullable: false })
   name: string;
}
