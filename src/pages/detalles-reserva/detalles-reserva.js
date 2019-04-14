var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GastosRelPage } from '../../pages/gastos-rel/gastos-rel';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { EventoPage } from '../../pages/evento/evento';
import { DocumentoPage } from '../../pages/documento/documento';
var DetallesReservaPage = /** @class */ (function () {
    function DetallesReservaPage(plt, modalCtrl, fileOpener, file, viewCtrl, navCtrl, navParams, getDatos) {
        this.plt = plt;
        this.modalCtrl = modalCtrl;
        this.fileOpener = fileOpener;
        this.file = file;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.categories = [{ id: 1, name: 'Resumen', visible: false },
            { id: 2, name: 'Descripción', visible: false },
            { id: 3, name: 'Documentos', visible: false },
            //{id:4, name:'Costos Itinerario', visible:false},
            { id: 5, name: 'Costos por ciudad', visible: false },
            { id: 6, name: 'Gatos extras', visible: false },
            { id: 7, name: 'Comentarios', visible: false }];
        this.ver_download = false;
        this.reserva = { id: -1,
            cliente_id: [0, ''],
            representante_id: [0, ''],
            Fecha_Inicio: '',
            Fecha_Fin: '',
            hora_inicio: '',
            hora_final: '',
            name: '',
            is_padre: '',
            fecha_padre: '',
            guia_id: [0, ''],
            chofer_id: [0, ''],
            gasto_rub: '',
            gasto_eur: '',
            gasto_usd: '',
            gasto_paypal: '',
            Comentarios_Chofer: '',
            Comentarios_Internos: '',
            Comentarios_Cliente: '',
            Comentarios_Guia: '',
            Transporte: '',
            hotel_id: [0, ''],
            ciudad_id: [0, ''],
            Total_Representante: '',
            message: '',
            numero_pax: '',
            evento_id: [0, ''],
            Servicio_Gastos: '',
            tarjeta_eur: '',
            tarjeta_rub: '',
            tarjeta_usd: '',
            is_traslado: false,
            is_guia: false,
            gastos_ids: []
            //
        };
        this.itinerario = [];
        this.editable = false;
        this.ver_resumen = true;
        this.ver_descripcion = true;
        this.ver_comentarios = true;
        this.ver_documentos = true;
        this.cargar = true;
        this.ver_segmento = true;
        this.ver_gastos = true;
        //private gastostoursline_ids = [];
        this.gastos_ciudad = [];
        this.attachment = [];
        this.permisos = '';
        this.clientes = [];
        this.default_cliente = [];
        this.default_repre = [];
        var padre = this.navParams.get('padre');
        if (padre) {
            this.evento_hijo = this.navParams.get('evento').id;
        }
        else {
            this.evento_hijo = this.navParams.get('evento').evento_id[0];
        }
        this.permisos = this.navParams.get('permisos');
        //console.log('permisos:'+ this.permisos);
        if (this.permisos == 'is_client' || this.permisos == 'is_chofer') {
            //this.ver_segmento = false;
            this.ver_segmento = false;
        }
        else {
            this.ver_gastos = true;
        }
        //var tmp_gastos = JSON.parse(eventos.rows.item(i).gastos_ids);
        this.initReserva();
        //this.initializeCategories();
        //console.log(JSON.stringify(this.navParams.get('evento')));
    }
    DetallesReservaPage.prototype.initReserva = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, tmp_gastos, where, i, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        self.itinerario = [];
                        self.gastos_ciudad = [];
                        self.cargar = true;
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_hijo).then(function (eventos) {
                                var tmp_gastos_ids = JSON.parse(eventos.rows.item(0).gastos_ids);
                                var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
                                self.default_repre = tmp_representante_id;
                                var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
                                self.default_cliente = tmp_cliente_id;
                                self.reserva = eventos.rows.item(0);
                                self.reserva.gastos_ids = tmp_gastos_ids;
                                self.reserva.representante_id = tmp_representante_id;
                                self.reserva.cliente_id = tmp_cliente_id;
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT name, ciudad_id, Fecha_Inicio, id FROM eventos WHERE is_padre = "false" and  name = "' + self.reserva.name + '"').then(function (eventos) {
                                console.log(JSON.stringify(eventos));
                                for (var i = 0; i < eventos.rows.length; i++) {
                                    //console.log(JSON.stringify(gastos.rows.item(i)));                         
                                    //var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
                                    var tmp_ciudad_id = JSON.parse(eventos.rows.item(i).ciudad_id);
                                    var concepto = eventos.rows.item(i);
                                    //concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                                    concepto.ciudad_id = tmp_ciudad_id;
                                    self.itinerario.push(concepto);
                                }
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] + '"').then(function (attachment) {
                                for (var i = 0; i < attachment.rows.length; i++) {
                                    var att = attachment.rows.item(i);
                                    att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size));
                                    //var tmp_file_size = attachment.rows.item(i).file_size;
                                    //console.log('file size:' + );
                                    //console.log(JSON.stringify(attachment.rows.item(i)));      
                                    self.attachment.push(att);
                                }
                            }, function (fail) {
                                console.log('Fail load gastos');
                            })];
                    case 3:
                        _a.sent();
                        tmp_gastos = self.reserva.gastos_ids;
                        where = '(';
                        for (i = tmp_gastos.length - 1; i >= 0; i--) {
                            where = where + tmp_gastos[i] + ",";
                        }
                        where = where.substring(0, where.length - 1); // "12345.0"
                        where = where + ')';
                        sql = 'SELECT * FROM gastosciudad WHERE id in ' + where;
                        console.log(sql);
                        return [4 /*yield*/, self.getDatos.ejecutarSQL(sql).then(function (gastos) {
                                console.log(JSON.stringify(gastos));
                                for (var i = 0; i < gastos.rows.length; i++) {
                                    console.log(JSON.stringify(gastos.rows.item(i)));
                                    var tmp_evento_id = JSON.parse(gastos.rows.item(i).evento_id);
                                    //var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
                                    var concepto = gastos.rows.item(i);
                                    concepto.evento_id = tmp_evento_id;
                                    self.gastos_ciudad.push(concepto);
                                }
                            }, function (fail) {
                                console.log('Fail load gastos');
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT id, name FROM user').then(function (user) {
                                //self.clientes = user.rows;
                                for (var i = 0; i < user.rows.length; i++) {
                                    self.clientes.push(user.rows.item(i));
                                }
                                //console.log(JSON.stringify(self.clientes));
                            }, function (fail) {
                                console.log('Fail load user');
                            })];
                    case 5:
                        _a.sent();
                        self.cargar = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DetallesReservaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallesReservaPage');
    };
    DetallesReservaPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            //this.viewCtrl.dismiss(this.item);
        }
    };
    DetallesReservaPage.prototype.initializeCategories = function () {
        // Select it by defaut
        console.log(this.categories);
        this.selectedCategory = this.categories[0];
        this.selectedCategory.visible = true;
        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    };
    DetallesReservaPage.prototype.filterData = function (categoryId) {
        // Handle what to do when a category is selected
        //console.log(categoryId);
        var _this = this;
        Object.keys(this.categories).forEach(function (key) {
            if (_this.categories[key].id == categoryId) {
                _this.categories[key].visible = true;
            }
            else {
                _this.categories[key].visible = false;
            }
            //console.log(this.categories[key]);
        });
    };
    // Method executed when the slides are changed
    DetallesReservaPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    };
    // Method that shows the next slide
    DetallesReservaPage.prototype.slideNext = function () {
        this.slides.slideNext();
    };
    // Method that shows the previous slide
    DetallesReservaPage.prototype.slidePrev = function () {
        this.slides.slidePrev();
    };
    DetallesReservaPage.prototype.agregarGasto = function () {
        this.navCtrl.push(GastosRelPage, { gastos_rel: null });
    };
    DetallesReservaPage.prototype.abrirGasto = function (gasto) {
        this.navCtrl.push(GastosRelPage, { gastos_rel: gasto });
    };
    DetallesReservaPage.prototype.descargarAtt = function (att) {
        var self = this;
        self.ver_download = true;
        console.log(att.id);
        self.getDatos.search_read('ir.attachment', [["id", "=", att.id]], ["datas", "mimetype"]).then(function (res) {
            var mimetype = res[0].mimetype.toString();
            var ext = "." + mimetype.split("/")[1];
            //var tabla = 
            //console.log(JSON.stringify(res[0].mimetype));
            //var ext = '';
            /*var mimetype_tmp = res[0].mimetype.toString();
    
            if(mimetype_tmp == "application/pdf"){
              ext = '.pdf';
            }else if(mimetype_tmp == "image/png"){
              ext = '.png';
            }*/
            var downloadPDF = res[0].datas;
            var base64pdf = downloadPDF;
            var binary = atob(base64pdf.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            var blobPdf = new Blob([view], { type: res[0].mimetype.toString() });
            var opt = { replace: true };
            if (self.plt.is('ios')) {
                console.log('------------------loading in IOS');
                //var nativeUrl = (self.file.applicationStorageDirectory + "tmp/" + att.name.replace(/ /g,'')).substring(7) + ext;
                //console.log(nativeUrl)
                //self.file.applicationStorageDirectory
                self.file.writeFile(self.file.documentsDirectory, att.name.replace(/ /g, '') + ext, blobPdf, opt).then(function (res) {
                    //console.log('file saved'+ res.nativeURL);
                    //console.log('file saved'+ res.toInternalURL());
                    console.log('file saved' + res.toURL());
                    //self.presentToast();
                    self.fileOpener.open(res.toURL(), mimetype //file mimeType
                    ).then(function (success) {
                        console.log('success open file: ', success);
                    }, function (err) {
                        console.log('error open file', err.message);
                    });
                }, function (fail) {
                    console.log(JSON.stringify(fail));
                });
            }
            else {
                self.file.writeFile(self.file.externalDataDirectory, att.name + ext, blobPdf, opt).then(function (res) {
                    console.log('file saved' + res.nativeURL);
                    //self.presentToast();
                    self.fileOpener.open(res.toInternalURL(), mimetype //file mimeType
                    ).then(function (success) {
                        console.log('success open file: ', success);
                    }, function (err) {
                        console.log('error open file', err.message);
                    });
                }, function (fail) {
                    console.log(JSON.stringify(fail));
                });
            }
            //self.file.writeFile(self.file.dataDirectory, att.name + ext, blobPdf, opt).then(
            self.ver_download = false;
        }, function (fail) {
            console.log('Fail downloading att');
        });
    };
    DetallesReservaPage.prototype.cargarEvento = function (evt) {
        this.navCtrl.push(EventoPage, { evento: evt, permisos: 'is_root' });
    };
    DetallesReservaPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    DetallesReservaPage.prototype.agregarEvento = function () {
        this.navCtrl.push(EventoPage, { evento: null, permisos: 'is_root' });
    };
    DetallesReservaPage.prototype.agregarAttachment = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(DocumentoPage);
        profileModal.onDidDismiss(function (data) {
            /*if (data != 'x') {
              
              //console.log(JSON.stringify(self.evento))
              //console.log(self.evento.cliente_id[0])
              data.cliente_id = self.evento.cliente_id[0];
              data.res_id = self.evento.id;
              console.log(JSON.stringify(data))

              self.guardar(data, 2).then(
              res=>{
                self.cargar = true;
                self.getDatos.cargarCalendario(true,false,true,false,false,false,false).then(
                  res=>{
                    console.log('Update complete');
                    self.initEvento();
                  },
                  fail=>{

                    console.log('Error loading cgastos');
                  }
                );
              },
              fail=>{

                console.log('Error loading cgastos');
              }
            );
              
            }*/
        });
        profileModal.present();
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], DetallesReservaPage.prototype, "slides", void 0);
    DetallesReservaPage = __decorate([
        Component({
            selector: 'page-detalles-reserva',
            templateUrl: 'detalles-reserva.html',
        }),
        __metadata("design:paramtypes", [Platform, ModalController, FileOpener, File, ViewController, NavController, NavParams, GetDatosProvider])
    ], DetallesReservaPage);
    return DetallesReservaPage;
}());
export { DetallesReservaPage };
//# sourceMappingURL=detalles-reserva.js.map