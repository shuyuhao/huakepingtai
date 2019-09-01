

var Koa = require('koa');
//var url = require('url');
var router = require('koa-router')();
var Db=require('./js/db');
var bodyParser = require('koa-bodyparser');

var app=new Koa();

var result = {
    //"status": "200",
    //"message": "success", 
};

app.use(bodyParser());

router.use(async (ctx,next)=>{
    //console.log(ctx.request.header.host)
    //console.log(ctx.request.body)
    if (ctx.url=='/chat') {
        console.log(ctx.request.body)
    }
    if(ctx.url=='/login'||ctx.url=='/posttext'||ctx.url=='/postcomment'||ctx.url=='/postdianzanshoucang'||ctx.url=='/follow'||ctx.url=='/chat'||ctx.url=='/postchat'){
        var findresult=await Db.find(ctx.request.body.userid);
        //console.log(findresult)
        var findresult_id=JSON.parse(JSON.stringify(findresult))['0'].password;
        if (ctx.request.body.password==findresult_id) {
            if (ctx.url=='/login') {
                findresult=JSON.parse(JSON.stringify(findresult));
                //console.log(findresult)
                ctx.body=findresult;
                //console.log(findresult);
                console.log('登陆成功1');
                return;
            }
            await next();
        }else{
            //ctx.body={'code':'1'}
            return;
        }
    }else{
        await next();
    }
})


router.get('/',async (ctx)=>{

    console.time('start0'),
    console.log('被客户端请求数据'),
    this.result=await Db.find('1957672837'),
    ctx.body=this.result,
    //console.log(this.result),
    console.timeEnd('start0')

})

router.get('/posts',async (ctx)=>{

    //console.time('start0'),
    //console.log('被客户端请求数据');
    let result=[];
    let postsinfo=JSON.parse(JSON.stringify(await Db.findPosts()));
    let label = JSON.parse(JSON.stringify(await Db.findLabelPost()));
    //console.log(postsinfo);
    //console.log(label);
    for (let index = 0; index <8&&postsinfo.length; index++) {
        let postsresult=[];
        for (let index_a = 0; index_a < label.length; index_a++) {
            if (postsinfo[postsinfo.length-1-index].postid==label[index_a].postid) {
                postsresult.push({"labelid":label[index_a].labelid,"labelname":label[index_a].labelname});
                
            };   
        };
        //console.log(postsresult)
        postsinfo[postsinfo.length-1-index]["labelid"]=JSON.stringify(postsresult)
            //console.log(postsinfo[index]["labelid"]);
        result.push(postsinfo[postsinfo.length-1-index]);
        
    }
    ctx.body=result
    //console.log(result),
    //console.timeEnd('start0')

})

router.get('/news',async (ctx)=>{


    console.time('start3'),
    console.log('被客户端请求数据'),
    this.result=JSON.stringify(await Db.find('2706004418')),
    this.result=JSON.parse(this.result),
    //console.log(this.result['0'].password),
    ctx.body=this.result,
    //console.log(this.result),
    console.timeEnd('start3')
})

router.get('/label',async (ctx)=>{

    let result;
    console.time('start3'),
    console.log('被客户端请求数据'),
    result=JSON.parse(JSON.stringify(await Db.findLabel()));
    ctx.body=result,
    //console.log(result),
    console.timeEnd('start3')
})


router.post('/login',async (ctx)=>{
    console.log('登陆成功');
})

router.post('/getuserposts',async (ctx)=>{
    //console.log(ctx.request.body.userid);
    let result=JSON.parse(JSON.stringify(await Db.findUserPosts(ctx.request.body.userid)));
    ctx.body=result;
    //console.log(result);
})

router.post('/getcollectionposts',async (ctx)=>{
    //console.log(ctx.request.body.userid);
    let result=JSON.parse(JSON.stringify(await Db.findUserCollectionPosts(ctx.request.body.userid)));
    ctx.body=result;
    //console.log(result);
})

router.post('/getfollow',async (ctx)=>{
    //console.log(ctx.request.body.userid);
    let result=JSON.parse(JSON.stringify(await Db.findFollowUser(ctx.request.body.userid)));
    ctx.body=result;
    //console.log(result);
})

router.post('/follow',async (ctx)=>{
    //console.log(ctx.request.body);
    let result = JSON.stringify(await Db.findFollow(ctx.request.body.userid,ctx.request.body.followedid));
    console.log(result);
    if(result == "[]"){
        console.log('为空');
        ctx.body={"code":"2002"};  
        await Db.insertFollow(ctx.request.body.userid,ctx.request.body.followedid);
    }else{
        console.log('不为空');
        ctx.body={"code":"2000"};
    };
    //ctx.body=result;
    //console.log(result);
})


router.post('/posttext',async (ctx)=>{
    
    //console.log(ctx.request.body);
    let postid=await Db.insertText(ctx.request.body.userid,ctx.request.body.title,ctx.request.body.txt);
    postid =JSON.parse(JSON.stringify(postid)).insertId;
    //console.log(JSON.parse(ctx.request.body.labelid)[0].label);
    for (let index = 0; index < JSON.parse(ctx.request.body.labelid).length; index++) {
        await Db.insertLabelPost(postid,JSON.parse(ctx.request.body.labelid)[index].label);
    }
    //JSON.parse(ctx.request.body.labelid)[index].labelid
    //console.log(JSON.parse(ctx.request.body.labelid)[0].labelid);
    ctx.body={postid};
    //console.log(postid);
    console.log('上传成功');
})

