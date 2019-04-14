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
import { NavController, NavParams, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { Camera } from '@ionic-native/camera';
var DocumentoPage = /** @class */ (function () {
    function DocumentoPage(filePicker, getDatos, plt, file, viewCtrl, base64, filePath, fileChooser, navCtrl, navParams, actionSheet, camera) {
        this.filePicker = filePicker;
        this.getDatos = getDatos;
        this.plt = plt;
        this.file = file;
        this.viewCtrl = viewCtrl;
        this.base64 = base64;
        this.filePath = filePath;
        this.fileChooser = fileChooser;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheet = actionSheet;
        this.camera = camera;
        this.doc = {
            name: null,
            type: 'binary',
            datas: '',
            url: '',
            ciudades: '',
            concepto_id: '',
            is_cliente: false,
            is_general: true,
            is_interno: true,
            Tipo_documento: '',
            res_id: null,
        };
        this.cargar = true;
        this.archivo = true;
        this.url = false;
        this.ciudades = [];
        this.conceptos = [];
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
        this.conceptos = this.navParams.get('conceptos');
    }
    DocumentoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DocumentoPage');
    };
    DocumentoPage.prototype.closeModal = function (dato) {
        if (dato == 'x') {
            this.viewCtrl.dismiss('x');
        }
        else {
            this.viewCtrl.dismiss(dato);
        }
    };
    //funcion que se ejecuta para subir el archivo #Agregado por wuilmer
    DocumentoPage.prototype.optionsGetFile = function () {
        var _this = this;
        var actionsheet = this.actionSheet.create({
            title: "Seleccione desde donde cargar el archivo",
            buttons: [
                { text: 'Tomar Foto', icon: 'camera', handler: function () {
                        _this.openCamera();
                    } },
                { text: 'Desde el dispositivo', icon: 'document', handler: function () {
                        _this.agregarAttachment();
                    } },
                { text: 'Cancelar', icon: 'close-circle', role: 'cancel' }
            ]
        });
        actionsheet.present();
    };
    //Si el usuario selecciona la camara se ejecuta esta funcion #Agregado por wuilmer
    DocumentoPage.prototype.openCamera = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.NATIVE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.nombre_archivo = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);
            _this.doc.name = _this.nombre_archivo;
            var path = imageData.substring(0, imageData.lastIndexOf('/'));
            if (_this.plt.is('ios')) {
                _this.file.readAsBinaryString('file://' + path, _this.nombre_archivo).then(function (content) {
                    content = window.btoa(content);
                    _this.doc.datas = content;
                    console.log(_this.doc.datas);
                    //alert(JSON.stringify(content));
                }).catch(function (err) {
                    console.log(err);
                    //alert(JSON.stringify(err));
                });
            }
            else {
                _this.file.readAsBinaryString(path, _this.nombre_archivo).then(function (content) {
                    content = window.btoa(content);
                    _this.doc.datas = content;
                    console.log(_this.doc.datas);
                    //alert(JSON.stringify(content));
                }).catch(function (err) {
                    console.log(err);
                    //alert(JSON.stringify(err));
                });
            }
        }, function (err) {
            // Handle error
        });
    };
    DocumentoPage.prototype.agregarAttachment = function () {
        var self = this;
        if (this.plt.is('ios')) {
            // This will only print when on iOS
            console.log('I am an iOS device!');
            self.filePicker.pickFile()
                .then(function (result) {
                console.log(result);
                var path = result.substring(0, result.lastIndexOf('/'));
                console.log(path);
                self.nombre_archivo = result.substring(result.lastIndexOf('/') + 1, result.length);
                self.doc.name = self.nombre_archivo;
                console.log(self.nombre_archivo);
                console.log('file://' + path);
                self.file.readAsBinaryString('file://' + path, self.nombre_archivo)
                    .then(function (content) {
                    content = window.btoa(content);
                    self.doc.datas = content;
                    console.log(self.doc.datas);
                    //alert(JSON.stringify(content));
                })
                    .catch(function (err) {
                    console.log(err);
                    //alert(JSON.stringify(err));
                });
            })
                .catch(function (err) { return console.log('Error', err); });
        }
        else {
            self.fileChooser.open()
                .then(function (uri) {
                self.filePath.resolveNativePath(uri).then(function (result) {
                    var path = result.substring(0, result.lastIndexOf('/'));
                    console.log(path);
                    self.nombre_archivo = result.substring(result.lastIndexOf('/') + 1, result.length);
                    self.doc.name = self.nombre_archivo;
                    self.file.readAsBinaryString(path, self.nombre_archivo)
                        .then(function (content) {
                        content = window.btoa(content);
                        self.doc.datas = content;
                        console.log(self.doc.datas);
                        //alert(JSON.stringify(content));
                    })
                        .catch(function (err) {
                        console.log(err);
                        //alert(JSON.stringify(err));
                    });
                }).catch(function (e) { return console.log(e); });
                //self.file.readAsDataURL()
                //console.log(uri
                /**/
            })
                .catch(function (e) { return console.log(e); });
        }
    };
    DocumentoPage.prototype.onChange = function ($event) {
        console.log($event.target.value);
    };
    DocumentoPage.prototype.guardar = function () {
        var self = this;
        if (self.doc.concepto_id == null || self.doc.name == null) {
            return;
        }
        this.cargar = true;
        var campos;
        campos = {
            Tipo_Documento: self.doc.Tipo_documento,
            cliente_id: 0,
            name: self.doc.name,
            type: self.doc.type,
            datas: self.doc.datas,
            ciudades: [6, false, []],
            is_cliente: self.doc.is_cliente,
            is_general: self.doc.is_general,
            is_interno: self.doc.is_interno,
            concepto_id: self.doc.concepto_id,
            company_id: 1,
            datas_fname: self.nombre_archivo,
            description: false,
            eventos_id: false,
            public: false,
            url: false
        };
        console.log(JSON.stringify(campos));
        self.closeModal(campos);
        //self.closeModal(campos)
    };
    DocumentoPage.prototype.eliminar = function () {
        this.closeModal('x');
    };
    DocumentoPage = __decorate([
        Component({
            selector: 'page-documento',
            templateUrl: 'documento.html',
        }),
        __metadata("design:paramtypes", [IOSFilePicker, GetDatosProvider, Platform, File, ViewController, Base64, FilePath, FileChooser, NavController, NavParams, ActionSheetController, Camera])
    ], DocumentoPage);
    return DocumentoPage;
}());
export { DocumentoPage };
//# sourceMappingURL=documento.js.map