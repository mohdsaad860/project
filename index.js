let canvas=document.querySelector('canvas')
let shape= canvas.getContext('2d')
  let cellSize=40
  let snakeCell=[[0,0]]
  let boardH=550
  let boardW=1200
  let gameOver=false
  let count=0

  let direction = 'right'
  document.addEventListener('keydown',(e)=>{
    //console.log(e,"rr");
    if(e.key==='ArrowUp') direction='up'
    else if(e.key==='ArrowDown') direction='down'
    else if(e.key==='ArrowLeft') direction='left'
    else direction='right'
  })

  let genarateFoods=function(){
    return([
      Math.round(Math.random()*(boardW-cellSize)/40)*40,
      Math.round(Math.random()*(boardH-cellSize)/40)*40
    ])
  }
  let foodCell=genarateFoods()
  //console.log(foodCell,'tr');
  
  function draw(){
    if(gameOver){
      shape.fillStyle="red"
      shape.fillText('Game Over',120,120)
      clearInterval(id)
      return
    }
    shape.clearRect(0,0,1290,590)
    for(let cell of snakeCell){
      shape.fillStyle='red'
      shape.fillRect(cell[0],cell[1],cellSize,cellSize)
    }
    
    shape.fillStyle='green'
    shape.fillRect(foodCell[0],foodCell[1],cellSize,cellSize)
    
    shape.font='30px san-sarif'
    shape.fillStyle="white"
    shape.fillText(`score ${count}`,40,40)
  }
  //draw()
  function update(){
    let headX= snakeCell[snakeCell.length-1][0]
    let headY= snakeCell[snakeCell.length-1][1]
    let newX
    let newY

    if(direction==='right'){
      newX=headX+cellSize
      newY=headY
      if(newX===boardW ||  checkMate(newX, newY)) gameOver=true
    }
    else if(direction==='down'){
      newX=headX
      newY=headY+cellSize
      if(newY===boardH ||  checkMate(newX, newY)) gameOver=true
    }
    else if(direction==='left'){
      newX=headX-cellSize
      newY=headY
      if(newX<0 ||  checkMate(newX, newY)) gameOver=true
    }
    else {
      newX=headX
      newY=headY-cellSize
      if(newY<0 ||  checkMate(newX, newY)) gameOver=true
    }
    snakeCell.push([newX,newY])

    if(newX===foodCell[0] && newY===foodCell[1]){
    foodCell=genarateFoods() 
    count++
    }
    else snakeCell.shift()
  }


  function checkMate(newX, newY){
    for(let item of snakeCell){
        if(item[0]=== newX && item[1]=== newY){
            return true
        }
    }
    return false
  }

  let id=setInterval(()=>{
    draw()
    update()
  },115)




  