router.post('/postcomment',async (ctx)=>{
    //console.log(ctx.request.body);
    await Db.insertComment(ctx.request.body.postid,ctx.request.body.userid,ctx.request.body.txt,0)
    ctx.body={"code":"000"};
})

router.post('/chat',async (ctx)=>{
    let result = JSON.parse(JSON.stringify(await Db.findChat(ctx.request.body.userid)))
    // if (JSON.result(result) == "[]") {
    //     ctx.body= 
    // }
    await Db.updateChat(ctx.request.body.userid);

    console.log(result)
    ctx.body=result;
})

router.post('/postchat',async (ctx)=>{
    //let result = JSON.parse(JSON.stringify(await Db.findChat(ctx.request.body.userid)))
    // if (JSON.result(result) == "[]") {
    //     ctx.body= 
    // }
    console.log(ctx.request.body)
    let result = JSON.parse(JSON.stringify(await Db.insertChat(ctx.request.body.userid,ctx.request.body.touserid,ctx.request.body.txt)));

    console.log({'chatid':result.insertId,'txt':ctx.request.body.txt})
    ctx.body={'chatid':result.insertId,'txt':ctx.request.body.txt};
})

router.post('/comment',async (ctx)=>{

    console.log(ctx.request.body)
    let result = JSON.parse(JSON.stringify(await Db.findComment(ctx.request.body.postid)));

    console.log(result)
    ctx.body=result;
})

router.post('/postdianzanshoucang',async (ctx)=>{
    //console.log(ctx.request.body);
    let findresult;
    if (ctx.request.body.akey=='dianzanadd') {
        findresult = await Db.findFabulous(ctx.request.body.postid,ctx.request.body.userid)
        if(JSON.parse(JSON.stringify(findresult))[0]!=null){
            ctx.body={"code":"300"}
        }else{
            await Db.insertFabulous(ctx.request.body.postid,ctx.request.body.userid);
            ctx.body={"code":"201"}
        }
    }else if(ctx.request.body.akey=='dianzandelect'){
        findresult = await Db.findFabulous(ctx.request.body.postid,ctx.request.body.userid)
        await Db.delectFabulous(JSON.parse(JSON.stringify(findresult))[0].fabulousid)
        ctx.body={"code":"500"}
    }else if(ctx.request.body.akey=='shoucanadd'){
        findresult = await Db.findCollection(ctx.request.body.postid,ctx.request.body.userid)
        if(JSON.parse(JSON.stringify(findresult))[0]!=null){
            ctx.body={"code":"400"}
        }else{
            await Db.insertCollection(ctx.request.body.postid,ctx.request.body.userid);
            ctx.body={"code":"202"}
        }
    }else if(ctx.request.body.akey=='shoucandelect'){
        findresult = await Db.findCollection(ctx.request.body.postid,ctx.request.body.userid)
        await Db.delectCollection(JSON.parse(JSON.stringify(findresult))[0].collectionid)
        ctx.body={"code":"600"}
    }else{
        ctx.body={"code":"000"};
    }
    //console.log(findresult);
    
})


router.post('/register',async (ctx)=>{

    //原生nodejs 在koa中获取表单提交的数据
    //console.log(ctx.request.body.username);
    console.time('start2'),
    console.log('被客户端请求数据');
    var id=Math.floor(Math.random()*10000000000);
    //id=3538552601;
    var userid=''+id;
    //console.log(userid);
    //var dbfind=JSON.stringify(await Db.find(userid));
    while(id==0||JSON.parse(JSON.stringify(await Db.find(userid)))['0']!=null) { // 死循环，一直的执行while语句
        id=Math.floor(Math.random()*10000000000);
        userid=''+id;
    //    dbfind=JSON.stringify(await Db.find(userid));          
    }
    //console.log(userid);
    await Db.insertUser(userid,ctx.request.body.username,ctx.request.body.password),
    //console.log(await Db.find(userid)),
    ctx.body=await Db.find(userid),
    console.timeEnd('start2')
})

router.post('/foundposts',async (ctx)=>{

    let result=[];
    let postsinfo=JSON.parse(JSON.stringify(await Db.findlabelOnePosts(ctx.request.body.labelid)));
    // console.log(postsinfo);
    let label = JSON.parse(JSON.stringify(await Db.findLabelPost()));

    for (let index = 0; index <postsinfo.length; index++) {
        let postsresult=[];
        for (let index_a = 0; index_a < label.length; index_a++) {
            if (postsinfo[postsinfo.length-1-index].postid==label[index_a].postid) {
                postsresult.push({"labelid":label[index_a].labelid,"labelname":label[index_a].labelname});
                
            };   
        };

        postsinfo[postsinfo.length-1-index]["labelid"]=JSON.stringify(postsresult)

        result.push(postsinfo[postsinfo.length-1-index]);
        
    }
    console.log(result);
    ctx.body=result

})



app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(8989);
