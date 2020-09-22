'use strict';

import 'nodelist - foreach - polyfil';
import '@babel/polyfill';

import calc from './modules/calc';
import countTimer from './modules/countTimer';
import inputFilter from './modules/inputFilter';
import photoswitch from './modules/photoswitch';
import popUp from './modules/popUpAnimate';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';



countTimer('23  september 2020');
//menu open & close

toggleMenu();
//pop-up

popUp();
//tabs

tabs();
//slider

slider();
//team

photoswitch();

inputFilter();
//calc 

calc(100);
//send-ajax-form

sendForm();