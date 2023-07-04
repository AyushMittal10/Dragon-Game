score = 0;
cross = true;    // true mtlb score bdj skta hai -- varna har ms m inc hoga

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

// 1 sec baad bjao
setTimeout(() => {
    audio.play()
}, 1000);

// button down press hote hi
// 38 up key ka h -- ye pta chla keycode se'
// dino ya toh id daal k le lo -- ya queryselector se lelo
// animate dino aaega -- tb hi jump kr paega
// timeout -- 700 ms baad htta do -- bcz jump k bd baadmeh add krre toh add ho jae clss

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }

    // 39 -- right khisak jae
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 130 + "px";
    }

    // left khisak jae
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 130) + "px";
    }
}


// kaam krte rho kch time tak -- check krega collision
// dx is dino x current value (left val de rkhi in css islea match k liye)
// dy (bottom bt top se bhi le lega)
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // box bnaya -- ki dino agar isse km aaya toh marr jaega
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')

        // gameover hote hi play krdo vo
        audiogo.play();
        // 1sec hi marne ki awaj aaye vo
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);

        setTimeout(() => {
            audiogo.pause();
        }, 3000);
    }

    // nhi takraaye
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        // 1 sec bd cross true -- tbhi score bdh paega and dino
        // tb tk aage nikal chuka hoga
        setTimeout(() => {
            cross = true;
        }, 1000);

        // animation duration km kr rhe -- mtlb obstacle fast chlega
        // timeout k andar islea -- jhatka na khaaye obstacle jb jump kr rhe
        // and score inc to speed 0.1 se inc
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

// compute updated score
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}