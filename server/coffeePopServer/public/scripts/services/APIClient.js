angular.module("coffeePop").service("APIClient", ["$http", "$q", "apiPath", "URL", "HtmlStorage", function($http, $q, apiPath, URL, HtmlStorage) {
    this.apiRequest = function(url) {
        //Hay que devolver las películas, no un objeto de la petición
        //Por lo que habrá que resolver el retorno de http.get
        //Crear el objeto diferido
        var deferred = $q.defer();
        //Hacer trabajo asíncrono
        $http.get(url).then(
            function(response) {
                //Resolvemos promesa
                deferred.resolve(response.data);
            },
            function(response) {
                //Rechazar promesa
                //Esta gestión de error es bastante pobre, habría que mejorarla
                deferred.reject(response.data);
            }
        );
        //Devolver promesa      
        return deferred.promise;
        // return $http.get('/api/movies');
    }

    this.loginUser = function(name, password) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        console.log("Login usuario");

        var user = { name, password };
        console.log(user);
        // hacer asincrono el trabajo
        $http.post(apiPath.login, user).then(
            //console.log("Api paths", apiPath.movies);
            //peticion ok
            function(response) {
                //resolver la promesa
                console.log("*****")
                console.log(response);
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                console.log("login fail");
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    }

    this.createUser = function(name, password, email, number) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        console.log("Crear usuario");

        var user = { name, password, email, number };
        console.log(user);
        // hacer asincrono el trabajo
        $http.post(apiPath.users, user).then(
            //console.log("Api paths", apiPath.movies);
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    }


    this.getUsers = function() {
        return this.apiRequest(apiPath.users);
    };

    this.getUser = function(name) {
        var url = apiPath.users + "/?name=" + name;
        return this.apiRequest(url);
    };

    this.getCoffees = function() {
        return this.apiRequest(apiPath.coffees);
    };

    this.getCoffee = function(id) {
        url = apiPath.coffees + "/?id=" + id;
        return this.apiRequest(url);
    };

    this.updateUser = function(user) {
        var deffered = $q.defer();
        $http.put(apiPath.users, user).then(
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        return deffered.promise;
    }

    this.updateViewsCoffee = function(coffee) {
        var deffered = $q.defer();
        coffee['views'] = coffee['views'] + 1;
        /*Update views*/
        $http.put(apiPath.coffees, coffee).then(
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        return deffered.promise;
    }

    this.rentMovie = function(movie, username) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        movie['userRent'] = username;

        // hacer asincrono el trabajo
        var url = URL.resolve(apiPath.movieDetail, { id: movie.id });

        $http.put(url, movie).then(
            //console.log("Api paths", apiPath.movies);
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    };


    this.createCoffee = function(coffee) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        coffee['user'] = HtmlStorage.getUser()['name'];
        // hacer asincrono el trabajo
        $http.post(apiPath.coffees, coffee).then(
            //console.log("Api paths", apiPath.movies);
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    };

    /*Elimina una nueva pelicula */
    this.deleteMovie = function(movie) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        //console.log("model.username",model.username );

        // hacer asincrono el trabajo
        $http.post(apiPath.movies, movie).then(
            //peticion ok
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    };


}]);
