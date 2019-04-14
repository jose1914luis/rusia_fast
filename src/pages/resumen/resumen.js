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
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var ResumenPage = /** @class */ (function () {
    function ResumenPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.cargar = true;
        this.resumen = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    ResumenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    ResumenPage.prototype.init = function () {
        var self = this;
        self.resumen = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.resumen.movimientos', [], ["concepto_id", "name", "evento_id", "dia", "Total_Pago_Clientes", "Total_Pagado_Web", "Total_Euros", "Total_Usd", "Total_Rub", "Total_Paypal", "Total_Tarjeta", "Total_Representante", "Total_Gastos", "Total_Beneficios", "tarjeta_usd", "tarjeta_rub", "tarjeta_eur", "gasto_rub", "gasto_usd", "gasto_eur", "gasto_paypal", "tarjeta_usd_pos", "tarjeta_eur_pos"]).then(function (datos) {
            self.resumen = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    ResumenPage.prototype.initItems = function () {
        for (var i = 0; i < this.resumen.length && i < this.max; i++) {
            this.items.push(this.resumen[i]);
        }
    };
    ResumenPage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    ResumenPage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.resumen.filter(function (item) {
                //console.log(String(item.name[1]).toLowerCase());
                return (String(item.name[1]).toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ResumenPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.resumen.length && i < _this.max + 10; i++) {
                _this.items.push(_this.resumen[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    ResumenPage = __decorate([
        Component({
            selector: 'page-resumen',
            templateUrl: 'resumen.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], ResumenPage);
    return ResumenPage;
}());
export { ResumenPage };
//# sourceMappingURL=resumen.js.map