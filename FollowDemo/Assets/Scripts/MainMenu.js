var networkMaster:GameObject; // Prefab

private var instantiatedMaster:GameObject; //Prefab instancié
private var scriptStartNet:StartNetwork;

private var serverIP:String = "127.0.0.1";
private var serverPort:int = 25000;

function OnGUI()
{
	var menuSizeX:int = 460;
	var menuSizeY:int = 115;
	var menuPosX:float = 20;
	var menuPosY:float = Screen.height/2 - menuSizeY/2;
	var mainMenu = new Rect(menuPosX, menuPosY, menuSizeX, menuSizeY);
	var sizeButtonX:int = 250;
	var sizeButtonY:int = 30;
	
	//Le menu de base
	GUI.BeginGroup(mainMenu, "");
	GUI.Box(Rect(0,0,menuSizeX, menuSizeY), "");
	
	//La demande de champs d'ip pour rejoindre un serveur
	serverIP = GUI.TextField(new Rect(sizeButtonX + 30, 60, 120, 30), serverIP, 40);
	
	if(GUI.Button(Rect(10, 20, sizeButtonX, sizeButtonY), "Créer serveur"))
	{
		//Création du serveur
		instantiatedMaster = Instantiate(networkMaster, Vector3.zero, Quaternion.identity);
		scriptStartNet = instantiatedMaster.GetComponent("StartNetwork");
		scriptStartNet.server = true;
		scriptStartNet.listenPort = serverPort;
	}
	if(GUI.Button(Rect(10, 60, sizeButtonX, sizeButtonY), "Rejoindre serveur"))
	{
		//Rejoindre serveur
		instantiatedMaster = Instantiate(networkMaster, Vector3.zero, Quaternion.identity);
		scriptStartNet = instantiatedMaster.GetComponent("StartNetwork");
		scriptStartNet.server = false;
		scriptStartNet.remoteIP = serverIP;
		scriptStartNet.listenPort = serverPort;
	}
	GUI.EndGroup();
}