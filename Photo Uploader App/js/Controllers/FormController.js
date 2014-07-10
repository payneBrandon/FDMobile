var origData = {};

app.controller("formCntrl", function ($scope, $http) {
    $scope.myForm = {};
    $scope.formClick = function () {
        alert($scope.selectedForm);
    };
    
    $scope.$on('formChanged', function() {
        for (var i = 0; i < $scope.forms.length; i++) {
            if ($scope.selectedForm == null) {
                $scope.myForm = {};
            }
            else {
                if ($scope.forms[i].FormKey == $scope.selectedForm) {
                    $scope.myForm = $scope.forms[i];
                    origData = angular.copy($scope.forms[i]);
                }
            }
        }
    });
    
    $scope.submitForm = function() {
        if ($('form')[0].checkValidity()) {
            $scope.promise = $http({
                                       url: baseURL + "/UploadForm",
                                       method: "POST",
                                       data: {portalKey: $scope.selectedProject, userName: $scope.userName, mf: $scope.myForm},
                                       headers: {'Authentication': $scope.token}
                                   }).
            success(function(data) {
                if (data.UploadFormResult == true) {
                    alert('Form Successfully Uploaded!');
                    //clean up ui
                    $scope.formInputForm.$setPristine();
                    $scope.myForm = origData;
                }
                else {
                    alert('Failed to upload form');
                }
            }).
            error(function(data) {
                alert('Failed to upload form');
            });
        }
    };
});