import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { statutId: number }) {
    return this.ordersService.updateStatus(id, body.statutId);
  }
}