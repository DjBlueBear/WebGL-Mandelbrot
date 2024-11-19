"use strict";

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');
var windowSizeUpdate = ()=>{};

if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it. \n Attempting to use experimental version');
    gl = canvas.getContext('experimental-webgl');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', ()=> {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowSizeUpdate();
});