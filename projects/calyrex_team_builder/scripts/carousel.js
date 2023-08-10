var carousel = document.querySelector('#card-table');
var cells = document.querySelectorAll('.card');
var cellCount = cells.length; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = false;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
    console.log(selectedIndex);
}

function changeCarousel() {
  refreshData();
  
  theta = 360 / cellCount;

  Math.min((360 / cellCount), )
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';

    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}


function onOrientationChange() {
  isHorizontal = false;
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
}

function refreshData() {

  carousel = document.querySelector('#card-table');
  cells = document.querySelectorAll('.card');
  cellCount = cells.length; // cellCount set from cells-range input value
  selectedIndex = 0;
  cellWidth = carousel.offsetWidth;
  cellHeight = carousel.offsetHeight;

  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  onOrientationChange();
  }
// set initials

function scrollTable(){
  console.log("scrolled");

}