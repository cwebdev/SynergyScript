
// Code for Pop-up
$('.slide-3').click(function(){
	$('.popup-about').css("display", "block");
  var slideIndex = $(this).index();
  // Center the pop-up
  let leftOffset = (window.innerWidth - $('.about-popup')[0].offsetWidth); 
  let topOffset = (window.innerHeight - $('.about-popup')[0].offsetHeight); 
	$('.about-popup').css('left',(leftOffset/2)+'px'); 
  $('.about-popup').css('top',(topOffset/2)+'px'); 
  // Highlight the slide of the person clicked
  $('.video-div').eq(slideIndex).trigger('click');
  setTimeout(function(){
  	fullVideoDivWidth = $('.video-div.active').width();
  },500);
});

let smscreen = (window.innerWidth < 991) ? true : false;
let fvdwidth = smscreen ? 280 : 580;

$('.video-div').click(function(){
	if($(this).hasClass('active') == false)
  {
  	$('.video-div').show();
  	$('.video-div.active .closevideolink').trigger('click');
    $('.video-div.active .activeplaybtnimage').hide();
    $('.video-div.active .playbtnimage').eq(0).show();
    
    var index = $(this).index();  
    $('.viddiv').removeClass('activeviddiv');
    $('.viddiv').eq(index).addClass('activeviddiv');
  
    $(this).find('.activeplaybtnimage').show();
    $(this).find('.playbtnimage').eq(0).hide();
    
  	$('.video-div').removeClass('active');
    $(this).addClass('active');
    
    let clVal = smscreen ? 25 : 15;
    
    $(this).css({"z-index":"100","width":"100%",
    	"height":"100%","top":"0%","left":clVal+"%"});
    
    if(window.innerWidth < 568)
    {
        $('.video-div').not('.active').hide();  
        setTimeout(function(){
        	let lwth = $('.videodivwrapper').width()-$('.video-div.active').width();          
          $('.video-div.active').css({"left":(lwth/2)+"px"});
        },100);        
        return;
    }
    
    let li = index-1;
    while(li >= 0)
    {
    	let diff = (index-li), leftspace = (clVal/index);
    	$('.video-div').eq(li).css({"z-index":100-diff,"height":(90-10*diff)+"%",
		      "width":(90-10*diff)+"%", "top":(10+5*(diff))+"%", "left":(clVal-(leftspace*diff))+"%"});
    	li--;
    }
    
    let ri = index+1;
    let wrapperWidth = $('.videodivwrapper').width();
    let leftOffset = (wrapperWidth*clVal*0.01)+fvdwidth;
    let rightTotalSpace = wrapperWidth - leftOffset;
    while(ri < $('.video-div').size())
    {
    	let diff = (ri-index), rightspace = rightTotalSpace / ($('.video-div').size()-1-index);
      $('.video-div').eq(ri).css({"z-index":100-diff,"height":(90-10*diff)+"%",
		      "width":(90-10*diff)+"%", "top":(10+5*(diff))+"%"});
        
      if(window.innerWidth > 991)
      {
      	let newDivWidth = fvdwidth * 0.80;
      	$('.video-div').eq(ri).css({"left":(leftOffset+(rightspace*diff)-newDivWidth)+"px"});
      }
      else
      {
      	let newDivWidth = fvdwidth * (90-10*diff) * 0.01;
      	$('.video-div').eq(ri).css({"left":(leftOffset+(rightspace*diff)-newDivWidth)+"px"});
      }
    	ri++;
    } 
  }
});



let tsvd = null, tspvd = false;
$('.videodivwrapper').on('touchstart',function(e){
  tsvd = e.originalEvent.touches[0].pageX;  
}).on('touchmove',function(e){
  if(tspvd == false)
  {
    let diff = e.originalEvent.touches[0].pageX - tsvd;
    if(diff < -10)        
    {
    	let vdivInd = $('.video-div.active').index();
      if(vdivInd+1 < $('.video-div').size())
      	$('.video-div').eq(vdivInd+1).trigger('click');
      tspvd = true;
    }
    else if(diff > 10)
    {
    let vdivInd = $('.video-div.active').index();
      if(vdivInd-1 >= 0)
      	$('.video-div').eq(vdivInd-1).trigger('click');      
      tspvd = true;
    }      		
  }  
}).on('touchend', function(e){
  tspvd = false;  
});  


