// Code for Sliders
let tsx = {}, tsp = {};
let sliderNumbers = [2,3,5];
let sliderUpdateIDs = {};
let sliderAnimInProcess = {};

for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
    sliderAnimInProcess[sn] = false;
    sliderUpdateIDs[sn] = setInterval(function() {
        if(sliderAnimInProcess[sn] == false)
            $('.slider'+sn+'rightarrow').trigger('click');
    }, 4000);
}


for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
    tsx[sn] = null;
    tsp[sn] = false;
    $('.slider-'+sn+' .w-slider-mask').on('touchstart',function(e){      
      tsx[sn] = e.originalEvent.touches[0].pageX;   
      //sliderAnimInProcess[sn] = true;   
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
        if(tsp[sn])
    	{
            tsp[sn] = false;            
            return false;
        }
        //sliderAnimInProcess[sn] = false;
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
    sliderAnimInProcess[sliderNumber] = false;
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
    if(sliderNumber == 2)
        setTimeout(function(){sliderAnimInProcess[2] = false;},300);
    else if(sliderNumber == 3)
        setTimeout(function(){sliderAnimInProcess[3] = false;},300);
    else if(sliderNumber == 5)
        setTimeout(function(){sliderAnimInProcess[5] = false;},300);
}



for(var j = 0;j < sliderNumbers.length;j++)
{
    let sn = sliderNumbers[j];
    $('.slider'+sn+'rightarrow').click(function()
    {        
        if(sliderAnimInProcess[sn])
            return false;
        
        sliderAnimInProcess[sn] = true;        
        moveSlidesRight(sn);   
        if(sn == 2)        
            setTimeout(function(){ updateSliderForRight(2)}, 300);           
        else if(sn == 3)        
            setTimeout(function(){ updateSliderForRight(3)}, 300);              
        else if(sn == 5)        
            setTimeout(function(){ updateSliderForRight(5)}, 300);              
        
        return false;  
    });

    $('.slider'+sn+'leftarrow').click(function(){	
        if(sliderAnimInProcess[sn])
            return false;
      sliderAnimInProcess[sn] = true;
      updateSliderForLeft(sn);  
      if(sn == 2)      
        setTimeout(function(){moveSlidesLeft(2);},400);
      else if(sn == 3)      
        setTimeout(function(){moveSlidesLeft(3);},400);
      else if(sn == 5)      
        setTimeout(function(){moveSlidesLeft(5);},400);
      
      return false;  
    });
}