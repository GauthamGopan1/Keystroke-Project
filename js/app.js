'use strict';



$(function () {
  var typeTime;
  var upTime;
  var startTime1; 

  var startTime2; 

  var arrayTotalKey = []; 

  var arrayTotalDU = []; 

  var arrayAveKey1 = []; 

  var arrayAveKey2 = []; 

  var arrayAveDU1 = []; 

  var arrayAveDU2 = []; 

  var arrayDiffKey = []; 

  var arrayDiffDU = []; 

  var arrayKeycode = []; 

  $("#firstDataset input").focus(function () {
    var click = $(this).data("click"); 

    if (!click) {
      
      var arrayKey = []; 

      var arrayDownup = []; 

      arrayTotalKey.push(arrayKey);
      arrayTotalDU.push(arrayDownup);
      arrayKey.length = 0;
      arrayDownup.length = 0;
      startTime1 = null; 

      $(this).on('keydown', function (event) {
        if (event.keyCode == 8) {
          $(this).val("");
          arrayKey.length = 0;
          arrayDownup.length = 0;
          startTime1 = null; 
        } else if (event.keyCode == 9) {
        } else if (startTime1 == null) {
          typeTime = new Date().getTime();
          startTime1 = typeTime; 

          arrayKey.push(0);
        } else if (arrayKey.length == 0) {
          typeTime = new Date().getTime();
          arrayKey.push(typeTime - startTime1); 

          console.log(arrayKey);
        } else {
          typeTime = new Date().getTime();
          arrayKey.push(typeTime - (startTime1 + arrayKey.reduce(function (a, x) {
            return a += x;
          }, 0))); 

          console.log(arrayKey);
        }
      }); 

      $(this).on('keyup', function (event) {
        if (event.keyCode == 8) {
          arrayDownup.length = 0;
        } else if (event.keyCode == 9) {
        } else {
          upTime = new Date().getTime();
          var diff = upTime - typeTime;
          arrayDownup.push(diff);
          console.log(arrayDownup);
        }
      });
      $(this).data("click", true);
    }
  }); 

  function averageCalc(array, num, arrayResult) {
    var arrayMaxmin = []; 

    for (var i = 0; i < array[0].length; i++) {
      
      var total = 0;
      arrayMaxmin.length = 0;

      for (var arr = 0; arr < array.length; arr++) {
        
        arrayMaxmin.push(array[arr][i]);
        total += array[arr][i]; 
      }

      var minData = Math.min.apply(null, arrayMaxmin); 

      var maxData = Math.max.apply(null, arrayMaxmin); 

      var diff = maxData - minData;

      if (diff > num) {
        alert("The tempo of the input value is disturbed. Please enter again.");
        throw new Error('end');
      }

      arrayResult.push(Math.round(total / array.length));
    }
  } 


  document.getElementById("insert").addEventListener('click', function () {
    try {
      arrayAveKey1.length = 0; 

      var baseValue = $("#firstDataset input").eq(0).val(); 

      $("#firstDataset input").each(function (i) {
        var value = $(this).val();

        if (0 == value) {
          alert("Input content is null");
          throw new Error('end');
        } else if (baseValue !== value) {
          alert("Input content is not match");
          throw new Error('end');
        }
      }); 

      averageCalc(arrayTotalKey, 200, arrayAveKey1); 

      averageCalc(arrayTotalDU, 200, arrayAveDU1); 

      $("#firstDataset input,addDataset,#insert").prop("disabled", true);
      $("#secondDataset input,#compare").prop("disabled", false);
    } catch (e) {
      console.log(e.message);
    }
  });
 

  var secondData = document.getElementById("secondData"); 

  secondData.addEventListener('keydown', function (event) {
    if (event.keyCode == 8) {
      $("#secondData").val("");
      arrayAveKey2.length = 0;
      startTime2 = null;
      arrayKeycode.length = 0; 
      
      
    } else if (event.keyCode == 9) {
    } else if (startTime2 == null) {
      typeTime = new Date().getTime();
      startTime2 = typeTime;
    } else if (arrayAveKey2.length == 0) {
      typeTime = new Date().getTime();
      arrayAveKey2.push(0);
      arrayAveKey2.push(typeTime - startTime2);
      console.log(arrayAveKey2);
    } else {
      typeTime = new Date().getTime();
      arrayAveKey2.push(typeTime - (startTime2 + arrayAveKey2.reduce(function (a, x) {
        return a += x;
      }, 0)));
      console.log(arrayAveKey2);
    }
  }); 

  secondData.addEventListener('keyup', function (event) {
    if (event.keyCode == 8) {
      arrayAveDU2.length = 0;
    } else if (event.keyCode == 9) {
    } else {
      upTime = new Date().getTime();
      var diff = upTime - typeTime;
      arrayAveDU2.push(diff);
      arrayKeycode.push(String.fromCharCode(event.keyCode)); 
    }
  }); 

  function diffCalc(arrayDiff, arrayData1, arrayData2) {
    arrayDiff.length = 0;
    var diff;

    for (var i = 0; i < arrayData1.length; i++) {
      if (arrayData1[i] > arrayData2[i]) {
        diff = arrayData1[i] - arrayData2[i];
        arrayDiff.push(diff);
      } else {
        diff = arrayData2[i] - arrayData1[i];
        arrayDiff.push(diff);
      }
    }
  } 


  function resultCalc(arrayDiff) {
    var total = 0;

    for (var i = 0; i < arrayDiff.length; i++) {
      total += 100 - arrayDiff[i]; 
    }

    return Math.round(total / arrayAveKey2.length);
  } 


  function chart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: arrayKeycode,
        datasets: [{
          label: 'Training Dataset Key',
          data: arrayAveKey1,
          backgroundColor: "rgba(0,123,256,0.4)"
        }, {
          label: 'Validation Dataset Key',
          data: arrayAveKey2,
          backgroundColor: "rgba(0,123,256,0.6)"
        }, {
          label: 'Training Dataset Key - Down Up',
          data: arrayAveDU1,
          backgroundColor: "rgb(255, 153, 102, 0.4)"
        }, {
          label: 'Validation Dataset Key - Down Up',
          data: arrayAveDU2,
          backgroundColor: "rgb(255, 153, 102, 0.6)" 
        }]
      }
    });
  } 


  document.getElementById("compare").addEventListener('click', function () {
    if (!document.getElementById('firstData').value) {
      alert("Input content is null");
    } else if ($('#firstData').val() != $('#secondData').val()) {
      alert("Input content is not match");
    } else {
      diffCalc(arrayDiffKey, arrayAveKey1, arrayAveKey2);
      diffCalc(arrayDiffDU, arrayAveDU1, arrayAveDU2);
      var resultKey = resultCalc(arrayDiffKey);
      var resultDU = resultCalc(arrayDiffDU);
      var result = (resultKey + resultDU) / 2;
      document.getElementById('result').innerHTML = result + "%";
      document.getElementById("myChart").style.display = "block";
      chart();
    }
  }); 

 
});
