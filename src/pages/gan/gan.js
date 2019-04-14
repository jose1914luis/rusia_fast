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
import { GananciasPage } from '../../pages/ganancias/ganancias';
import { ResumenPage } from '../../pages/resumen/resumen';
import { GeneralPage } from '../../pages/general/general';
var GanPage = /** @class */ (function () {
    function GanPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menus = [
            { title: 'Ganancias totales', component: GananciasPage },
            { title: 'Resumen movimientos', component: ResumenPage },
            { title: 'General', component: GeneralPage }
        ];
    }
    GanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfiPage');
    };
    GanPage.prototype.menuSelected = function (menu) {
        this.navCtrl.push(menu.component);
    };
    GanPage = __decorate([
        Component({
            selector: 'page-gan',
            templateUrl: 'gan.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], GanPage);
    return GanPage;
}());
export { GanPage };
//# sourceMappingURL=gan.js.map