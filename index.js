
class shape{
    constructor(){
        this.position= 'absolute';
        this.backgroundColor= 'yellow';
        this.rect=document.createElement('div');

    }

    createDiv(width,height){
     
        this.rect.style.width= String(width)+'px';
        this.rect.style.height= String(height)+'px';
        this.rect.style.backgroundColor= this.backgroundColor;
        this.rect.style.position= this.position;
       
    }

    update(pos_x,pos_y){
        this.rect.style.left = String(pos_x-(this.width/2))+'px';
        this.rect.style.top= String(pos_y-(this.height/2))+'px';

    }

    drawRect(width,height,pos_x,pos_y,wall){
        this.width= width ;
        this.height= height ;
        this.createDiv(this.width,this.height);
        this.rect.style.left = String(pos_x-(this.width/2))+'px';
        this.rect.style.top= String(pos_y-(this.height/2))+'px';
        wall.appendChild(this.rect);

        //return this.rect;

    }

    drawCircle(radius,pos_x,pos_y,wall){
        this.width=radius;
        this.height= radius;
        this.createDiv(this.width,this.height);
        this.rect.style.borderRadius= String(100)+'%';
        this.rect.style.left= String(pos_x-(this.width/2));
        this.rect.style.top= String(pos_y-(this.height/2));

        wall.appendChild(this.rect);
        
       
    };

    drawLine(x1,y1,x2,y2,wall){
        let dist = Math.sqrt((x2-x1)**2+ (y2-y1)**2);
        this.width= dist;
        this.height= 2;
        this.createDiv(dist,this.height);
        //first draw the line from the left point and rotate it according to the slope.
        if(x1<=x2){
            this.rect.style.left= String(x1)+'px';
            this.rect.style.top= String(y1)+'px';
        }
        else{
            this.rect.style.left= String(x2)+'px';
            this.rect.style.top= String(y2)+'px';
        }
        this.rect.style.transformOrigin= 'left';
        this.rect.style.transform= `rotate(${Math.atan((y2-y1)/(x2-x1))*180/Math.PI}deg)`;
        wall.appendChild(this.rect);
    }

    drawPolarLine(x1,y1,len,angle,wall){
        //draws a line using starting pos and an angle 
        let dist =len;
        this.width= dist;
        this.height= 2;
        this.createDiv(this.width,this.height);
        this.rect.style.left= String(x1)+'px';
        this.rect.style.top= String(y1)+ 'px';
        this.rect.style.transformOrigin= 'left';
        this.rect.style.transform= `rotate(${-angle}deg)`;

        wall.appendChild(this.rect);
    }


}

// let wall = document.getElementById('wall');
// let Shape = new shape()

// Shape.drawPolarLine(200,200,300,270,wall);


// let x=0;
// setInterval(() => {
//     Shape.update(x,x+1);
//     x+=20;
// }, 100);






