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
import { ClienteDPage } from '../../pages/cliente-d/cliente-d';
var ClientePage = /** @class */ (function () {
    function ClientePage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.clientes = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    ClientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    ClientePage.prototype.init = function () {
        var self = this;
        self.clientes = [];
        self.cargar = true;
        self.getDatos.search_read('res.users', [["is_client", "=", true]], ["name", "email", "groups_id", "is_client", "is_correo", "mobile", "fax"]).then(function (datos) {
            self.clientes = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    ClientePage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    ClientePage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.clientes.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ClientePage.prototype.initItems = function () {
        for (var i = 0; i < this.clientes.length && i < this.max; i++) {
            this.items.push(this.clientes[i]);
        }
    };
    ClientePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.clientes.length && i < _this.max + 10; i++) {
                _this.items.push(_this.clientes[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    ClientePage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(ClienteDPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    ClientePage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(ClienteDPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    ClientePage = __decorate([
        Component({
            selector: 'page-cliente',
            templateUrl: 'cliente.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], ClientePage);
    return ClientePage;
}());
export { ClientePage };
//# sourceMappingURL=cliente.js.map