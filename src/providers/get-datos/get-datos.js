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
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { TablasProvider } from '../tablas/tablas';
/*
  Generated class for the GetDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetDatosProvider = /** @class */ (function () {
    function GetDatosProvider(sqlite, tablas) {
        this.sqlite = sqlite;
        this.tablas = tablas;
        this.db = null;
        this.url = '/api';
        //private url = 'https://rusiatoursmoscu.com';    //"proxyUrl":"http://rusiatoursmoscu.com"
        this.usr = null;
        this.eventoHijo = [];
        this.eventosTodos = [];
        this.gastos_ciudad = [];
        this.bd_conf = {
            name: 'ionicdb.db',
            location: 'default'
        };
        var self = this;
        //console.log('constructor creado primero');
        self.ejecutarSQL("SELECT * FROM user WHERE usuario IS NOT NULL").then(function (data) {
            //console.log(JSON.stringify(data));
            self.usr = data.rows.item(0);
            //console.log(JSON.stringify(data.rows.item(0)));
        }, function () {
            console.log('Error get table user');
        });
    }
    GetDatosProvider.prototype.ejecutarSQL = function (select) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create(self.bd_conf).then(function (db) {
                db.executeSql(select, {})
                    .then(function (res) {
                    resolve(res);
                }).catch(function (e) {
                    console.log(e.message);
                    reject(e);
                });
            }).catch(function (e) {
                console.log('Error en ejecutarSQL');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.bytesToSize = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round((bytes / Math.pow(1024, i))) + ' ' + sizes[i];
    };
    ;
    GetDatosProvider.prototype.cargarConceptos = function () {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.conceptos.gral', [], self.tablas.Tbl_conceptos_odoo)
                .then(function (gastostours) {
                sql.push('DELETE FROM conceptos;');
                Object.keys(gastostours).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO conceptos " +
                        "(id, name, ciudades)" +
                        " VALUES (" + gastostours[key].id + ", '" + gastostours[key].name + "', '" +
                        JSON.stringify(gastostours[key].ciudades) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarCiudades = function (borrar) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.ciudades', [], self.tablas.Tbl_ciudad_odoo)
                .then(function (gastostours) {
                if (borrar == true) {
                    sql.push('DELETE FROM ciudad;');
                }
                Object.keys(gastostours).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO ciudad " +
                        "(id, name, Tel_Emergency, Code)" +
                        " VALUES (" + gastostours[key].id + ", '" + gastostours[key].name + "', '" +
                        gastostours[key].Tel_Emergency + "' , '" + gastostours[key].Code + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarServicios = function () {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.tiposervicios', [], self.tablas.Tbl_servicios_odoo)
                .then(function (servicios) {
                sql.push('DELETE FROM tiposervicios;');
                Object.keys(servicios).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO tiposervicios " +
                        "(id, name, Code, Hora_Inicio, Hora_Finalizar, is_traslado, is_guia, ciudad_id, hora_chofer, Descripcion)" +
                        " VALUES (" + servicios[key].id + ", '" + servicios[key].name + "', '" + servicios[key].Code
                        + "', '" + servicios[key].Hora_Inicio + "', '" + servicios[key].Hora_Finalizar + "', '" + servicios[key].is_traslado + "', '" +
                        servicios[key].is_guia + "', '" + JSON.stringify(servicios[key].ciudad_id) + "', '" + servicios[key].hora_chofer + "', '" + self.parseDato(servicios[key].Descripcion) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarHoteles = function () {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.hoteles', [], self.tablas.Tbl_hoteles_odoo)
                .then(function (servicios) {
                sql.push('DELETE FROM hoteles;');
                Object.keys(servicios).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO hoteles " +
                        "(id, name, direccion)" +
                        " VALUES (" + servicios[key].id + ", '" + self.parseDato(servicios[key].name) + "', '" + self.parseDato(servicios[key].direccion) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarGastosConceptos = function () {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.gastostours', [["ciudades", "in", [2, 3, 4, 5, 6, 7]]], ["gasto_id", "name", "ciudades"])
                .then(function (gastostours) {
                sql.push('DELETE FROM gastostours;');
                Object.keys(gastostours).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO gastostours " +
                        "(id, name, ciudades)" +
                        " VALUES (" + gastostours[key].id + ", '" + gastostours[key].name + "', '" + JSON.stringify(gastostours[key].ciudades) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.insertBatch = function (sql) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create(self.bd_conf).then(function (db) {
                db.sqlBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log(e.message);
                    reject(e);
                });
            }).catch(function (e) {
                console.log('Error en conexion DB');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.updateAttachment = function (eventos_id) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            console.log('-----------------UPDATE IMPORTANT---------------');
            self.search_read('ir.attachment', [['res_id', '=', eventos_id]], self.tablas.Tbl_attachment_odoo)
                .then(function (attachment) {
                Object.keys(attachment).forEach(function (key) {
                    var registro = "INSERT OR REPLACE INTO attachment " +
                        "(id, cliente_id, file_size, name, eventos_id, is_cliente)" +
                        " VALUES (" + attachment[key].id + ", '" + attachment[key].cliente_id[0] + "', '" + attachment[key].file_size + "', '"
                        + attachment[key].name + "', '" + attachment[key].eventos_id[0] + "', '" + attachment[key].is_cliente + "');";
                    //console.log(registro); 
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarAttachment = function (borrar) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            console.log(JSON.stringify(self.eventosTodos));
            self.search_read('ir.attachment', [], self.tablas.Tbl_attachment_odoo)
                .then(function (attachment) {
                if (borrar == true) {
                    sql.push('DELETE FROM attachment;');
                }
                Object.keys(attachment).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO attachment " +
                        "(id, cliente_id, file_size, name, eventos_id, is_cliente)" +
                        " VALUES (" + attachment[key].id + ", '" + attachment[key].cliente_id[0] + "', '" + attachment[key].file_size + "', '"
                        + attachment[key].name + "', '" + attachment[key].eventos_id[0] + "', '" + attachment[key].is_cliente + "');";
                    //console.log(registro); 
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarGastosCiudad = function (borrar) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('-----------------entro3 ---------------');
            //console.log('-----------------cargarGastosCiudad ---------------');
            //console.log(self.gastos_ciudad);
            self.read('rusia.gastos.ciudad', self.gastos_ciudad, self.tablas.Tbl_gastos_ciudad_odoo)
                .then(function (gastos) {
                //console.log('resolvio gastos');
                //console.log(JSON.stringify(attachment));
                if (borrar == true) {
                    sql.push('DELETE FROM gastosciudad;');
                }
                Object.keys(gastos).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO gastosciudad " +
                        "(id, fecha_pago_reserva, Total_Beneficios, tarjeta_usd_pos, tarjeta_usd, tarjeta_rub, " +
                        "Total_Pagado_Web, tarjeta_eur_pos, Total_Tarjeta, Total_Paypal, Total_Rub, Total_Representante, " +
                        "Total_Pago_Clientes, gasto_usd, concepto_id, gasto_paypal, Total_Usd, tarjeta_eur, gasto_rub, " +
                        "gasto_eur, Total_Euros, display_name, dia, evento_id)" +
                        " VALUES (" + gastos[key].id + ", '" + gastos[key].fecha_pago_reserva + "', '" +
                        gastos[key].Total_Beneficios + "', '" + gastos[key].tarjeta_usd_pos + "', '" +
                        gastos[key].tarjeta_usd + "', '" + gastos[key].tarjeta_rub + "', '" +
                        gastos[key].Total_Pagado_Web + "', '" + gastos[key].tarjeta_eur_pos + "', '" +
                        gastos[key].Total_Tarjeta + "', '" + gastos[key].Total_Paypal + "', '" +
                        gastos[key].Total_Rub + "', '" + gastos[key].Total_Representante + "', '" +
                        gastos[key].Total_Pago_Clientes + "', '" + gastos[key].gasto_usd + "', '" +
                        JSON.stringify(gastos[key].concepto_id) + "', '" + gastos[key].gasto_paypal + "', '" + gastos[key].Total_Usd + "', '" +
                        gastos[key].tarjeta_eur + "', '" + gastos[key].gasto_rub + "', '" + gastos[key].gasto_eur + "', '" +
                        gastos[key].Total_Euros + "', '" + gastos[key].display_name + "',  '" + gastos[key].dia + "', '" + JSON.stringify(gastos[key].evento_id) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline attachment');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                reject();
            });
        });
        return promise;
    };
    ;
    /*public insertGastos(data){

        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            

                var registro = "INSERT OR IGNORE INTO gastostoursline "+
                    "(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)"+
                    " VALUES (" + data.id + ", '"+JSON.stringify(data.concepto_gasto_id)+"', '"
                    +data.tipo_moneda +"', '"+ data.Total+ "', '" + data.fecha +"', '"+
                    JSON.stringify(data.ciudad_id)+"', '"+data.observaciones+"', '"+JSON.stringify(data.usuario_id)+"', '"+data.evento_padre+"', '"+ data.eventos_id[0] +"');";

                //console.log(registro);
                sql.push(registro);
            //console.log(JSON.stringify(sql));


                self.insertBatch(sql)
                    .then(res => {
                        //console.log('usr.tipo_usuario'+ usr.tipo_usuario);
                        resolve();
                            
                    }).catch(e => {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e)
                });

        });

        return promise;

    }*/
    GetDatosProvider.prototype.updateGastos = function (eventos_id) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            self.search_read('rusia.gastostoursline', [["eventos_id", "=", eventos_id]], self.tablas.Tbl_gastos_odoo)
                .then(function (gastos) {
                Object.keys(gastos).forEach(function (key) {
                    var registro = "INSERT OR REPLACE INTO gastostoursline " +
                        "(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)" +
                        " VALUES (" + gastos[key].id + ", '" + JSON.stringify(gastos[key].concepto_gasto_id) + "', '"
                        + gastos[key].tipo_moneda + "', '" + gastos[key].Total + "', '" + gastos[key].fecha + "', '" +
                        JSON.stringify(gastos[key].ciudad_id) + "', '" + gastos[key].observaciones + "', '" + JSON.stringify(gastos[key].usuario_id) + "', '" + gastos[key].evento_padre + "', '" + gastos[key].eventos_id[0] + "');";
                    console.log("UPDATE IMPORTANTE--------------------------------------------->");
                    sql.push(registro);
                });
                //console.log(JSON.stringify(sql));  										   
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline gastos');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);					 	        	
                resolve();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarGastos = function (borrar) {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            self.search_read('rusia.gastostoursline', [["eventos_id", "in", self.eventosTodos]], self.tablas.Tbl_gastos_odoo)
                .then(function (gastos) {
                //console.log('resolvio gastos');
                if (borrar == true) {
                    sql.push('DELETE FROM gastostoursline;');
                }
                Object.keys(gastos).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO gastostoursline " +
                        "(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)" +
                        " VALUES (" + gastos[key].id + ", '" + JSON.stringify(gastos[key].concepto_gasto_id) + "', '"
                        + gastos[key].tipo_moneda + "', '" + gastos[key].Total + "', '" + gastos[key].fecha + "', '" +
                        JSON.stringify(gastos[key].ciudad_id) + "', '" + gastos[key].observaciones + "', '" + JSON.stringify(gastos[key].usuario_id) + "', '" + gastos[key].evento_padre + "', '" + gastos[key].eventos_id[0] + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                //console.log(JSON.stringify(sql));  										   
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
            }, function () {
                console.log('Error search_read - Loading offline gastos');
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);					 	        	
                resolve();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.parseDato = function (dato) {
        //console.log(typeof dato)
        //console.log((dato == 'false'));
        //dato = 
        return ((dato == 'false' || dato == false) ? "" : dato.replace(/\'/g, ""));
    };
    //private cargarGastosEvento
    GetDatosProvider.prototype.guardarEventos = function (eventos, is_padre, borrar) {
        var self = this;
        //self.eventoHijo = [];
        var promise = new Promise(function (resolve, reject) {
            //console.log('resolvio eventos');
            //console.log(JSON.stringify(eventos));
            var sql = [];
            if (borrar == true) {
                sql.push('DELETE FROM eventos;');
            }
            Object.keys(eventos).forEach(function (key) {
                //console.log('Inner B'+ tmp_dominio)
                //console.log(JSON.stringify(eventos[key].gastos_ids));
                if (is_padre == false) {
                    //console.log('cargar evento padre---------------------->' + self.eventoHijo.indexOf(eventos[key].name));
                    if (self.eventoHijo.indexOf(eventos[key].evento_id[0]) == -1) {
                        var evento_id = eventos[key].evento_id[0];
                        if (evento_id != null) {
                            self.eventoHijo.push(eventos[key].evento_id[0]);
                        }
                        //console.log('Es evento padre---------------------->')
                        //console.log(self.eventoHijo);
                    }
                }
                else {
                    //gastos_ciudad
                    //agrego los
                    var gastos_ids = eventos[key].gastos_ids;
                    //console.log(JSON.stringify(gastos_ids));
                    for (var i = gastos_ids.length - 1; i >= 0; i--) {
                        if (self.gastos_ciudad.indexOf(gastos_ids[i]) == -1) {
                            //var gasto_id = eventos[key].gastos_ids[key2];
                            self.gastos_ciudad.push(gastos_ids[i]);
                        }
                    }
                    /*
                    Object.keys(gastos_ids).forEach(key2=> {

                        
                    });*/
                    //console.log(JSON.stringify(self.gastos_ciudad));
                }
                var registro = "INSERT OR IGNORE INTO eventos " +
                    "(id, cliente_id_tmp, cliente_id, representante_id, representante_id_tmp," +
                    " Fecha_Inicio, hora_inicio , hora_final, hora_chofer, name, is_padre, fecha_padre, guia_id, guia_id2, guia_id3," +
                    " chofer_id_tmp, chofer_id, gasto_rub, gasto_eur, gasto_usd, gasto_paypal, Comentarios_Chofer," +
                    " Comentarios_Internos, Comentarios_Cliente, Comentarios_Guia, Fecha_Fin, Transporte, hotel_id," +
                    " ciudad_id, Total_Representante, message, numero_pax, evento_id, Servicio_Gastos, tarjeta_eur," +
                    " tarjeta_rub, tarjeta_usd, is_guia, is_traslado, gastostoursline_ids, guia_id_tmp, guia_id_tmp2, guia_id_tmp3, gastos_ids," +
                    " servicio_id, salario, observaciones_solicitud, nombre_reserva)" +
                    " VALUES (" + eventos[key].id + ", '" + eventos[key].Datos_Cliente_id[0] + "', '" + JSON.stringify(eventos[key].Datos_Cliente_id) + "', '" +
                    JSON.stringify(eventos[key].representante_id) + "', '" + eventos[key].representante_id[0] + "', '" + eventos[key].Fecha_Inicio + "','" +
                    eventos[key].hora_inicio + "', '" + eventos[key].hora_final + "', '" + self.parseDato(eventos[key].hora_chofer) + "', '" +
                    eventos[key].name + "', '" + eventos[key].is_padre + "', '" +
                    eventos[key].fecha_padre + "', '" + JSON.stringify(eventos[key].guia_id) + "' , '" + JSON.stringify(eventos[key].guia_id2) + "' , '" + JSON.stringify(eventos[key].guia_id3) + "' , '" +
                    eventos[key].chofer_id[0] + "' , '" + JSON.stringify(eventos[key].chofer_id) + "' , '" + eventos[key].gasto_rub + "' , '" +
                    eventos[key].gasto_eur + "' , '" + eventos[key].gasto_usd + "' , '" +
                    eventos[key].gasto_paypal + "', '" + self.parseDato(eventos[key].Comentarios_Chofer) + "', '" +
                    self.parseDato(eventos[key].Comentarios_Internos) + "', '" + self.parseDato(eventos[key].Comentarios_Cliente) + "', '" +
                    self.parseDato(eventos[key].Comentarios_Guia) + "', '" + eventos[key].Fecha_Fin + "', '" +
                    self.parseDato(eventos[key].Transporte) + "', '" + self.parseDato(JSON.stringify(eventos[key].hotel_id)) + "', '" + JSON.stringify(eventos[key].ciudad_id) + "', '" +
                    eventos[key].Total_Representante + "', '" + self.parseDato(eventos[key].message) + "', '" + eventos[key].numero_pax + "', '" +
                    JSON.stringify(eventos[key].evento_id) + "', '" + eventos[key].Servicio_Gastos + "', '" + eventos[key].tarjeta_eur + "', '" +
                    eventos[key].tarjeta_rub + "', '" + eventos[key].tarjeta_usd + "' , '" + eventos[key].is_guia + "', '" + eventos[key].is_traslado + "', '" +
                    JSON.stringify(eventos[key].gastostoursline_ids) + "', '" + eventos[key].guia_id[0] + "', '" + eventos[key].guia_id2[0] + "', '" + eventos[key].guia_id3[0] + "', '" + JSON.stringify(eventos[key].gastos_ids) + "', '" +
                    JSON.stringify(eventos[key].servicio_id) + "', '" + eventos[key].salario + "', '" + self.parseDato(eventos[key].observaciones_solicitud) + "', '"
                    + self.parseDato(eventos[key].nombre_reserva) + "');";
                //console.log(registro);							  			
                sql.push(registro);
            });
            self.insertBatch(sql)
                .then(function (res) {
                //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                resolve();
            }).catch(function (e) {
                console.log('Error en insertBatch DB');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarEventos = function (tmp_dominio, borrar) {
        var self = this;
        //self.eventoHijo = [];
        var promise = new Promise(function (resolve, reject) {
            var dominio = [];
            //console.log('Inner A'+ tmp_dominio)
            if (tmp_dominio == null) {
                //console.log('tmp_dominio is null -------------------------------------------------------1');
                //console.log(JSON.stringify(self.eventoHijo));
                self.read('rusia.eventos', self.eventoHijo, self.tablas.Tbl_eventos_odoo).then(function (eventos) {
                    //console.log('eventos ---------------1');
                    Object.keys(eventos).forEach(function (key) {
                        //console.log(JSON.stringify(eventos[key].id));
                        if (self.eventosTodos.indexOf(eventos[key].id) == -1) {
                            self.eventosTodos.push(eventos[key].id);
                        }
                    });
                    self.guardarEventos(eventos, true, false).then(function (res) {
                        //console.log(' entro a  cargarGastosCiudad-------------------------------------------------------2');
                        self.cargarGastosCiudad(borrar).then(function (res) {
                            resolve();
                        }, function (fail) {
                            reject();
                        });
                    }, function (fail) {
                        reject();
                    });
                }, function (fail) {
                    reject();
                });
            }
            else {
                self.search_read('rusia.eventos', tmp_dominio, self.tablas.Tbl_eventos_odoo)
                    .then(function (eventos) {
                    Object.keys(eventos).forEach(function (key) {
                        //console.log(JSON.stringify(eventos[key].id));
                        if (self.eventosTodos.indexOf(eventos[key].id) == -1) {
                            self.eventosTodos.push(eventos[key].id);
                        }
                    });
                    self.guardarEventos(eventos, false, borrar).then(function (res) {
                        resolve();
                    }, function (fail) {
                        reject();
                    });
                }, function () {
                    reject();
                });
            }
        });
        return promise;
    };
    GetDatosProvider.prototype.updateCalendario = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, promise;
            return __generator(this, function (_a) {
                self = this;
                promise = new Promise(function (resolve, reject) {
                    var dominio = [];
                    self.search_read('rusia.eventos', [['id', '=', id]], self.tablas.Tbl_eventos_odoo)
                        .then(function (eventos) {
                        var sql = [];
                        Object.keys(eventos).forEach(function (key) {
                            var registro = "UPDATE eventos SET" +
                                " cliente_id_tmp = '" + eventos[key].Datos_Cliente_id[0] + "', cliente_id = '" + JSON.stringify(eventos[key].Datos_Cliente_id) +
                                "', representante_id ='" + JSON.stringify(eventos[key].representante_id) + "', representante_id_tmp = '" + eventos[key].representante_id[0] +
                                "',Fecha_Inicio = '" + eventos[key].Fecha_Inicio + "', hora_inicio ='" + eventos[key].hora_inicio +
                                "', hora_final = '" + eventos[key].hora_final + "', hora_chofer = '" + self.parseDato(eventos[key].hora_chofer) +
                                "', name = '" + eventos[key].name + "', is_padre = '" + eventos[key].is_padre + "', fecha_padre = '" + eventos[key].fecha_padre +
                                "', guia_id =  '" + JSON.stringify(eventos[key].guia_id) + "', guia_id2 =  '" + JSON.stringify(eventos[key].guia_id) + "', guia_id3 =  '" + JSON.stringify(eventos[key].guia_id) + "', chofer_id_tmp =  '" + eventos[key].chofer_id[0] +
                                "', chofer_id = '" + JSON.stringify(eventos[key].chofer_id) + "', gasto_rub = '" + eventos[key].gasto_rub + "', gasto_eur = '" + eventos[key].gasto_eur +
                                "', gasto_usd =  '" + eventos[key].gasto_usd + "' , gasto_paypal = '" + eventos[key].gasto_paypal +
                                "', Comentarios_Chofer='" + self.parseDato(eventos[key].Comentarios_Chofer) +
                                "', Comentarios_Internos='" + self.parseDato(eventos[key].Comentarios_Internos) + "', Comentarios_Cliente='" + self.parseDato(eventos[key].Comentarios_Cliente) +
                                "', Comentarios_Guia='" + self.parseDato(eventos[key].Comentarios_Guia) + "', Fecha_Fin='" + eventos[key].Fecha_Fin + "', Transporte='" + self.parseDato(eventos[key].Transporte) +
                                "', hotel_id='" + self.parseDato(JSON.stringify(eventos[key].hotel_id)) + "'," + " ciudad_id='" + JSON.stringify(eventos[key].ciudad_id) +
                                "', Total_Representante='" + eventos[key].Total_Representante + "', message='" + self.parseDato(eventos[key].message) + "', numero_pax='" + eventos[key].numero_pax + "', evento_id='" + JSON.stringify(eventos[key].evento_id) +
                                "', Servicio_Gastos='" + eventos[key].Servicio_Gastos + "', tarjeta_eur='" + eventos[key].tarjeta_eur +
                                "', tarjeta_rub='" + eventos[key].tarjeta_rub + "', tarjeta_usd='" + eventos[key].tarjeta_usd + "', is_guia='" + eventos[key].is_guia + "', is_traslado='" + eventos[key].is_traslado +
                                "', gastostoursline_ids='" + JSON.stringify(eventos[key].gastostoursline_ids) + "', guia_id_tmp2='" + eventos[key].guia_id[0] + "', guia_id_tmp3='" + eventos[key].guia_id[0] + "', guia_id_tmp='" + eventos[key].guia_id[0] + "', gastos_ids='" + JSON.stringify(eventos[key].gastos_ids) +
                                "', servicio_id='" + JSON.stringify(eventos[key].servicio_id) + "', salario='" + eventos[key].salario + "', observaciones_solicitud='" + self.parseDato(eventos[key].observaciones_solicitud) + "', nombre_reserva = '" + self.parseDato(eventos[key].nombre_reserva) +
                                "' WHERE id = '" + eventos[key].id + "'";
                            console.log("UPDATE IMPORTANTE -------------------------------------------------------------");
                            console.log(registro);
                            sql.push(registro);
                        });
                        self.insertBatch(sql)
                            .then(function (res) {
                            //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                            resolve();
                        }).catch(function (e) {
                            console.log('Error en insertBatch DB');
                            console.log(e.message);
                            reject(e);
                        });
                    }, function () {
                        reject();
                    });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    GetDatosProvider.prototype.cargarCalendario = function (borrar) {
        return __awaiter(this, void 0, void 0, function () {
            var self, dominioUsers, dominio, dominioSol, dateTem, dateInicio, fechaInicio, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        dominioUsers = null;
                        dominioSol = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 22, , 23]);
                        dateTem = new Date();
                        dateInicio = dateTem.setMonth(dateTem.getMonth() - 2);
                        fechaInicio = this.convertirFechaTwo(dateInicio);
                        if (self.usr.tipo_usuario + '' == 'is_root') {
                            dominio = [['is_padre', '=', false], ["Fecha_Inicio", ">=", fechaInicio]];
                            dominioUsers = [];
                        }
                        else if (self.usr.tipo_usuario + '' == 'is_client') {
                            dominio = [['is_padre', '=', false], ["Datos_Cliente_id", "=", self.usr.id], ["Fecha_Inicio", ">=", fechaInicio]];
                        }
                        else if (self.usr.tipo_usuario + '' == 'is_guia') {
                            dominio = [['is_padre', '=', false], ["guia_id", "=", self.usr.id], ["Fecha_Inicio", ">=", fechaInicio]];
                            dominioUsers = [["is_client", "=", false], ["is_rep", "=", false]];
                            dominioSol = [
                                ["is_padre", "=", false],
                                ["is_guia", "=", true],
                                ["guia_id", "=", false], ["Fecha_Inicio", ">=", fechaInicio]
                            ];
                        }
                        else if (self.usr.tipo_usuario + '' == 'is_chofer') {
                            dominio = [['is_padre', '=', false], ["chofer_id", "=", self.usr.id], ["Fecha_Inicio", ">=", fechaInicio]];
                            dominioUsers = [["is_client", "=", false], ["is_rep", "=", false]];
                            dominioSol = [
                                ["is_padre", "=", false],
                                ["is_traslado", "=", true],
                                ["chofer_id", "=", false], ["Fecha_Inicio", ">=", fechaInicio]
                            ];
                        }
                        else if (self.usr.tipo_usuario == 'is_rep') {
                            dominio = [['is_padre', '=', false], ["representante_id", "=", self.usr.id]];
                        }
                        else if (self.usr.tipo_usuario == 'is_traslados') {
                            dominio = [['is_padre', '=', false], ["is_traslado", "=", true]];
                        }
                        else if (self.usr.tipo_usuario == 'is_general') {
                            dominio = [['is_padre', '=', false]];
                            dominioUsers = [];
                        }
                        if (!borrar[0]) return [3 /*break*/, 7];
                        console.log('----------  Cargar los eventos asignados');
                        return [4 /*yield*/, self.cargarEventos(dominio, borrar[0])];
                    case 2:
                        _a.sent();
                        console.log('----------  Cargar los eventos solicitables');
                        if (!(dominioSol != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, self.cargarEventos(dominioSol, false)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log('----------  Cargar los eventos para la tabla solicitudes');
                        return [4 /*yield*/, self.cargarSolicitudes(borrar[0])];
                    case 5:
                        _a.sent();
                        console.log('cargar eventos padre');
                        return [4 /*yield*/, self.cargarEventos(null, false)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!borrar[1]) return [3 /*break*/, 9];
                        console.log('----------  await self.cargarGastos(false);;');
                        return [4 /*yield*/, self.cargarGastos(borrar[1])];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!borrar[2]) return [3 /*break*/, 11];
                        console.log('----------  await self.cargarAttachment(false);');
                        return [4 /*yield*/, self.cargarAttachment(borrar[2])];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!borrar[3]) return [3 /*break*/, 13];
                        console.log('----------  await self.cargarGastosConceptos();');
                        return [4 /*yield*/, self.cargarGastosConceptos()];
                    case 12:
                        _a.sent(); //-> no lo carga el usuario
                        _a.label = 13;
                    case 13:
                        if (!borrar[4]) return [3 /*break*/, 15];
                        console.log('----------  await self.cargarCiudades();');
                        return [4 /*yield*/, self.cargarCiudades(borrar[4])];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        if (!(borrar[5] && dominioUsers != null)) return [3 /*break*/, 17];
                        console.log('----------  await self.dominioUsers();');
                        return [4 /*yield*/, self.cargarUsuario(dominioUsers)];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        if (!borrar[6]) return [3 /*break*/, 21];
                        console.log('----------  await self.cargarServicios();');
                        return [4 /*yield*/, self.cargarServicios()];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, self.cargarHoteles()];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, self.cargarConceptos()];
                    case 20:
                        _a.sent();
                        _a.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        e_1 = _a.sent();
                        return [3 /*break*/, 23];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    GetDatosProvider.prototype.delete = function (tabla, id) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            //for(var i=0; i<data.rows.length; i++) {
            //    self.reservas.push(data.rows.item(i));                    
            //}
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                odoo.delete(tabla, id).then(function (ok_delete) {
                    /*console.log(ok_delete);
                    resolve(ok_delete);*/
                    resolve(ok_delete);
                }, function () {
                    console.log('Error creating Odoo');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.eliminar = function (tabla, id) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            //for(var i=0; i<data.rows.length; i++) {
            //    self.reservas.push(data.rows.item(i));                    
            //}
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                odoo.delete(tabla, id).then(function (ok_delete) {
                    /*console.log(ok_delete);
                    resolve(ok_delete);*/
                    if (ok_delete) {
                        var tabla_bd = tabla.split('.')[1];
                        //console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
                        console.log("DELETE FROM " + tabla_bd + " WHERE id = " + id);
                        self.ejecutarSQL("DELETE FROM " + tabla_bd + " WHERE id = " + id).then(function (res) {
                            console.log('delete OK: ' + id);
                            //console.log(JSON.stringify(res));
                            resolve(ok_delete);
                        }, function (fail) {
                            console.log('Fail update BD');
                            reject();
                        });
                        //resolve(ok_code);				        		
                    }
                    else {
                        console.log('Fail update Odoo');
                        reject();
                    }
                }, function () {
                    console.log('Error creating Odoo');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.create = function (tabla, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            //for(var i=0; i<data.rows.length; i++) {
            //    self.reservas.push(data.rows.item(i));                    
            //}
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                odoo.create(tabla, campos).then(function (ok_id) {
                    resolve(ok_id);
                }, function () {
                    console.log('Error creating Odoo');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.write = function (tabla, dominio, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                odoo.write(tabla, dominio, campos).then(function (ok_code) {
                    resolve(ok_code);
                }, function () {
                    console.log('Fail update Odoo');
                    reject();
                });
            }, function () {
                console.log('Fail connect Odoo');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.call = function (tabla, metodo, id) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                console.log('search_read OK');
                odoo.call(tabla, metodo, id).then(function (tabla) {
                    resolve(tabla);
                }, function () {
                    console.log('error');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.read = function (tabla, ids, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                console.log('search_read OK');
                odoo.read(tabla, ids, campos).then(function (tabla) {
                    resolve(tabla);
                }, function () {
                    console.log('error');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.search_read = function (tabla, dominio, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            //console.log(JSON.stringify(campos))
            var odoo = new OdooApi(self.url, self.usr.bd);
            odoo.login(self.usr.usuario, self.usr.pwd).then(function (uid) {
                console.log('search_read OK');
                odoo.search_read(tabla, dominio, campos).then(function (tabla) {
                    resolve(tabla);
                }, function () {
                    console.log('error');
                    reject();
                });
            }, function () {
                console.log('error');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.deleteBD = function () {
        var self = this;
        self.sqlite.deleteDatabase(self.bd_conf).then(function (ok) {
            console.log('BD deleted - OK');
            return true;
        }, function (fail) { return false; });
    };
    GetDatosProvider.prototype.cargarUsuario = function (dominio) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.search_read('res.users', dominio, self.tablas.Tbl_user_odoo).then(function (users) {
                //console.log(user[0]);
                var sql = [];
                Object.keys(users).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO user " +
                        "(id, gastos_users_ids," +
                        " company_id, ciudades, fax, is_correo, name, eventos_ids, state," +
                        "email, active, reps_gastos_ids, login, phone, mobile) VALUES (" + users[key].id + ", '" + JSON.stringify(users[key].gastos_users_ids) + "', '" +
                        JSON.stringify(users[key].company_id) + "', '" + users[key].ciudades + "', '" + users[key].fax + "', '" + users[key].is_correo + "', '" +
                        self.parseDato(users[key].name) + "', '" + JSON.stringify(users[key].eventos_ids) + "', '" + users[key].state + "', '" + users[key].email + "', '" +
                        users[key].active + "', '" + JSON.stringify(users[key].reps_gastos_ids) + "', '" + users[key].login + "' ,'" + users[key].phone + "', '" + users[key].mobile + "' );";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
                //resolve();
            }, function () {
                console.log('Error get usuarios');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarSolicitudes = function (borrar) {
        var self = this;
        console.log('-------------------cargando solicitudes');
        var promise = new Promise(function (resolve, reject) {
            self.search_read('rusia.solicitud.eventos', [["procesado", "!=", true]], self.tablas.Tbl_solicitud_odoo).then(function (solicitud) {
                //console.log(user[0]);
                var sql = [];
                if (borrar == true) {
                    sql.push('DELETE FROM solicitud;');
                }
                Object.keys(solicitud).forEach(function (key) {
                    var registro = "INSERT OR IGNORE INTO solicitud " +
                        "(id, usuario_id, name, servicio_id, tipo, salario, fecha, observaciones_solicitud, ciudad_id) VALUES (" + solicitud[key].id + ", '" + JSON.stringify(solicitud[key].usuario_id) + "', '" +
                        JSON.stringify(solicitud[key].name) + "', '" + JSON.stringify(solicitud[key].servicio_id) + "', '" + solicitud[key].tipo + "', '" + solicitud[key].salario + "', '" +
                        solicitud[key].fecha + "', '" + solicitud[key].observaciones_solicitud + "' , '" + JSON.stringify(solicitud[key].ciudad_id) + "');";
                    //console.log(registro);
                    sql.push(registro);
                });
                self.insertBatch(sql)
                    .then(function (res) {
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                }).catch(function (e) {
                    console.log('Error en insertBatch DB');
                    console.log(e.message);
                    reject(e);
                });
                //resolve();
            }, function () {
                console.log('Error get usuarios');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.crearEsquema = function (conexion) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            if (conexion.usuario != '' && conexion.pwd != '') {
                //console.log()
                var odoo = new OdooApi(self.url, conexion.bd);
                odoo.login(conexion.usuario, conexion.pwd).then(function (uid) {
                    //vamos a cargar el usuario 
                    odoo.search_read('res.users', [['login', '=', conexion.usuario]], //, '', 'date_begin',
                    self.tablas.Tbl_user_odoo).then(function (user) {
                        //console.log(user[0]);
                        console.log('get login user OK');
                        var tipo = '';
                        if (user[0].is_chofer == true) {
                            tipo = "is_chofer";
                        }
                        else if (user[0].is_guia == true) {
                            tipo = "is_guia";
                        }
                        else if (user[0].is_rep == true) {
                            tipo = "is_rep";
                        }
                        else if (user[0].is_client == true) {
                            tipo = "is_client";
                        }
                        else if (user[0].is_root == true) {
                            tipo = "is_root";
                        }
                        else if (user[0].is_general == true) {
                            tipo = "is_general";
                        }
                        else if (user[0].is_traslados == true) {
                            tipo = "is_traslados";
                        }
                        else {
                            tipo = "is_client";
                        }
                        //creo todas las tablas
                        self.sqlite.create(self.bd_conf).then(function (db) {
                            //
                            var sql = [self.tablas.Tbl_solicitud,
                                self.tablas.Tbl_conceptos,
                                self.tablas.Tbl_hoteles,
                                self.tablas.Tbl_gastos_ciudad,
                                self.tablas.Tbl_gastostours,
                                self.tablas.Tbl_eventos,
                                self.tablas.Tbl_gastos,
                                self.tablas.Tbl_user,
                                self.tablas.Tbl_attachment,
                                self.tablas.Tbl_ciudad,
                                self.tablas.Tbl_servicios];
                            db.sqlBatch(sql)
                                .then(function (res) {
                                console.log('Executed SQL');
                                //
                                var sql = [];
                                //console.log('-----------------------------2');
                                sql.push("INSERT OR IGNORE INTO user " +
                                    "(id, usuario, pwd, bd, tipo_usuario, gastos_users_ids," +
                                    " company_id, ciudades, fax, is_correo, name, eventos_ids, state," +
                                    "email, active, reps_gastos_ids, login, phone, mobile) VALUES (" + uid + ", '" + conexion.usuario + "', '"
                                    + conexion.pwd + "', '" + conexion.bd + "', '" + tipo + "', '" + JSON.stringify(user[0].gastos_users_ids) + "', '" +
                                    JSON.stringify(user[0].company_id) + "', '" + user[0].ciudades + "', '" + user[0].fax + "', '" + user[0].is_correo + "', '" +
                                    user[0].name + "', '" + JSON.stringify(user[0].eventos_ids) + "', '" + user[0].state + "', '" + user[0].email + "', '" +
                                    user[0].active + "', '" + JSON.stringify(user[0].reps_gastos_ids) + "', '" + user[0].login + "' ,'" + user[0].phone + "', '" + user[0].mobile + "' );");
                                db.sqlBatch(sql)
                                    .then(function (res) {
                                    self.ejecutarSQL('SELECT * FROM user where login = "' + user[0].login + '"').then(function (data) {
                                        self.usr = data.rows.item(0);
                                        resolve(tipo);
                                    }, function () {
                                        console.log('Error get table user');
                                        reject();
                                    });
                                }).catch(function (e) {
                                    console.log(e.message);
                                    reject(e);
                                });
                            }).catch(function (e) {
                                console.log('Error en CREATE TABLE');
                                console.log(e.message);
                                reject(e);
                            });
                        }).catch(function (e) {
                            console.log('Error en CONEXION BD');
                            console.log(e.message);
                            reject(e);
                        });
                        //resolve();
                    }, function () {
                        console.log('Error get usuarios');
                        reject();
                    });
                }, function () {
                    console.log('Error conexion login');
                    reject();
                });
            }
            else {
                reject();
            }
        });
        return promise;
    };
    GetDatosProvider.prototype.login = function (conexion) {
        var self = this; //http://185.129.251.102
        //console.log('-----------------------------0');
        var promise = new Promise(function (resolve, reject) {
            self.ejecutarSQL('SELECT * FROM user WHERE usuario IS NOT NULL').then(function (data) {
                //console.log('---------------login by bd ---------------1');
                //console.log(JSON.stringify(data));
                if (data.rows.length > 0) {
                    self.usr = data.rows.item(0);
                }
                else {
                    self.usr = null;
                }
                //console.log(JSON.stringify(data.rows.item(0)));
                //
                if (self.usr != null) {
                    resolve(self.usr.tipo_usuario);
                }
                else {
                    reject();
                }
            }, function () {
                //console.log('Error get table user');				
                //console.log('---------------login by connet ---------------1');
                self.crearEsquema(conexion).then(function (res) {
                    var reload = [true, true, true, true, true, true, true];
                    self.cargarCalendario(reload).then(function () {
                        resolve(res);
                    }, function (e) {
                        console.log('Error en calendario');
                        console.log(e);
                        reject();
                    });
                }, function (fail) {
                    reject();
                });
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.addCero = function (num) {
        if (num < 10 && num.toString().length < 2) {
            return (num = '0' + num);
        }
        return num;
    };
    GetDatosProvider.prototype.convertirFecha = function (fecha) {
        var dateS = new Date(fecha);
        var date = new Date(dateS.getTime() + (dateS.getTimezoneOffset() * 60000));
        var year = date.getFullYear();
        var month = this.addCero(date.getMonth() + 1);
        var dia = this.addCero(date.getDate());
        var hora = this.addCero(date.getHours());
        var minutos = this.addCero(date.getMinutes());
        var segundos = this.addCero(date.getSeconds());
        //+ ' ' + hora + ':' + minutos + ':' + segundos
        return year + '-' + month + '-' + dia;
    };
    GetDatosProvider.prototype.convertirFechaTwo = function (fecha) {
        var dateS = new Date(fecha);
        var date = new Date(dateS.getTime() + (dateS.getTimezoneOffset() * 60000));
        var year = date.getFullYear();
        var month = this.addCero(date.getMonth() + 1);
        var dia = this.addCero(date.getDate());
        var hora = this.addCero(date.getHours());
        var minutos = this.addCero(date.getMinutes());
        var segundos = this.addCero(date.getSeconds());
        //
        return year + '-' + month + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
    };
    GetDatosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SQLite, TablasProvider])
    ], GetDatosProvider);
    return GetDatosProvider;
}());
export { GetDatosProvider };
//# sourceMappingURL=get-datos.js.map