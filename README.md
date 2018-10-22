## 征信录入

### 使用方式

#### 描述
  
 征信录入前端项目

#### 安装 cnpm 依赖
```
cnpm install @ddjf/input --save-dev
```

#### 依赖第三方
```
  elementUI: <a href='https://element.eleme.io/#/'>https://element.eleme.io/#/</a>
  layui: <a href='https://www.layui.com/admin/std/dist/views/'>https://www.layui.com/admin/std/dist/views/</a>
```

#### 运行方式
```
npm run start 或者 yarn start
```

### 目录结构说明
```$xslt
/credit-record
  ├── build/                                    #项目构建
  ├── config/                                   #项目构建配置
  ├── dist/                                     #打包后文件
  ├── node_modules/                             #项目所有的依赖包
  ├── static/                                   #项目静态文件
  ├── src/                                      #项目开发主目录
      ├── api/                                  #协议处理目录
          ├── api.js                            #网络请求处理
          ├── defined.js                        #请求地址定义
          ├── index.js                          #请求地址统一处理
          ├── mock.js                           #mock模拟数据
          ├── string.js                         #处理字符串的一些公共方法【本项目没有用到这个文件】
      ├── components/                           #公共组件库目录
          ├── form/                             #form表单处理目录
              ├── inputDate.vue                 #日期输入框组件
              ├── inputText.js                  #普通输入框组件
              ├── formInput.js                  #表单输入汇总
              ├── formLabel.js                  #表单label内容
      ├── config/                               #配置目录
          ├── index.js                          #配置文件
          ├── dict.js                           #字典文件
      ├── css/                                  #样式目录
          ├── _normalize.scss                   #标准差异化css样式
          ├── _var.scss                         #scss样式变量
          ├── main.scss                         #通用样式
          ├── base.scss                         #该项目的基本样式
      ├── store/                                #vuex 数据模型目录
          ├── index.js                          #vuex 数据模型
      ├── utils/                                #通用方法目录
          ├── common/                           #通用方法
          ├── formatInput.js                    #输入格式化处理
          ├── validator.js                      #验证文件
      ├── views/                                #页面目录
          ├── components                        #视图模块组件目录
          ├── main.vue                          #页面入口文件
      ├── main.js                               #入口文件
  ├── test/                                     #
  ├── tools/                                    #
  ├── UI/                                       #UI界面文件
  ├── web/                                      #
  
```

### 主要内容介绍
  ```
  本项目里面的所有输入基本都是采用配置的方式
  配置说明 例如
  'birthday': {
        label: '出生日期',
        type: 'date',
        maxLength: 10,
        format: 'yyyy/MM/dd',
        valid: 'datetime,,,,YYYY/MM/DD',
        sort: 1
   }
  
  ```
  |属性名|介绍|
  |:---:|:---:|
  |sort|排序，生成时根据sort的位置生成|
  |label|标题|
  |type|类型，对于date、datetime测试时间类型，对于no为序号，对于btn为操作按钮，对于pick为选择，其他为输入框|
  |maxLength|最大输入长度|
  |require|是否必填|
  |import|是否重要|
  |format|输入格式化|
  |valid|提交时验证|
  |list|type为pick时需要，表示下拉选项的数据|

### 版本兼容

   Edge、谷歌
