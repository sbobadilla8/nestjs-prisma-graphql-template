import { Module } from "@nestjs/common";
import { CatsResolver } from "./cats.resolver";
import { PrismaService } from "src/prisma.service";

@Module({
   providers: [CatsResolver, PrismaService],
})
export class CatsModule {}
