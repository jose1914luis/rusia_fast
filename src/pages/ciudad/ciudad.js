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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { CiudadDPage } from '../../pages/ciudad-d/ciudad-d';
var CiudadPage = /** @class */ (function () {
    function CiudadPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.ciudades = [];
        this.initCiudades();
    }
    CiudadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    CiudadPage.prototype.initCiudades = function () {
        var self = this;
        self.ciudades = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.ciudades', [], ["name", "Tel_Emergency", "Code"]).then(function (datos) {
            self.ciudades = datos;
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    CiudadPage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(CiudadDPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.initCiudades();
            }
        });
        profileModal.present();
    };
    CiudadPage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(CiudadDPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.initCiudades();
            }
        });
        profileModal.present();
    };
    CiudadPage = __decorate([
        Component({
            selector: 'page-ciudad',
            templateUrl: 'ciudad.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], CiudadPage);
    return CiudadPage;
}());
export { CiudadPage };
//# sourceMappingURL=ciudad.js.map