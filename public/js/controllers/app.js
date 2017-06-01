console.log('final_project app.js connected!');

const app = angular.module('MyApp', ['ui.calendar', 'ui.bootstrap.datetimepicker']);

app.controller('mainController', ['$http', '$scope','uiCalendarConfig', function($http, $scope, uiCalendarConfig) {
  // this.test = 'mainController is working!';

  // Variables //
  const ctrl = this;
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.showMsg = false;
  this.msgContent = '';
  // this.workouts = [];
  this.session = false;

  // this.selectedWorkout = null;
  // var selectedWorkout = this.selectedWorkout;
  this.events = [];
  const events = this.events;
  eventSources = this.eventSources;
  this.exerciseType = ['Cardio', 'HIIT/Circuit Training', 'Strength Training', 'Flexibility', 'Rest Day'];
  this.equipment = ['Cardio (treadmill, bike, elliptical, stairmaster, etc.)', 'Weights (dumbbells, barbells, medicine ball, etc.)', 'Resistance bands, TRX straps, Yoga mat, Bosu ball', 'Bodyweight'];
  this.duration = ['less than 30 min', '1 hour', '1.5 hours', '2 hours', '2+ hours'];
  this.addEventData = {};
  this.thisDate = moment().format('MMM Do');

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();


  //=================== CALENDAR =================//
    this.uiConfig = {
     calendar: {
      height: 700,
      editable: true,
      selectable: true,
      header: {
        right: 'today prev,next'
      },
      views: {
        month: {
          columnFormat:'dddd'
        }
      },
      dayClick: function(date) {
        var thisDate = date;
        $('#add-workout-modal').css('display', 'block');
        // resolve: {
        //   thisDate: thisDate
        // }
        console.log(date);
      }
      // eventClick: function(selectedWorkout) {
      //   this.selectedWorkout = selectedWorkout;
      //   console.log(selectedWorkout);
      //   console.log(events.indexOf(selectedWorkout));
      // }
      // eventDrop: function(selectedWorkout, delta, revertFunc, jsEvent, ui, view) {
      //   this.selectedWorkout = selectedWorkout;
      //   console.log(selectedWorkout);
      //   console.log(selectedWorkout.start._d);
      //   var newDate = selectedWorkout.start._d;
      //   console.log(delta._days);
      //   console.log(selectedWorkout.start.add(delta._days, 'days'));
    //     $http({
    //       method: 'PUT',
    //       url: '/workouts/' + selectedWorkout.id,
    //       data: {
    //         start: newDate
    //       }
    //     }).then(function(response) {
    //       console.log(response.data);
    //       for (var i = 0; i < events.length; i++) {
    //         if (selectedWorkout._id === events[i]._id) {
    //           events.splice(i, 1);
    //         }
    //       }
    //       events.push(response.data[0]);
    //     });
      // }
     }
    };


    //================= GET WORKOUTS ==============//
    this.getWorkouts = function () {
    $http({ // http request to get session data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        // console.log(response); // log response
        if(response.data) {
          $http({ // http request to get workouts based on logged-in user's id
            method: 'GET',
            url: '/workouts/'
          }).then(
            function (response) { // in case of success
              console.log(response); // log response
              if (response.data) { // if response contains data
                ctrl.events = response.data;
                for (var i = 0; i < response.data.length; i++) {
                  ctrl.events.push(response.data[i]);
                }
              } else {
                console.log('something went wrong'); // log error
              }
            }, function (error) { // in case of failure
              console.log(error); // log error
            }
          );
        }
      },
      function (error) { // in case of failure
        console.log(error); // log error
      });
    };
    this.getWorkouts();
    this.eventSources = [this.events];
    const calendar = document.getElementById('calendar');


  //================ ADD WORKOUT ================//
  this.addEvent = function() {
    console.log('inside addEvent');
    // ctrl.addEventData.start = thisDate;
    // switch (this.addEventData.title) {
    //   case 'Cardio':
    //   ctrl.addEventData.backgroundColor = 'thistle';
    //   break;
    //   case 'HIIT':
    //   ctrl.addEventData.backgroundColor = 'lavenderblush';
    //   break;
    //   case 'Strength Training':
    //   ctrl.addEventData.backgroundColor = 'aquamarine';
    //   break;
    //   case 'Flexibility':
    //   ctrl.addEventData.backgroundColor = 'salmon';
    //   break;
    //   case 'Rest Day':
    //   ctrl.addEventData = 'yellow';
    //   break;
    //   default:
    //   ctrl.addEventData.backgroundColor = 'purple';
    // }


    $http({ // http request to get session data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        console.log(response); // log response
        if(response.data) {
          console.log('logging data: ', this.addEventData, ctrl);
          $http({
            method: 'POST',
            url: '/workouts/new',
            data: ctrl.addEventData
          }).then(function (response) { // in case of success
              console.log('this is the response: ', response); // log response
              console.log('this is the response.data: ', response.data);
              events.push(response.data);
              ctrl.addEventData = {};
              // eventSources = [events];
            }.bind(this)
          );
        }
      });


  };//End addEvent


  //================ USER SIGNUP ================//
  this.createAccount = function() {
    if (this.password === this.confirmPassword) {
      $http({
        method: 'POST',
        url: '/users',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log(response);
        if(!response.data.errmsg) {
          console.log('account successfully created!');
          ctrl.msgContent = 'Your account has been created! Please log in to continue.';
          ctrl.showMsg = true;
        } else if (response.data.code === 11000){
          ctrl.msgContent = 'Sorry, the username is already taken. Please try again';
          ctrl.showMsg = true;
        } else {
          ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
          ctrl.showMsg = true;
        }
        ctrl.username = '';
        ctrl.password = '';
        ctrl.confirmPassword = '';
      }, function(error) {
        console.log(error);
        ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
        ctrl.displayMessage = true;
        ctrl.username = '';
        ctrl.password = '';
        ctrl.confirmPassword = '';
      });
    } else {
      ctrl.msgContent = 'Sorry, the passwords you entered did not match.';
      ctrl.displayMessage = true;
    }
  }; //End createAccount

  //=============== USER LOGIN ==================//
  this.submitLogin = function() {
    this.showMsg = false;
    this.msgContent = '';

    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      // console.log(response);
      if(response.data.success === true) {
        console.log('You\'ve logged in');
        ctrl.session = true;
        $('#login-modal').hide();
      } else if (response.data.success === false) {
        ctrl.msgContent = 'Sorry the username or password you entered is incorrect. Please try again.';
        ctrl.showMsg = true;
      }
      ctrl.username = '';
      ctrl.password = '';
    }, function(error) {
      console.log(error);
      ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
      ctrl.showMsg = true;
      this.username = '';
      this.password = '';
    });
  };//End submitLogin

  //================== USER LOGOUT ===============//
  this.logoutUser = function() {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function(response) {
      console.log(response);
      location.reload();
      console.log('You\'ve logged out');
      //I want to change the view back to the splash page

    }, function(error) {
      console.log(error);
    });
  }; //End logoutUser

  //================== GET SESSION ===============//

  ctrl.getSession = function() {
    $http({
      method: 'GET',
      url: '/sessions'
    }).then(function(response) {
      ctrl.sessionData = response.data;
    }, function(error) {
      console.log('Error');
    });
  };
  // ctrl.changeView = function(view) {
  //   ctrl.currentView = view;
  // };
  ctrl.getSession();



  //========= Event Listeners =======

  $('.open-login').on('click', function () {
      $('#login-modal').css('display', 'block');
  });

  $('#open-signup').on('click', function () {
      $('#signup-modal').css('display', 'block');
  });

  $('.close').on('click', function() {
    $('#login-modal').css('display', 'none');
    $('#signup-modal').css('display', 'none');
    $('#add-workout-modal').css('display', 'none');

  });

}]);//End mainController
