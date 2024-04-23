import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/admindashboard', title: 'ADMINDashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'Ajouter solution',  icon:'person', class: '' },
    { path: '/admin/table-list', title: 'Liste user',  icon:'content_paste', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    {path: '/admin/ChatRooms', title: 'ChatRooms',  icon:'forum', class: '' },
    {path: '/admin/assignement', title:'Assignments', icon:'assignment', class:''},
    {path: '/admin/expanses', title:'Expanses', icon:'monetization_on', class:''},
    {path: '/admin/quote', title:'Quote', icon:'monetization_on', class:''},
    {path: '/admin/time-record', title:'TimeRecord', icon:'monetization_on', class:''},
    {path: '/admin/projects', title:'Projects', icon:'monetization_on', class:''},
    {path: '/admin/proj-feed', title:'ProjectFeed', icon:'monetization_on', class:''},

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;

  };
}
