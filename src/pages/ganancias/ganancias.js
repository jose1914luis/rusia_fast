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
var GananciasPage = /** @class */ (function () {
    function GananciasPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.cargar = true;
        this.ganancias = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    GananciasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    GananciasPage.prototype.init = function () {
        var self = this;
        self.ganancias = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.ganancias.totales', [], ["name", "fecha", "tipo_moneda", "monto", "ciudad_id"]).then(function (datos) {
            self.ganancias = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    GananciasPage.prototype.initItems = function () {
        for (var i = 0; i < this.ganancias.length && i < this.max; i++) {
            this.items.push(this.ganancias[i]);
        }
    };
    GananciasPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.ganancias.length && i < _this.max + 10; i++) {
                _this.items.push(_this.ganancias[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    GananciasPage = __decorate([
        Component({
            selector: 'page-ganancias',
            templateUrl: 'ganancias.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], GananciasPage);
    return GananciasPage;
}());
export { GananciasPage };
//# sourceMappingURL=ganancias.js.map