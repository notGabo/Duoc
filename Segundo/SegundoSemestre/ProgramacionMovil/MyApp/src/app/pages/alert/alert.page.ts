import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  handlerMessage = '';

  constructor(private alertController: AlertController) { }

  async Ola() {
    const alert = await this.alertController.create({
      header: 'aaaaa titulo',
      subHeader: 'Ola',
      message: 'ola mami',
      buttons: ['xao'],
    });
    await alert.present();
  }

  //Metodo que muestra mensaje con 2 botones de accion
  async Consulta() {
    const alert = await this.alertController.create({
      header: 'Oe manito',
      subHeader: 'ola?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'xao';
          }
        },
        {
          text: 'Sis',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'ola';
          }
        },
        {
          text: 'Nosem',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Nosabe na uste';
          }
        }
      ],
    });
    await alert.present();
  }
   

  async notFormulario() {
    const alert = await this.alertController.create({
      header: 'Credencial caca',
      buttons: ['ta bn'],
      inputs: [
        {
          placeholder: 'nombre caca',
        },
        {
          placeholder: 'nick (de 8 letras noma)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'edad',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'k ases',
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
