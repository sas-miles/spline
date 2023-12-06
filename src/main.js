import { Application } from '@splinetool/runtime';
import barba from '@barba/core';
import { gsap } from "gsap";


const canvas = document.getElementById('canvas3d');
const spline = new Application(canvas);

spline.load('https://prod.spline.design/zBBaOmVltDuUag17/scene.splinecode')
.then(() => {
    const obj = spline.findObjectById('1abf83a1-5d8c-4819-a952-7bcd8afbcb11');
    const textLink = document.querySelector('.click-text');

    let isToggled = false; // State to track the toggle

    if (textLink) {
        textLink.addEventListener('click', () => {
            // Toggle the state
            isToggled = !isToggled;

            // Perform action based on the toggle state
            if (isToggled) {
                // Trigger the event
                spline.emitEvent('mouseDown', obj.name);
            } else {
                // Reverse the event
                spline.emitEventReverse('mouseDown', obj.name);
            }
        });
    } else {
        console.error('Text link element not found');
    }
});

barba.init({
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }]
  });