#pragma strict

var player : GameObject;

function Start () {

}

function Update () {
	transform.position = new Vector3(Mathf.Clamp(player.transform.position.x,0.45,4),transform.position.y,transform.position.z);
}