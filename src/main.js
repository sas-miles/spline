import { Application } from '@splinetool/runtime';
import barba from '@barba/core';
import { gsap } from "gsap";

let spline, obj1, obj2;

function fadeInCanvas() {
    gsap.to('#canvas3d', {
        visibility: 'visible',
        opacity: 1,
        duration: 1
    });
}

function initSpline() {
    if (spline) return;

    const canvas = document.getElementById('canvas3d');
    spline = new Application(canvas);

    spline.load('https://prod.spline.design/zBBaOmVltDuUag17/scene.splinecode')
    .then(() => {
        obj1 = spline.findObjectById('1abf83a1-5d8c-4819-a952-7bcd8afbcb11');
        obj2 = spline.findObjectById('0656b222-e1ba-4f9f-8d6d-a23ba4b286f6');
        fadeInCanvas();
    });
}

// Setup event listeners after Barba transitions
barba.init({
    transitions: [{
        leave(data) {
            return gsap.to(data.current.container, { opacity: 0 });
        },
        enter(data) {
            return gsap.from(data.next.container, { opacity: 0 });
        },
        afterEnter() {
            setupEventListeners();
        }
    }]
});

function setupEventListeners() {
    const clickText1 = document.querySelector('.click-text1');
    const clickText2 = document.querySelector('.click-text2');

    if (clickText1) {
        clickText1.addEventListener('click', () => {
            spline.emitEvent('mouseDown', obj1.name);
        });
    }

    if (clickText2) {
        clickText2.addEventListener('click', () => {
            spline.emitEvent('mouseDown', obj2.name);
        });
    }
}

initSpline(); // Initial call to setup Spline
setupEventListeners(); // Setup event listeners initially
