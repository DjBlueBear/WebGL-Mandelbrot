var viewPosition = [0,0];
var clicking = false;
var mousePos = [0,0];
var scrollPos = 0;
var viewportUpdate = ()=>{};
var zoom = 1;

window.addEventListener("mousedown", (e)=> {
    clicking = true;
    console.clear();
});

window.addEventListener("mouseup", (e)=> {
    clicking = false;
});

window.addEventListener("mousemove", (e)=> {
    if(clicking) {
        var mouseDelta = [e.clientX - mousePos[0], 
                          e.clientY - mousePos[1]];
        viewPosition[0] -= mouseDelta[0] / canvas.height / zoom * 2;
        viewPosition[1] += mouseDelta[1] / canvas.height / zoom * 2;
        viewportUpdate();

    }
    mousePos = [e.clientX, e.clientY];
});

document.addEventListener("wheel", (e) => {
   scrollPos += -e.deltaY/800;
   scrollPos = Math.min(Math.max(scrollPos,-1),16);
   zoom = Math.pow(2,scrollPos);
   viewportUpdate();
});