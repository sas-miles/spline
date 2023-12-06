import { Application } from '@splinetool/runtime';
import barba from '@barba/core';
import { gsap } from "gsap";

let spline, obj;
let isToggled = false;

function setInitialState() {
    return new Promise((resolve) => {
        if (window.location.pathname === '/spline-03-02') {
            isToggled = true;
            spline.emitEvent('mouseDown', obj.name); // Trigger as if clicked
            resolve(); // Resolve the promise after setting the state
        } else {
            isToggled = false;
            resolve();
        }
    });
}

function fadeInCanvas() {
    gsap.to('#canvas3d', {
        visibility: 'visible',
        opacity: 1,
        duration: 1 // Duration of fade-in effect
    });
}

function initSpline() {
    if (spline) return;

    const canvas = document.getElementById('canvas3d');
    spline = new Application(canvas);

    spline.load('https://prod.spline.design/zBBaOmVltDuUag17/scene.splinecode')
    .then(() => {
        obj = spline.findObjectById('1abf83a1-5d8c-4819-a952-7bcd8afbcb11');
        setInitialState().then(() => {
            // Add a delay before fading in the canvas
            setTimeout(() => {
                fadeInCanvas();
            }, 500); // Delay in milliseconds
        });
    });
}

function handleClick(event) {
    if (event.target.classList.contains('click-text')) {
        isToggled = !isToggled;
        if (isToggled) {
            spline.emitEvent('mouseDown', obj.name);
        } else {
            spline.emitEventReverse('mouseDown', obj.name);
        }
    }
}

const staticParent = document.body;
staticParent.addEventListener('click', handleClick);

barba.init({
    transitions: [{
        leave(data) {
            return gsap.to(data.current.container, { opacity: 0 });
        },
        enter(data) {
            return gsap.from(data.next.container, { opacity: 0 });
        }
    }]
});

initSpline(); // Initial call to setup Spline
