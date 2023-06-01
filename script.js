
  // Create the grid of boxes dynamically
  var grid = document.getElementById('grid');
  for (var i = 0; i < 36; i++) {
    var box = document.createElement('div');
        box.classList.add('box');
        box.innerText=i
    box.addEventListener('click', handleClick);
    grid.appendChild(box);
  }

  var activeBoxes=[]

  function handleClick(event){
    var clickedBox = event.target;
    var clickedIndex = Array.from(grid.children).indexOf(clickedBox);
    console.log(clickedIndex)
        // Check if the clicked box is adjacent to the red box
    var rowSize = 6;
    var adjacentIndices = [clickedIndex - rowSize, clickedIndex + rowSize,clickedIndex+1,clickedIndex-1];
    let founded=false
    adjacentIndices.forEach(element => {
        if(activeBoxes.includes(element)){
            founded=true
            return
        }else{
        }
    });

    if(founded){
        alert("You are not eligible to click here ")
    }else{
        clickedBox.classList.add('red');
        activeBoxes.push(clickedIndex)
    }
    

  }