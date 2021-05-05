// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDqluI1CDmPJhFkRUTaUzujU58YtJD7QBg",
    authDomain: "aadityaghosh-wqs9.firebaseapp.com",
    databaseURL: "https://aadityaghosh-wqs9-default-rtdb.firebaseio.com",
    projectId: "aadityaghosh-wqs9",
    storageBucket: "aadityaghosh-wqs9.appspot.com",
    messagingSenderId: "181530844878",
    appId: "1:181530844878:web:def2443cbcc6d37c373a9f"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0
      })
      
      document.getElementById("msg").value = "";
}

function getData()
{
    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    row1 = "<h4>"+name+"<img class='user_tick' src='tick.png'> </h4>";
    row2 = "<h4 class='message_h4'>"+message+"</h4>";
    row3 = "<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
    row4 = "<span class='glyphicon glyphicon-thumbs-up'> like: "+like+"</span> </button> <hr>";
    row = row1 + row2 + row3 +row4;
    document.getElementById("output").innerHTML += row;
 } });  }); }
getData();

function updateLike(message_id)
{
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({ like : updated_likes });
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}