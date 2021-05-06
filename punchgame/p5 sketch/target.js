class Target{
    constructor(){
      this.radius = 500;
      this.dec = 30;
      this.velocity = 0.3;
      this.score = 0;
    }
    show(){
      if(this.radius <= 0){
        return null;
      }
      noStroke();
      fill(255,0,0);
      circle( width/2,height/2,this.radius)
      var shrink = 30;
      for(var i=0;i<4;i++){
        if(i % 2 == 0){
          fill(255);
        }else{
          fill('red');
        }
        if(this.radius>=this.dec){
           circle(width/2,height/2,(this.radius-shrink)-this.dec);
           shrink += 30;
        }else{
          break;
        }
      }
    }
    update(){
      this.radius -= this.velocity;
    }
    updateRadius(){
      this.radius += 20;
    }
    hit(){
     this.score++; 
    }
  }