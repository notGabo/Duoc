import { Component, OnInit } from '@angular/core';

interface Componente{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'balloon-outline',
      name: 'Alert',
      redirectTo: '/alert'
    },
    {
      icon: 'cube-outline',
      name: 'Action-Sheet',
      redirectTo: '/action-sheet'
    },
    {
      icon: 'id-card-outline',
      name: 'Card',
      redirectTo: '/card'
    },
    {
      icon: 'image-outline',
      name: 'Gifs de gatos',
      redirectTo: '/taller'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
