webpackJsonp([0],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageModule", function() { return ModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal__ = __webpack_require__(285);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalPageModule = /** @class */ (function () {
    function ModalPageModule() {
    }
    ModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */]),
            ],
        })
    ], ModalPageModule);
    return ModalPageModule;
}());

//# sourceMappingURL=modal.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(navCtrl, navParams, viewCtrl, httpClient, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.httpClient = httpClient;
        this.storage = storage;
        this.dataObject = {};
        //ionViewDidLoad() {
        //  console.log('ionViewDidLoad ModalPage');
        //  console.log(this.navParams.get('interval_id'));
        //}
        //dataObject: any = {};
        this.task = {};
        //storage: any = {};
        this.token = {};
        this.id = {};
        this.name = {};
        this.data = {};
        this.status = {};
        this.activemodal = {};
        this.dataObject = this.navParams.get('interval');
        //this.dataObject = {id: '1'};
        //console.log(this.dataObject);
        //
        this.storage.get('token').then(function (val) {
            _this.token = val;
            console.log(_this.token);
        });
        this.storage.get('id').then(function (val) {
            _this.id = val;
            console.log("ID");
            console.log(_this.id);
        });
        this.storage.get('name').then(function (val) {
            _this.name = val;
            console.log("NAME");
            console.log(_this.name);
        });
        this.storage.get('activemodal').then(function (val) {
            _this.activemodal = val;
            console.log("ACTIVEMODAL");
            console.log(_this.activemodal);
        });
    }
    ModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss(this.dataObject);
    };
    ModalPage.prototype.postStartTime = function ($event) {
        var itime = $event;
        // {hour: 22, minute: 21}
        //
        //this.storage.get('activemodal').then((val) => {
        // this.activemodal = val;
        // console.log(val);
        // }); // end sotorageget
        //
        // place holder storageget
        //console.log("activemodal");
        //console.log(activemodal);
        console.log("TimeInt");
        console.log(itime);
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                //'Authorization': "Bearer" + " " + this.navParams.get('token'),
                'Authorization': this.token
            })
        };
        //var uuid = this.navParams.get('id').split(' ');
        //var uuid = this.navParams.get('id');
        //console.log(uuid);
        //var uuid = this.id.split(' ');
        //var  uuid_uri = uuid[1];
        var uuid_uri = this.id;
        //var  uuid_uri = uuid
        //var intnum = this.dataObject.id;
        //var save_Obj = this.dataObject;
        //console.log("intnum");
        //console.log(intnum);
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name,
            "time": itime,
            "intnum": this.activemodal,
            "desc": "s"
        };
        console.log(postData);
        //var url = 'https://10.10.11.249/' + uuid_uri + '/secretDebug';
        var url = 'https://simon.termotouch.it/' + uuid_uri + '/interval';
        console.log(url);
        var req = this.httpClient.post(url, postData, httpOptions)
            .subscribe(function (data) {
            //this.dataObject = data,
            console.log('my data: ', data);
            //this.navCtrl.push(MainmenuPage);
        });
        console.log(req);
    };
    ; // End StartTime
    ModalPage.prototype.postEndTime = function ($event) {
        var _this = this;
        var itime = $event;
        // {hour: 22, minute: 21}
        //this.storage.get('activemodal').then((val) => {
        // this.activemodal = val;
        // }); // end storageget
        //placeholder storageget
        console.log("TimeInt");
        console.log(itime);
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                //'Authorization': "Bearer" + " " + this.navParams.get('token'),
                'Authorization': this.token
            })
        };
        //var uuid = this.navParams.get('id').split(' ');
        //var uuid = this.navParams.get('id');
        //console.log(uuid);
        //var uuid = this.id.split(' ');
        //var  uuid_uri = uuid[1];
        var uuid_uri = this.id;
        //var  uuid_uri = uuid
        //var intnum = this.dataObject.id;
        //console.log("intnum");
        //console.log(intnum);
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name,
            "time": itime,
            "intnum": this.activemodal,
            "desc": "e"
        };
        console.log(postData);
        //var url = 'https://10.10.11.249/' + uuid_uri + '/secretDebug'; //
        var url = 'https://simon.termotouch.it/' + uuid_uri + '/interval';
        console.log(url);
        var req = this.httpClient.post(url, postData, httpOptions)
            .subscribe(function (data) {
            _this.dataObject = data,
                console.log('my data: ', data);
            //this.navCtrl.push(MainmenuPage);
        });
        console.log(req);
    };
    ; // End Endtime
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modal',template:/*ion-inline-start:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\modal\modal.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n<!--  <ion-navbar color="primary">\n    <ion-title>Set Time Interval</ion-title>\n    <ion-buttons end>\n    <button ion-button (click)="closeModal()">Close</button>\n    </ion-buttons>\n</ion-navbar> -->\n\n</ion-header>\n\n\n<ion-content padding>\n    <button ion-button block (click)="closeModal()">Close</button>\n    <div *ngIf="dataObject">\n          <!-- we\'ll put the stuffs in here... -->\n          <!-- <ion-item>[(ngModel)]="dataObject"</ion-item> -->\n        <!-- <ion-item> Interval: {{dataObject.id}} </ion-item> -->\n        <ion-item> Interval: {{activemodal}} </ion-item>\n    </div>\n    <ion-item>\n      <ion-label>Start Time</ion-label>\n      <ion-datetime displayFormat="HH:mm" pickerFormat="HH:mm" [(ngModel)]="myStart" (ionChange)=postStartTime($event)></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>End Time</ion-label>\n      <ion-datetime displayFormat="HH:mm" pickerFormat="HH:mm" [(ngModel)]="myEnd" (ionChange)=postEndTime($event)></ion-datetime>\n    </ion-item>\n    <!-- <button ion-button  (ionChange)=updateStatus($event)    (click)="postTime(myStart)">Set</button> -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\modal\modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ })

});
//# sourceMappingURL=0.js.map