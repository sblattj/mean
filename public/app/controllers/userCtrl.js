angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {

    var app = this;

    app.regUser = function(regData) {
        app.loading = true;
        app.errorMsg = false;
        
        User.create(app.regData)
            .then(function(data) {
                
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + '...redirecting';
                    $timeout(function(){
                        $location.path('/');
                    }, 2000);
                    
                } else {
                    //create err msg
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            })
    };
});