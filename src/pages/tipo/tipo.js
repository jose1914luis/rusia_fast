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
import { TipoDPage } from '../../pages/tipo-d/tipo-d';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var TipoPage = /** @class */ (function () {
    function TipoPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.tipos = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    TipoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    TipoPage.prototype.init = function () {
        var self = this;
        self.tipos = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.tiposervicios', [], ["name", "Code", "Hora_Inicio", "Hora_Finalizar", "is_traslado", "is_guia", "ciudad_id", "hora_chofer", "Descripcion"]).then(function (datos) {
            self.tipos = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    TipoPage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    TipoPage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.tipos.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    TipoPage.prototype.initItems = function () {
        for (var i = 0; i < this.tipos.length && i < this.max; i++) {
            this.items.push(this.tipos[i]);
        }
    };
    TipoPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.tipos.length && i < _this.max + 10; i++) {
                _this.items.push(_this.tipos[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    TipoPage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(TipoDPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    TipoPage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(TipoDPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    TipoPage = __decorate([
        Component({
            selector: 'page-tipo',
            templateUrl: 'tipo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], TipoPage);
    return TipoPage;
}());
export { TipoPage };
//# sourceMappingURL=tipo.js.map