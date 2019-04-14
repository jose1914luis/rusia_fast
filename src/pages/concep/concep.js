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
import { ConcepDPage } from '../../pages/concep-d/concep-d';
var ConcepPage = /** @class */ (function () {
    function ConcepPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.conceps = [];
        this.init();
    }
    ConcepPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    ConcepPage.prototype.init = function () {
        var self = this;
        self.conceps = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.conceptos.gral', [], ["name", "ciudades"]).then(function (datos) {
            self.conceps = datos;
            self.cargar = false;
            //console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    ConcepPage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(ConcepDPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    ConcepPage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(ConcepDPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    ConcepPage = __decorate([
        Component({
            selector: 'page-concep',
            templateUrl: 'concep.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], ConcepPage);
    return ConcepPage;
}());
export { ConcepPage };
//# sourceMappingURL=concep.js.map