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
import { Slides, NavController, NavParams, ModalController, ToastController, Platform } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { DetallesReservaPage } from '../../pages/detalles-reserva//detalles-reserva';
import { DocumentoPage } from '../../pages/documento/documento';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
var EventoPage = /** @class */ (function () {
    //private fileOpener: FileOpener,
    function EventoPage(plt, fileOpener, toastCtrl, file, navCtrl, navParams, getDatos, modalCtrl) {
        this.plt = plt;
        this.fileOpener = fileOpener;
        this.toastCtrl = toastCtrl;
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.evento = { id: -1,
            cliente_id: [0, ''],
            representante_id: [0, ''],
            Fecha_Inicio: '',
            Fecha_Fin: '',
            hora_inicio: '',
            hora_final: '',
            hora_chofer: '',
            name: '',
            is_padre: '',
            fecha_padre: '',
            guia_id: [0, ''],
            guia_id2: [0, ''],
            guia_id3: [0, ''],
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
            servicio_id: null,
            nombre_reserva: null
            //gastostoursline_ids:[]
        };
        this.clientes = [];
        this.default_cliente = [];
        this.default_guia = [];
        this.default_guia2 = [];
        this.default_guia3 = [];
        this.default_chofer = [];
        this.eventos = [];
        this.default_evento = [];
        this.gastostoursline_ids = [];
        this.attachment = [];
        this.gastostours = [];
        this.conceptos = [];
        this.servicios = [];
        this.default_servicio = [];
        this.editable = false;
        this.editableObj = {
            editable: false
        };
        this.cargar = false;
        this.permisos = '';
        this.ver_segmento = true;
        this.ver_gastos = false;
        this.ver_resumen = false;
        this.ver_descripcion = false;
        this.ver_documentos = false;
        this.ver_comentarios = false;
        this.ver_download = false;
        this.evento_cal = this.navParams.get('evento');
        this.permisos = this.navParams.get('permisos');
        console.log('permisos:' + this.permisos);
        console.log('evento_cal:' + JSON.stringify(this.evento_cal));
        if (this.permisos == 'is_client') {
            this.ver_segmento = false;
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                //{id:3, name:'Gastos', visible:false},
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }]; //3
        }
        else if (this.permisos == 'is_chofer') {
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                //{id:3, name:'Gastos', visible:false},
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }]; //3
        }
        else {
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                { id: 3, name: 'Gastos', visible: false },
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }];
        }
        if (this.evento_cal != null) {
            this.initEvento();
        }
        else {
            this.editable = true;
        }
        this.initializeCategories();
    }
    EventoPage.prototype.ionViewDidLoad = function () {
    };
    EventoPage.prototype.adjustTextarea = function (event) {
        var textarea = event.target;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        return;
    };
    EventoPage.prototype.initEvento = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        self.gastostoursline_ids = [];
                        self.attachment = [];
                        self.gastostours = [];
                        self.cargar = true;
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_cal.id).then(function (eventos) {
                                var evento = eventos.rows.item(0);
                                self.evento = evento;
                                console.log(JSON.stringify(self.evento));
                                var tmp_evento_id = JSON.parse(evento.evento_id);
                                self.default_evento = tmp_evento_id;
                                var tmp_cliente_id = JSON.parse(evento.cliente_id);
                                self.default_cliente = tmp_cliente_id;
                                var tmp_representante_id = JSON.parse(evento.representante_id);
                                self.evento.representante_id = tmp_representante_id;
                                var tmp_guia_id = JSON.parse(evento.guia_id);
                                self.default_guia = tmp_guia_id;
                                var tmp_guia_id2 = JSON.parse(evento.guia_id2);
                                self.default_guia2 = tmp_guia_id2;
                                var tmp_guia_id3 = JSON.parse(evento.guia_id3);
                                self.default_guia3 = tmp_guia_id3;
                                /*console.log('---------------------------' + typeof evento.chofer_id );
                                console.log('---------------------------' + (evento.chofer_id == 'false') );
                                console.log('---------------------------' + Number.isInteger(evento.chofer_id) )*/
                                var tmp_chofer_id = JSON.parse(evento.chofer_id);
                                self.default_chofer = tmp_chofer_id;
                                var tmp_hotel_id = (evento.hotel_id == "") ? ([0, '']) : JSON.parse(evento.hotel_id);
                                self.evento.hotel_id = tmp_hotel_id;
                                var tmp_ciudad_id = JSON.parse(evento.ciudad_id);
                                var tmp_servicio_id = JSON.parse(evento.servicio_id);
                                self.default_servicio = tmp_servicio_id;
                                self.evento.evento_id = tmp_evento_id;
                                self.evento.cliente_id = tmp_cliente_id;
                                self.evento.guia_id = tmp_guia_id;
                                self.evento.guia_id2 = tmp_guia_id2;
                                self.evento.guia_id3 = tmp_guia_id3;
                                self.evento.chofer_id = tmp_chofer_id;
                                self.evento.ciudad_id = tmp_ciudad_id;
                                self.evento.servicio_id = tmp_servicio_id;
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE eventos_id = "' + self.evento.id + '"').then(function (gastos) {
                                for (var i = 0; i < gastos.rows.length; i++) {
                                    //                    	
                                    var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id);
                                    var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id);
                                    var concepto = gastos.rows.item(i);
                                    concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                                    concepto.ciudad_id = tmp_ciudad_id;
                                    self.gastostoursline_ids.push(concepto);
                                }
                            }, function (fail) {
                                console.log('Fail load gastostoursline');
                            })];
                    case 2:
                        _a.sent();
                        console.log('SELECT * FROM attachment WHERE eventos_id = "' + self.evento.id + '"');
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE eventos_id = "' + self.evento.id + '"').then(function (attachment) {
                                console.log('ATT: ' + JSON.stringify(attachment.rows));
                                for (var i = 0; i < attachment.rows.length; i++) {
                                    var att = attachment.rows.item(i);
                                    console.log(self.getDatos.usr.tipo_usuario);
                                    att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size));
                                    if (self.getDatos.usr.tipo_usuario == 'is_client' && att.is_cliente == 'true') {
                                        self.attachment.push(att);
                                    }
                                    else {
                                        self.attachment.push(att);
                                    }
                                }
                            }, function (fail) {
                                console.log('Fail load attachment');
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM gastostours ORDER BY name ASC').then(function (gastostours) {
                                for (var i = 0; i < gastostours.rows.length; i++) {
                                    var gastos = gastostours.rows.item(i);
                                    var tmp_ciudades = JSON.parse(gastos.ciudades);
                                    if (tmp_ciudades.indexOf(self.evento.ciudad_id[0]) > -1) {
                                        self.gastostours.push(gastos);
                                        //console.log(eventos[key].name);
                                    }
                                }
                            }, function (fail) {
                                console.log('Fail load gastostours');
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM conceptos ORDER BY name ASC').then(function (conceptos) {
                                for (var i = 0; i < conceptos.rows.length; i++) {
                                    var concepto = conceptos.rows.item(i);
                                    self.conceptos.push(concepto);
                                    /*var tmp_ciudades = JSON.parse(concepto.ciudades);
                
                                    if(tmp_ciudades.indexOf(self.evento.ciudad_id[0]) > -1) {
                                        self.conceptos.push(gastos);
                                        //console.log(eventos[key].name);
                                    }		*/
                                }
                            }, function (fail) {
                                console.log('Fail load gastostours');
                            })];
                    case 5:
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
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE is_padre = "true"').then(function (eventos) {
                                //var evento = eventos.rows.item(0);
                                for (var i = 0; i < eventos.rows.length; i++) {
                                    self.eventos.push(eventos.rows.item(i));
                                }
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM tiposervicios').then(function (servicios) {
                                //var evento = eventos.rows.item(0);
                                for (var i = 0; i < servicios.rows.length; i++) {
                                    self.servicios.push(servicios.rows.item(i));
                                    //console.log(servicios.rows.item(i));                  	
                                }
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.ejecutarSQL('SELECT * FROM hoteles WHERE id = ' + self.evento.hotel_id[0]).then(function (hotel) {
                                //var evento = eventos.rows.item(0);
                                console.log(JSON.stringify(hotel.rows));
                                self.evento.hotel_id[0];
                                if (hotel.rows.length) {
                                    self.evento.hotel_id[1] = self.evento.hotel_id[1] + " / " + hotel.rows.item(0).direccion;
                                }
                                /*for(var i=0; i<servicios.rows.length; i++) {
                
                                    self.servicios.push(servicios.rows.item(i));
                                    //console.log(servicios.rows.item(i));
                                }*/
                            }, function (fail) {
                                console.log('Fail load evento');
                            })];
                    case 9:
                        _a.sent();
                        self.cargar = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    EventoPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
            this.editableObj.editable = true;
        }
        else {
            this.editable = false;
            this.editableObj.editable = false;
        }
    };
    EventoPage.prototype.seleccionCliente = function (ev) {
        //console.log(ev);
        this.evento.cliente_id[0] = ev;
    };
    EventoPage.prototype.seleccionEvento = function (ev) {
        this.evento.evento_id[0] = ev;
    };
    EventoPage.prototype.seleccionServicio = function (ev) {
        this.evento.servicio_id[0] = ev;
    };
    EventoPage.prototype.seleccionGuia = function (ev) {
        if (JSON.stringify(this.evento.guia_id) == 'false') {
            //console.log('-----entro----')    		
            delete this.evento.guia_id;
            this.evento.guia_id = [ev, ''];
        }
        else {
            this.evento.guia_id[0] = ev;
        }
    };
    EventoPage.prototype.seleccionGuia2 = function (ev) {
        if (JSON.stringify(this.evento.guia_id2) == 'false') {
            //console.log('-----entro----')    		
            delete this.evento.guia_id2;
            this.evento.guia_id2 = [ev, ''];
        }
        else {
            this.evento.guia_id2[0] = ev;
        }
    };
    EventoPage.prototype.seleccionGuia3 = function (ev) {
        if (JSON.stringify(this.evento.guia_id3) == 'false') {
            //console.log('-----entro----')    		
            delete this.evento.guia_id3;
            this.evento.guia_id3 = [ev, ''];
        }
        else {
            this.evento.guia_id3[0] = ev;
        }
    };
    EventoPage.prototype.seleccionChofer = function (ev) {
        //console.log(ev)
        if (JSON.stringify(this.evento.chofer_id) == 'false') {
            //console.log('-----entro----')    		
            delete this.evento.chofer_id;
            this.evento.chofer_id = [ev, ''];
        }
        else {
            this.evento.chofer_id[0] = ev;
        }
        //this.evento.chofer_id[0] = null;
        //this.evento.chofer_id[0] = parseInt(ev) ;
    };
    EventoPage.prototype.guardar_campos = function () {
        var self = this;
        self.guardar(null, 0).then(function (res) {
            self.cargar = true;
            self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                console.log('Update complete');
                self.initEvento();
            }, function (fail) {
                console.log('Error loading cgastos');
            });
        }, function (fail) {
            console.log('Error loading cgastos');
        });
    };
    EventoPage.prototype.guardar = function (dato, opcion) {
        var self = this;
        self.cargar = true;
        var promise = new Promise(function (resolve, reject) {
            if (self.editable) {
                var campos;
                console.log(((JSON.stringify(self.evento.is_traslado) == "true") ? true : false));
                console.log(((JSON.stringify(self.evento.is_guia) == "true") ? true : false));
                switch (opcion) {
                    case 0:
                        campos = {
                            Fecha_Inicio: self.evento.Fecha_Inicio,
                            hora_inicio: self.evento.hora_inicio,
                            hora_final: self.evento.hora_final,
                            Comentarios_Chofer: self.evento.Comentarios_Chofer,
                            Comentarios_Internos: self.evento.Comentarios_Internos,
                            Comentarios_Cliente: self.evento.Comentarios_Cliente,
                            Comentarios_Guia: self.evento.Comentarios_Guia,
                            Transporte: self.evento.Transporte,
                            message: self.evento.message,
                            numero_pax: self.evento.numero_pax,
                            is_traslado: ((String(self.evento.is_traslado) == "true") ? true : false),
                            is_guia: ((String(self.evento.is_guia) == "true") ? true : false),
                            cliente_id: self.evento.cliente_id[0],
                            evento_id: self.evento.evento_id[0],
                            servicio_id: self.evento.servicio_id[0],
                            guia_id: ((JSON.stringify(self.evento.guia_id) == 'false') ? self.evento.guia_id : self.evento.guia_id[0]),
                            guia_id2: ((JSON.stringify(self.evento.guia_id2) == 'false') ? self.evento.guia_id2 : self.evento.guia_id2[0]),
                            guia_id3: ((JSON.stringify(self.evento.guia_id3) == 'false') ? self.evento.guia_id3 : self.evento.guia_id3[0]),
                            chofer_id: ((JSON.stringify(self.evento.chofer_id) == 'false') ? self.evento.chofer_id : self.evento.chofer_id[0])
                        };
                        break;
                    case 1:
                        campos = {
                            gastostoursline_ids: dato
                        };
                        break;
                    case 2:
                        campos = {
                            documentos_ids: [[0, false, dato]]
                        };
                        break;
                    default:
                        // code...
                        break;
                }
                console.log(JSON.stringify(campos));
                console.log(self.evento.id);
                self.getDatos.write('rusia.eventos', self.evento.id, campos).then(function (res) {
                    console.log('save event ok');
                    self.cargar = false;
                    resolve();
                }, function (fail) {
                    console.log('error saving event');
                    reject();
                });
            }
            else {
                console.log('editable is false');
                reject();
            }
        });
        return promise;
    };
    EventoPage.prototype.initializeCategories = function () {
        // Select it by defaut
        //console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.ver_resumen = true;
        //this.selectedCategory.visible = true;        
        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    };
    EventoPage.prototype.allHide = function () {
        this.ver_resumen = false;
        this.ver_descripcion = false;
        this.ver_gastos = false;
        this.ver_comentarios = false;
        this.ver_documentos = false;
    };
    EventoPage.prototype.filterData = function (categoryId) {
        // Handle what to do when a category is selected
        //console.log(categoryId);
        switch (categoryId) {
            case 1:
                this.allHide();
                this.ver_resumen = true;
                break;
            case 2:
                this.allHide();
                this.ver_descripcion = true;
                break;
            case 3:
                this.allHide();
                this.ver_gastos = true;
                break;
            case 4:
                this.allHide();
                this.ver_documentos = true;
                break;
            case 5:
                this.allHide();
                this.ver_comentarios = true;
                break;
            default:
                this.allHide();
                break;
        }
    };
    // Method executed when the slides are changed
    EventoPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    };
    // Method that shows the next slide
    EventoPage.prototype.slideNext = function () {
        this.slides.slideNext();
    };
    // Method that shows the previous slide
    EventoPage.prototype.slidePrev = function () {
        this.slides.slidePrev();
    };
    EventoPage.prototype.abrirGasto = function (item) {
        //item.concepto_gasto_id = JSON.stringify(item.concepto_gasto_id);
        console.log(item.fecha);
        var self = this;
        var gasto = {
            id: item.id,
            concepto_gasto_id: item.concepto_gasto_id,
            Total: item.Total,
            tipo_moneda: item.tipo_moneda,
            ciudad_id: item.ciudad_id,
            usuario_id: JSON.parse(item.usuario_id),
            observaciones: item.observaciones,
            evento_padre: item.evento_padre,
            eventos_id: item.eventos_id,
            fecha: new Date(item.fecha).toISOString()
        };
        var profileModal = this.modalCtrl.create(GatosTourPage, { gasto: gasto, ver_segmento: this.editable, lista_gastos: self.gastostours });
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                console.log(typeof data);
                if (typeof data == 'boolean') {
                    self.cargar = true;
                    /*var reload = [false,true,false,false,false,false,false]
                    self.getDatos.cargarCalendario(reload).then(
                        res=>{

                            

                            /*console.log('Update complete');
                            self.initEvento();
                        },
                        fail=>{

                            console.log('Error loading cgastos');
                        }
                    );*/
                    self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                        console.log('Update complete');
                        self.initEvento();
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }
                else {
                    console.log('---------------------------------------update ');
                    self.cargar = true;
                    //console.log(JSON.stringify([[1,gasto.id,data]]));
                    self.guardar([[1, gasto.id, data]], 1).then(function (res) {
                        self.cargar = true;
                        //var reload = [false,true,false,false,false,false,false]
                        self.getDatos.updateGastos(self.evento.id).then(function (res) {
                            /*console.log('Update complete');
                            self.initEvento();*/
                            self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                                console.log('Update complete');
                                self.initEvento();
                            }, function (fail) {
                                console.log('Error loading cgastos');
                            });
                        }, function (fail) {
                            console.log('Error loading cgastos');
                        });
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }
            }
        });
        profileModal.present();
    };
    EventoPage.prototype.agregarGasto = function () {
        var self = this;
        var gasto = {
            id: null,
            concepto_gasto_id: [],
            Total: '',
            tipo_moneda: '',
            ciudad_id: self.evento.ciudad_id,
            usuario_id: [],
            observaciones: '',
            evento_padre: this.evento.name,
            eventos_id: this.evento.id,
            fecha: new Date().toISOString()
        }; //gasto:{, , , id:nul
        var profileModal = this.modalCtrl.create(GatosTourPage, { gasto: gasto, ver_segmento: self.editable, lista_gastos: self.gastostours });
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                self.guardar([[0, 0, data]], 1).then(function (res) {
                    self.cargar = true;
                    //var reload = [false,true,false,false,false,false,false]
                    self.getDatos.updateGastos(self.evento.id).then(function (res) {
                        /*console.log('Update*/
                        self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                            console.log('Update complete');
                            self.initEvento();
                        }, function (fail) {
                            console.log('Error loading cgastos');
                        });
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }
        });
        profileModal.present();
    };
    EventoPage.prototype.descargarAtt = function (att) {
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
    EventoPage.prototype.borrarAttachment = function (id) {
        console.log(id);
        this.cargar = true;
        var self = this;
        if (id != null) { // nuevo		
            //console.log('self.gasto.id ' +  self.gasto.id );
            self.getDatos.eliminar('ir.attachment', id).then(function (res) {
                self.cargar = true;
                self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                    console.log('Update complete');
                    self.initEvento();
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
                /*var reload = [true,false,true,false,false,false,false];
                self.getDatos.cargarCalendario(reload).then(
                    res=>{
                        console.log('Update complete');
                        self.initEvento();
                    },
                    fail=>{

                        console.log('Error loading cgastos');
                    }
                );*/
            }, function (fail) {
                console.log('error create gastos');
            });
        }
    };
    EventoPage.prototype.abrirReserva = function () {
        //console.log('entro');
        //if(!this.editable){
        this.navCtrl.push(DetallesReservaPage, { evento: this.evento, permisos: this.permisos, padre: false, conceptos: this.conceptos });
        //}
    };
    EventoPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Archivo descargado',
            duration: 2000,
            position: 'top'
        });
        /*toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });*/
        toast.present();
    };
    EventoPage.prototype.agregarAttachment = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(DocumentoPage, { conceptos: self.conceptos });
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                //console.log(JSON.stringify(self.evento))
                //console.log(self.evento.cliente_id[0])
                data.cliente_id = self.evento.cliente_id[0];
                data.res_id = self.evento.id;
                console.log(JSON.stringify(data));
                self.guardar(data, 2).then(function (res) {
                    self.cargar = true;
                    //var reload = [true,false,true,false,false,false,false];
                    self.getDatos.updateAttachment(self.evento.id).then(function (res) {
                        self.getDatos.updateCalendario(self.evento.id).then(function (res) {
                            console.log('Update complete');
                            self.initEvento();
                        }, function (fail) {
                            console.log('Error loading cgastos');
                        });
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }
        });
        profileModal.present();
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], EventoPage.prototype, "slides", void 0);
    __decorate([
        ViewChild("sh_cliente"),
        __metadata("design:type", Slides)
    ], EventoPage.prototype, "sh_cliente", void 0);
    EventoPage = __decorate([
        Component({
            selector: 'page-evento',
            templateUrl: 'evento.html',
        }),
        __metadata("design:paramtypes", [Platform, FileOpener, ToastController, File, NavController, NavParams, GetDatosProvider, ModalController])
    ], EventoPage);
    return EventoPage;
}());
export { EventoPage };
//# sourceMappingURL=evento.js.map