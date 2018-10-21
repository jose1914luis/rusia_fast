import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { EventoPage } from '../../pages/evento/evento';
import { LocalNotifications } from '@ionic-native/local-notifications';

//@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

    cargar = true;
    viewTitle = '';
    calendar = {
        eventSource: [],
        mode: 'month',
        currentDate: new Date(),
        formatDayHeader: 'E',
        noEventsLabel: 'Sin Eventos',
        formatMonthTitle: 'MMMM yyyy',
        allDayLabel: 'Todo el día',
        formatWeekTitle: 'MMMM yyyy, Se $n',
        locale: 'es-RU'
    };

    usuario;
    private notification = [];
    constructor(private localNotifications: LocalNotifications, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public alertCtrl: AlertController) {

        this.localNotifications.clearAll();
        this.localNotifications.cancelAll();
        this.initCalendario(false);
        
        /*this.localNotifications.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            foreground: true
        });*/
    }

    private initCalendario(borrar){
     
        var self = this;
        self.cargar = true;
        if(borrar == true){

            var reload = [true,true,true,true,true,true,true];
            this.getDatos.cargarCalendario(reload).then(          
              res=> {                                
                self.datosOffline().then(
                    good=>{
                        console.log('exito');
                    },
                    bad =>{
                        console.log('error');
                    }
                );                                                            
              },
              fail=>{
                   console.log('Error en calendario');
                   //console.log(e);
               }
            );

        }else{

            this.datosOffline().then(
                good=>{
                    console.log('exito');
                    self.presentConfirm();
                },
                bad =>{
                    console.log('error');
                }
            );
        }
    }




    private datosOffline(){


        var self = this;
        self.cargar = true;


        var self = this;
        var promise = new Promise(function (resolve, reject) {

            let usr = self.getDatos.usr;
            self.usuario = usr;
            var where;
            if(usr.tipo_usuario + '' == 'is_root'){

                where = 'is_padre = "false"';
                
            }else if(usr.tipo_usuario + '' == 'is_client'){
                
                //dominio = [["Datos_Cliente_id", "=", self.usr.id]];
                where = 'is_padre = "false" and cliente_id_tmp = "' + usr.id + '"';

            }else if(usr.tipo_usuario + '' == 'is_guia'){//+ JSON.stringify([usr.id, usr.name]  and guia_id = "[71,"Natalia Kazan"]"
                where = 'is_padre = "false" and guia_id_tmp = "' + usr.id + '"';
              
            } else if(usr.tipo_usuario + '' == 'is_chofer'){//+ JSON.stringify([usr.id, usr.name]  and guia_id = "[71,"Natalia Kazan"]"
                where = 'is_padre = "false" and chofer_id_tmp = "' + usr.id + '"';
              
            }else if(usr.tipo_usuario + '' == 'is_rep'){                
                where = 'is_padre = "false" and representante_id_tmp = "' + usr.id + '"';

            }else if(usr.tipo_usuario + '' == 'is_traslados'){                

                where = 'is_padre = "false" and is_traslado = "true"';
            }else if(usr.tipo_usuario + '' == 'is_general'){                

                where = 'is_padre = "false"';
            }
            console.log('where: ' + where)

            self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE '+ where +'  ORDER BY id DESC').then(

                function(eventos: {rows}){
                console.log('eventos loaded - OK');
                var event_format = [];
                let cont = 1;
                for(var i=0; i<eventos.rows.length; i++) {
                    
                    var evento = eventos.rows.item(i);
                    var dateStart = new Date(String(evento.Fecha_Inicio).replace(' ', 'T'));
                    var hora_ini = evento.hora_inicio.split(":") //<--MAC
                    var hora_fin = evento.hora_final.split(":") //<--MAC

                    var tmp_chofer_id;
                    var tmp_guia_id;
                    if(evento.is_traslado == "true"){
                        tmp_chofer_id = JSON.parse(evento.chofer_id);
                    }else{
                        tmp_chofer_id = [null, "No aplica"];
                    }


                    if (evento.is_guia == "true") {
                        tmp_guia_id = JSON.parse(evento.guia_id);
                    }else{
                        tmp_guia_id = [null, "No aplica"];
                    }
                    
                    
                    var tmp_servicio_id = JSON.parse(evento.servicio_id);

                    
                    
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));

                    let startTime2 = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]);

                    event_format.push({
                        startTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title:evento.name,
                        guia:tmp_guia_id[1],
                        chofer:tmp_chofer_id[1],
                        tipo_servicio:tmp_servicio_id[1],
                        allDay:false,
                        id:eventos.rows.item(i).id
                    });

                    //console.log("----------------------------");
                    //console.log(startTime2);

                    let fecha_24 = new Date(startTime2.setDate(startTime2.getDate()-1));

                    
                    //console.log(fecha_24);


                    let noti = {
                        id:cont,
                        title:'Proximo evento en 24h: ' + evento.name,
                        text:tmp_servicio_id[1],
                        foreground: true,
                        trigger:{ at: new Date(fecha_24.getFullYear(), fecha_24.getMonth(), fecha_24.getDate(), hora_ini[0], hora_ini[1])}
                    }

                    self.notification.push(noti);
                    let fecha_12 = new Date(startTime2.setHours(hora_ini[0]-12));
                    //console.log(fecha_12);
                    cont = cont + 1;
                    let noti_2 = {
                        id:cont,
                        title:'Proximo evento en 12h: ' + evento.name,
                        text:tmp_servicio_id[1],
                        foreground: true,
                        trigger:{ at: new Date(fecha_12.getFullYear(), fecha_12.getMonth(), fecha_12.getDate(), hora_ini[0], hora_ini[1])}
                    }               

                    self.notification.push(noti_2);
                    cont = cont + 1;

                }  

                /*let fecha_test = new Date();
                let convertedDate = new Date( fecha_test.getUTCFullYear(), fecha_test.getUTCMonth(), fecha_test.getUTCDate(), fecha_test.getUTCHours(), fecha_test.getUTCMinutes(), fecha_test.getUTCSeconds() );
                let noti_3 = {
                    id:cont,
                    title:'Proximo evento en 1 minuto',
                    text:'hola',
                    foreground: true,
                    trigger:{ at: new Date(fecha_test.getFullYear(), fecha_test.getMonth(), fecha_test.getDate(), fecha_test.getHours(), fecha_test.getMinutes() + 2 , fecha_test.getSeconds())}
                }               
                // trigger:{ in: 1, unit: 'minute' }
                //trigger:{ at: new Date(fecha_test.getUTCFullYear(), fecha_test.getUTCMonth(), fecha_test.getUTCDate(), fecha_test.getUTCHours(), fecha_test.getUTCMinutes() + 2 , fecha_test.getUTCSeconds())}

                self.notification.push(noti_3);*/

                //console.log(JSON.stringify(self.notification));



                //console.log(convertedDate);
                self.localNotifications.schedule(self.notification);
                self.calendar.eventSource = event_format;
                self.cargar = false;
                resolve();
              },
              err =>{
                console.log('error after create BD');
                reject();
              }
            );
        });


        return promise;

        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalendarioPage');
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(evt) {
        
        this.navCtrl.push(EventoPage, {evento: evt, permisos:this.usuario.tipo_usuario});
    }

    refresh(){
        var self = this;
        self.initCalendario(true);
        /*var self = this;
        this.getDatos.borrarTablas(["gastostoursline", "eventos"]).then(
            res=>{
                self.initCalendario(); 
            },
            fail=>{
                console.log('Error refresh tables');
            }
        );*/
    }

    presentConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Actualizar datos.',
        message: '¿ Deseas actualizar el calendario ?',
        buttons: [
          {
            text: 'Mas tarde.',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Actualizar.',
            handler: () => {
              this.refresh();
            }
          }
        ]
      });
      alert.present();
    }


}
