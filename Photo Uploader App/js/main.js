var app = angular.module("FDMobile", []);
var loginURL = "http://localhost/MobileLoginService/MobileLoginService.svc";
var baseURL = "http://localhost/FDMobileService/FDMobileService.svc";
//var loginURL = "https://monoservicetest.trihydro.com/MobileLogin/MobileLoginService.svc";
//var baseURL = "http://monoservicetest.trihydro.com/FDMobileService/FDMobileService.svc";

/*app.factory('formSharedService', function($rootScope) {
    var formService = {};
    
    formService.forms = [];
    formService.selectedForm = null;
    
    formService.broadcastFormSelection = function(newFormKey) {
        //this.formKey = newFormKey;
        $rootScope.$broadcast('formChanged');  
    };
    
    return formService;
});*/