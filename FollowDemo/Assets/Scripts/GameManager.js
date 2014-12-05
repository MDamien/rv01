#pragma strict

private var terrainSpawn: SpawnEnemyRandomly;
var GLOBALS: GameObject;

var timeBeforeNextSpawn : float = 3;

//Number of enemies on the map
var maxEnemyCount : int = 15;
private var enemyCount : int = 0;

//Keeping tracks of last spawn
private var timeSinceLastSpawn : float = 0.0;

function Start () {
if(GLOBALS.GetComponent(globals).isDriver)
	{
	var terrain:GameObject = GameObject.Find("Water");
	terrainSpawn = terrain.GetComponent("SpawnEnemyRandomly");
	     }
}

function Update () {
	if(GLOBALS.GetComponent(globals).isDriver)
	{
	timeSinceLastSpawn += Time.deltaTime;
	
	if(timeSinceLastSpawn >= timeBeforeNextSpawn && enemyCount < maxEnemyCount) {
		terrainSpawn.SpawnEnemy();
		enemyCount++;
		timeSinceLastSpawn = 0.0;
	}
	}
}