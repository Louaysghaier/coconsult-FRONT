import { Component, OnInit } from '@angular/core';
import {
  barChartOutline,
  appsOutline,
  bulbOutline,
  callOutline,
  settingsOutline,
  videocam,
} from 'ionicons/icons';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
<<<<<<<< HEAD:src/app/user_dashboardRH_d/vertical-nav-bar/vertical-nav-bar.component.ts
    { path: '/user_dashboardRH_d/monprofil', title: 'mon-profile',  icon: 'person', class: '' },
    { path: '/user_dashboardRH_d/solutions', title: 'solutions',  icon:'dashboard', class: '' },
    { path: '/user_dashboardRH_d/settings', title: 'settings&Infos',  icon:'settingsOutline', class: '' },
    { path: '/user_dashboardRH_d/result', title: 'settings&Infos',  icon:'settingsOutline', class: '' },
========
    { path: '/user_dashboard_employe/monprofil', title: 'mon-profile',  icon: 'person', class: '' },
    { path: '/user_dashboard_employe/solutions', title: 'solutions',  icon:'dashboard', class: '' },
    { path: '/user_dashboard_employe/settings', title: 'settings&Infos',  icon:'dashboard', class: '' },
    { path: '/user_dashboard_employe/ticketlist', title: 'ticketlist',  icon:'dashboard', class: '' },
    { path: '/user_dashboard_employe/MeetingsListe', title: 'MeetingsListe',  icon:'dashboard', class: '' },
    { path: '/user_dashboard_employe/Activityuse', title: 'Activity',  icon:'dashboard', class: '' },

    







>>>>>>>> origin/achref:src/app/user_dashboard_employe/vertical-nav-bar/vertical-nav-bar.component.ts
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
  videocam=videocam;

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
