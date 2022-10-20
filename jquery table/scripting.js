var url = "https://onprem.boodskap.io/api";
var domain = "MIPPCMEXKG";
var api_key = "dcXxnjeNZwX9";
var path = domain + ":" + api_key;
var button = document.getElementById("click");
var submit = document.getElementById("sub");
var inputs = document.querySelectorAll(".form-control")
console.log(inputs)
submit.addEventListener("click", process);
var formupdate = document.getElementById("update");
var updatefirst = document.getElementById("ufirst-name");
var updatelast = document.getElementById("ulast-name");
var updatedob = document.getElementById("udob");
var createdby = document.getElementById("created-date")
var updatedept = document.getElementById("udept");
var updateyear = document.getElementById("uyear");
var updatebutton = document.getElementById("update");
var formbutton = document.getElementById("addstudent");
var del = document.getElementById("dltall");
var create = document.getElementById("created-time");
del.addEventListener('click', alldel);

// var hours = new Date().getHours();
// var minutes = new Date().getMinutes();
// var seconds = new Date().getSeconds();

// var year = new Date().getFullYear()
// var month = new Date().getMonth()
// var day = new Date().getDay()
// var date = year + "-" + month + "-" + day
// var time = year + "-" + month + "-" + day + "'T'" + hours + ":" + minutes + ":" + seconds
// console.log(time)

