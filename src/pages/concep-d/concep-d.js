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
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var ConcepDPage = /** @class */ (function () {
    function ConcepDPage(alertCtrl, getDatos, viewCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.getDatos = getDatos;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.concep = {
            id: null,
            name: null,
            ciudades: [],
        };
        this.control = false;
        this.read = true;
        this.cargar = true;
        this.ciudades = [];
        var item = this.navParams.get('item');
        if (!item) {
            this.control = true;
            this.read = false;
        }
        else {
            this.concep = this.navParams.get('item');
        }
        var self = this;
        self.getDatos.ejecutarSQL('SELECT * FROM ciudad').then(function (ciudad) {
            for (var i = 0; i < ciudad.rows.length; i++) {
                self.ciudades.push(ciudad.rows.item(i));
            }
            //console.log(JSON.stringify(ciudad.rows));
            self.cargar = false;
        }, function (fail) {
            console.log('Fail load gastos');
        });
    }
    ConcepDPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadDPage');
    };
    ConcepDPage.prototype.closeModal = function () {
        this.concep.id = null;
        this.viewCtrl.dismiss(this.concep);
    };
    ConcepDPage.prototype.editar = function () {
        this.read = false;
        this.control = true;
    };
    ConcepDPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        self.concep.ciudades = [[6, false, self.concep.ciudades]];
        if (self.concep.id != null) {
            self.getDatos.write('rusia.conceptos.gral', this.concep.id, this.concep).then(function (good) {
                self.concep.id = 1;
                self.viewCtrl.dismiss(self.concep);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
        else {
            //console.log('entro');
            self.getDatos.create('rusia.conceptos.gral', this.concep).then(function (good) {
                self.concep.id = 1;
                self.viewCtrl.dismiss(self.concep);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
    };
    ConcepDPage.prototype.borrar = function () {
        var self = this;
        self.cargar = true;
        self.getDatos.delete('rusia.conceptos.gral', this.concep.id).then(function (good) {
            self.viewCtrl.dismiss(self.concep);
            self.cargar = false;
        }, function (bad) {
            console.log('fail');
            self.presentAlert('Error!', 'Error al intentar borrar, vuelva a intentarlo');
            self.cargar = false;
        });
    };
    ConcepDPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    ConcepDPage = __decorate([
        Component({
            selector: 'page-concep-d',
            templateUrl: 'concep-d.html',
        }),
        __metadata("design:paramtypes", [AlertController, GetDatosProvider, ViewController, NavController, NavParams])
    ], ConcepDPage);
    return ConcepDPage;
}());
export { ConcepDPage };
//# sourceMappingURL=concep-d.js.map