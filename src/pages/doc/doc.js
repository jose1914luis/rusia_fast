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
import { DocumentoPage } from '../../pages/documento/documento';
var DocPage = /** @class */ (function () {
    function DocPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.cargar = true;
        this.docs = [];
        this.items = [];
        this.max = 10;
        this.init();
    }
    DocPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CiudadPage');
    };
    DocPage.prototype.init = function () {
        var self = this;
        self.docs = [];
        self.cargar = true;
        self.getDatos.search_read('ir.attachment', [["concepto_id", "!=", false]], ["eventos_id", "create_date", "name", "Tipo_Documento", "file_size", "ciudades", "concepto_id"]).then(function (datos) {
            self.docs = datos;
            self.initItems();
            self.cargar = false;
            console.log(JSON.stringify(datos));
        }, function (fail) {
        });
    };
    DocPage.prototype.initItems = function () {
        for (var i = 0; i < this.docs.length && i < this.max; i++) {
            this.items.push(this.docs[i]);
        }
    };
    DocPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        var self = this;
        setTimeout(function () {
            var i;
            for (i = self.max; i < _this.docs.length && i < _this.max + 10; i++) {
                _this.items.push(_this.docs[i]);
            }
            _this.max = i;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    DocPage.prototype.abrir = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(DocumentoPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    DocPage.prototype.add = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(DocumentoPage, { item: false });
        profileModal.onDidDismiss(function (data) {
            if (data.id != null) {
                self.init();
            }
        });
        profileModal.present();
    };
    DocPage = __decorate([
        Component({
            selector: 'page-doc',
            templateUrl: 'doc.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], DocPage);
    return DocPage;
}());
export { DocPage };
//# sourceMappingURL=doc.js.map