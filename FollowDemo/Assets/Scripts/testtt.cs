using UnityEngine;
using System.Collections;
using MiddleVR_Unity3D;

public class testtt : MonoBehaviour {
	public GameObject impact;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

		RaycastHit hit;
		Debug.DrawLine(transform.position,transform.position+100*transform.forward,Color.red);

		if (Physics.Raycast (transform.position, transform.forward, out hit)) { //to work, add a mesh collider to Terrain
						impact.transform.position = hit.point;


						if (MiddleVR.VRDeviceMgr.IsWandButtonPressed (0)) {
				print ("shot");
								//Debug.DrawLine (transform.position, transform.position+10*transform.forward, Color.red, 2, false);
								//print(hit.collider);
								//Debug.DrawLine (transform.position, hit.point, Color.blue);
								//hit.collider.renderer.enabled = false;
								if (hit.collider.gameObject.name != "terrain")
								Network.Destroy (hit.collider.gameObject);
						}
				} else {
						// viseur
				
				impact.transform.position =transform.position+1000*transform.forward;
				}
	}


}

