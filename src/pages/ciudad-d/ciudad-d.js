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
var CiudadDPage = /** @class */ (function () {
    function CiudadDPage(alertCtrl, getDatos, viewCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.getDatos = getDatos;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ciudad = {
            id: null,
            name: null,
            Tel_Emergency: null,
            Code: null
        };
        this.control = false;
        this.read = true;
        this.cargar = false;
        var item = this.navParams.get('item');
        if (!item) {
            this.control = true;
            this.read = false;
        }
        else {
            this.ciudad = this.navParams.get('item');
        }
    }
    CiudadDPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadDPage');
    };
    CiudadDPage.prototype.closeModal = function () {
        this.ciudad.id = null;
        this.viewCtrl.dismiss(this.ciudad);
    };
    CiudadDPage.prototype.editar = function () {
        this.read = false;
        this.control = true;
    };
    CiudadDPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        if (self.ciudad.id != null) {
            self.getDatos.write('rusia.ciudades', this.ciudad.id, this.ciudad).then(function (good) {
                self.ciudad.id = 1;
                self.viewCtrl.dismiss(self.ciudad);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
        else {
            //console.log('entro');
            self.getDatos.create('rusia.ciudades', this.ciudad).then(function (good) {
                self.ciudad.id = 1;
                self.viewCtrl.dismiss(self.ciudad);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
    };
    CiudadDPage.prototype.borrar = function () {
        var self = this;
        self.cargar = true;
        self.getDatos.delete('rusia.ciudades', this.ciudad.id).then(function (good) {
            self.viewCtrl.dismiss(self.ciudad);
            self.cargar = false;
        }, function (bad) {
            console.log('fail');
            self.presentAlert('Error!', 'Error al intentar borrar, vuelva a intentarlo');
            self.cargar = false;
        });
    };
    CiudadDPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    CiudadDPage = __decorate([
        Component({
            selector: 'page-ciudad-d',
            templateUrl: 'ciudad-d.html',
        }),
        __metadata("design:paramtypes", [AlertController, GetDatosProvider, ViewController, NavController, NavParams])
    ], CiudadDPage);
    return CiudadDPage;
}());
export { CiudadDPage };
//# sourceMappingURL=ciudad-d.js.map