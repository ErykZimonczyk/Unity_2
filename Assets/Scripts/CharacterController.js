#pragma strict

var maxSpeed : float = 10.0;
private var facingRight : boolean = true;

var anim : Animator;
var touch : Touch;
var move : float;
var ground : boolean = false;
var groundCheck : Transform;
var groundRadius : float = 0.2;
var whatIsGround : LayerMask;
var jumpForce : float;
var runAudio : AudioSource;

function Start () {
	anim = GetComponent(Animator);
}

function FixedUpdate () {
	
	ground = Physics2D.OverlapCircle(groundCheck.position,groundRadius,whatIsGround);
	anim.SetBool("Ground",ground);
	
	anim.SetFloat("vSpeed",rigidbody2D.velocity.y);
	
	//var moveHorizontal = Input.GetAxis ("Horizontal");
    

    //var move = moveHorizontal;
    //rigidbody2D.velocity.x = move;
	 
	
	move = 0;
	runAudio.Stop();
	if (Input.touchCount > 0) {
        // The screen has been touched so store the touch
        touch = Input.GetTouch(0);     
 		if(ground)
 			runAudio.Play();
        if (touch.phase == TouchPhase.Stationary || touch.phase == TouchPhase.Moved) {
            // If the finger is on the screen, move the object smoothly to the touch position
            var touchPosition : Vector3  = Camera.main.ScreenToWorldPoint(new Vector3(touch.position.x, touch.position.y, 0.0));                
            move = (touchPosition.x - transform.position.x) > 0 ? 1 : -1;
            
            
        }
    }
    //text.text = ""+move;
    anim.SetFloat("Speed",Mathf.Abs(move));
    rigidbody2D.velocity = new Vector2(move*maxSpeed,rigidbody2D.velocity.y);
   	if(move > 0 && !facingRight)
		Flip();
	else if(move < 0 && facingRight)
		Flip();

	
}

function Flip() {
	facingRight = !facingRight;
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}

function Update() {

	if(ground && Input.touchCount == 2){
		anim.SetBool("Ground",false);
		rigidbody2D.AddForce(new Vector2(0,jumpForce));
	
	}
	
	/*if(ground && Input.GetKeyDown(KeyCode.Space)){
		anim.SetBool("Ground",false);
		rigidbody2D.AddForce(new Vector2(0,jumpForce));
	
	}*/

}