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
var GeneralPage = /** @class */ (function () {
    function GeneralPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.cargar = true;
        this.general = [];
        this.items = [];
        this.max = 10;
        this.initgeneral();
    }
    GeneralPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    GeneralPage.prototype.initgeneral = function () {
        var self = this;
        self.general = [];
        self.cargar = true;
        self.getDatos.search_read('rusia.general', [], ["concepto_id", "evento_id", "fecha", "ciudad_id", "rublos", "euros", "usd", "tc_rub", "tc_eur", "tc_usd", "tarjeta_pp", "cancelado"]).then(function (datos) {
            self.general = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    GeneralPage.prototype.initItems = function () {
        for (var i = 0; i < this.general.length && i < this.max; i++) {
            this.items.push(this.general[i]);
        }
    };
    GeneralPage.prototype.onCancel = function (ev) {
        this.initItems();
    };
    GeneralPage.prototype.getItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.general.filter(function (item) {
                //console.log(String(item.name[1]).toLowerCase());
                return (String(item.evento_id[1]).toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    GeneralPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.general.length && i < _this.max + 10; i++) {
                _this.items.push(_this.general[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    GeneralPage = __decorate([
        Component({
            selector: 'page-general',
            templateUrl: 'general.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], GeneralPage);
    return GeneralPage;
}());
export { GeneralPage };
//# sourceMappingURL=general.js.map