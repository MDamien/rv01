#pragma strict

var monsterPrefab : GameObject;

function Start () {
Debug.Log("Spawning !");
	var instance : GameObject = Instantiate(monsterPrefab, transform.position, transform.rotation);
	instance.transform.localScale = new Vector3(30, 30, 30);
}

function Update () {

}