
let wall = document.getElementById('wall');
let start = false;

///////////////////
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case " ":
        // code for "down arrow" key press.
        start= true;
        
        break;

      default:
          console.log(event.key);
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);


//////////////////

let startNode ;
let endNode ;
let openset =[];//contains all the node that is to be checked;

let closedSet = new Set();//contains all the node that already has been checked.
function calculateCost(nodeA,nodeB){
    let dist =0;
    let rowdiff = Math.abs(nodeB.row- nodeA.row);
    let coldiff= Math.abs(nodeB.col-nodeA.col);

    if (rowdiff< coldiff){
        dist= Math.abs(rowdiff*14)+ (Math.abs(coldiff-rowdiff)*10);
    }
    else{
        dist= Math.abs(coldiff*14)+ Math.abs((rowdiff-coldiff)*10);
    }

   // console.log(dist);
   return dist;

}

function checkNeighbour(node){
    //returns the neighbour node of a node.
    let neighbour =[];
    for(let i= -1 ; i<=1; i++){
        for (let j = -1 ; j<= 1 ; j++){
            if (node.row+i>=0 && node.col+j >=0 && node.row+i< grid.grid.length&& node.col+j<grid.grid[0].length){
                if(i===0 && j===0){continue;}
                neighbour.push(grid.grid[node.row+i][node.col+j]);
            }
        }
    }

    // neighbour.forEach(e => {
    //     console.log(e.row,e.col);
    // });
    return neighbour;
}
function checkElement(list, node){
    //returns true  if an element is inside of the list.
    list.forEach(e => {
        if(e === node){
          //  console.log(true);
            return true;
        }
        
    });
    return false;
}


function createField(){
    //create start,end node and obstacles node.

}
class Node {
 constructor(width,height,row,col,offset,wall){
     this.width= width;
     this.height= height;
     this.row= row;
     this.col = col;
     this.offset= offset;
     this.newColor = 'white';
     this.h_cost=0;
     this.g_cost=0;
     this.f_cost = Infinity;
     this.camefrom = null;
     this.type= startNode;


     
 }

 createNode(){
    this.div = document.createElement('div');
    this.div.style.width = String(this.width)+'px';
    this.div.style.height = String(this.height)+'px';
    this.div.style.position= 'absolute';
    this.div.style.backgroundColor= 'gray';
    this.div.id = 'sqr';
    wall.appendChild(this.div);
    

    this.div.style.left = String(this.offset+(this.col*this.width))+'px';
    this.div.style.top = String(this.offset+(this.row*this.height))+'px';
   
 }

 changeColor(color){
        if (startNode === undefined){
            this.div.style.backgroundColor= 'white';
            startNode = this;
            openset.push(startNode);
            return
        }
        if(endNode=== undefined){
            this.div.style.backgroundColor= 'yellow';
            endNode = this;
            return
        }

        this.div.style.backgroundColor= 'blue';

        this.type= 'obstacle';
     
    // this.div.style.backgroundColor= color;
 
 }

 setColor(color){
    this.div.style.backgroundColor= color;
 }
}
class Grid{
    constructor(row,col,offset,wall){
        this.offset = offset;
        this.row = row;
        this.col = col;
        this.wall = wall;
        this.grid = new Array(this.row);

        let node_width= Math.floor((window.innerWidth-(offset*2))/this.col);
        let node_height= Math.floor((window.innerHeight-(offset*2))/this.row );

        for (let i =0; i<this.row; i++){
            this.grid[i]= new Array(this.col);
            for (let j=0;j<this.col; j++){
                let node = new Node(node_width,node_height,i,j,this.offset,this.wall);
                node.createNode();
                this.grid[i][j]= node;
                this.grid[i][j].div.addEventListener('click',()=>{this.grid[i][j].changeColor('white')});
            }
        }
    
    }
}






 let grid = new Grid(20,40,100,wall);
//let startNode = grid.grid[4][3];
//startNode.changeColor('white');
//let endNode = grid.grid[6][36];

//var currentNode= startNode;
//openset.push(startNode);
//let start = true;

function tracePath(currentNode){
    while(currentNode !== startNode){
        if(currentNode.camefrom=== startNode){
            //do nothing
        }
       
        else{
            currentNode.camefrom.setColor('green');
           
        }
        currentNode= currentNode.camefrom;

    }
    endNode.setColor('yellow');
}
function update(){
  
   
     if(openset.length>0){
        currentNode = openset[0];
     }
   
    if(currentNode === endNode){
        currentNode.setColor('green');
        console.log('found end node');
        tracePath(currentNode);
        start=false;
        return 
    }
    let neighbour = checkNeighbour(currentNode);
    closedSet.add(currentNode);
    // if(currentNode !== startNode){
    // //currentNode.setColor('black'); //node added to the closed set.
    // }
    openset.shift();

    
    neighbour.forEach(e => {

        if(!closedSet.has(e)  && e.type !== 'obstacle'){
        let g_cost = calculateCost(startNode,e);
        let h_cost = calculateCost(e,endNode);
            
       // e.h_cost= h_cost;
      

        if(g_cost+h_cost<e.f_cost){
            e.g_cost= g_cost;
            e.h_cost= h_cost;

            e.f_cost= g_cost+h_cost;
            e.camefrom= currentNode; 
            
            if(!checkElement(openset,e)){openset.push(e);}
            if(e !== startNode){
            e.setColor('red'); //added to the open set.
            }
        }            
        }

        
    });
    openset.sort((c,d)=>parseFloat(c.h_cost)-parseFloat(d.h_cost));
    openset.sort((c,d)=>parseFloat(c.f_cost)-parseFloat(d.f_cost));
    if(openset[0].f_cost === openset[1].f_cost){
        if(openset[0].h_cost>openset[1].h_cost){
            let a= openset[0];
            openset[0]= openset[1];
            openset[1]= a;
        }
    }


    
}

 setInterval(() => {
     if(startNode !==undefined && endNode!== undefined && start){
         update();
     }
 }, 100);




