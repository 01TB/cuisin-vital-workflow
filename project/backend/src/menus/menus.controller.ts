import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenusService } from './menus.service';

@Controller('menus')
@UseGuards(AuthGuard('jwt'))
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.menusService.findAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Post()
  create(@Body() menuData: any) {
    return this.menusService.create(menuData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() menuData: any) {
    return this.menusService.update(+id, menuData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}