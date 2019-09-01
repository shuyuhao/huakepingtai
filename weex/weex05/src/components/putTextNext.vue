<template>
  <div class="wrapper">

    <div class="demo">
          <wxc-minibar title="请添加合适的标签"
                       background-color="#009ff0"
                       text-color="#3d3d3d"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="发布"></wxc-minibar>
    </div>

    <wxc-grid-select
      :limit="10"
      :list="testData"
      @overLimit="onOverLimit"
      @select="params => onSelect('res3', params)">
    </wxc-grid-select>

    <!-- <text class="res">{{res3}}</text>

    <div>
      <list>
            <cell v-for="item in user">
                <text>{{item}}</text>
            </cell>
            <cell v-for="item in list">
                <text>{{item['0'].username}}</text>
            </cell>
        </list>
    </div> -->
  </div>
</template>
<script>
  import { WxcGridSelect } from 'weex-ui';
  import { WxcMinibar } from 'weex-ui';
  import {IP} from '@/weex_ui/urlconfig.js';
  import VueEvent from '@/js/vueevent.js';
  import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
  const storage = weex.requireModule('storage');
  const stream = weex.requireModule('stream') || {};
  const modal = weex.requireModule('modal');
  


  export default {
    components: { WxcGridSelect,WxcMinibar},
    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON,
      user:[],
      textinfo:[],
      label:[],
      customStyles: {
        lineSpacing: '14px',
        width: '120px',
        height: '50px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        borderColor: '#666666',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      },
      testData: [],
      res3:'',
    }),
    created(){
      this.getlabel();
      this.getAll();
      this.getItem();
    },
    methods: {
      minibarLeftButtonClick () {
        this.$router.go(-1);
      },
      minibarRightButtonClick () {
        //this.$router.push('/three');
        this.postText();
      },
      onSelect (res, {selectIndex, checked, checkedList}) {
        Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked ? '是' : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);

        this.testData[selectIndex].checked=checked;

      },
      onOverLimit (limit) {
        modal.toast({
          message: `最多选择${limit}个`,
          duration: 0.8
        });
      },
      toParams(obj) {
        var param = "";
        for(const name in obj) {
            if(typeof obj[name] != 'function') {
                param += '&' + name + '=' + encodeURIComponent(obj[name])
            }
        }
        return param.substring(1);
      },
      getItem () {

        storage.getItem('userinfo', event => {
            this.user =  JSON.parse(event.data);
            modal.alert({
                    message: this.user,
                    okTitle: '确认'
                }, function () {
                    console.log('alert callback')
                });
        });

        storage.getItem('textinfo', event => {
            this.textinfo =  JSON.parse(event.data);
            modal.alert({
                    message: this.textinfo,
                    okTitle: '确认'
                }, function () {
                    console.log('alert callback')
                });
        });
      },

      getAll(){
        storage.getAllKeys(event => {
          if (event.result === 'success') {
            let list=[];
            list=event.data;
            for(let i=0;i<list.length;i++){
              if (event.data[i]=='userinfo') {
                return;
              }
            }
            this.$router.push('/login');
            VueEvent.$emit('toNews','hide');
            
          }
        })
      },
      getlabel(){
        stream.fetch({
          method: 'GET',
          url: IP + '/label',
          type:'json'
        }, (ret)=> {
          if(!ret.ok){
            modal.toast({
              message: 'Network Error!请检查网络',
              duration: 3
            });

            VueEvent.$emit('toNews','show');
            this.$router.go(-2); 
          }else{
            this.label = ret.data;
            

            for(let i=0;i<this.label.length;i++){
              let params={"title":ret.data[i].labelname,"labelid":ret.data[i].labelid}
              this.testData.push(params);
              //this.testData[s].id=ret.data[s].labelid;
            };

          }
        });
      },
      postText(){
      // console.log()

        modal.toast({
                    message: 'ananana',
                    duration: 0.3
                });

        if (!this.user.userid || !this.user.password) {
            modal.toast({
                message: '账号未登录请先登录',
                duration: 1
            });
            return;
        };

        if (!this.textinfo.title || !this.textinfo.txt) {
            modal.toast({
                message: '文章或者标题不能为空',
                duration: 1
            });
            return;
        };

        let labelidlist=[];

        for (let index = 0; index < this.testData.length; index++) {
          if (this.testData[index].checked==true) {
            labelidlist.push({"label":this.testData[index].labelid})
          }
          
        };

        if (!labelidlist) {
            modal.toast({
                message: '标签不能为空',
                duration: 1
            });
            return;
        };

        //var _url = IP+':8989/register';
        stream.fetch({
            method: 'POST',
            url: IP+'/posttext',
            body: this.toParams({
                userid: this.user.userid,
                password: this.user.password,
                title: this.textinfo.title,
                txt: this.textinfo.txt,
                labelid: JSON.stringify(labelidlist),
            }),
            type: 'json'
        }, (ret)=> {
            if(!ret.ok) {
                modal.toast({
                    message: 'Request faild!',
                    duration: 0.3
                });
            } else {
                modal.alert({
                    message: ret.data,
                    okTitle: '确认'
                },  ()=>{
                  storage.removeItem('textinfo')
                  VueEvent.$emit('toNews','show');
                  this.$router.go(-2); 
                }) 
            }
        })
     }
    }
  };
</script>