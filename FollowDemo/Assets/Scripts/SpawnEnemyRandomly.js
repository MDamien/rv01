
#pragma strict
var enemyPrefab : GameObject;

var player: GameObject;

function Start () {
	
}

function Update () {

}

function SpawnEnemy() { SpawnEnemyEdgeMap(); return;
	//Debug.Log("Spawning !");
	
	//Creating new position for random spot to spawn from (based on terrain's transform)
	var newPosition = Vector3.zero;
	
	do {
		newPosition = transform.position;
		newPosition.x += Random.Range(transform.gameObject.renderer.bounds.min.x, transform.gameObject.renderer.bounds.max.x);
		newPosition.z += Random.Range(transform.gameObject.renderer.bounds.min.z, transform.gameObject.renderer.bounds.max.z);
	} while(Vector3.Distance(newPosition, player.transform.position) < 100 );
	
	
	//newPosition = player.transform.position + player.transform.forward*100;
	
	var newRotation = transform.rotation;
	newRotation.x = 0;
	
	var hit : RaycastHit;
	if (Physics.Raycast (newPosition, Vector3.up, hit)) { //Spawned under the floor
		newPosition.y = hit.point.y + 20.0;
	}

	var instance : GameObject = Instantiate(enemyPrefab, newPosition, newRotation);
	instance.transform.localScale = new Vector3(30, 30, 30);
}

function SpawnEnemyEdgeMap() {
	var newPosition = Vector3.zero;
	
	do {
		newPosition = transform.position;
		switch(Random.Range(0, 4))
		{
			case 1: //top
			newPosition.x += transform.gameObject.renderer.bounds.max.x;
			newPosition.z += Random.Range(transform.gameObject.renderer.bounds.min.z, transform.gameObject.renderer.bounds.max.z);
			break;
			
			case 2: //left
			newPosition.x += Random.Range(transform.gameObject.renderer.bounds.min.x, transform.gameObject.renderer.bounds.max.x);
			newPosition.z += transform.gameObject.renderer.bounds.max.z;
			break;
			
			case 3: //right
			newPosition.x += Random.Range(transform.gameObject.renderer.bounds.min.x, transform.gameObject.renderer.bounds.max.x);
			newPosition.z += transform.gameObject.renderer.bounds.min.z;
			break;
			
			case 0: //bottom
			newPosition.x += transform.gameObject.renderer.bounds.min.x;
			newPosition.z += Random.Range(transform.gameObject.renderer.bounds.min.z, transform.gameObject.renderer.bounds.max.z);
			break;
		}
	} while(Vector3.Distance(newPosition, player.transform.position) < 100 );
	
	var newRotation = transform.rotation;
	newRotation.x = 0;
	
	var hit : RaycastHit;
	if (Physics.Raycast (newPosition, Vector3.up, hit)) { //Spawned under the floor
		newPosition.y = hit.point.y + 20.0;
	}

	var instance : GameObject = Instantiate(enemyPrefab, newPosition, newRotation);
	instance.transform.localScale = new Vector3(30, 30, 30);
}