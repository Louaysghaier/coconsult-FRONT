import { Component, OnInit } from '@angular/core';
import {
  barChartOutline,
  appsOutline,
  bulbOutline,
  callOutline,
  settingsOutline,
} from 'ionicons/icons';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user_dashboard/monprofil', title: 'mon-profile',  icon: 'person', class: '' },
    { path: '/user_dashboard/solutions', title: 'solutions',  icon:'dashboard', class: '' },
    { path: '/user_dashboard/settings', title: 'Sales Team Activity',  icon:'settingsOutline', class: '' },
    { path: '/user_dashboard/repertoire', title: 'Repertoires',  icon: 'person', class: '' },
    { path: '/user_dashboard/prospect', title: 'Prospect',  icon: 'person', class: '' },
    { path: '/user_dashboard/contract', title: 'Contracts',  icon: 'person', class: '' },
    { path: '/user_dashboard/activity-sales-team', title: 'Activity',  icon: 'person', class: '' },
    { path: '/user_dashboard/payement', title: 'Sales Dashboard',  icon: 'person', class: '' },




];

@Component({
  selector: 'app-vertical-nav-bar',
  templateUrl: './vertical-nav-bar.component.html',
  styleUrls: ['./vertical-nav-bar.component.css']
})
export class VerticalNavBarComponent implements OnInit {
  barChartOutline = barChartOutline;
  appsOutline = appsOutline;
  bulbOutline = bulbOutline;
  callOutline = callOutline;
  settingsOutline = settingsOutline;

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
