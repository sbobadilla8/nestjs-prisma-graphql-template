import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PrismaService } from "./prisma.service";
import { join } from "path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { CatsModule } from "./cats/cats.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         playground: false,
         plugins: [ApolloServerPluginLandingPageLocalDefault()],
         autoSchemaFile: join(process.cwd(), "src/schema.gql"),
         buildSchemaOptions: { dateScalarMode: "timestamp" },
      }),
      CatsModule,
      PostModule,
      UserModule,
   ],
   controllers: [],
   providers: [PrismaService],
})
export class AppModule {}
