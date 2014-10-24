#pragma strict

var impact: GameObject;

function Start () {

}

function Update () {

             
             
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, transform.forward, hit)) { //to work, add a mesh collider to Terrain
			impact.transform.position = hit.point;
			if(Input.GetMouseButtonDown(0))
			{
			//Debug.DrawLine (transform.position, transform.position+10*transform.forward, Color.red, 2, false);
			print(hit.collider);
			Debug.DrawLine (transform.position, hit.point, Color.blue);
			//hit.collider.renderer.enabled = false;
			if(hit.collider.gameObject.name != 'terrain')
				Destroy(hit.collider.gameObject);
		}
	}
}