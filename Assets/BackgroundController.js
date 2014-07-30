#pragma strict

var cameraObject : GameObject;

function Start () {

}

function Update () {
	transform.position = new Vector3(cameraObject.transform.position.x,cameraObject.transform.position.y,transform.position.z);
}