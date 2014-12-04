#pragma strict

var impact: GameObject;
private var lastEnemyFocused: GameObject = null;
private var lastEnemyController: EnemyController = null;

function Start () {

}

function Update () {
	var hit : RaycastHit;
	if (Physics.Raycast (transform.position, transform.forward, hit))
	{ //to work, add a mesh collider to Terrain
	
		ManageEnemyFocus(hit);
	
		impact.transform.position = hit.point;
		if(Input.GetMouseButtonDown(0))
		{
			//Debug.DrawLine (transform.position, transform.position+10*transform.forward, Color.red, 2, false);
			print(hit.collider);
			Debug.DrawLine (transform.position, hit.point, Color.blue);
			//hit.collider.renderer.enabled = false;
			if(hit.collider.gameObject.name != 'terrain')
				Network.Destroy(hit.collider.gameObject);
		}
	}
}

function ManageEnemyFocus(hit: RaycastHit)
{
	if(hit.collider.gameObject.tag == 'Enemy')
	{
		if(lastEnemyFocused == null)
		{
			lastEnemyFocused = hit.collider.gameObject;
			lastEnemyController = lastEnemyFocused.GetComponent("EnemyController");
			lastEnemyController.FocusBegan();			
		}
	}
	else if(lastEnemyFocused!= null)
	{
		lastEnemyController.FocusEnded();
		lastEnemyController = null;
		lastEnemyFocused = null;
	}
}