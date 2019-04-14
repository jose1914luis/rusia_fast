var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
/**
 * Generated class for the TipoDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TipoDPage = /** @class */ (function () {
    function TipoDPage(alertCtrl, getDatos, viewCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.getDatos = getDatos;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tipo = {
            id: null,
            name: null,
            Code: null,
            Hora_Inicio: null,
            Hora_Finalizar: null,
            Descripcion: null,
            is_traslado: false,
            is_guia: false,
            ciudad_id: [],
            hora_chofer: null
        };
        this.control = false;
        this.read = true;
        this.cargar = true;
        this.ciudades = [];
        var item = this.navParams.get('item');
        if (!item) {
            this.control = true;
            this.read = false;
        }
        else {
            this.tipo = this.navParams.get('item');
        }
        var self = this;
        self.getDatos.ejecutarSQL('SELECT * FROM ciudad').then(function (ciudad) {
            for (var i = 0; i < ciudad.rows.length; i++) {
                self.ciudades.push(ciudad.rows.item(i));
            }
            //console.log(JSON.stringify(ciudad.rows));
            self.cargar = false;
        }, function (fail) {
            console.log('Fail load gastos');
        });
    }
    TipoDPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadDPage');
    };
    TipoDPage.prototype.closeModal = function () {
        this.tipo.id = null;
        this.viewCtrl.dismiss(this.tipo);
    };
    TipoDPage.prototype.editar = function () {
        this.read = false;
        this.control = true;
    };
    TipoDPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        var tipo_tmp = {
            id: self.tipo.id,
            name: self.tipo.name,
            Code: self.tipo.Code,
            Hora_Inicio: self.tipo.Hora_Inicio,
            Hora_Finalizar: self.tipo.Hora_Finalizar,
            Descripcion: self.tipo.Descripcion,
            is_traslado: self.tipo.is_traslado,
            is_guia: self.tipo.is_guia,
            ciudad_id: self.tipo.ciudad_id[0],
            hora_chofer: self.tipo.hora_chofer
        };
        if (self.tipo.id != null) {
            self.getDatos.write('rusia.tiposervicios', this.tipo.id, tipo_tmp).then(function (good) {
                self.tipo.id = 1;
                self.viewCtrl.dismiss(self.tipo);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
        else {
            //console.log('entro');
            self.getDatos.create('rusia.tiposervicios', tipo_tmp).then(function (good) {
                self.tipo.id = 1;
                self.viewCtrl.dismiss(self.tipo);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
    };
    TipoDPage.prototype.borrar = function () {
        var self = this;
        self.cargar = true;
        self.getDatos.delete('rusia.tiposervicios', this.tipo.id).then(function (good) {
            self.viewCtrl.dismiss(self.tipo);
            self.cargar = false;
        }, function (bad) {
            console.log('fail');
            self.presentAlert('Error!', 'Error al intentar borrar, vuelva a intentarlo');
            self.cargar = false;
        });
    };
    TipoDPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    TipoDPage = __decorate([
        Component({
            selector: 'page-tipo-d',
            templateUrl: 'tipo-d.html',
        }),
        __metadata("design:paramtypes", [AlertController, GetDatosProvider, ViewController, NavController, NavParams])
    ], TipoDPage);
    return TipoDPage;
}());
export { TipoDPage };
//# sourceMappingURL=tipo-d.js.map