setchatinfo(list){
    // storage.setItem('chatlocalinfo', JSON.stringify(list[0].userid), event => {})
     let key = JSON.stringify('user'+list[0].userid);
     storage.getAllKeys(event => {
       if (event.result === 'success') {
         let list_two=[];
         let akey=0;//用于判断for循环中if条件是否成立，不成立怎for循环结束为0
         let bkey=0;
         // if (JSON.stringify(list)=='[]') {
         //   akey=1;
         // }
         for(let i=0;i<event.data.length;i++){
           if (event.data[i]=='chatlocalinfo') {
             bkey=1;
             storage.getItem('chatlocalinfo',e=>{
               let list_three=[];
               list_three=JSON.parse(e.data)
               let ckey=0;//解决重复插入
               for (let index = 0; index < list_three.length; index++) {
                 if (list_three[index]==list[0].userid) {
                   ckey=1;
                 }
               }
               if (ckey==0) {

                 modal.alert({
                   message: JSON.stringify(list_three),
                   okTitle: '确认'
                 }, function () {
                 });

                 list_three.push(list[0].userid);
                 storage.setItem('chatlocalinfo', JSON.stringify(list_three), event => {})
               }
               
             })
           }
           if (event.data[i]==key) {
             akey=1;
             storage.getItem(key, e => {
               list_two=JSON.parse(e.data);
               for (let index = 0; index < list.length; index++) {
                 list_two.push(list[index]);
               } 
               //this.chatInfo.push(list_two);
               modal.alert({
                 message: '这里读取了本地记录',
                 okTitle: '确认'
               }, function () {
               });
               storage.setItem(JSON.stringify('user'+list_two[0].userid), JSON.stringify(list_two), event => {})

             }); 
           }
         }
         if (akey==0) {
           //this.chatInfo.push(list); 
           list_two=list
           storage.setItem(JSON.stringify('user'+list_two[0].userid), JSON.stringify(list_two), event => {})
           modal.alert({
                 message: '这里是新的记录',
                 okTitle: '确认'
           }, function () {
           });
         };
         if (bkey==0) {
           
           let list_three=[];
           list_three.push(list[0].userid);
           // modal.alert({
           //       message: JSON.stringify(list_three),
           //       okTitle: '确认'
           //     }, function () {
           //     });
           storage.setItem('chatlocalinfo', JSON.stringify(list_three), event => {})
         }
          
       }
     })
   },