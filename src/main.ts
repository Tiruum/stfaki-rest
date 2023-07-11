import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { logger } from "./logger.middleware";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    // Swagger documentation builder
    const config = new DocumentBuilder()
    .setTitle('DASR Dorm Rest Apiссался')
    .setDescription('Rest api приложение для работы студенческих сервисов общежития ФАКТ')
    .setVersion('1.0.0')
    .setContact('Timur Selin', 'https://vk.com/tiruum', 'selin.ta@phystech.edu')
    .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.use(logger)

    await app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
}

start()