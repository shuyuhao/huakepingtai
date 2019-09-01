

var mysql = require('mysql');

class Db{
    constructor(){
        this.dbClient='';
        this.connect();
    }
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    connect(){
        return new Promise((resolve,reject)=>{
            
            if(!this.dbClient){
                var db = mysql.createConnection({     
                    host     : 'localhost',       
                    user     : 'root',              
                    password : '123456',       
                    port: '3306',                   
                    database: 'biyeshejidb' 
                }); 
                db.connect();
                this.dbClient=db;
            }
            resolve(this.dbClient);
        }) 
    }

    find(id){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from user where userid=?',[id], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findLabel(){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from label', (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findLabelPost(){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from label join labelpost on label.labelid = labelpost.labelid;', (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findPosts(){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from posts', (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findlabelOnePosts(labelid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select posts.postid,posts.title,posts.txt,posts.userid,posts.postdate from posts join labelpost on posts.postid = labelpost.postid where labelpost.labelid=?;', [labelid],(err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findUserPosts(userid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from posts where userid=? order by postid desc',[userid],(err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findFabulous(postid,userid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from fabulous where postid=? and userid=?',[postid,userid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findCollection(postid,userid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from collection where postid=? and userid=?',[postid,userid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findUserCollectionPosts(userid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select posts.postid ,posts.title ,posts.txt ,posts.userid ,posts.postdate from posts join collection on posts.postid = collection.postid where collection.userid=?;',[userid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findFollowUser(userid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select user.userid ,user.username from user join relation on user.userid = relation.followeduserid where relation.followuserid=?;',[userid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findFollow(userid,followeduserid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select * from relation where followuserid=? and followeduserid=?;',[userid,followeduserid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }
    
    findChat(touserid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select chat.chatid,chat.userid,chat.txt,chat.chatdate,user.username from chat join user on chat.userid=user.userid where chat.touserid=? and chat.status=1 order by chat.userid;',[touserid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    findComment(postid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('select comment.commentid,comment.postid,comment.txt,comment.fathercomment,comment.userid,comment.commentdate,user.username from comment join user on user.userid = comment.userid where comment.postid=? ',[postid], (err, rows, fields)=> {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }
    

    insertUser(userid,username,password){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO user ( userid,username,password )VALUES( ?, ?, ? );',[userid,username,password], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertText(userid,title,txt){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO posts ( userid,title,txt,postdate )VALUES( ?, ?, ?, now() );',[userid,title,txt], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertLabelPost(postid,labelid){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('INSERT INTO labelpost ( postid,labelid )VALUES( ?, ?);',[postid,labelid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertComment(postid,userid,txt,fatherComment){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('INSERT INTO comment ( postid,txt,fathercomment,userid,commentdate )VALUES( ?, ?, ?, ?,now());',[postid,txt,fatherComment,userid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertCollection(postid,userid){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO collection  ( userid,postid)VALUES( ?, ?);',[userid,postid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertFabulous(postid,userid){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO fabulous  ( userid,postid)VALUES( ?, ?);',[userid,postid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    insertFollow(userid,followeduserid){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO relation ( followuserid, followeduserid ) VALUES (?,? );',[userid,followeduserid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                });
            })
        })
    }

    insertChat(userid,touserid,txt){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('INSERT INTO chat ( userid, touserid, txt, chatdate, status) VALUES (?,?,?,now(),1);',[userid,touserid,txt], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                });
            })
        })
    }

    updateChat(touserid){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('update chat set status=0 where touserid=?',[touserid], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    delectFabulous(id){
        return new Promise((resolve,reject)=>{
            
            this.connect().then((db)=>{
                db.query('DELETE FROM fabulous where fabulousid=?;',[id], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

    delectCollection(id){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.query('DELETE FROM collection where collectionid=?;',[id], function(err, rows, fields) {
                    if (err) {
                        reject(err)
                    }else{
                        //console.log(JSON.stringify(rows));
                        resolve(rows)
                    }
                    //console.log(JSON.stringify(rows));
                    //return  result.data=rows;
                });
            })
        })
    }

}

module.exports=Db.getInstance();

