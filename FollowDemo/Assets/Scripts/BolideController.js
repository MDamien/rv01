#pragma strict


//var speed_forward = 10.0;
private var speed_forward = 0.0;
var rotate_speed = 1.0;
var dist_to_floor = 2.5;
var max_speed=300;
var GLOBALS: GameObject;
private var acceleration=0;
private var down=0;
private var y_pos=0;
//pos prec - pos actu
private var y_change=0.0;

function Start () {
if(GLOBALS.GetComponent(globals).isDriver)
		{
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, Vector3.down, hit))
		{
			y_pos=hit.point.y;
		}
	}
}

function Update () {
   /*
	if (Input.GetKey ("left") || Input.GetKey ("a")){
		transform.Rotate(Vector3.down * rotate_speed * Time.deltaTime);
	}if (Input.GetKey ("right") || Input.GetKey ("d")){
		transform.Rotate(Vector3.up * rotate_speed * Time.deltaTime);
*/
// Input.GetKey ("joystick button 2") => accelerateur
// Input.GetKey ("joystick button 3") => ralentisseur

// influence de l'acceleration sur la vitesse

	if(GLOBALS.GetComponent(globals).isDriver)
	{

	if(down==0||down==1)// si pas d'accident
	{
		if(speed_forward<max_speed && speed_forward>=0)speed_forward=speed_forward+acceleration;
		if(speed_forward<0)speed_forward=0;
		transform.Translate(Vector3.forward * speed_forward * Time.deltaTime);
	}


	// si l'acceleration est de 0 alors on applique un ralentissement pour les frottements
	if(acceleration==0) speed_forward=speed_forward-0.3;

	if (Input.GetAxis("Horizontal")<0){
			transform.Rotate(Vector3.down * rotate_speed * Time.deltaTime*(-Input.GetAxis("Horizontal")));
		}if (Input.GetAxis("Horizontal")>0){
			transform.Rotate(Vector3.up * rotate_speed * Time.deltaTime*Input.GetAxis("Horizontal"));
			
		}if (Input.GetKey ("up") || Input.GetKey ("w") || Input.GetKey ("joystick button 2")){
			acceleration=1;
		}if (Input.GetKey ("down") || Input.GetKey ("s") || Input.GetKey ("joystick button 3")){
			acceleration=-1;
		}if (Input.GetKey ("escape")) {
			Application.Quit();
		}if (Input.GetKey ("space")){
			transform.position = Vector3.zero;
		}
		
		
		// mise a 0 de l'acceleration en cas de stop de la touche
		
		if (Input.GetKeyUp ("up") || Input.GetKeyUp ("w") || Input.GetKeyUp ("joystick button 2")){
			acceleration=0;
		}if (Input.GetKeyUp ("down") || Input.GetKeyUp ("s") || Input.GetKeyUp ("joystick button 3")){
			acceleration=0;
		}
		
		//stick near the floor
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, Vector3.down, hit)) { //to work, add a mesh collider to Terrain
			transform.position.y = hit.point.y+dist_to_floor;
			Debug.DrawLine (transform.position, hit.point, Color.blue);
			//if(hit.distance>32 && speed_forward>0){speed_forward=0;acceleration=0;down=1;}
			//print(y_pos +" hh h "+hit.point.y);
			
			//calcul de l'angle
			y_change=(hit.point.y-y_pos)*100;
			
			if(y_change>250 && speed_forward>0)
			{
				speed_forward=0;
				acceleration=0;
				down=1;
			}
			
			//print("perc : "+ y_change);
			y_pos=hit.point.y;
			
		}else if (Physics.Raycast (transform.position, Vector3.up, hit)) { //when under the floor
			transform.position.y = hit.point.y+dist_to_floor;
		}
		
		
		/*
		//test raycast mouse
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray, hit, 500)) {
			Debug.DrawLine (ray.origin, hit.point, Color.green);
		}
		*/
	}
}