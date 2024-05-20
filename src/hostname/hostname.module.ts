// src/hostname/hostname.module.ts
import { Module } from '@nestjs/common';
import { HostnameController } from './hostname.controller';

@Module({
  controllers: [HostnameController],
})
export class HostnameModule {}
