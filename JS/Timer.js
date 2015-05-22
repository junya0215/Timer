var nums = [];

function select(target){
  if(timerId) return;
  nums = [];
  $('.time-unit').each(function(){
    if(this === target){
      $(this).toggleClass('selected');
    }else{
      $(this).removeClass('selected');
    }
  });
}

$(window).keydown(function(e){
   var val = $('.selected').text() >> 0;
   var next = $('.selected').nextAll('.time-unit')[0];
   if(!next) next = $('.time-unit')[0];
   var prev = $('.selected').prevAll('.time-unit')[0];
   if(!prev) prev = $('.time-unit')[2];
   switch(e.keyCode){
    case 76:
    case  9: 
    case 39: select(next); nums = []; return;
    case 72:
    case 37: select(prev); nums = []; return;
    case 75:
    case 38: val++; nums = []; break;
    case 74:
    case 40: val--; nums = []; break;
    case 32: timerId ? pause() : start();

    default:

      if(e.keyCode >=48 && e.keyCode<=57){
        var num = e.keyCode - 48;
        nums.push(num);
        if(nums.length === 2){
          val = nums[0]*10 + nums[1];
          nums = [];
        }else{
          val = num;
        }
      }
   }
   if(val < 0)  val = 59;
   if(val > 59) val = 0;
   if(val < 10) val = '0'+val;
   $('.selected').text(val);
})

$('#timer>.time-unit').on('click',function () {
  select(this);   
});

//numbersから時間をセット
function setTimeFromNumbers() {
  var val;
  nums.push($(this).text() >> 0);

  if(nums.length === 2){
    val = nums[0]*10 + nums[1];
    nums = [];
  }else{
    val = nums[0];
  }

  if(val < 0)  val = 59;
  if(val > 59) val = nums[0];
  if(val < 10) val = '0'+val;

  $('.selected').text(val);
}

$('#numbers>div').on('click',setTimeFromNumbers);



var timerId = null;
function countDown() {
  timerId = setInterval(function(){

    var hrs = $('#hour').text() >> 0;
    var min = $('#minutes').text() >> 0;
    var sec = $('#second').text() >> 0;

    if(sec == 0){

      if(min > 0){
        min--;
      }else if(min == 0 && hrs > 0){
        hrs--;
        min = 59;
      }else if(hrs == 0 && min == 0){
        clearInterval(timerId);
        timerId = null;
        Alarm();
        document.title = 'Time is up';
        return;
      }
      
      sec = 60;
    }

    sec--;

    if(hrs < 10) hrs = '0'+hrs;
    if(min < 10) min = '0'+min;
    if(sec < 10) sec = '0'+sec;
   

    //表示
    $('#hour').text(hrs);
    $('#minutes').text(min);
    $('#second').text(sec);

    document.title = $('#timer').text();

  }, 1000)
}

function start() {
  if(!timerId)  countDown();
  $('.time-unit').removeClass('selected');
}

function pause() {
  if(timerId) {
    clearInterval(timerId);
    timerId = null;
    document.title = '[Pause]'+$('#timer').text();
  }
}

function reset() {
  pause();
  $('#hour').text('00');
  $('#minutes').text('00');
  $('#second').text('00');
  document.title = 'Timer';
}

var setMode = function () {
  switch(this.id){
    case 'start': start(); break;
    case 'pause': pause(); break;
    case 'reset': reset(); break;
  }
}

$('#control-buttons>div').on('click',setMode);

function Alarm(){
  $('#sound')[0].currentTime = 0;
  $('#sound')[0].play();
}
