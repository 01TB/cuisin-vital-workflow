import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  async getStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('recent-orders')
  async getRecentOrders() {
    return this.dashboardService.getRecentOrders();
  }
}