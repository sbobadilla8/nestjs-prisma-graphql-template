import {
   Resolver,
   Query,
   Mutation,
   Context,
   Args,
   Int,
   ResolveField,
   Root,
} from "@nestjs/graphql";
// import { CatsService } from "./cats.service";
import { Cat } from "./entities/cat.entity";
import { CreateCatInput } from "./dto/create-cat.input";
import { UpdateCatInput } from "./dto/update-cat.input";
import { PrismaService } from "src/prisma.service";
import { User } from "src/user/entities/user.entity";

@Resolver(() => Cat)
export class CatsResolver {
   constructor(private readonly prismaService: PrismaService) {}

   @ResolveField()
   owner(@Root() owner: User): Promise<User> {
      return this.prismaService.user.findUnique({
         where: {
            id: owner.id,
         },
      });
   }

   @Mutation(() => Cat)
   createCat(
      @Args("createCatInput") data: CreateCatInput,
      @Args("ownerId") ownerId: number
   ) {
      return this.prismaService.cats.create({
         data: {
            name: data.name,
            ownerId: ownerId,
         },
      });
   }

   @Query(() => [Cat], { name: "cats" })
   findAll() {
      return this.prismaService.cats.findMany();
   }

   @Query(() => Cat, { name: "cat" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.prismaService.cats.findUnique({
         where: { id },
      });
   }

   @Mutation(() => Cat)
   updateCat(@Args("updateCatInput") data: UpdateCatInput) {
      return this.prismaService.cats.update({
         where: { id: data.id },
         data: { name: data.name },
      });
   }

   @Mutation(() => Cat)
   removeCat(@Args("id", { type: () => Int }) id: number) {
      return this.prismaService.cats.delete({
         where: {
            id: id,
         },
      });
   }
}
