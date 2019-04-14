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
import { UsuarioDPage } from '../../pages/usuario-d/usuario-d';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { TablasProvider } from '../../providers/tablas/tablas';
var UsuarioPage = /** @class */ (function () {
    function UsuarioPage(tablas, navCtrl, navParams, getDatos, modalCtrl) {
        this.tablas = tablas;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.usuarios = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    UsuarioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    UsuarioPage.prototype.init = function () {
        var self = this;
        self.usuarios = [];
        self.cargar = true;
        self.getDatos.search_read('res.users', [], self.tablas.Tbl_user_odoo).then(function (datos) {
            self.usuarios = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    UsuarioPage.prototype.initItems = function () {
        for (var i = 0; i < this.usuarios.length && i < this.max; i++) {
            this.items.push(this.usuarios[i]);
        }
    };
    UsuarioPage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    UsuarioPage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.usuarios.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    UsuarioPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.usuarios.length && i < _this.max + 10; i++) {
                _this.items.push(_this.usuarios[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    UsuarioPage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(UsuarioDPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    UsuarioPage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(UsuarioDPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    UsuarioPage = __decorate([
        Component({
            selector: 'page-usuario',
            templateUrl: 'usuario.html',
        }),
        __metadata("design:paramtypes", [TablasProvider, NavController, NavParams, GetDatosProvider, ModalController])
    ], UsuarioPage);
    return UsuarioPage;
}());
export { UsuarioPage };
//# sourceMappingURL=usuario.js.map