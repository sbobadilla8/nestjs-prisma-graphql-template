import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { PrismaService } from "src/prisma.service";

@Module({
   providers: [PostResolver, PrismaService],
})
export class PostModule {}