$('.video-cover').click(function(){
  if($(this).parent().hasClass('active'))
  {
    $(this).hide();
    $(this).siblings('.closevideolink').css("display","inline-block");
    $(this).siblings('.youtube').show();
  }
});

// Hide video on close button click
$('.closevideolink').click(function(){
	if($(this).parent().hasClass('active'))
  {
    $(this).hide();
    $(this).siblings('.youtube').hide();
    $(this).siblings('.video-cover').show();
  }
});



















// Code for Sliders
let tsx = {}, tsp = {};
let sliderNumbers = [2,3,5];
for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
		tsx[sn] = null;
    tsp[sn] = false;
    $('.slider-'+sn+' .w-slider-mask').on('touchstart',function(e){
      tsx[sn] = e.originalEvent.touches[0].pageX;
      return false;
    }).on('touchmove',function(e){
			if(tsp[sn] == false)
      {
      	let diff = e.originalEvent.touches[0].pageX - tsx[sn];
      	if(diff < -10)        
        {
        	$('.slider'+sn+'rightarrow').trigger('click');
          tsp[sn] = true;
        }
        else if(diff > 10)
        {
        	$('.slider'+sn+'leftarrow').trigger('click');
          tsp[sn] = true;
        }      		
      }
      return false;
    }).on('touchend', function(e){
    	tsp[sn] = false;
      return false;
    });    
}



let rollingSlider2Elems = document.querySelectorAll('.slide-2');
let rollingSlidesForSlider2 = [];
for(var i = 0; i < rollingSlider2Elems.length;i++)
	rollingSlidesForSlider2.push(rollingSlider2Elems[i]);

let rollingSlider3Elems = document.querySelectorAll('.slide-3');
let rollingSlidesForSlider3 = [];
for(var i = 0; i < rollingSlider3Elems.length;i++)
	rollingSlidesForSlider3.push(rollingSlider3Elems[i]);

let rollingSlider5Elems = document.querySelectorAll('.slide-5');
let rollingSlidesForSlider5 = [];
for(var i = 0; i < rollingSlider5Elems.length;i++)
	rollingSlidesForSlider5.push(rollingSlider5Elems[i]);


function updateSliderForLeft(sliderNumber)
{
	let rollingSlides = [];
  if(sliderNumber == 2)
  	rollingSlides = rollingSlidesForSlider2;
  else if(sliderNumber == 3)
  	rollingSlides = rollingSlidesForSlider3; 
  else if(sliderNumber == 5)
  	rollingSlides = rollingSlidesForSlider5; 
   
	let slides = document.querySelectorAll('.slide-' + sliderNumber);
  let lastElemPos = 0;
  let totalWidth = (slides[0].offsetWidth) * slides.length;
  let slideToUpdate = rollingSlides[rollingSlides.length-1];  
  
  if(slideToUpdate != slides[slides.length-1])    	  	
  	lastElemPos = parseInt(rollingSlides[0].style.transform.split("px")[0].split("(")[1]);
    
  rollingSlides.pop();
  rollingSlides.unshift(slideToUpdate);
  slideToUpdate.style.visibility = "hidden";
  
  if(slideToUpdate == slides[slides.length-1])
  {      
    slideToUpdate.style.transform = "translateX(" + (-1*(totalWidth)) + "px)";  	
  }
  else
  { 
    slideToUpdate.style.transform = "translateX(" + (lastElemPos) + "px)";  	
  }  
}


