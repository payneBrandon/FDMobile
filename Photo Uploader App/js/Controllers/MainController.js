app.controller("FDCntrl", function ($scope, $http) {
    $scope.token = [];
    $scope.userName = [];
    $scope.projects = [];
    $scope.selectedProject = null;//projectKey
    
    $scope.forms = [];
    $scope.selectedForm = null;//formKey
    $scope.promise = null;
    
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
        $scope.promise = $http({
                                   method: 'GET',
                                   url: loginURL + "/LoginUser",//"http://localhost/MobileLoginService/MobileLoginService.svc/LoginUser",//
                                   params: { userName: $scope.userName, password: passWord},
                               }).
        success(function(data) {
            $('#divLogin').hide();
            $('#divSiteSelection').show();
            if (data.d != null && data.d != -1) {
                $scope.token = data.d;   
                $scope.promise = $http({
                                           method:"GET",
                                           url: baseURL + "/GetProjects",//"http://localhost/FDMobileService/FDMobileService.svc/GetProjects",//
                                           headers: { 'Authentication': $scope.token },
                                           params: {userName: $scope.userName},
                                       }).
                success(function(data) {
                    $scope.projects = new kendo.data.ObservableArray([]);//data;
                    for(var i = 0; i < data.length; i++){
                    	$scope.projects.push(data[i]);
                    }
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
        $('#divSiteSelection').hide();
        $scope.promise = $http.get(baseURL + "/GetUserForms", {
                                       headers: {'Authentication': $scope.token},
                                       params: {portalKey: $scope.selectedProject, userName: $scope.userName}
                                   }).
        success(function(data) {
            $scope.forms = data;
        });
    };
    
    $scope.showForm = function() {
        $('#divFormSelection').hide();
        $('#divFormEntry').show();
        $scope.$broadcast('formChanged');
    };
});
//app.FDCntrl.$inject = ['$scope','$http','app.formSharedService'];