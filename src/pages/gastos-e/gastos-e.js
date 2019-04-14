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
var GastosEPage = /** @class */ (function () {
    function GastosEPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.cargar = true;
        this.gastos = [];
        this.items = [];
        this.max = 10;
        this.initGastos();
    }
    GastosEPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    GastosEPage.prototype.initGastos = function () {
        var self = this;
        self.gastos = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.gastos.extras', [], ["name", "fecha", "tipo_moneda", "monto", "ciudad_id", "cancelado"]).then(function (datos) {
            self.gastos = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    GastosEPage.prototype.initItems = function () {
        for (var i = 0; i < this.gastos.length && i < this.max; i++) {
            this.items.push(this.gastos[i]);
        }
    };
    GastosEPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.gastos.length && i < _this.max + 10; i++) {
                _this.items.push(_this.gastos[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    GastosEPage = __decorate([
        Component({
            selector: 'page-gastos-e',
            templateUrl: 'gastos-e.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], GastosEPage);
    return GastosEPage;
}());
export { GastosEPage };
//# sourceMappingURL=gastos-e.js.map