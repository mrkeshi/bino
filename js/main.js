// slider
var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');


function slide(wrapper, items, next,prev) {

    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        dot,
        indexdots,
        allowShift = true;
    if (wrapper.getAttribute('data-dots') == 'true') {
        dot = wrapper.querySelectorAll('.dots-2>span');
        dot.forEach((item) => {
            item.addEventListener('click', () => {
                //index : 0 - 1 - 2
                //index Dots: 0 - 1 - 2
                //index Dots:2
                // index:0

                indexdots = item.getAttribute('data-ct') - 1;

                if (indexdots < index) {

                 shiftSlide((indexdots-index))


       } else if (indexdots == index) {
              } else {

                    shiftSlide((indexdots-index))

                }
            })


        })

    }
    function dotable() {
    }
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');
    // Mouse events
    items.onmousedown = dragStart;
    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1)
    });
    next.addEventListener('click', function () {
        shiftSlide(1)
    });
    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }
    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
            }

            if (dir>=1) {
                items.style.left =Number(((posInitial - (slideSize)*(dir)))) + "px";
                index+=dir;
            } else if (dir <= -1) {
                items.style.left =Number(((posInitial + (slideSize)*(-dir)))) + "px";
                index+=(dir);
            }
        }
        allowShift = false;
    }
    function checkIndex() {
        items.classList.remove('shifting');
        if (index ==-1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }
        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }
        if (wrapper.getAttribute('data-dots') == 'true') {
            document.querySelector('.dt-ac').classList.remove('dt-ac');
            dot[index].classList.add('dt-ac');
        }
        allowShift = true;
    }
}

slide(slider, sliderItems, prev, next);
var slider2 = document.getElementById('slider-2'),
    sliderItems2 = document.getElementById('slides-2'),
    prev2 = document.getElementById('prev2'),
    next2 = document.getElementById('next2');

slide(slider2, sliderItems2, prev2, next2);
// slide(document.querySelector('.slideshow-study'), document.querySelector('.slides-st'), prev, next);

//
// end slider
//caseStudySlider


//animateNumberScroll
class animateNumberScroll {
    status = 0;
    settings = {
        time: 5000,
        parentSelector: '#keshi',
    };
    options = {};
    constructor(option) {
        this.options = (Object.assign(this.settings, option));
        window.addEventListener("scroll", () => {
            if (this.Comparison() && this.status === 0) {
                this.status = 1;
                this.counter();
            }
        })
    }
    Comparison = () => {
        var offsetTop = document.querySelectorAll(this.settings.parentSelector)[0].offsetTop;
        if (((offsetTop - window.innerHeight) - 50) < window.pageYOffset) {

            return true

        }
    };

    counter() {
        var ali;
        var timeout = Math.floor(this.settings.time / 250);
        document.querySelectorAll(this.settings.parentSelector + " " + '[data-count]').forEach((item) => {
            let t = setInterval(() => {
                if (Number(item.innerHTML.match(/[0-9]+/i)[0]) === Number(item.getAttribute('data-count'))) {
                    clearInterval(t);
                    return true;
                }
                ali = item.innerHTML.match(/[0-9]+/i)[0];
                ali = Number(ali) + 1;
                item.innerHTML = item.innerHTML.replace(/[0-9]+/g, ali);
            }, 100 / Number(item.getAttribute('data-count')) * timeout)
        });
    }
}

new animateNumberScroll({
    parentSelector: '#keshi',
    time: 8000
})
//end animateNumber Scroll


//scroolTop
window.addEventListener('scroll', () => {
    if (this.scrollY > 700) {
        document.getElementById('go-to-top').style.display = 'block';
    } else {
        document.getElementById('go-to-top').style.display = 'none';
    }

})
document.getElementById('go-to-top').addEventListener('click', () => {

    let ali = setInterval(() => {
        window.scrollTo(0, window.scrollY - 50);
        if (window.scrollY === 0) {

            clearInterval(ali);
        }
    }, 15)
})
// end scroll Top


//start slider Service
class serviceSlider {
    treeSlideDisable = document.getElementsByClassName('treeSlide');
    dotsDisable = document.getElementsByClassName('dot');
    counter = 1;
    ShowSlide = (i) => {
        document.getElementsByClassName('act-service')[0].classList.remove("act-service");
        document.getElementsByClassName('dot-act')[0].classList.remove('dot-act');
        this.treeSlideDisable[i - 1].classList.add("act-service");
        this.dotsDisable[i - 1].classList.add('dot-act')

    }

    randomSelect = () => {
        if (this.counter < this.treeSlideDisable.length) {
            this.counter++
        } else {
            this.counter = 1;
        }
        this.ShowSlide(this.counter);
    }
    startInterVal = () => {
        var q = setInterval;

        let startSli = document.getElementsByClassName("sl-sr")[0];
        startSli.addEventListener('mouseover', () => {
            q = setInterval(this.randomSelect, 7000)
        })
        startSli.addEventListener('mouseout', () => {
            clearInterval(q)
        })
        document.getElementsByClassName('treeSlide')[0].addEventListener("hover", () => {
            clearInterval(q)
        })
    }
}

