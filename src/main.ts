require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { Request } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  rawBody: true,
});
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
    json({
      verify: (req: Request, res, buf) => {
        if (req.originalUrl.startsWith('/stripe/webhook')) {
          (req as any).rawBody = buf;
        }
      }
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
await app.listen(process.env.PORT || 3000);
}
bootstrap();
