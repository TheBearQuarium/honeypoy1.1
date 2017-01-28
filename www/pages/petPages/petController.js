/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.pet', [])
  .controller('PetCtrl', function ($scope, $rootScope, $http) {
    // ///////////////////////////////
    // ////////Sad Bear///////////////
    // ///////////////////////////////
    const setHappiness = () => {
      if ($scope.stats.happiness < 51) {
        TweenMax.to('.mouth', 0.5, { alpha: 0 });
        TweenMax.to('.frown', 0.5, { alpha: 1 });
        if ($scope.stats.happiness < 26) {
          TweenMax.to('.tears', 2, { alpha: 1 });
        }
      } else {
        $scope.bearTilt();
      }
    };

    TweenMax.to('.tears', 0.001, { alpha: 0 });
    TweenMax.to('.frown', 0.001, { alpha: 0 });
    let tear = 1;

    // ///////////////////////////////
    // ///////Happy Bear//////////////
    // ///////////////////////////////

    $scope.bearTilt = function () {
      const left = function () {
        TweenMax.to('.bear', 1, {
          rotation: 2,
          transformOrigin: '50% 50%',
          onComplete: right,
        });
      };
      const right = function () {
        TweenMax.to('.bear', 1, {
          rotation: -2,
          transformOrigin: '50% 50%',
          onComplete: left,
        });
      };
      left();
    };
    // /////////////////////////////////////
    // //////BEAR TOUCH EFFECT//////////////
    // /////////////////////////////////////

    const earUp = function () {
      TweenMax.to('.ears', 0.5, { y: -7, onComplete: earDown });
      TweenMax.to('.leftArm', 0.5, { rotation: 75, transformOrigin: '80% 50%' });
      TweenMax.to('.balloons', 0.5, { y: -77, x: 12 });
    };
    const earDown = function () {
      TweenMax.to('.ears', 0.5, { y: 7 });
      TweenMax.to('.leftArm', 0.5, { rotation: 0, transformOrigin: '80% 50%' });
      TweenMax.to('.balloons', 0.5, { y: 0, x: 0 });
    };

    $scope.bearTouch = function () {
      // IF BEAR IS HAPPY
      if ($scope.stats.happiness > 25) {
        earUp();
      } else {
        // IF BEAR IS SAD
        if (tear % 2 === 1) {
          TweenMax.to('.tear3', 4, { y: 30, ease: 'easeIn' });
          TweenMax.to('.tear3', 2, { alpha: 0, delay: 2 });
          TweenMax.to('.tear3', 0.001, { y: 0, alpha: 1, delay: 4 });
          tear++;
        } else {
          TweenMax.to('.tear2', 4, { y: 30, ease: 'easeIn' });
          TweenMax.to('.tear2', 2, { alpha: 0, delay: 2 });
          TweenMax.to('.tear2', 0.001, { y: 0, alpha: 1, delay: 4 });
          tear++;
        }
        if (tear % 4 === 1) {
          TweenMax.to('.redBal', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringRed', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringRed', 2, {
            rotation: '5_short',
            transformOrigin: '0% 0%',
            ease: 'easeIn',
          });
        }
        if (tear % 6 === 1) {
          TweenMax.to('.yellowBal', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringYellow', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringYellow', 2, {
            rotation: '-10_short',
            transformOrigin: '0% 0%',
            ease: 'easeIn',
          });
        }
        if (tear % 8 === 1) {
          TweenMax.to('.blueBal', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringBlue', 6, { y: -800, ease: 'easeIn', x: -150 });
          TweenMax.to('.stringBlue', 2, { rotation: '20_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
        }
      }
    };
    // ////////////////////////////
    // ////// ACCESSORIES /////////
    // ////////////////////////////
    const setAccessories = function () {
      const accessories = $scope.stats.accessories;
      const hat = accessories.hat;
      const necklace = accessories.necklace;
      const balloons = accessories.balloons;
      if (hat) {
        TweenMax.to('.hat', 0, { alpha: 1 });
      }
      if (balloons) {
        TweenMax.to('.balloons', 0, { alpha: 1 });
      }
      if (necklace) {
        TweenMax.to('.necklace', 0, { alpha: 1 });
      }
    };


    // ////////////////////////////
    // ///// CLOCK FUNCTIONS///////
    // ////////////////////////////
    Date.prototype.timeNow = function () {
      // WTF is this???
      return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':'
      + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':'
      + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
    };

    let newDate;
    let datetime;
    let second;
    let minute;
    let hour;
    setInterval(function () {
      newDate = new Date();
      datetime = newDate.timeNow();
      second = datetime.slice(6, 8) * 360 / 60;
      minute = datetime.slice(3, 5) * 360 / 60;
      hour = datetime.slice(0, 2) * 360 / 12 + (minute / 12);
      if (hour === 360) {
        hour = 0;
      }
      if (minute === 360) {
        minute = 0;
      }
      if (second === 360) {
        second = 0;
      }

      TweenMax.to('.hourHand', 1, { rotation: `${hour}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.minuteHand', 1, { rotation: `${minute}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.secondHand', 1, { rotation: `${second}_short`, transformOrigin: 'bottom' });
    }, 1000);


    // ////////////////////////////////
    // /////////Sun & Moon/////////////
    // ////////////////////////////////
    // TweenMax.to('.sun', 0.001, { alpha: 0, rotation: 180, transformOrigin: "0px 1000px" });
    // TweenMax.to('.moon', 0.001, { alpha: 0, rotation: 180, transformOrigin: "0px 1000px" });
    // let newDate1 = new Date();
    // let datetime1 = newDate1.timeNow();
    // let second1 = datetime1.slice(6,8) * 360 / 60;
    // let minute1 = datetime1.slice(3,5) * 360 / 60;
      //  let hour1 = datetime1.slice(0,2) * 360 / 12 + (minute1 / 12);
    // if (hour1 > 180 && hour1 < 540) {
      // TweenMax.fromTo('.sun', 1.5, { alpha: 1 }, {
      //   rotation: 360,
      //   ease: 'easeOut',
      //   transformOrigin: '0px 1000px',
      // });
    // } else {
      // TweenMax.fromTo('.moon', 1.5, { alpha: 1 }, {
      //   rotation: 360,
      //   ease: 'easeOut',
      //   transformOrigin: '0px 1000px'
      // });
    // };

    // /////////////////////////////////////////////////////
    // ///////Initial Function to Fix Bear Size/////////////
    // /////////////////////////////////////////////////////

    $scope.bearGrow = function () {
      TweenMax.to('.bear', 0.1, { scale: 1.15, y: 130 });
    };
    $scope.bearGrow();

    // /////////////////////////////////////////////
    // /////DATABASE CALL TO SET BEAR STATS/////////
    // /////////////////////////////////////////////

    $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
      .then(function (res) {
        $scope.stats = res.data.data[0];
        $scope.stats.progress = ($scope.stats.goal_progress / $scope.stats.goal_amt) * 100;
        setAccessories();
        setHappiness();
      }, function (err) {
        console.warn(err);
      });
  });