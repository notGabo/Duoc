import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.page.html',
  styleUrls: ['./taller.page.scss'],
})
export class TallerPage implements OnInit {
  handlerMessae = '';

  constructor(private alertController: AlertController) { }

  async notCatForm() {
    const alert = await this.alertController.create({
      header: 'Tus datos para que te regalen gatos',
      buttons: ['garsias'],
      inputs: [
        {
          placeholder: 'nombre',
        },
        {
          placeholder: 'Direccion',
        },
        {
          type: 'number',
          placeholder: 'edad',
          min: 1,
          max: 100,
        },
      ],
    });
    await alert.present();
  }
  

  ngOnInit() {
  }

}
