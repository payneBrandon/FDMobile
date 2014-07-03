var app = angular.module("FDMobile", []);
var loginURL = "http://localhost/MobileLoginService/MobileLoginService.svc";//"https://monoservicetest.trihydro.com/MobileLogin/MobileLoginService.svc"
var baseURL = "http://localhost/FDMobileService/FDMobileService.svc";//"http://monoservicetest.trihydro.com/FDMobileService/FDMobileService.svc",

app.controller("FDCntrl", function ($scope, $http) {
    $scope.token = [];
    $scope.userName = [];
    $scope.projects = [];
    $scope.selectedProject = null;
    
    $scope.forms = [];
    $scope.selectedForm = null;
    
    $scope.LoginUser = 
    function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        $scope.userName = $("#txbUsername").val();
        var passWord = $("#txbPassword").val();
        $http({
                  method: 'GET',
                  url: loginURL + "/LoginUser",//"http://localhost/MobileLoginService/MobileLoginService.svc/LoginUser",//
                  params: { userName: $scope.userName, password: passWord},
              }).
        success(function(data) {
            $('#divLogin').hide();
            $('#divSiteSelection').show();
            if (data.d != null && data.d != -1) {
                $scope.token = data.d;                       
                $http({
                          method:"GET",
                          url: baseURL + "/GetProjects",//"http://localhost/FDMobileService/FDMobileService.svc/GetProjects",//
                          headers: { 'Authentication': $scope.token },
                          params: {userName: $scope.userName},
                      }).
                success(function(data) {
                    $scope.projects = data;
                });
            }
            else {
                $("#txbUsername").val("");
                $("#txbPassword").val("");
                $("#divError").text("There was an error logging please try again.");
            }
        }).
        error(function(data) {
            alert("There was an error with your login, please try again.");
        });
    } 
    
    $scope.getForms = function() {
        $('#divFormSelection').show();
        $http.get(baseURL + "/GetUserForms", {
                      headers: {'Authentication': $scope.token},
                      params: {portalKey: $scope.selectedProject, userName: $scope.userName}
                  }).
        success(function(data) {
            $scope.forms = data;
        }).
        error(function(data) {
            alert(data);
        });
    };
});