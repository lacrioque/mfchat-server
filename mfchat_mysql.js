var mysql = include('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mfchat_server',
  password : 'mfchat_server_user',
  database : 'mfchat_server'
});

var nodeSql = require('nodesql');
var db = nodeSql.createMySqlStrategy(connection);

var dbUser = {
/*
 *Construction of the standart Database:
 * user (uid,name,surname,tel, information, ugid, soft_delete) 
 * standardUser should have gid=1
 */
    show_user : function(){
        var query = "SELECT uid,name,surname,tel,information FROM users WHERE soft_delete<>0";
        db.query(query, function(err,data){
           if(!err){
               return data;
           } 
        });
    },
    newUser: function(name,surname,tel,information,gid){
        gid = gid === undefined ? 1 : gid;
        var query = "INSERT INTO users (name,surname,tel,information,gid) VALUES('"+name+"','"+surname+"','"+tel+"','"+information+"','"+gid+"')";
        db.query(query,function(err,newUID){
            return !err ? newUID : false;
        });
    },
    getUidFromName : function(name,surname){
        var query = "SELECT uid FROM users, WHERE name='"+name+"' AND surname='"+surname+"' AND soft_delete<>0";
        db.query(query,function(err,data){
            if(!err){
                return data;
            }
        });
    },
    show_usergroups : function(id){
             var ugids =  dbUserGroups.getUserGroups(id);
             var groupNames = {};
             for(var i=0;i<ugid.length;i++){
                groupNames[ugids[i]] =  groups.getGroupName(ugids[i]);
             }
             return groupNames;
    },
    edit_user_name : function(name,id){
        var query = "UPDATE users SET name='" + name + "' WHERE uid="+id;
        db.query(query, function(err,rows){
            return !err ? true : false;
        });
    },
    edit_user_surname : function(surname,id){
        var query = "UPDATE users SET surname='" + surname + "' WHERE uid="+id;
        db.query(query, function(err,rows){
            return !err ? true : false;
        });
    },
    edit_user_information : function(information,id){
        var query = "UPDATE users SET information='" + information + "' WHERE uid="+id;
        db.query(query, function(err,rows){
            return !err ? true : false;
        });
    },
    edit_user_tel : function(tel,id){
        var query = "UPDATE users SET tel='" + tel + "' WHERE uid="+id;
        db.query(query, function(err,rows){
            return !err ? true : false;
        });
    }
};

var dbUserGroups = {
/*
 *Construction of the standart Database:
 * user_groups (ugid,uid,gid) 
 */
    getUserGroups : function(id){
        var query = "SELECT gid FROM user_groups WHERE uid='"+id+"'";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    getGroupUsers : function(id){
        var query = "SELECT uid FROM user_groups WHERE gid='"+id+"'";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    addUserToGroup: function(uid,gid){
        var query = "INSERT INTO user_groups COLUMS(uid,gid) VALUES('"+uid+"','"+gid+"')";
        db.query(query,function(err,data){
            return !err ? true : false;
        });
    }
};

var dbGroups = {
/*
 *Construction of the standart Database:
 * groups (gid,name,description,admin_uid,soft_delete) 
 * base user group => 1
 *          -> gid = 1, name = user , description = base-user , admin_uid = NULL
 */ 
    getGroupName: function(id){
        var query = "SELECT name FROM groups WHERE gid='"+id+"' AND soft_delete=0";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    getGroupInfo: function(id){
        var query = "SELECT name,description FROM groups WHERE gid='"+id+"' AND soft_delete<>0";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    getGroups: function(){
        var query = "SELECT g.name as group_name,g.description as group_description, u.name as admin_name,u.surname as admin_surname FROM groups g JOIN users u ON g.admin_uid = u.uid WHERE soft_delete<>0";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    editGroupDescription : function(description,id){
        var query = "UPDATE groups SET description='"+description+"' WHERE gid='"+id+"'";
        db.query(query, function(err,data){
            return !err ? true : false;
        });
    },
    editGroupName : function(name,id){
        var query = "UPDATE groups SET name='"+name+"' WHERE gid='"+id+"'";
        db.query(query, function(err,data){
            return !err ? true : false;
        });
    },
    newGroup: function(name,description,admin_uid){
        admin_uid = admin_uid===undefined ? 'NULL' : admin_uid;
        var query = "INSERT INTO groups (name,description,admin_uid) VALUES('"+name+"','"+description+"','"+admin_uid+"')";
        db.query(query,function(err,newID){
           if(!err){
               return newID;
           } 
        });
    }
};

var dbMessaging = {
/*
 *Construction of the standart Database:
 * messages (mid,text,subject,sender_uid,recipient_uid, recipient_gid, time_of_send, soft_delete) 
 * base user group => 1
 *          -> gid = 1, name = user , description = base-user , admin_uid = NULL
 */ 
    newMessage: function(text,subject,sender_uid,recipient_uid, recipient_gid){
        recipient_uid = recipient_uid === undefined ? 'NULL' : recipient_uid;
        recipient_gid = recipient_gid === undefined ? 'NULL' : recipient_gid;
        var query = "INSERT INTO messages (text,subject,sender_uid,recipient_uid,recipient_gid) VALUES('"+text+"','"+subject+"','"+sender_uid+"','"+recipient_uid+"','"+recipient_gid+"')";
        db.query(query, function(err,newMID){
            if(!err){
                return newMID;
            }
        });
    },
    getMessagesBySender: function(sender_uid){
        var query = "SELECT text,subject,time_of_send,recipient_uid,recipient_gid FROM messages WHERE sender_uid='"+sender_uid+"' AND soft_delete<>1";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    getNewMessagesByTime: function(from, to){
        var query = "SELECT text,subject,time_of_send,recipient_uid,recipient_gid FROM messages WHERE time_of_send BETWEEN "+from+" AND "+to+" AND soft_delete<>1";
        db.query(query, function(err,data){
           if(!err){
               return data;
           } 
        });
    },
    getMessagesByRecipientGroup: function(gid){
        var query = "SELECT text,subject,time_of_send,recipient_uid,recipient_gid FROM messages WHERE recipient_gid='"+gid+"' AND soft_delete<>1";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    },
    getMessagesByRecipientUser: function(uid){
        var query = "SELECT text,subject,time_of_send,recipient_uid,recipient_gid FROM messages WHERE recipient_uid='"+uid+"' AND soft_delete<>1";
        db.query(query, function(err,data){
            if(!err){
                return data;
            }
        });
    }
};

var dbConnection = {
    newConnect: function(uid,type){
        var query = "INSERT INTO connections (type_of_connect, uid) VALUES ('"+type+"','"+uid+"')";
        db.query(query, function(err,newCID){
            if(!err){
                return newCID;
            }
        });
    },
    lastLogin: function(uid){
        var query="SELECT * FROM connections ORDER BY time_of_connect DESC";
        db.query(query,function(err,data){
            if(!err){
                return data[0];
            }
        });
    }
};

var dbRoles = {
    getRoles : function(){
        var query = "SELECT * FROM roles";
        db.query(query,function(err,data){
            if(!err){
                return data;
            }
        });
    }
};
