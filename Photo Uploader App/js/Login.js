var token;
var userName;

function LoginUser() {
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
    userName = $("#txbUsername").val();
    var passWord = $("#txbPassword").val();
    $.ajax({
               type: "GET",
               url: "https://monoservicetest.trihydro.com/MobileLogin/MobileLoginService.svc/LoginUser",//"http://localhost/MobileLoginService/MobileLoginService.svc/LoginUser"
               data: { userName: userName, password: passWord},
               dataType: "json",
               success: function(data) {
                   $('#divLogin').hide();
                   $('#divSiteSelection').show();
                   if (data.d != null && data.d != -1) {
                       token = data.d;                       
                       $.ajax({
                                  type:"GET",
                                  url: "http://localhost/FDMobileService/FDMobileService.svc/GetProjects",//"http://monoservicetest.trihydro.com/FDMobileService/FDMobileService.svc/GetProjects",
                                  headers: { 'Authentication': token },
                                  data: {userName:userName},
                                  dataType: "json",
                                  success: function(data) {
                                      var dataList = $("#ddlSites");
                                      dataList.empty();
                                      if (data.length) {
                                          dataList.append("<option value='-1'>--Select A Project--</option>");
                                          for (var i = 0, len = data.length; i < len; i++) {
                                              dataList.append("<option value='" + data[i].PortalKey + "'>" + data[i].PortalName + "</option>");//.innerHtml = options;
                                          }
                                      }
                                  }
                              });
                   }
                   else {
                       $("#txbUsername").val("");
                       $("#txbPassword").val("");
                       $("#divError").text("There was an error logging please try again.");
                   }
               },
               error: function(data) {
                   alert("There was an error with your login, please try again.");
               }
           });
}