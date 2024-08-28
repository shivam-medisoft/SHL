var DBIonicnew = [];
const ID = "ID";
const Mobile = "MOBILE";
const IPADRS = "IPADRS";
const DBIONICNEW = "dbionicnew";
const PATMRNO = "PATMRNO";
const PATNAME="PATNAME";
const EMAIL="EMAIL"
function insertUserDetails(hospname, ipadrs, cloudGroupHospId,cloudHospDetails,PATMRNO,PATNAME,mobile,careimg,printpath,groupmrno,outside) {
    if (userExists(mobile, ipadrs, hospname,PATMRNO,careimg)) {
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
        HOSPNAME: hospname === undefined ? "" : hospname,
        MOBILE: mobile === undefined ? "" : mobile,
        IPADRS: ipadrs === undefined ? "" : ipadrs,
        CLOUDGROUPHOSPID: cloudGroupHospId == undefined ? "" : cloudGroupHospId,
        CLOUDHOSPDETAILS: cloudHospDetails == undefined ? "" : cloudHospDetails,
        PATMRNO: PATMRNO == undefined ? "" : PATMRNO,
        PATNAME: PATNAME == undefined ? "" : PATNAME,
        CAREIMG: careimg == undefined ? "" : careimg,
        PRINTPATH: printpath == undefined ? "" : printpath,
        GROUPMRNO: groupmrno == undefined ? "" : groupmrno,
        OUTSIDE: outside == undefined ? "" : outside
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

function userExists(mobile, ipadress, hospname,mrno) {
    debugger;

    var isExist = false;
    try {
        if (localStorage.getItem(DBIONICNEW) !== null) {
            var arr = JSON.parse(localStorage.getItem(DBIONICNEW));
            for (var u = 0; u < arr.length; u++) {
                if (arr[u][HOSPNAME].toUpperCase() === hospname.toUpperCase() &&
                        arr[u][IPADDRESS].toUpperCase() === ipadress.toUpparCase &&
                        arr[u][MOBILE] === mobile && arr[u][PATMRNO] === mrno) {
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