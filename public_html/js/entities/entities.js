// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 128, 128)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13, 80]);

        this.renderable.setCurrentAnimation("idle");
        
        
        
        
          //this helps put my guy on the floor 
        this.body.setVelocity(5, 20);
    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.renderable.setCurrentAnimation("smallWalk");

        }else if(me.input.isKeyPressed("left")){
             this.body.vel.x -= this.body.accel.x / me.timer.tick;   
                     
        }else {
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("up")) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        
        }
        
        this.body.update(delta);
        me.collision.check(this, true.collideHandler.bind(this),true);

        if (this.body.vel.x !== 0) {
            if(!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    }

});


game.LevelTrigger = me.Entity.extend({
   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, settings]);
       this.body.onCollision = this.onCollision.bind(this);
       this.level = settings.level;
       
   },
     
    onCollision: function() {
        this.body.setCollisionMask[me.collision.types.NO_OBJECTS];
        me.levelDirector.load(this.level);
    }
    
});