// Circle animation for match score
// Still needs to be able to take the event or have a button to activate
// Written by illonion
// Comments by ROB_ 

var expanded = false;
const circle = document.querySelector("#circle")
const circle2 = document.querySelector("#circle2")
function expand() {
   if (expanded) {
        circle.style.height = "20px";
        circle.style.top = "100px";
        circle.style.transform = "rotate(0deg)"
        circle.style.borderRadius = "20px";
        circle2.style.width = "20px";
        circle2.style.left = "100px";
        circle2.style.transform = "rotate(0deg)"
        circle2.style.borderRadius = "20px";
        expanded = false
    } else {
        circle.style.height = "100px";
        circle.style.top = "60px";
        circle.style.transform = "rotate(225deg)"
        circle.style.borderRadius = "10px";
        circle2.style.borderRadius = "10px";
        circle2.style.width = "100px";
        circle2.style.left = "60px";
        circle2.style.transform = "rotate(225deg)"
        expanded = true
    }

}
