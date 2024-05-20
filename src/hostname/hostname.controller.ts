// src/hostname/hostname.controller.ts
import { Controller, Get } from '@nestjs/common';
import * as os from 'os';

@Controller('hostname')
export class HostnameController {
  @Get()
  getHostname() {
    const hostname = os.hostname();
    return { hostname };
  }
}
