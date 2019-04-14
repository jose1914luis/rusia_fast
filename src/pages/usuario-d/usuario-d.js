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
var UsuarioDPage = /** @class */ (function () {
    function UsuarioDPage(alertCtrl, getDatos, viewCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.getDatos = getDatos;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usuario = {
            id: null,
            login: null,
            email: null,
            mobile: null,
            fax: null,
            ciudades: [],
            groups_id: [],
            active: true,
            is_correo: true,
            is_general: false,
            is_traslados: false,
            is_chofer: false,
            is_client: false,
            is_guia: false,
            is_rep: false,
            is_root: false,
            company_id: 1
        };
        this.control = false;
        this.read = true;
        this.cargar = false;
        this.ciudades = [];
        var item = this.navParams.get('item');
        if (!item) {
            this.control = true;
            this.read = false;
        }
        else {
            this.usuario = this.navParams.get('item');
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
    UsuarioDPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad usuarioDPage');
    };
    UsuarioDPage.prototype.closeModal = function () {
        this.usuario.id = null;
        this.viewCtrl.dismiss(this.usuario);
    };
    UsuarioDPage.prototype.editar = function () {
        this.read = false;
        this.control = true;
    };
    UsuarioDPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        if (self.usuario.is_chofer == true) {
            self.usuario.groups_id = [[6, false, [12]]];
        }
        if (self.usuario.is_client == true) {
            self.usuario.groups_id = [[6, false, [17]]];
        }
        if (self.usuario.is_traslados == true) {
            self.usuario.groups_id = [[6, false, [13]]];
        }
        if (self.usuario.is_general == true) {
            self.usuario.groups_id = [[6, false, [14]]];
        }
        if (self.usuario.is_guia == true) {
            self.usuario.groups_id = [[6, false, [16]]];
        }
        if (self.usuario.is_rep == true) {
            self.usuario.groups_id = [[6, false, [15]]];
        }
        if (self.usuario.is_root == true) {
            self.usuario.groups_id = [[6, false, [11]]];
        }
        self.usuario.ciudades = [[6, false, self.usuario.ciudades]];
        self.usuario.login = self.usuario.email;
        self.usuario.company_id = 1;
        console.log(JSON.stringify(self.usuario));
        if (self.usuario.id != null) {
            self.getDatos.write('res.users', this.usuario.id, this.usuario).then(function (good) {
                self.usuario.id = 1;
                self.viewCtrl.dismiss(self.usuario);
                self.cargar = false;
            }, function (bad) {
                console.log('fail');
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
        else {
            self.getDatos.create('res.users', self.usuario).then(function (good) {
                self.usuario.id = 1;
                self.viewCtrl.dismiss(self.usuario);
                self.cargar = false;
            }, function (bad) {
                console.log(JSON.stringify(bad));
                self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
                self.cargar = false;
            });
        }
    };
    UsuarioDPage.prototype.borrar = function () {
        var self = this;
        self.cargar = true;
        self.getDatos.delete('res.users', this.usuario.id).then(function (good) {
            self.viewCtrl.dismiss(self.usuario);
            self.cargar = false;
        }, function (bad) {
            console.log('fail');
            self.presentAlert('Error!', 'Error al intentar borrar, vuelva a intentarlo');
            self.cargar = false;
        });
    };
    UsuarioDPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    UsuarioDPage = __decorate([
        Component({
            selector: 'page-usuario-d',
            templateUrl: 'usuario-d.html',
        }),
        __metadata("design:paramtypes", [AlertController, GetDatosProvider, ViewController, NavController, NavParams])
    ], UsuarioDPage);
    return UsuarioDPage;
}());
export { UsuarioDPage };
//# sourceMappingURL=usuario-d.js.map