function updateSliderForRight(sliderNumber)
{
	let rollingSlides = [];
  if(sliderNumber == 2)  
	  rollingSlides = rollingSlidesForSlider2;    
  else if(sliderNumber == 3)  
  	rollingSlides = rollingSlidesForSlider3;    
  else if(sliderNumber == 5)
  	rollingSlides = rollingSlidesForSlider5;     
   
	let slides = document.querySelectorAll('.slide-' + sliderNumber);  
  let lastPosElemPos = 0;
  let totalWidth = (slides[0].offsetWidth) * slides.length;
  
  let slideToUpdate = rollingSlides[0];
    
  if(slideToUpdate == slides[0])    	
  	lastPosElemPos = 0;
  else
  	lastPosElemPos = parseInt(rollingSlides[rollingSlides.length-1].style.transform.split("px")[0].split("(")[1]);
  
  rollingSlides.shift();
  rollingSlides.push(slideToUpdate);
  
  slideToUpdate.style.visibility = "hidden";
  if(slideToUpdate == slides[0])
  { 	  
    slideToUpdate.style.transform = "translateX("
      + (totalWidth - (slides[0].offsetWidth)) + "px)";  	       
  }
  else
  { 	
    slideToUpdate.style.transform = "translateX(" + lastPosElemPos + "px)";  	
  }
  
  if(sliderNumber == 2)
	  setTimeout(function(){makeSliderSlidesVisible(2);}, 300);
  else if(sliderNumber == 3)
	  setTimeout(function(){makeSliderSlidesVisible(3);}, 300);
  else if(sliderNumber == 5)
	  setTimeout(function(){makeSliderSlidesVisible(5);}, 300);
}

function makeSliderSlidesVisible(sliderNumber)
{
	let slides = document.querySelectorAll('.slide-'+sliderNumber);  
  for(var i = 0; i < slides.length;i++)  
  	slides[i].style.visibility = "visible";
}

function moveSlidesRight(sliderNumber)
{
	let slides = document.querySelectorAll('.slide-'+ sliderNumber);  
  if(slides.length > 0)
  {  	 
    for(var i = 0; i < slides.length;i++)
    {
    	slides[i].style.visibility = "visible";    	
    	let currPos = parseInt(slides[i].style.transform.split("px")[0].split("(")[1]);      
      slides[i].style.transform = "translateX(" + (currPos-(slides[0].offsetWidth)) + "px)";
    }
  }    
}

function moveSlidesLeft(sliderNumber)
{
	let slides = document.querySelectorAll('.slide-'+sliderNumber);  
    if(slides.length > 0)
    {
      for(var i = 0; i < slides.length;i++)
      {
        slides[i].style.visibility = "visible";
        let currPos = parseInt(slides[i].style.transform.split("px")[0].split("(")[1]);      
        slides[i].style.transform = "translateX(" + (currPos+(slides[0].offsetWidth)) + "px)";
      }
    }
}

let sliderUpdateIDs = {};
for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
    sliderUpdateIDs[sn] = setInterval(function() {
        $('.slider'+sn+'rightarrow').trigger('click');
    }, 4000);
}

for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
    $('.slider'+sn+'rightarrow').click(function()
    {        
        clearInterval(sliderUpdateIDs[sn]);
        moveSlidesRight(sn);   
        if(sn == 2)
        {
            setTimeout(function(){ updateSliderForRight(2)}, 300);  
            sliderUpdateIDs[2] = setInterval(function() {
                $('.slider2rightarrow').trigger('click');
            }, 4000);
        }
        else if(sn == 3)
        {
            setTimeout(function(){ updateSliderForRight(3)}, 300);  
            sliderUpdateIDs[3] = setInterval(function() {
                $('.slider3rightarrow').trigger('click');
            }, 4000);
        }
        else if(sn == 5)
        {
            setTimeout(function(){ updateSliderForRight(5)}, 300);  
            sliderUpdateIDs[5] = setInterval(function() {
                $('.slider5rightarrow').trigger('click');
            }, 4000);
        }
        return false;  
    });

    $('.slider'+sn+'leftarrow').click(function(){	
      clearInterval(sliderUpdateIDs[sn]);
      updateSliderForLeft(sn);  
      if(sn == 2)
      {
        setTimeout(function(){
            moveSlidesLeft(2);    
            sliderUpdateIDs[2] = setInterval(function() {
                $('.slider2rightarrow').trigger('click');
            }, 4000);
        },400);
      }
      else if(sn == 3)
      {
        setTimeout(function(){
            moveSlidesLeft(3);    
            sliderUpdateIDs[3] = setInterval(function() {
                $('.slider3rightarrow').trigger('click');
            }, 4000);
        },400);
      }
      else if(sn == 5)
      {
        setTimeout(function(){
            moveSlidesLeft(5);    
            sliderUpdateIDs[5] = setInterval(function() {
                $('.slider5rightarrow').trigger('click');
            }, 4000);
        },400);
      }
      return false;  
    });
}