#pragma strict

var speed_forward = 10.0;
var rotate_speed = 1.0;
var dist_to_floor = 20;

function Start () {
}

function Update () {
   
	if (Input.GetKey ("left")){
		transform.Rotate(Vector3.down * rotate_speed * Time.deltaTime);
	}if (Input.GetKey ("right")){
		transform.Rotate(Vector3.up * rotate_speed * Time.deltaTime);
	}if (Input.GetKey ("up")){
		transform.Translate(Vector3.forward * speed_forward * Time.deltaTime);
	}if (Input.GetKey ("down")){
		transform.Translate(Vector3.back * speed_forward * Time.deltaTime);
	}if (Input.GetKey ("escape")) {
		Application.Quit();
	}if (Input.GetKey ("space")){
		transform.position = Vector3.zero;
	}
	
	//stick near the floor
	var hit : RaycastHit;
	if (Physics.Raycast (transform.position, Vector3.down, hit)) { //to work, add a mesh collider to Terrain
		transform.position.y = hit.point.y+dist_to_floor;
		Debug.DrawLine (transform.position, hit.point, Color.blue);
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