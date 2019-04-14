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
/**
 * Generated class for the GeneralDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GeneralDPage = /** @class */ (function () {
    function GeneralDPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GeneralDPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GeneralDPage');
    };
    GeneralDPage = __decorate([
        Component({
            selector: 'page-general-d',
            templateUrl: 'general-d.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], GeneralDPage);
    return GeneralDPage;
}());
export { GeneralDPage };
//# sourceMappingURL=general-d.js.map