// $('input[name="daterange"]').daterangepicker();
function process() {
  console.log(typeof (new Date().getTime()));
  var time = JSON.stringify(new Date().getTime());
  console.log(typeof (time));


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
          createddate: moment(new Date().getTime()).format("YYYY-MM-DD"),
          createdtime: time,
          updated: "",
        };
        $.ajax({
          url: "https://onprem.boodskap.io/api/micro/service/mippcmexkg/stdData/InsertData",
          data: JSON.stringify(payload),
          type: "POST",
          headers: {
            "Content-Type": "application/json",
            "TOKEN": path,
          },
          success: function (response) {
            console.log(response)
            if (response.status == false) {
              Swal.fire(response.message)
            }
            // const Toast = Swal.mixin({
            //   toast: true,
            //   position: 'top-end',
            //   showConfirmButton: false,
            //   timer: 1000,
            //   timerProgressBar: true,
            //   didOpen: (toast) => {
            //     toast.addEventListener('mouseenter', Swal.stopTimer)
            //     toast.addEventListener('mouseleave', Swal.resumeTimer)
            //   }
            // })
            // Toast.fire({
            //   icon: 'success',
            //   title: 'Details added successfully'
            // })

            setTimeout(() => {
              document.location.reload();
            }, 1000);
          },
          error: function () {
            console.log("error");
          },
        });
      }
    }
  }
  else {
    Swal.fire("Please Fill all the neccessary fields")
  }
}
function calling() {

  const update = {
    query: "{\n\"size\":1000\n}",
    type: "RECORD",
    specId: 11312,
  };
  $.ajax({
    url: "https://onprem.boodskap.io/api/micro/service/mippcmexkg/stdData/ListData",
    method: "POST",
    type: "RECORD",
    headers: {
      'Content-Type': 'application/json',
      'TOKEN': path
    },
    data: JSON.stringify(update),
    success: function (response) {
      var x = response.hits.hits;
      console.log(response)
      $('#jtable').DataTable({
        data: x,
        columns: [
          { data: '_source.firstname' },
          { data: '_source.lastname' },
          { data: '_source.dob' },
          { data: '_source.department' },
          { data: '_source.year' },
          { data: '_source.createddate' },
          {
            data: '_source', "render": function (_source) {
              console.log(_source)
              return moment(parseInt(_source.createdtime)).format('h:mm:ss a')
            }
          },
          { data: '_source.updated' },
          {
            data: '_id', "render": function (_id) {
              console.log(_id);
              return '<button type="button" class="btn btn-info btn-sm" onclick="editing(\'' + _id + '\')" class="btn btn-primary" data-toggle="modal" data-target="#updateform"  data-whatever="@mdo">EDIT</button>'
            }
          },
          {
            data: '_id', "render": function (_id) {
              return '<button class="btn btn-outline-danger btn-sm" onclick="deleting(\'' + _id + '\')" > Delete</button >';
            }
          }
        ],
        "pageLength": 20,
      });
    },
    error: function () {
      alert("error");
    },
  })
}
calling();
function deleting(iden) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      const datadel = {
        "id": iden,
      };

      $.ajax({
        url: "https://onprem.boodskap.io/api/micro/service/mippcmexkg/stdData/DeleteData",
        method: "POST",
        type: "RECORD",
        data: JSON.stringify(datadel),
        headers: {
          'Content-Type': "application/json",
          'TOKEN': path
        },
        success: function (response) {
          console.log(response);
          setTimeout(() => {
            document.location.reload();
          }, 1500);
        },
        error: function () {
          alert("error");
        },
      })

    }
  })
}
function editing(iden) {
  var dataedit = {
    "id": iden
  }
  $.ajax({
    url: "https://onprem.boodskap.io/api/micro/service/mippcmexkg/stdData/EditData",
    method: "POST",
    type: "RECORD",
    data: JSON.stringify(dataedit),
    headers: {
      "Content-Type": "application/json",
      "TOKEN": path,
    },
    success: function (response) {
      console.log(response);
      var updatefirst = document.getElementById("ufirst-name");
      updatefirst.value = response[0].firstname
      var updatelast = document.getElementById("ulast-name");
      updatelast.value = response[0].lastname
      var updatedob = document.getElementById("udob");
      updatedob.value = response[0].dob
      var updatedept = document.getElementById("udept");
      updatedept.value = response[0].department
      var updateyear = document.getElementById("uyear");
      updateyear.value = response[0].year
      var createdby = document.getElementById("created-date");
      createdby.value = response[0].createddate;
      var create = document.getElementById("created-time");
      create.value = moment(parseInt(response[0].createdtime)).format('h:mm:ss a')
      updatebutton.setAttribute("onclick", "dataupdate('" + iden + "','" + response[0].createdtime + "')")
    },
    error: function () {
      alert("error");
    },
  })
}
function dataupdate(id, utime) {
  console.log(id)
  console.log(typeof (utime))
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // Swal.fire('Saved!', '', 'success')
      console.log(id)
      var payload = {
        rkey: id,
        firstname: updatefirst.value,
        lastname: updatelast.value,
        dob: updatedob.value,
        department: updatedept.value,
        year: updateyear.value,
        createddate: createdby.value,
        createdtime: utime,
        updated: moment().format('MMMM Do YYYY, h:mm:ss a'),
      };
      $.ajax({
        url: "https://onprem.boodskap.io/api/micro/service/mippcmexkg/stdData/UpdateData",
        data: JSON.stringify(payload),
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          "TOKEN": path,
        },
        success: function (response) {
          console.log(response)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          // if (response.status == false) {
          //   Swal.fire({
          //     position: 'center',
          //     icon: 'success',
          //     title: 'Your work has been saved',
          //     showConfirmButton: false,
          //     timer: 1000
          //   })

          // }
          // else {
          //   Swal.fire({
          //     position: 'center',
          //     icon: 'error',
          //     title: 'Name already exist',
          //     showConfirmButton: false,
          //     timer: 1000
          //   })

          // }

          setTimeout(() => {
            document.location.reload();
          }, 1500);
        },
        error: function () {
          alert("error");
        },
      });

    } else if (result.isDenied) {
      Swal.fire('Changes are not saved')
    }
  })
}

function alldel() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      fetch(
        "https://onprem.boodskap.io/api/record/clear/f8fc7569-e12b-4772-8953-54019ac22e8a/11312",
        {
          method: "DELETE",
        }
      )
        .then((res) => res.text())
        .then((res) => console.log(res));

      setTimeout(() => {
        document.location.reload();
      }, 500);
    } else if (

      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
      )
    }
  })
}




