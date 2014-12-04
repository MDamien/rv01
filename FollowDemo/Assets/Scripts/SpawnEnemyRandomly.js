#pragma strict

var enemyPrefab : GameObject;
var timeBeforeNextSpawn : float = 3;
var GLOBALS: GameObject;

//Number of enemies on the map
var maxEnemyCount : int = 15;
var enemyCount : int = 0;

//Keeping tracks of last spawn
private var timeSinceLastSpawn : float = 0.0;

function Start () {
if(GLOBALS.GetComponent(globals).isDriver)spawnEnemy();
}

function Update () {
if(GLOBALS.GetComponent(globals).isDriver)
{
	timeSinceLastSpawn += Time.deltaTime;
	//Debug.Log(timeSinceLastSpawn);
	if(timeSinceLastSpawn >= timeBeforeNextSpawn && enemyCount < maxEnemyCount) {
		spawnEnemy();
		timeSinceLastSpawn = 0.0;
	}
}
}

function spawnEnemy() {
	//Debug.Log("Spawning !");
	
	//Creating new position for random spot to spawn from (based on terrain's transform)
	var newPosition = transform.position;
	
	newPosition.x += Random.Range(transform.gameObject.renderer.bounds.min.x, transform.gameObject.renderer.bounds.max.x);
	newPosition.z += Random.Range(transform.gameObject.renderer.bounds.min.z, transform.gameObject.renderer.bounds.max.z);
	
	var newRotation = transform.rotation;
	newRotation.x = 0;
	
	var hit : RaycastHit;
	if (Physics.Raycast (newPosition, Vector3.up, hit)) { //Spawned under the floor
		newPosition.y = hit.point.y + 20.0;
	}	

	var instance : GameObject = Network.Instantiate(enemyPrefab, newPosition, newRotation, 42);
	instance.transform.eulerAngles = new Vector3(30, 30, 30);
	
	enemyCount++;
}