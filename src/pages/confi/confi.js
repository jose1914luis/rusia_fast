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
import { CiudadPage } from '../../pages/ciudad/ciudad';
import { UsuarioPage } from '../../pages/usuario/usuario';
import { ClientePage } from '../../pages/cliente/cliente';
import { TipoPage } from '../../pages/tipo/tipo';
import { GastosTPage } from '../../pages/gastos-t/gastos-t';
import { GastosEPage } from '../../pages/gastos-e/gastos-e';
import { BenePage } from '../../pages/bene/bene';
import { ConcepPage } from '../../pages/concep/concep';
import { DocPage } from '../../pages/doc/doc';
import { FormPage } from '../../pages/form/form';
var ConfiPage = /** @class */ (function () {
    function ConfiPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menus = [
            { title: 'Ciudades', component: CiudadPage },
            { title: 'Usuarios', component: UsuarioPage },
            { title: 'Clientes', component: ClientePage },
            { title: 'Tipo de servicio', component: TipoPage },
            { title: 'Gastos tours', component: GastosTPage },
            { title: 'Gastos Extras', component: GastosEPage },
            { title: 'Beneficios Extras', component: BenePage },
            { title: 'Conceptos Generales', component: ConcepPage },
            { title: 'Documentos', component: DocPage },
            { title: 'Formularios', component: FormPage },
        ];
    }
    ConfiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfiPage');
    };
    ConfiPage.prototype.menuSelected = function (menu) {
        this.navCtrl.push(menu.component);
    };
    ConfiPage = __decorate([
        Component({
            selector: 'page-confi',
            templateUrl: 'confi.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ConfiPage);
    return ConfiPage;
}());
export { ConfiPage };
//# sourceMappingURL=confi.js.map