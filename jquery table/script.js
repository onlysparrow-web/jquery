// fetch('https://onprem.boodskap.io/api/record/get/8c69e71e-37a9-40a1-91c1-d3576727ad25/1312/add6c847-7e71-4f29-8d9d-53834f5054f4')
//     .then(response => response.json())
//     .catch(err => console.log(err))
var submit = document.getElementById("sub");
submit.addEventListener("click", process);


function process() {
  var FirstName = document.getElementById("first-name").value;
  var LastName = document.getElementById("last-name").value;
  var Dob = document.getElementById("dob").value;
  var Department = document.getElementById("dept").value;
  var Year = document.getElementById("year").value;
  if (FirstName != "" && LastName != "") {
    if (Dob != "" && Department != "") {
      if (Year != "") {
        var payload = {
          firstname: FirstName,
          lastname: LastName,
          dob: Dob,
          department: Department,
          year: Year,
        };
        $.ajax({
          url: "https://onprem.boodskap.io/api/record/insert/dynamic/eef3d182-fbe6-4b94-ab64-c28e3b85bb4c/11312",
          data: JSON.stringify(payload),
          type: "POST",
          contentType: "text/plain",
          success: function (response) {

          },
          error: function () {
            alert("error");
          },
        });
        // setTimeout(() => {
        //   document.location.reload();
        // }, 1000);
      }
    }
  }
}

// function process() {
//     var FirstName = document.getElementById("fname").value;
//     var LastName = document.getElementById("lname").value;
//     var Dob = document.getElementById("dob").value;
//     var Department = document.getElementById("dept").value;
//     var Year = document.getElementById("year").value;
//     if (FirstName != "" && LastName != "") {
//         if (Dob != "" && Department != "") {
//             if (Year != "") {
//                 var payload = {
                    // "firstname": FirstName,
                    // "lastname": LastName,
                    // "dob": Dob,
                    // "department": Department,
                    // "year": Year
//                 };
//                 var client;
//                 var topic = "/MIPPCMEXKG/device/1212/msgs/acer/ubuntu/11312"
//                 var clientId = "DEV_1212";
//                 var message = new Paho.MQTT.Message(JSON.stringify(payload));
//                 console.log(message)
//                 message.destinationName = topic;
//                 message.qos = 1;
//                 client = new Paho.MQTT.Client("192.168.0.121", Number(8083), "/mqtt", clientId);
//                 // Called when the connection is made
//                 function onConnect() {
//                     console.log("Connected!");
//                     client.send(message);
//                 }
//                 client.connect({
//                     onSuccess: onConnect,
//                     userName: "DEV_MIPPCMEXKG",
//                     password: "dcXxnjeNZwX9"
//                 });
//             }
//         }
//     }
// }
