import "reflect-metadata";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { IsString } from "class-validator";

@ObjectType()
export class Cat {
   @Field(() => Int, { description: "Example field (placeholder)" })
   id: number;

   @Field({ nullable: false })
   @IsString()
   name: string;

   @Field((type) => User, { nullable: false })
   owner: User;
}
