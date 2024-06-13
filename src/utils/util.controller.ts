import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UtilService } from './util.service';

@ApiTags('util')
@Controller('util')
export class UtilController {
  constructor(private readonly utilService: UtilService) {}

  @Get('perform-operation')
  @ApiOperation({ summary: 'Perform a utility operation' })
  @ApiResponse({ status: 200, description: 'Utility operation performed successfully' })
  async performUtilityOperation(): Promise<any> {
    return this.utilService.performUtilityOperation();
  }

}
