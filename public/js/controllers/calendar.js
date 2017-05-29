console.log('calendar js connected');

//= require fullcalendar
//= require moment

// var app = angular.module('calendarApp', ['ui.calendar']);
//
// app.controller('CalendarCtrl', ['$http', '$uibModal', 'uiCalendarConfig', function($http, $uibModal, uiCalendarConfig) {
//   this.url = 'http://localhost:3000';
//   var url = this.url;
//   this.selectedWorkout = null;
//   var selectedWorkout = this.selectedWorkout;
//   this.animationsEnabled = true;
//   this.events = [];
//   events = this.events;
//   eventSources = this.eventSources;
//
//   var date = new Date();
//   var d = date.getDate();
//   var m = date.getMonth();
//   var y = date.getFullYear();
//
// }]);//End CalendarCtrl


  $(document).ready(function() {

    $('#calendar').fullCalendar({
      dayClick: function() {
        alert('a day has been clicked!');
      }
    });

  });
