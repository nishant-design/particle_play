const canvas1 = document.getElementById("canvas1")
const ctx = canvas1.getContext("2d")
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

const particleArr = [];

let hue = 0;

// get cursor x,y positions
var mouse = {
    x : undefined,
    y : undefined
}

canvas1.addEventListener("click", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 50; i++){
        particleArr.push(new Particle())
    }
})

canvas1.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 2; i++){
        particleArr.push(new Particle())
    }
    
})



class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;  
        this.color =  `hsl(${hue},100%,50%)`;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.3) this.size -= 0.1;
    }

    draw(){
        ctx.fillStyle = this.color;
        // ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size , 0, Math.PI *2)
        ctx.fill()
    }
}



function createParticles(){
    for(let i = 0; i < particleArr.length; i++){
        particleArr[i].update();
        particleArr[i].draw();

        for(let j =i; j < particleArr.length; j++){
            // determine distace beween two partilcles using pythagoras throram
            const distX = particleArr[i].x - particleArr[j].x;
            const distY = particleArr[i].y - particleArr[j].y;
            const distance = Math.sqrt( (distX*distX) + (distY*distY) ); 

            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArr[i].color;
                ctx.lineWidth = 1;
                ctx.moveTo(particleArr[i].x, particleArr[i].y);
                ctx.lineTo(particleArr[j].x, particleArr[j].y);
                ctx.stroke();
            }
            
        }

        if(particleArr[i].size <= 0.3){
            particleArr.splice(i,1);
            i = i - 1;
        }
    }
}

// funtion to run on loop
function animateCircle(){
    // ctx.fillStyle = "rgba(0,0,0,1)";
    // ctx.fillRect(0,0,canvas1.width,canvas1.height);
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    createParticles();
    hue += 5;
    requestAnimationFrame(animateCircle);
}

animateCircle()