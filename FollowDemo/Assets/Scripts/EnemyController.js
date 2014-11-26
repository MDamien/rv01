#pragma strict

private var bolide: GameObject;
public var speed: int = 5;
private var focused: boolean;
private var oldColor: Color;
private var distToFloor: int = 20;

function Start () {
	oldColor = renderer.material.color;
	bolide = GameObject.Find("bolide");
}

function Update () {
	Move();
}

function Move()
{
	var hit : RaycastHit;
	
	var goTo: Vector3 = bolide.transform.position;
	goTo.x -= 70;
	
	transform.LookAt(goTo);

	transform.position += transform.forward * speed * Time.deltaTime;

    if (Physics.Raycast (transform.position, Vector3.down, hit)) {
		transform.position.y = hit.point.y + distToFloor;
	}
	else if (Physics.Raycast (transform.position, Vector3.up, hit)) { //Under the floor
		transform.position.y = hit.point.y + distToFloor;
	}
}

//Color change on focus
function FocusBegan() {
	if(!focused)
	{
		focused = true;
		renderer.material.color = new Color(255, 0, 0);

		Debug.Log("FocusBegan");
	}
}

function FocusEnded() {
	if(focused)
	{
		focused = false;
		renderer.material.color = oldColor;
		
		
		Debug.Log("FocusEnded");
	}
}