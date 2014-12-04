
var server:boolean;
var listenPort:int = 25000;
var remoteIP:String;
var GLOBALS: GameObject;

function Awake()
{
	DontDestroyOnLoad(this);
}

function Start () 
{
	if(server)
	{
		Network.InitializeServer(32, listenPort, false); //le false signifie qu'on utilise pas le Nat-punchtrough. Je vous recommande la doc d'Unity pour en savoir plus
		
		// On préviens tous nos objets que le réseau est lancé
		for (var go in FindObjectsOfType(GameObject))
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);
	}
	else
	{
		Network.Connect(remoteIP, listenPort);
	}
	GLOBALS.GetComponent(globals).isDriver = server;
	Application.LoadLevel("race");
}

function Update () {

}

function OnPlayerConnected(player: NetworkPlayer)
{
	if(server)
	{
		print("Connecté !");
	}
}

function OnLevelWasLoaded()
{
	if(Application.loadedLevelName == "menu")
			Destroy(this.gameObject);
	// Notify our objects that the level and the network are ready
	for (var go in FindObjectsOfType(GameObject))
		go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);
	
	if(!server)
		yield WaitForSeconds(3);
	
}
