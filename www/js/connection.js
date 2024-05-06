/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    if (localStorage.adduser === '1') {
        localStorage.removeItem('adduser');
        getloginviews(localStorage.appurl);
    } else {
    try{
        createdblogin();
    }catch(err){
    getloginviews(localStorage.appurl);
    }
    }
});
function getloginviews(apppath) {
    var myehr = localStorage.myehr;
    var path = localStorage.appurl + "/admin/LoginViews.jsp";
   // $.ajax({
     //   url: localStorage.appurl + "/admin/LoginViews.jsp?myehr=" + myehr,
     //   type: "GET",
     //   dataType: 'json',
     //   success: function (responseJson) {
      $.post(path,{myehr:myehr}, function (responseJson) {
          debugger;
            try {
                SpinnerDialog.hide();
            } catch (err) {

            }
            if (responseJson.length > 0) {
                var forms = groupByMultiple(responseJson, function (item)
                {
                    return [item.FORMNAME];
                });
                var displaytypes = groupByMultiple(responseJson, function (item)
                {
                    return [item.DISPLAYTYPE, item.FORMNAME];
                });
                fillViews(JSON.stringify(forms), JSON.stringify(displaytypes));
            } else {
                location.href = localStorage.newapppage;
            }
//        },
//        error: function (jqXHR, exception) {
//            debugger;
//            try {
//                SpinnerDialog.hide();
//            } catch (err) {
//
//            }
//            var msg = '';
//            if (jqXHR.status === 0) {
//                msg = 'Not connect.\n Verify Network.';
//            } else if (jqXHR.status == 404) {
//                msg = 'Requested page not found. [404]';
//            } else if (jqXHR.status == 500) {
//                msg = 'Internal Server Error [500].';
//            } else if (exception === 'parsererror') {
//                msg = 'Requested JSON parse failed.';
//            } else if (exception === 'timeout') {
//                msg = 'Time out error.';
//            } else if (exception === 'abort') {
//                msg = 'Ajax request aborted.';
//            } else {
//                msg = 'Uncaught Error.\n' + jqXHR.responseText;
//            }
//            // alert(msg);
//            location.href = localStorage.newapppage;
//        }

    });
}
function groupByMultiple(array, f)
{
    var groups = {};
    array.forEach(function (o)
    {
//      console.log(o);
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group)
    {
        return groups[group];
    })
}
function fillViews(forms, displaytypes) {
 debugger;
    var appName = localStorage.appname;
    var url = localStorage.appurl + '/admin/LoginFrameWorkScreen.jsp';
    $.post(url,{forms:forms,displaytypes:displaytypes,appName:appName}, function (data) {
        debugger;
        $('#data').hide();
        $('#data').html(data);
        setTimeout($('#data').show(), 350);
        if (localStorage.appname === "fernandez") {
            debugger;
            $('.lblsptalnm').html("Fernandez Healthcare");
        } else {
            $('.lblsptalnm').html(localStorage.appname);
        }

        if (localStorage.myehr === "1") {
            $('#btnConnection').show();
        } else {
            $('#btnConnection').hide();

        }
    });
var appName = localStorage.appname;
    $.ajax({
        url: localStorage.appurl + '/admin/LoginFrameWorkScreen.jsp',
        type: 'post',
        data: "forms=" + forms + "&displaytypes=" + displaytypes + "&appName=" + appName,
        success: function (data) {
            $('#data').html(data);

            if (localStorage.appname === "fernandez") {
                debugger;
                $('.lblsptalnm').html("Fernandez Healthcare");
            } else if (localStorage.appname === "ujalacygnus") {
                debugger;
                $('.lblsptalnm').html("Ujala Cygnus Hospitals");
            } else if (localStorage.appname === "shl") {
                debugger;
                $('.lblsptalnm').html("Sahyadri Hospitals");
            }else if (localStorage.appname === "sdrc") {
                debugger;
                $('.lblsptalnm').html("SDRC");
            }else if (localStorage.appname === "bagh") {
                debugger;
                $('.lblsptalnm').html("BAGH");
            } else {
                $('.lblsptalnm').html(localStorage.appname);
            }
            if (localStorage.myehr === "1") {
                $('#btnConnection').show();
            } else {
                $('#btnConnection').hide();
            }
        }
    });
}
function createdblogin()
{
    debugger;
//     alert("createdb");
try{
    var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
    db.transaction(populateDBLogin, errorCB, successCB);
    //db.transaction(populateDB,errorCB,successCB);
}catch(err){
 getloginviews(localStorage.appurl);
}

}
function errorCB(err)
{
    debugger;
//    if(err.code=="0"){
//    if(localStorage.nointernet=="1"){
//    localStorage.nointernet="0";
//    alert("No Internet Connection.");
//    }
  // location.href="app.html";
//    }
    // alert("Error processing SQL" + err.code);
}
function errorCBpat(err)
{
    getloginviews(localStorage.appurl);
}

function successCB()
{
    debugger;
    //  alert("Success!");
}


function populateDBLogin(tx)
{

    tx.executeSql('CREATE TABLE IF NOT EXISTS  PatSignUpNew(pid INTEGER PRIMARY KEY AUTOINCREMENT,patname TEXT,patmobile TEXT,patemail TEXT,patuid TEXT,patpwd TEXT,patlogintype TEXT ,patloginurl TEXT,webformid TEXT )');
    tx.executeSql('SELECT * FROM    PatSignUpNew ', [], patquerrySuccessMultiple, errorCB);


}

function patquerrySuccessMultiple(tx, results)
{

    debugger;
    //patname TEXT,patmobile TEXT,patemail TEXT,patuid TEXT,patpwd TEXT,patlogintype
    var len = results.rows.length;
    try {
        SpinnerDialog.hide();
    } catch (err) {

    }
    if (len === 0) {
        tx.executeSql('SELECT * FROM    PatSignUp ', [], patquerrySuccessMultiplenew, errorCBpat);
        // alert("count of records"+len);

    } else if (len === 1) {
        try {
            localStorage.patmrno = results.rows[0].patuid;
            localStorage.appwebformid = results.rows[0].webformid;
        } catch (err) {

        }
        location.href = 'PatientLoginThirdScreen.html';
    } else if (len > 1) {
        location.href = 'addusersvf.html';
    }

}
function patquerrySuccessMultiplenew(tx, results)
{

    debugger;
    //patname TEXT,patmobile TEXT,patemail TEXT,patuid TEXT,patpwd TEXT,patlogintype
    var len = results.rows.length;
//alert('patname'+len);
    if (len === 0) {
        debugger;
        // alert("count of records"+len);
        getloginviews(localStorage.appurl);

    } else {
        debugger;
        for (var i = 0; i < len; i++) {
            tx.executeSql(
                    'INSERT INTO patSignUpNew(patname,patmobile,patemail,patuid,patpwd,patlogintype,patloginurl,webformid) VALUES (?,?,?,?,?,?,?,?)', [
                        results.rows[i].patname, results.rows[i].patmobile, results.rows[i].patemail, results.rows[i].patuid, results.rows[i].patpwd, results.rows[i].patlogintype, results.rows[i].patloginurl, ''
                    ]);
        }
        createdblogin();
    }

}


