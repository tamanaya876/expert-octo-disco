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
    
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

    function addRoom()
    {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
        purpose : "adding the room"
      })

      localStorage.setItem("room_name",room_name);
      window.location = "kwitter_page.html";
    }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log(Room_names);
       row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)'> #"+Room_names+"</div> <hr>";
       document.getElementById("output").innerHTML += row;
      });
    });
  }
getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}