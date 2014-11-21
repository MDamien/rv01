#pragma strict

private var focused: boolean;

//variables for cave worms color changes
//private var baseColorPropertyName: String = "BaseColor";
private var oldColor: Color;

function Start () {
	oldColor = renderer.material.color;
}

function Update () {
}

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

