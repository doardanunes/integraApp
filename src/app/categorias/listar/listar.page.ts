import { Component } from '@angular/core';
import { CategoriaService } from './../../services/categoria.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage {

  public listarCategorias = [];

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  private carregarLista() {
    this.categoriaService.listar().subscribe(dados => {
      this.listarCategorias = dados['content'];
      this.presentToast('Categorias com sucesso!');
    });
  }

  ionViewWillEnter() {
    this.carregarLista();
  }

  public deletar(id: number) {
    this.categoriaService.deletar(id).subscribe(dados => {
      this.presentToast('Categoria deletada com sucesso!');
      this.carregarLista();
    });
  }
  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!!',
      message: `Deseja realmente excluir? <br/><strong>ID: ${id}</strong>!!!`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sim, Excluir',
          handler: () => {
            this.deletar(id);
          }
        }
      ]
    });
  }

}
