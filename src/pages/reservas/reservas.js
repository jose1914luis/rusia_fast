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
import { DetallesReservaPage } from '../../pages/detalles-reserva/detalles-reserva';
var ReservasPage = /** @class */ (function () {
    function ReservasPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.reservas = [];
        this.items = [];
        this.max = 10;
        var self = this;
        //WHERE is_padre = "true"
        this.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE is_padre = "true" ORDER BY id DESC').then(function (eventos) {
            for (var i = 0; i < eventos.rows.length; i++) {
                var evento = eventos.rows.item(i);
                self.reservas.push(evento);
                console.log(JSON.stringify(eventos.rows.item(i)));
            }
            self.initItems();
        }, function () {
            console.log('Error Reservas');
        });
    }
    ReservasPage.prototype.initItems = function () {
        for (var i = 0; i < this.reservas.length && i < this.max; i++) {
            this.items.push(this.reservas[i]);
        }
    };
    ReservasPage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    ReservasPage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.reservas.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ReservasPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.reservas.length && i < _this.max + 10; i++) {
                _this.items.push(_this.reservas[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    ReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservasPage');
    };
    ReservasPage.prototype.abrir_reserva = function (reserva) {
        this.navCtrl.push(DetallesReservaPage, { evento: reserva, permisos: 'is_guia', padre: true });
    };
    ReservasPage = __decorate([
        Component({
            selector: 'page-reservas',
            templateUrl: 'reservas.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], ReservasPage);
    return ReservasPage;
}());
export { ReservasPage };
//# sourceMappingURL=reservas.js.map