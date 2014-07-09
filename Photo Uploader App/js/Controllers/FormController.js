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
                }
            }
        }
    });
    
    $scope.submitForm = function() {
        if ($('form')[0].checkValidity()) {
            $http({
                      url: baseURL + "/UploadForm",
                      method: "POST",
                      data: {portalKey: $scope.selectedProject, userName: $scope.userName, mf: $scope.myForm},
                      headers: {'Authentication': $scope.token}
                  }).
            success(function(data) {
                alert(data); 
            }).
            error(function(data) {
                alert('failed to upload form');
            });
        }
    };
});