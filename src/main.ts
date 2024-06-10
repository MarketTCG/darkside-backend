require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.enableCors()


// Swagger setup
const config = new DocumentBuilder()
.setTitle('API Documentation')
.setDescription('The API description')
.setVersion('1.0')
.addTag('auth')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
await app.listen(process.env.PORT || 3000);
}
bootstrap();