new serviceSlider().startInterVal();
var ali = new serviceSlider();
document.querySelectorAll('.dot').forEach((item) => {

    item.addEventListener('click', () => {
        ali.ShowSlide(item.getAttribute('data-id'))
    });

})
//end slider Service


//start filter Works
class filterWork {
    constructor() {
        document.querySelectorAll('.filter-work>span').forEach((item) => {
            item.addEventListener('click', () => {
                new filterWork().mathItems(item.getAttribute('data-title'));
            })
        })
    }

    hiddenItems = () => {
        document.querySelectorAll('.ds').forEach((item) => {
            item.classList.remove('ds');

        })
        document.querySelector('.t-active').classList.remove('t-active');

    }
    showItems = (data) => {
        if (data === 'all') {
            document.querySelector('.t-active').classList.remove('t-active');
            document.querySelectorAll('.filter-work>span')[0].classList.add('t-active');

            document.querySelectorAll('.work').forEach((item) => {
                item.classList.add('ds');
            });
        } else {
            document.querySelectorAll("[data-show=" + data + "]").forEach((item) => {
                item.classList.add('ds');

            })
            document.querySelector("[data-title=" + data + "]").classList.add('t-active')
        }

    }
    mathItems = (data) => {
        if (data === 'all') {
            return this.showItems('all');
        } else {
            this.hiddenItems()
            this.showItems(data);
        }
    }
}

new filterWork();

//end filter Works

//responsive Menu
var countt = 1;
let se = '';
window.addEventListener('resize',()=>{
if(window.innerWidth>='980'){
    document.getElementsByClassName('responsiveHeader')[0].style.height='unset';

    document.getElementsByClassName('responsiveHeader')[0].style.overflowY='unset';
}
});
ul = document.getElementsByClassName('ul-1')[0];
bars = document.querySelector('.bars');
bars.addEventListener('click', () => {


    if (countt === 1) {
        ul.style.opacity = 0;
        ul.style.height = 'auto';
        let height = ul.clientHeight;
        ul.style.height = 0;
        ul.style.opacity = 1;
        setTimeout(() => {
            ul.style.height = height + "px";
        }, 10);
        document.getElementsByClassName('responsiveHeader')[0].style.height='100%';

        document.getElementsByClassName('responsiveHeader')[0].style.overflowY='scroll';

        bars.className = "bars fa fa-chevron-down";
        countt--
    } else {
        document.getElementsByClassName('responsiveHeader')[0].style.height='unset';

        document.getElementsByClassName('responsiveHeader')[0].style.overflowY='unset';
        bars.className = "fa bars fa-bars";
        countt++;
        ul.style.height = "0%";

    }
});

class ScroollwithClickLink {
    allowShift=true;
    to=0;
    scrollY;
    constructor() {
        if(window.scrollY>100){

            document.querySelector('header').classList.add('fixedHeader');
        }else{
            document.querySelector('header').classList.remove('fixedHeader');

        }
        window.addEventListener('scroll',()=>{
            this.fixedHeader();
        });
        document.querySelectorAll('a[data-section]').forEach((item) => {
            item.addEventListener('click', (e) => {
e.preventDefault();
this.startScroll(item.getAttribute('data-section'))
            })
        })
    }
fixedHeader(){

        if(window.scrollY>100){

            document.querySelector('header').classList.add('fixedHeader');
        }else{
            document.querySelector('header').classList.remove('fixedHeader');

        }
}
    startScroll= (title)=>{
this.to=0;
this.scrollY=window.scrollY;
let ao=(document.querySelector('section[data-section-title='+title+']').offsetTop);

if(this.allowShift===true){
this.allowShift=false;
    let h=setInterval(()=>{
        if(window.scrollY<ao){
            this.to+=10;
            if(window.scrollY+12>=ao){
                clearInterval(h);
                this.allowShift=true;

            }
            window.scrollTo(0,window.scrollY+10)
        }else{
            this.scrollY-=5;
            if(window.scrollY<=ao){

                clearInterval(h);
                this.allowShift=true;

            }
            window.scrollTo(0,window.scrollY-10)
        }


    },4)

}



    }
}

new ScroollwithClickLink();
var scrolltTop;
    let section=document.querySelectorAll('section[data-section-title]');

window.addEventListener('scroll',()=>{
  scrolltTop=window.scrollY;

    section.forEach((item)=>{
if(item.offsetTop<=scrolltTop && Number(item.offsetTop+item.clientHeight)>scrolltTop ){
document.querySelector('a[data-section='+item.getAttribute('data-section-title')+']').classList.add('active-nav')
    // document.querySelector('a[data-section='+item.getAttribute('a[data-section-title]')+']')

}else{
    document.querySelector('a[data-section='+item.getAttribute('data-section-title')+']').classList.remove('active-nav')
}
})
});