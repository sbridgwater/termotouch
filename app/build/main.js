webpackJsonp([3],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mainmenu_mainmenu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { MainmenuPage } from '../mainmenu/mainmenu';
//import { Storage } from '@ionic/storage';


//
var LoginPage = /** @class */ (function () {
    //films: Observable<any>;
    function LoginPage(navCtrl, loadingController, httpClient, navParams, storage) {
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.httpClient = httpClient;
        this.navParams = navParams;
        this.storage = storage;
        //console.log(this.navParams.get('token'));
        //console.log(this.navParams.get('id'));
        //async presentLoading() {
        //    const loading = await this.loadingController.create({
        //      message: 'Hellooo',
        //      duration: 2000
        //    });
        //    return await loading.present();
        //  }
        this.loading = this.loadingController.create({
            //message: 'Authenticating ...',
            content: 'Authenticating ...',
            duration: 15000
        });
        //storage: any = {};
        this.token = {};
        this.id = {};
        //name: any = {};
        this.hostdb = {};
        /*
           console.log("Passed Token",this.navParams.get('token'));
           //this.token = this.navParams.get('token');
           this.token = this.storage.get('token').then((val) => {
               console.log('Your token is', val);
               return val;
           });
           */
        // clear cache from storage
        this.storage.remove('id');
        this.storage.remove('name');
        this.storage.remove('hostdb');
        this.storage.remove('token');
    }
    LoginPage.prototype.onSubmit = function (f) {
        console.log("Using Login");
        console.log(f.value); // { first: '', last: '' }
        console.log(f.value.username);
        console.log(f.valid); // false
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    LoginPage.prototype.sendPostRequest = function (f) {
        var _this = this;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        };
        var postData = {
            //"user": "simon.bridgwater@yahoo.it",
            "user": f.value.username,
            //"password": "simon321"
            "password": f.value.password
        };
        var postData2 = 'user=' + f.value.username + '&password=' + f.value.password;
        this.loading.present();
        //this.httpClient.post('http://localhost:8100/login',postData2,httpOptions)
        //this.httpClient.post('https://simon.termotouch.it/login',postData,httpOptions)
        //this.httpClient.post('https://www.termotouch.it/.netlify/functions/idp',postData2,httpOptions)
        this.httpClient.post('https://www.termotouch.it/.netlify/functions/idp', postData2, httpOptions)
            .subscribe(function (data) {
            console.log('my data: ', data);
            //storage.set('token', data.token);
            _this.storage.set('token', "Bearer" + " " + data['token'].toString());
            //this.storage.set('id', "UUID" + " " + data['id'].toString());
            _this.storage.set('id', data['id'].toString());
            _this.storage.set('name', data['name'].toString());
            _this.storage.set('hostdb', data['host'].toString());
            _this.storage.get('token').then(function (val) {
                console.log('Your token is', val);
            });
            _this.storage.get('id').then(function (val) {
                console.log('Your uuid is', val);
            });
            _this.storage.get('name').then(function (val) {
                console.log('Your name is', val);
            });
            _this.storage.get('hostdb').then(function (val) {
                console.log('Host is', val);
            });
            //this.navCtrl.push(MainmenuPage, {token: data['token'], id: data['id']});
            _this.loading.dismiss();
            //this.navCtrl.push(MainmenuPage);
            //this.navCtrl.push(LoginPage, {token: data['token'], id: data['id']});
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__mainmenu_mainmenu__["a" /* MainmenuPage */]);
        });
    }; // end sendpost
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\login\login.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <ion-title>\n      Termotouch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n-->\n<ion-content padding>\n  <p>\n  <!-- <ion-title>\n    Login\n  </ion-title> -->\n  <button ion-button block>Termo-Touch</button>\n  </p>\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>\n  <ion-list>\n    <ion-item>\n      <ion-label color="dark">User Name:</ion-label>\n      <ion-input name="username" ngModel required #first="ngModel"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="dark">Password:</ion-label>\n      <ion-input type="Password" name="password" ngModel></ion-input>\n    </ion-item>\n  </ion-list>\n    <button ion-button (click)="sendPostRequest(f)">Login</button>\n  </form>\n'/*ion-inline-end:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		282,
		2
	],
	"../pages/mainmenu/mainmenu.module": [
		283,
		1
	],
	"../pages/modal/modal.module": [
		284,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_mainmenu_mainmenu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ItemDetailsPage } from '../pages/item-details/item-details';
//import { ListPage } from '../pages/list/list';




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_mainmenu_mainmenu__["a" /* MainmenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                //Storage,
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mainmenu/mainmenu.module#MainmenuPageModule', name: 'MainmenuPage', segment: 'mainmenu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal/modal.module#ModalPageModule', name: 'ModalPage', segment: 'modal', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_mainmenu_mainmenu__["a" /* MainmenuPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                //IonicStorageModule,
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_mainmenu_mainmenu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, menu, modalCtrl, 
        //public storage: Storage,
        statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.modalCtrl = modalCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */] },
            { title: 'Mainmenu', component: __WEBPACK_IMPORTED_MODULE_3__pages_mainmenu_mainmenu__["a" /* MainmenuPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainmenuPage; });
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






//import { Map } from 'rxjs/operators';
//
//import { NgForm } from '@angular/forms';
/**
*
 * Generated class for the MainmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MainmenuPage = /** @class */ (function () {
    function MainmenuPage(navCtrl, loadingController, httpClient, navParams, menuCtrl, storage, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.httpClient = httpClient;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.loading = this.loadingController.create({
            //message: 'Authenticating ...',
            content: 'Fetching Data ...',
            duration: 30000
        });
        this.dataObject = {};
        this.task = {};
        //storage: any = {};
        this.token = {};
        this.id = {};
        this.name = {};
        this.data = {};
        this.status = {};
        this.hostdb = {};
        console.log('ionViewDidLoad MainmenuPage');
        console.log(this.navParams.get('token'));
        console.log(this.navParams.get('id'));
        menuCtrl.enable(true);
        ////console.log(navParams.get('token'));
        ////let authtoken = { "bearer": navParams.get('token') };
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
        this.storage.get('hostdb').then(function (val) {
            _this.hostdb = val;
            console.log("HOST");
            console.log(_this.hostdb);
        });
    }
    MainmenuPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("Fully Entered View");
        this.loading.present();
        // setTimeout(() => {    // timeout
        //  this.getStatus();
        // }, 1000);             // end timeout
        //this.getStatus();
        this.task = setInterval(function () {
            _this.getStatus();
        }, 2000); //run function every 1 seconds
    };
    ;
    /*
      ionViewCanEnter(): boolean {
       if(this.token) {
          this.loading.present();
           //this.getStatus();
           this.task = setInterval(() => {
               setTimeout(() => {    // timeout
                this.getStatus();
              }, 1000);             // end timeout
         }, 5000);  //run function every 1 seconds
          return true; // You are allowed to enter
       }
       return false;
      }
    */
    /*
      var finished = "0";
      this.loading.present();
    
      ionViewDidEnter(): boolean {
       do {
         if (isEmpty(this.s1s) || isEmpty(this.s2s) || isEmpty(this.s3s) || isEmpty(this.s4s) ) {
           // do nothing
         }
         else  {
           // set of getStatus and exit
            finished = 1;
            this.task = setInterval(() => {
               setTimeout(() => {    // timeout
                this.getStatus();
              }, 1000);             // end timeout
            }, 5000);  //run function every 1 seconds
         }
       }
       while ( finished = 0 );
      }
      */
    MainmenuPage.prototype.getStatus = function () {
        var _this = this;
        var token_len = Object.keys(this.token).length;
        var id_len = Object.keys(this.id).length;
        var name_len = Object.keys(this.name).length;
        var hostdb_len = Object.keys(this.hostdb).length;
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
        //var host_url = this.hostdb;
        //host_url = "https://" + host_url + "/" ;
        //console.log(host_url);
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name
        };
        //var url = 'https://10.10.11.249/' + uuid_uri + '/secretDebug'; //
        //var url = 'https://simon.termotouch.it/' + uuid_uri + '/status';
        var url = 'https://' + this.hostdb + '/' + uuid_uri + '/status';
        console.log(url);
        if (token_len && id_len && hostdb_len && name_len) {
            console.log("Start token,id,name,postData,url,httpOptions");
            console.log(this.token);
            console.log(this.id);
            console.log(this.name);
            console.log(postData);
            console.log(url);
            console.log(httpOptions);
            console.log("End token,id,name");
            var req_1 = this.httpClient.post(url, postData, httpOptions)
                .subscribe(function (data) {
                _this.loading.dismiss();
                _this.dataObject = data,
                    console.log('my data: ', data);
                //this.navCtrl.push(MainmenuPage);
                console.log(req_1);
            });
        } // end of if length
    };
    ; // End Get Status
    MainmenuPage.prototype.logoff = function () {
        clearInterval(this.task);
        this.navCtrl.popToRoot();
    };
    MainmenuPage.prototype.updateStatus = function ($event) {
        var _this = this;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                'Authorization': this.token
            })
        };
        console.log("Updating Status");
        var rangeval = $event.value;
        console.log(rangeval);
        var uuid_uri = this.id;
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name,
            "thermostat": rangeval
        };
        //var url = 'https://simon.termotouch.it/' + uuid_uri + '/update';
        var url = 'https://' + this.hostdb + '/' + uuid_uri + '/update';
        console.log(url);
        var req = this.httpClient.post(url, postData, httpOptions)
            .subscribe(function (data) {
            _this.dataObject = data,
                console.log('my data: ', data);
        });
        console.log(req);
        //this.getStatus();
        //this.viewCtrl._didEnter();
        //this.viewCtrl._didEnter(); //<---- this forces refresh
    }; // end updateStatus
    MainmenuPage.prototype.enableTimeInterval = function (enableint) {
        var _this = this;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                'Authorization': this.token
            })
        };
        console.log("Enable Interval Status");
        var enable = enableint.id;
        console.log(enable);
        var uuid_uri = this.id;
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name,
            "enable": enable
        };
        //var url = 'https://simon.termotouch.it/' + uuid_uri + '/enableint';
        var url = 'https://' + this.hostdb + '/' + uuid_uri + '/enableint';
        console.log(url);
        var req = this.httpClient.post(url, postData, httpOptions)
            .subscribe(function (data) {
            _this.dataObject = data,
                console.log('my data: ', data);
        });
        console.log(req);
        //this.getStatus();
        //this.viewCtrl._didEnter();
        //this.viewCtrl._didEnter(); //<---- this forces refresh
    }; // end enableTimeInterval
    MainmenuPage.prototype.disableTimeInterval = function (enableint) {
        var _this = this;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                'Authorization': this.token
            })
        };
        console.log("disable Interval Status");
        var enable = enableint.id;
        console.log(enable);
        var uuid_uri = this.id;
        var postData = {
            //"name": "simon.bridgwater@yahoo.it",
            "name": this.name,
            "disable": enable
        };
        //var url = 'https://simon.termotouch.it/' + uuid_uri + '/enableint';
        var url = 'https://' + this.hostdb + '/' + uuid_uri + '/enableint';
        console.log(url);
        var req = this.httpClient.post(url, postData, httpOptions)
            .subscribe(function (data) {
            _this.dataObject = data,
                console.log('my data: ', data);
        });
        console.log(req);
        //this.getStatus();
        //this.viewCtrl._didEnter();
        //this.viewCtrl._didEnter(); //<---- this forces refresh
    }; // end enableTimeInterval
    MainmenuPage.prototype.setTimeInterval = function (interval) {
        var _this = this;
        //var interval_id = {};
        console.log(interval);
        this.storage.set('activemodal', interval.id);
        var modalPage = this.modalCtrl.create('ModalPage', { interval: interval });
        modalPage.onDidDismiss(function (data) {
            _this.getStatus();
            console.log(data);
        });
        modalPage.present();
    };
    MainmenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mainmenu',template:/*ion-inline-start:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\mainmenu\mainmenu.html"*/'<!--\n  Generated template for the MainmenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n<!--  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Main Menu Page\n    </ion-title>\n  </ion-navbar> -->\n</ion-header>\n<ion-content padding>\n  <!-- <button ion-button block menuToggle>Menu List</button> -->\n  <button ion-button block>Termo-Touch</button>\n  <!-- <ion-item>\n     <ion-list>\n      <button ion-item (click)="openPage(loginPage)">\n        Login\n      </button>\n      <button ion-item (click)="openPage(mainMenuPage)">\n        Main Menu\n      </button>\n      <button ion-item (click)="openPage(loginPage)">\n        Login2\n      </button>\n     </ion-list>\n  </ion-item> -->\n  <div *ngIf="dataObject">\n        <!-- we\'ll put the stuffs in here... -->\n        <!-- <ion-item>[(ngModel)]="dataObject"</ion-item> -->\n      <ion-item> Temperature: {{dataObject.degc}} </ion-item>\n      <ion-item> Thermostat: {{dataObject.thermostat}} </ion-item>\n    </div>\n\n  <!-- <button ion-button (click)="getSecret()">Get Secret from API</button> -->\n<!--</ion-content> -->\n\n<ion-list>\n\n <ion-item>\n   <ion-range min="10" max="30" step="1" [(ngModel)]="sliderValue" pin="true" debounce=300 (ionChange)=updateStatus($event)>\n     <ion-icon small range-left name="thermometer"></ion-icon>\n     <ion-icon range-right name="thermometer"></ion-icon>\n   </ion-range>\n </ion-item>\n\n</ion-list>\n\n<!-- Segment buttons with icons -->\n  <ion-segment [(ngModel)]="icons" color="primary">\n    <ion-segment-button value="interval1" (ionSelect)="setTimeInterval({id: \'1\'})">\n      <ion-icon name="clock"></ion-icon> Int1\n    </ion-segment-button>\n    <ion-segment-button value="interval2" (ionSelect)="setTimeInterval({id: \'2\'})">\n      <ion-icon name="clock"></ion-icon> Int2\n    </ion-segment-button>\n    <ion-segment-button value="interval3" (ionSelect)="setTimeInterval({id: \'3\'})">\n      <ion-icon name="clock"></ion-icon> Int3\n    </ion-segment-button>\n    <ion-segment-button value="interval4" (ionSelect)="setTimeInterval({id: \'4\'})">\n      <ion-icon name="clock"></ion-icon> Int4\n    </ion-segment-button>\n  </ion-segment>\n\n  <div *ngIf="dataObject">\n        <!-- we\'ll put the stuffs in here... -->\n        <!-- <ion-item>[(ngModel)]="dataObject"</ion-item> -->\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.s1}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.s2}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.s3}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.s4}}</div>\n      </ion-col>\n    </ion-row>\n    <!--\n    <ion-row>\n      <ion-col>\n        <div style="text-align:center">to</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">to</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">to</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">to</div>\n      </ion-col>\n    </ion-row> -->\n    <ion-row>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.e1}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.e2}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.e3}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.e4}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.enable1}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.enable2}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.enable3}}</div>\n      </ion-col>\n      <ion-col>\n        <div style="text-align:center">{{dataObject.enable4}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n\n<div>\n  <ion-segment [(ngModel)]="icons" color="primary">\n    <ion-segment-button value="enable1" (ionSelect)="enableTimeInterval({id: \'1\'})">\n      <ion-icon name="checkbox"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable2" (ionSelect)="enableTimeInterval({id: \'2\'})">\n      <ion-icon name="checkbox"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable3" (ionSelect)="enableTimeInterval({id: \'3\'})">\n    <ion-icon name="checkbox"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable4" (ionSelect)="enableTimeInterval({id: \'4\'})">\n      <ion-icon name="checkbox"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n\n\n  <ion-segment [(ngModel)]="icons" color="primary">\n    <ion-segment-button value="enable1" (ionSelect)="disableTimeInterval({id: \'1\'})">\n      <ion-icon name="close-circle"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable2" (ionSelect)="disableTimeInterval({id: \'2\'})">\n      <ion-icon name="close-circle"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable3" (ionSelect)="disableTimeInterval({id: \'3\'})">\n      <ion-icon name="close-circle"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="enable4" (ionSelect)="disableTimeInterval({id: \'4\'})">\n      <ion-icon name="close-circle"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n\n      <!-- <ion-item> s1: {{dataObject.s1}} </ion-item>\n      <ion-item> e1: {{dataObject.e1}} </ion-item> -->\n    </div>\n\n    <ion-footer>\n      <ion-toolbar>\n        <button ion-button block>Change Password</button>\n        <button ion-button block (click)="logoff()">Logoff</button>  \n      </ion-toolbar>\n    </ion-footer>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\admin\termotouch\termotouch-0.3-netlify\src\pages\mainmenu\mainmenu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], MainmenuPage);
    return MainmenuPage;
}()); // end classMainpage

//# sourceMappingURL=mainmenu.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map