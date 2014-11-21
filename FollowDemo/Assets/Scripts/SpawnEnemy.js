#pragma strict

var enemyPrefab : GameObject;

function Start () {
Debug.Log("Spawning !");
	var instance : GameObject = Instantiate(enemyPrefab, transform.position, transform.rotation);
	instance.transform.localScale = new Vector3(30, 30, 30);
}

function Update () {

}