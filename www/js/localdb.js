var DBIonicnew = [];
const ID = "ID";
const Mobile = "MOBILE";
const IPADRS = "IPADRS";
const DBIONICNEW = "dbionicnew";
const PATMRNO = "PATMRNO";
const PATNAME="PATNAME";
const EMAIL="EMAIL";
function insertUserDetails(mobile, ipadrs,PATMRNO,PATNAME,email) {
    if (userExists(mobile, PATNAME,PATMRNO,email)) {
        return;
    }
 if (localStorage.getItem(DBIONICNEW) !== null) {
            try{
        DBIonicnew = JSON.parse(localStorage.getItem(DBIONICNEW));
            }catch(error){}
        localStorage.id= DBIonicnew.length;
    }else{
      localStorage.id=0;
    }
    DBIonicnew.push({
        ID: DBIonicnew.length,
        MOBILE: mobile === undefined ? "" : mobile,
        IPADRS: ipadrs === undefined ? "" : ipadrs,
        PATMRNO: PATMRNO == undefined ? "" : PATMRNO,
        PATNAME: PATNAME == undefined ? "" : PATNAME,
       EMAIL : EMAIL == undefined ? "" :email
    });
    setUserDetails(DBIonicnew);
}

function setUserDetails(DBIonicnew) {
     localStorage.setItem(DBIONICNEW, JSON.stringify(DBIonicnew));
}
function getUserDetails() {
    var DBIonicnew = [];
    if (localStorage.getItem(DBIONICNEW) !== null) {
        DBIonicnew = JSON.parse(localStorage.getItem(DBIONICNEW));
    }
    return DBIonicnew;
}

function getUserDetailsById(id) {
    var DBIonicnew = getUserDetails();
    var user = DBIonicnew[id];
    return user;
}

function updateUserDetails(id, mobile, ipadrs,cloudGroupHospId,cloudHospDetails,MRNO,PATNAME,hospname) {
    var DBIonicnew = getUserDetails();
    DBIonicnew[id][HOSPNAME] = hospname;
    DBIonicnew[id][MOBILE] = mobile;
    DBIonicnew[id][IPADRS] = ipadrs;
    DBIonicnew[id][CLOUDGROUPHOSPID] = cloudGroupHospId;
    DBIonicnew[id][CLOUDHOSPDETAILS] = cloudHospDetails;
    DBIonicnew[id][PATMRNO] = PATMRNO;
    DBIonicnew[id][PATNAME] = PATNAME;
    setUserDetails(DBIonicnew);

}

function deleteUserDetails(id) {
    debugger;
    var DBIonicnew = getUserDetails();
    DBIonicnew.splice(id,1);
    setUserDetails(DBIonicnew);
}

function userExists(mobile, patname,patmrno,email) {
    debugger;

    var isExist = false;
    try {
        if (localStorage.getItem(DBIONICNEW) !== null) {
            var arr = JSON.parse(localStorage.getItem(DBIONICNEW));
            for (var u = 0; u < arr.length; u++) {
                if (arr[u][PATNAME].toUpperCase() === patname.toUpperCase() &&
                        arr[u][MOBILE] === mobile && arr[u][PATMRNO] === patmrno && aar[u][EMAIL] === email) {
                    isExist = true;
                    break;
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return isExist;

}

function hospitalExists(hospname, username, ipadress) {
    debugger;

    var isExist = false;
    try {
        if (localStorage.getItem(DBIONICNEW) !== null) {
            var arr = JSON.parse(localStorage.getItem(DBIONICNEW));
            for (var u = 0; u < arr.length; u++) {
                if (arr[u][HOSPNAME].toUpperCase() === hospname.toUpperCase() &&
                        arr[u][USERNAME].toUpperCase() === username.toUpperCase() &&
                        arr[u][IPADDRESS].toUpperCase() === ipadress.toUpperCase()) {
                    isExist = true;
                    break;
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return isExist;

}