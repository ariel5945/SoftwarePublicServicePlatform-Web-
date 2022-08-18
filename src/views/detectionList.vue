<template>
  <main>
    <BannerCon class="bg-img">
      <template v-slot:bannerTitle>检测中心检测</template>
      <template v-slot:bannerText>Test center testing</template>
    </BannerCon>

    <div class="body-con">
      <div class="tab-con">
        <span :class="{active: tabId===1}" @click="getTabId(1)">自助检测</span>
        <span :class="{active: tabId===2}" @click="getTabId(2)">平台检测</span>
      </div>
      <div v-show="tabId===2" class="pingtai-jc-dev">
        <div>
          <el-form :model="ruleForm" style="width: 40%" :rules="rules" ref="ruleForm" label-width="1.3rem"
                   class="demo-ruleForm jc-form">
            <el-form-item label="产品名称 : ">
              <input class="zd-input" type="text" v-model="ruleForm.title">
            </el-form-item>
            <el-form-item label="联系电话 : ">
              <input class="zd-input" type="text" v-model="ruleForm.phone">
            </el-form-item>
            <el-form-item label="项目简介 : ">
              <textarea class="zd-textarea" v-model="ruleForm.describes" cols="30" rows="10"></textarea>
            </el-form-item>
            <!--:http-request="httpRequest"-->
          </el-form>
          <div class="gif-con">
            <el-upload
                class="upload-demo"
                drag
                action="https://admin.lyrjfwpt.cn/api/common/uploadZipFile"
                :headers="headerToken"
                :http-request="httpRequest"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePreview"
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="updata-img">
              <img src="./../assets/image/rjjc/updata.png" alt="">
              <span>点击上传</span>
            </div>
            <div class="gif-img">
              <img src="./../assets/image/rjjc/jc.gif" alt="">
            </div>

            <p>文件格式为:ZIP</p>
            <span>{{ fileName }}</span>
          </div>
        </div>

        <div class="tijiao-btn" @click="submitForm('ruleForm')">提交检测
        </div>

      </div>


      <el-dialog
          :visible.sync="dialogVisible"
          :lock-scroll="false"
          width="60%"
          :before-close="handleClose">
        <div class="result-body">
          <div class="result-con">{{ resultNum }}</div>
          <div class="result-text">
            <h5>项目检测中...</h5>
            <div class="schedule-con">
              <div class="schedule-center">
                <div class="schedule-list" :style="'width:' + resultNum + '%'"></div>
                <div class="schedule-text" :class="{'center-con': resultNum>10 }">
                  <h3>代码校验</h3>
                </div>
                <div class="schedule-text" :class="{'center-con': resultNum>30 }">
                  <h3>功能测试</h3>
                </div>
                <div class="schedule-text" :class="{'center-con': resultNum>50 }">
                  <h3>
                    接口测试
                  </h3>
                </div>
                <div class="schedule-text" :class="{'center-con': resultNum>70 }">
                  <h3>安全测试</h3>
                </div>
                <div class="schedule-text" :class="{'center-con': resultNum>90 }">
                  <h3>性能测试</h3>
                </div>
              </div>
            </div>
            <div class="schedule-body" ref="scheduleHtml">
              <!--11-->
            </div>
          </div>
        </div>


      </el-dialog>

      <div v-show="tabId===1">

        <div class="zizhu-con">

          <div class="jc-class">
            <!--jc-center-bg-->
            <img class="center-img-1" src="./../assets/image/rjjc/jc-center1.png">
            <img class="center-img-2" src="./../assets/image/rjjc/jc-center2.png">
            <img class="center-img-3" src="./../assets/image/rjjc/jc-center-bg.png">
            <div class="center-text">自助检测</div>
            <div class="active-con"
                 :class="{
                    'active-con1': tabItem === 0,
                    'active-con2': tabItem === 1,
                    'active-con3': tabItem === 2,
                    'active-con4': tabItem === 3,
                    'active-con5': tabItem === 4
                 }">
              <img src="./../assets/image/rjjc/act-point.png">
            </div>

            <div class="item-dev item-dev-rotate1" @click="tabItem = 0">
              <div class="item-dev1" :class="{'item-dev-act': tabItem === 0}">
                代码<br>校验
              </div>
            </div>
            <div class="item-dev item-dev-rotate2" @click="tabItem = 1">
              <div class="item-dev2" :class="{'item-dev-act': tabItem === 1}">
                功能<br>测试
              </div>
            </div>
            <div class="item-dev item-dev-rotate3" @click="tabItem = 2">
              <div class="item-dev3" :class="{'item-dev-act': tabItem === 2}">
                接口<br>测试
              </div>
            </div>
            <div class="item-dev item-dev-rotate4" @click="tabItem = 3">
              <div class="item-dev4" :class="{'item-dev-act': tabItem === 3}">
                安全<br>测试
              </div>
            </div>
            <div class="item-dev item-dev-rotate5" @click="tabItem = 4">
              <div class="item-dev5" :class="{'item-dev-act': tabItem === 4}">
                性能<br>测试
              </div>
            </div>

            <!--<img src="" alt="">-->
          </div>
          <div style="width: 50%">
            <div class="jc-input-list">
              <div class="jc-title">
                <span></span>
                <h4>{{ selectList[tabItem].title }}</h4>
              </div>
              <div class="jc-item-con">
                <div>
                  <div class="jc-item-num" v-if="tabItem === 0">
                    {{ tabIndex1 + 1 }}.
                  </div>
                  <div class="jc-item-num" v-else-if="tabItem === 1">
                    {{ tabIndex2 + 1 }}.
                  </div>
                  <div class="jc-item-num" v-else-if="tabItem === 2">
                    {{ tabIndex3 + 1 }}.
                  </div>
                  <div class="jc-item-num" v-else-if="tabItem === 3">
                    {{ tabIndex4 + 1 }}.
                  </div>
                  <div class="jc-item-num" v-else>
                    {{ tabIndex5 + 1 }}.
                  </div>


                  <div class="jc-item-text" v-if="tabItem === 0">
                    {{ selectList[tabItem].list[tabIndex1].title }}
                  </div>
                  <div class="jc-item-text" v-else-if="tabItem === 1">
                    {{ selectList[tabItem].list[tabIndex2].title }}
                  </div>
                  <div class="jc-item-text" v-else-if="tabItem === 2">
                    {{ selectList[tabItem].list[tabIndex3].title }}
                  </div>
                  <div class="jc-item-text" v-else-if="tabItem === 3">
                    {{ selectList[tabItem].list[tabIndex4].title }}
                  </div>
                  <div class="jc-item-text" v-else>
                    {{ selectList[tabItem].list[tabIndex5].title }}
                  </div>
                </div>
              </div>

              <!--用户输入 sta **************************************************************-->
              <div class="jc-item-option" v-if="tabItem === 0">
                <div v-if="selectList[tabItem].list[tabIndex1].type===0">
                  <div :class="{'tabIndexVal-con': tabIndexVal === 1}" @click="tabIndexVal = 1">
                    <div></div>
                    是
                  </div>
                  <div style="width: .6rem;opacity: 0;"></div>
                  <div :class="{'tabIndexVal-con': tabIndexVal === 2}" @click="tabIndexVal = 2">
                    <div></div>
                    否
                  </div>
                </div>
                <div v-else>
                  <input class="zd-input" type="text" v-model="tabIndexVal">
                </div>
              </div>
              <div class="jc-item-option" v-else-if="tabItem === 1">
                <div v-if="selectList[tabItem].list[tabIndex2].type===0">
                  <div :class="{'tabIndexVal-con': tabIndexVal === 1}" @click="tabIndexVal = 1">
                    <div></div>
                    是
                  </div>
                  <div style="width: .6rem;opacity: 0;"></div>
                  <div :class="{'tabIndexVal-con': tabIndexVal === 2}" @click="tabIndexVal = 2">
                    <div></div>
                    否
                  </div>
                </div>
                <div v-else>
                  <input class="zd-input" type="text" v-model="tabIndexVal">
                </div>
              </div>
              <div class="jc-item-option" v-else-if="tabItem === 2">
                <div v-if="selectList[tabItem].list[tabIndex3].type===0">
                  <div :class="{'tabIndexVal-con': tabIndexVal === 1}" @click="tabIndexVal = 1">
                    <div></div>
                    是
                  </div>
                  <div style="width: .6rem;opacity: 0;"></div>
                  <div :class="{'tabIndexVal-con': tabIndexVal === 2}" @click="tabIndexVal = 2">
                    <div></div>
                    否
                  </div>
                </div>
                <div v-else>
                  <input class="zd-input" type="text" v-model="tabIndexVal">
                </div>
              </div>
              <div class="jc-item-option" v-else-if="tabItem === 3">
                <div v-if="selectList[tabItem].list[tabIndex4].type===0">
                  <div :class="{'tabIndexVal-con': tabIndexVal === 1}" @click="tabIndexVal = 1">
                    <div></div>
                    是
                  </div>
                  <div style="width: .6rem;opacity: 0;"></div>
                  <div :class="{'tabIndexVal-con': tabIndexVal === 2}" @click="tabIndexVal = 2">
                    <div></div>
                    否
                  </div>
                </div>
                <div v-else>
                  <input class="zd-input" type="text" v-model="tabIndexVal">
                </div>
              </div>
              <div class="jc-item-option" v-else>
                <div v-if="selectList[tabItem].list[tabIndex5].type===0">
                  <div :class="{'tabIndexVal-con': tabIndexVal === 1}" @click="tabIndexVal = 1">
                    <div></div>
                    是
                  </div>
                  <div style="width: .6rem;opacity: 0;"></div>
                  <div :class="{'tabIndexVal-con': tabIndexVal === 2}" @click="tabIndexVal = 2">
                    <div></div>
                    否
                  </div>
                </div>
                <div v-else>
                  <input class="zd-input" type="text" v-model="tabIndexVal">
                </div>
              </div>
              <!--用户输入 End ***************************************************************-->

              <div class="jc-option-con" v-if="tabItem===0">
                <div @click="getUserOptinon(1)">上一题</div>
                <div v-if="tabIndex1 < selectList[tabItem].list.length-1" @click="getUserOptinon(0)">下一题</div>
                <div v-else class="end-btn" @click="jiance()">测试结束</div>
                <div v-if="tabItem<=4 && tabIndex1 === selectList[tabItem].list.length-1" @click="tabItem += 1"
                     style="background-color: #3291F8">下一项
                </div>
              </div>
              <div class="jc-option-con" v-if="tabItem===1">
                <div @click="getUserOptinon(1)">上一题</div>
                <div v-if="tabIndex2 < selectList[tabItem].list.length-1" @click="getUserOptinon(0)">下一题</div>
                <div v-else class="end-btn" @click="jiance()">测试结束</div>
                <div v-if="tabItem<=4 && tabIndex2 === selectList[tabItem].list.length-1" @click="tabItem += 1"
                     style="background-color: #3291F8">下一项
                </div>
              </div>
              <div class="jc-option-con" v-if="tabItem===2">
                <div @click="getUserOptinon(1)">上一题</div>
                <div v-if="tabIndex3 < selectList[tabItem].list.length-1" @click="getUserOptinon(0)">下一题</div>
                <div v-else class="end-btn" @click="jiance()">测试结束</div>
                <div v-if="tabItem<=4 && tabIndex3 === selectList[tabItem].list.length-1" @click="tabItem += 1"
                     style="background-color: #3291F8">下一项
                </div>
              </div>
              <div class="jc-option-con" v-if="tabItem===3">
                <div @click="getUserOptinon(1)">上一题</div>
                <div v-if="tabIndex4 < selectList[tabItem].list.length-1" @click="getUserOptinon(0)">下一题</div>
                <div v-else class="end-btn" @click="jiance()">测试结束</div>
                <div v-if="tabItem<=4 && tabIndex4 === selectList[tabItem].list.length-1" @click="tabItem += 1"
                     style="background-color: #3291F8">下一项
                </div>
              </div>
              <div class="jc-option-con" v-if="tabItem===4">
                <div @click="getUserOptinon(1)">上一题</div>
                <div v-if="tabIndex5 < selectList[tabItem].list.length-1" @click="getUserOptinon(0)">下一题</div>
                <div v-else class="end-btn" @click="jiance()">测试结束</div>
                <div v-if="tabItem<=4 && tabIndex5 === selectList[tabItem].list.length-1" @click="tabItem += 1">下一项
                </div>
              </div>
            </div>
            <div class="jindu-con">
              <span>填写进度</span>
              <div>
                <div class="jindu-center" v-if="tabItem===0">
                  <div v-for="item in parseInt(100*((tabIndex1+1)/selectList[tabItem].list.length))" :key="'jc'+item"></div>
                </div>
                <div class="jindu-center" v-else-if="tabItem===1">
                  <div v-for="item in parseInt(100*((tabIndex2+1)/selectList[tabItem].list.length))" :key="'jc'+item"></div>
                </div>
                <div class="jindu-center" v-else-if="tabItem===2">
                  <div v-for="item in parseInt(100*((tabIndex3+1)/selectList[tabItem].list.length))" :key="'jc'+item"></div>
                </div>
                <div class="jindu-center" v-else-if="tabItem===3">
                  <div v-for="item in parseInt(100*((tabIndex4+1)/selectList[tabItem].list.length))" :key="'jc'+item"></div>
                </div>
                <div class="jindu-center" v-else-if="tabItem===4">
                  <div v-for="item in parseInt(100*((tabIndex5+1)/selectList[tabItem].list.length))" :key="'jc'+item"></div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <!--<div class="jif-con">-->
        <!--  <img src="./../assets/image/rjjc/jc.gif" alt="">-->
        <!--</div>-->


        <!--<div class="tab-list">-->
        <!--  <span :class="{'item-active': tabItem===0}" @click="tabItem = 0">代码校验</span>-->
        <!--  <span :class="{'item-active': tabItem===1}" @click="tabItem = 1">功能测试</span>-->
        <!--  <span :class="{'item-active': tabItem===2}" @click="tabItem = 2">接口测试</span>-->
        <!--  <span :class="{'item-active': tabItem===3}" @click="tabItem = 3">安全测试</span>-->
        <!--  <span :class="{'item-active': tabItem===4}" @click="tabItem = 4">性能测试</span>-->
        <!--</div>-->
        <!--<div v-show="tabItem === 0">-->
        <!--  <div style="border-bottom: 1px solid #D6D8DB">-->
        <!--    <h4 class="tab-h3">前端部分</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码是否正常启动</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData1.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData1.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码格式是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData1.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData1.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码启动后是否崩溃</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData1.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData1.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码崩溃次数</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData1.data4"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码警告数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData1.data5"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码报错数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData1.data6"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否引入第三方组件</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData1.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData1.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">使用第三方组件数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData1.data8"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">配置文件是否符合规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData1.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData1.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->

        <!--    &lt;!&ndash; 第一  服务端 -   &ndash;&gt;-->
        <!--    <h4 class="tab-h3">服务端部分</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码是否正常启动</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码格式是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">代码启动后是否崩溃</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码崩溃次数</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data4"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码警告数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data5"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码报错数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data6"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否引入第三方组件</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">使用第三方组件数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data8"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">配置文件是否符合规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--  &lt;!&ndash; 第一  服务端 -   &ndash;&gt;-->

        <!--</div>-->
        <!--<div v-show="tabItem === 1">-->
        <!--  <div style="border-bottom: 1px solid #D6D8DB">-->
        <!--    <h4 class="tab-h3">登录注册</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">未注册用户登录是否提示该用户未注册</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">注册输入是否检验空值</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">注册输入是否校验正则</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">注册功能是否按设计流程执行</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">注册完成后是否进入登录</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">运行代码报错数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data6" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data6" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">登录输入是否校验空值</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">登录输入是否校验正则</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data8" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data8" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">登录账号、密码错误提示</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">忘记密码是否能够根据账号绑定信息修改密码</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData3.data10" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData3.data10" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->


        <!--    <h4 class="tab-h3">功能页面</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面是否正常可浏览</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">点击公告通知是否触发响应事件</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">点击功能模块是否触发响应事件</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有登录身份校验</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">未登录是否跳转登录页面</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面是否还原设计图</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data6" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data6" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面滑动是否流畅</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面效果是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data8" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data8" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面文字是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">跳转路由是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data10" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data10" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面数据回显是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data11" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data11" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面数据请求报错记录</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data12"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">数据状态变更是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data13" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data13" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">异常处理是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data14" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data14" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">空数据是否校验</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData4.data15" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData4.data15" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">加载崩溃记录</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData2.data16"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">数据加载状态是否添加</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData2.data17" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData2.data17" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <h4 class="tab-h3">服务端</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">定义的变量是否都被初始化</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">服务器是否有针对客户端发送的数据进行异常校验</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">对数据库的操作是否有未释放的情况</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">服务器端的判断逻辑是否存在功能隐患</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">连接的数据库环境是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">对数据库的操作是否有关闭操作</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData5.data6" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData5.data6" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->

        <!--</div>-->
        <!--<div v-show="tabItem === 2">-->
        <!--  <div style="border-bottom: 1px solid #D6D8DB">-->
        <!--    <h4 class="tab-h3">Postman、ApiPost</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">URL是否完整</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">请求方法是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">Header信息是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">入参内容是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">返回值是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">示例是否完整</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data6" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data6" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口命名是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口格式是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data8" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data8" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">字段命名是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">字段类型是否规范</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data10" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data10" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">响应状态码是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data11" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data11" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口是否有容错处理</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data12" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data12" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">字段是否有冗余</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data13" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data13" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口是否有鉴权</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data14" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data14" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口是否有版本区分</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data15" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data15" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口数据加密传输格式</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data16" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data16" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">请求次数、频率限制</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data17" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data17" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口功能是否完整</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data18" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data18" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口参数临界值是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data19" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data19" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口并发数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data20" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data20" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">接口参数校验是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data21" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data21" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">全部参数传入结果是否正确</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data22" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data22" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">部分参数传入结果是否正常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data23" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data23" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">超范围参数传入结果是否提示异常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data24" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data24" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">不传参结果是否提示异常</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData6.data25" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData6.data25" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div v-show="tabItem === 3">-->
        <!--  <div style="border-bottom: 1px solid #D6D8DB">-->
        <!--    <h4 class="tab-h3">前端安全</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有防盗刷校验码</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">页面代码是否明文显示</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否引入防抖和节流</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否配置路由守卫</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">请求数据是否明文传输</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否引入反扒机制</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data6" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data6" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否引入不安全的第三方组件</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data7" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data7" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否设置HSTS强制使用HTTPS</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data8" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data8" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否使用浏览器提供的SRI防攻击</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在XSS漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data10" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data10" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在CSRF漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data11" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data11" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在SSRF漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data12" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data12" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">文件上传是否存在漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data13" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data13" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在代码注入漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data14" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data14" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在命令注入漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data15" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data15" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在XXE漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data16" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data16" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在文件读取权限漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData7.data17" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData7.data17" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <h4 class="tab-h3">服务端安全</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有sql注入漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data1" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data1" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有命令注入漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data2" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data2" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有文件操作漏洞</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data3" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data3" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">异常宕机数据是否丢失</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data4" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data4" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否存在缓存穿透</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data5" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data5" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">承载最大并发量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData8.data6"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">数据库访问临界值</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData8.data7"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">服务器是否有缓存机制</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data8" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data8" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">服务器的负载均衡是否合理</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data9" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data9" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">服务器连接的是否有超时设置</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data10" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data10" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">网络请求是否使用的是内网IP</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data11" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data11" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">生产服务是否与测试服务一致</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-radio v-model="formData8.data12" label="1">是</el-radio>-->
        <!--        <el-radio v-model="formData8.data12" label="2">否</el-radio>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div v-show="tabItem === 4">-->
        <!--  <div style="border-bottom: 1px solid #D6D8DB">-->
        <!--    <h4 class="tab-h3">前端安全</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">是否有防盗刷校验码</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data1"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">内存利用率峰值</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data2"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">磁盘I/O峰值</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data3"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">网络带宽</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data4"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">并发用户数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data5"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">同时在线用户数量</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data6"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">平均响应时间</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data7"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">事务成功率</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data8"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">超时错误率</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData9.data9"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <h4 class="tab-h3">前端性能</h4>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">LCP-视窗内最大内容的渲染时间</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data1"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">FID-用户第一次页面交互到浏览器实际上处理时间的时间</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data2"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">CLS-测量在页面的整个生命周期中发生意外布局的总和</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data3"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">FCP-打开浏览器第一个DOS消耗时间</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data4"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">SpeedIndex（SI）加载过程视觉呈现速度</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data5"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">TTI-页面完全可交互耗费时间</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data6"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="tab-item">-->
        <!--      <div class="item-lable">TBT-加载过程阻塞用户操作时长</div>-->
        <!--      <div class="item-con">-->
        <!--        <el-input size="mini" style="width: 80%" v-model="formData10.data7"></el-input>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->

        <!--<div style="padding-top: 60px;display: flex;justify-content: center">-->
        <!--  <el-button type="primary" @click="jiance()">提交检测</el-button>-->
        <!--</div>-->
      </div>

    </div>
  </main>
</template>

<script>

import HTTP from "@/server/http";
import BannerCon from "@/components/bannerCon"

export default {
  name: "detectionList",
  components: {
    BannerCon,
  },
  data() {
    return {
      tabItem: 0,
      tabId: 1,


      formData: [
        {
          title: "代码校验", list: [
            {title: "代码是否正常启动"},
            {title: "代码格式是否规范"},
            {title: "代码启动后是否崩溃"},
            {title: "运行代码崩溃次数"},
            {title: "运行代码警告数量"},
            {title: "运行代码报错数量"},
            {title: "是否引入第三方组件"},
            {title: "使用第三方组件数量"},
            {title: "配置文件是否符合规范"},
          ]
        },
        {
          title: "功能测试", list: [
            {title: "未注册用户登录是否提示该用户未注册"},
            {title: "注册输入是否检验空值"},
            {title: "注册输入是否校验正则"},
            {title: "注册功能是否按设计流程执行"},
            {title: "注册完成后是否进入登录"},
            {title: "运行代码报错数量"},
            {title: "登录输入是否校验空值"},
            {title: "登录输入是否校验正则"},
            {title: "登录账号、密码错误提示"},
            {title: "忘记密码是否能够根据账号绑定信息修改密码"},
            {title: "页面是否正常可浏览"},
            {title: "点击公告通知是否触发响应事件"},
            {title: "点击功能模块是否触发响应事件"},
            {title: "是否有登录身份校验"},
            {title: "未登录是否跳转登录页面"},
            {title: "页面滑动是否流畅"},
            {title: "页面效果是否正常"},
            {title: "页面文字是否正常"},
            {title: "跳转路由是否正常"},
            {title: "页面数据回显是否正常"},
            {title: "页面数据请求报错记录"},
            {title: "数据状态变更是否正常"},
            {title: "异常处理是否正常"},
            {title: "空数据是否校验"},
            {title: "加载崩溃记录"},
            {title: "数据加载状态是否添加"},
            {title: "定义的变量是否都被初始化"},
            {title: "服务器是否有针对客户端发送的数据进行异常校验"},
            {title: "对数据库的操作是否有未释放的情况"},
            {title: "服务器端的判断逻辑是否存在功能隐患"},
            {title: "连接的数据库环境是否正确"},
            {title: "对数据库的操作是否有关闭操作"},
          ]
        },
        {
          title: "接口测试", list: [
            {title: "URL是否完整"},
            {title: "请求方法是否正确"},
            {title: "Header信息是否正确"},
            {title: "入参内容是否正确"},
            {title: "返回值是否正确"},
            {title: "示例是否完整"},
            {title: "接口命名是否规范"},
            {title: "接口格式是否规范"},
            {title: "字段命名是否规范"},
            {title: "字段类型是否规范"},
            {title: "响应状态码是否正确"},
            {title: "接口是否有容错处理"},
            {title: "字段是否有冗余"},
            {title: "接口是否有鉴权"},
            {title: "接口是否有版本区分"},
            {title: "接口数据加密传输格式"},
            {title: "请求次数、频率限制"},
            {title: "接口功能是否完整"},
            {title: "接口参数临界值是否正常"},
            {title: "接口并发数量"},
            {title: "接口参数校验是否正确"},
            {title: "全部参数传入结果是否正确"},
            {title: "部分参数传入结果是否正常"},
            {title: "超范围参数传入结果是否提示异常"},
            {title: "不传参结果是否提示异常"},
          ]
        },
        {
          title: "安全测试", list: [
            {title: "是否有防盗刷校验码"},
            {title: "页面代码是否明文显示"},
            {title: "是否引入防抖和节流"},
            {title: "是否配置路由守卫"},
            {title: "请求数据是否明文传输"},
            {title: "是否引入反扒机制"},
            {title: "是否设置HSTS强制使用HTTPS"},
            {title: "是否使用浏览器提供的SRI防攻击"},
            {title: "是否存在XSS漏洞"},
            {title: "是否存在CSRF漏洞"},
            {title: "是否存在SSRF漏洞"},
            {title: "文件上传是否存在漏洞"},
            {title: "是否存在代码注入漏洞"},
            {title: "是否存在命令注入漏洞"},
            {title: "是否存在XXE漏洞"},
            {title: "是否存在文件读取权限漏洞"},
            {title: "是否有sql注入漏洞"},
            {title: "是否有命令注入漏洞"},
            {title: "是否有文件操作漏洞"},
            {title: "异常宕机数据是否丢失"},
            {title: "是否存在缓存穿透"},
            {title: "承载最大并发量"},
            {title: "数据库访问临界值"},
            {title: "服务器是否有缓存机制"},
            {title: "服务器的负载均衡是否合理"},
            {title: "服务器连接的是否有超时设置"},
            {title: "网络请求是否使用的是内网IP"},
          ]
        },
        {
          title: "性能测试", list: [
            {title: "内存利用率峰值"},
            {title: "磁盘I/O峰值"},
            {title: "网络带宽"},
            {title: "并发用户数量"},
            {title: "同时在线用户数量"},
            {title: "平均响应时间"},
            {title: "事务成功率"},
            {title: "超时错误率"},
            {title: "LCP-视窗内最大内容的渲染时间"},
            {title: "FID-用户第一次页面交互到浏览器实际上处理时间的时间"},
            {title: "CLS-测量在页面的整个生命周期中发生意外布局的总和"},
            {title: "FCP-打开浏览器第一个DOS消耗时间"},
            {title: "SpeedIndex（SI）加载过程视觉呈现速度"},
            {title: "TTI-页面完全可交互耗费时间"},
            {title: "TBT-加载过程阻塞用户操作时长"},
          ]
        },
      ],

      dialogVisible: false,
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      selectList: [
        // {
        //   title: "代码校验", list: [
        //     {
        //       title: "前端部分", list: [
        //         {title: "代码是否正常启动"},
        //         {title: "代码格式是否规范"},
        //         {title: "代码启动后是否崩溃"},
        //         {title: "运行代码崩溃次数"},
        //         {title: "运行代码警告数量"},
        //         {title: "运行代码报错数量"},
        //         {title: "是否引入第三方组件"},
        //         {title: "使用第三方组件数量"},
        //         {title: "配置文件是否符合规范"},
        //       ]
        //     },
        //     {
        //       title: "服务端部分", list: [
        //         {title: "代码是否正常启动"},
        //         {title: "代码格式是否规范"},
        //         {title: "代码启动后是否崩溃"},
        //         {title: "运行代码崩溃次数"},
        //         {title: "运行代码警告数量"},
        //         {title: "运行代码报错数量"},
        //         {title: "是否引入第三方组件"},
        //         {title: "使用第三方组件数量"},
        //         {title: "配置文件是否符合规范"},
        //       ]
        //     },
        //   ]
        // },
        // {
        //   title: "功能测试", list: [
        //     {title: "登录注册",list: [
        //         {title: "未注册用户登录是否提示该用户未注册"},
        //         {title: "注册输入是否检验空值"},
        //         {title: "注册输入是否校验正则"},
        //         {title: "注册功能是否按设计流程执行"},
        //         {title: "注册完成后是否进入登录"},
        //         {title: "运行代码报错数量"},
        //         {title: "登录输入是否校验空值"},
        //         {title: "登录输入是否校验正则"},
        //         {title: "登录账号、密码错误提示"},
        //         {title: "忘记密码是否能够根据账号绑定信息修改密码"},
        //       ]
        //     },
        //     {title: "功能页面",list: [
        //         {title: "页面是否正常可浏览"},
        //         {title: "点击公告通知是否触发响应事件"},
        //         {title: "点击功能模块是否触发响应事件"},
        //         {title: "是否有登录身份校验"},
        //         {title: "未登录是否跳转登录页面"},
        //         {title: "页面滑动是否流畅"},
        //         {title: "页面效果是否正常"},
        //         {title: "页面文字是否正常"},
        //         {title: "跳转路由是否正常"},
        //         {title: "页面数据回显是否正常"},
        //         {title: "页面数据请求报错记录"},
        //         {title: "数据状态变更是否正常"},
        //         {title: "异常处理是否正常"},
        //         {title: "空数据是否校验"},
        //         {title: "加载崩溃记录"},
        //         {title: "数据加载状态是否添加"},
        //       ]
        //     },
        //     {title: "服务端",list: [
        //         {title: "定义的变量是否都被初始化"},
        //         {title: "服务器是否有针对客户端发送的数据进行异常校验"},
        //         {title: "对数据库的操作是否有未释放的情况"},
        //         {title: "服务器端的判断逻辑是否存在功能隐患"},
        //         {title: "连接的数据库环境是否正确"},
        //         {title: "对数据库的操作是否有关闭操作"},
        //       ]
        //     },
        //   ]
        // },
        // {
        //   title: "接口测试", list: [
        //     {
        //       title: "Postman、ApiPost", list: [
        //         {title: "URL是否完整"},
        //         {title: "请求方法是否正确"},
        //         {title: "Header信息是否正确"},
        //         {title: "入参内容是否正确"},
        //         {title: "返回值是否正确"},
        //         {title: "示例是否完整"},
        //         {title: "接口命名是否规范"},
        //         {title: "接口格式是否规范"},
        //         {title: "字段命名是否规范"},
        //         {title: "字段类型是否规范"},
        //         {title: "响应状态码是否正确"},
        //         {title: "接口是否有容错处理"},
        //         {title: "字段是否有冗余"},
        //         {title: "接口是否有鉴权"},
        //         {title: "接口是否有版本区分"},
        //         {title: "接口数据加密传输格式"},
        //         {title: "请求次数、频率限制"},
        //         {title: "接口功能是否完整"},
        //         {title: "接口参数临界值是否正常"},
        //         {title: "接口并发数量"},
        //         {title: "接口参数校验是否正确"},
        //         {title: "全部参数传入结果是否正确"},
        //         {title: "部分参数传入结果是否正常"},
        //         {title: "超范围参数传入结果是否提示异常"},
        //         {title: "不传参结果是否提示异常"},
        //       ]
        //     },
        //
        //   ]
        // },
        // {
        //   title: "安全测试", list: [
        //     {
        //       title: "前端安全", list: [
        //         {title: "是否有防盗刷校验码"},
        //         {title: "页面代码是否明文显示"},
        //         {title: "是否引入防抖和节流"},
        //         {title: "是否配置路由守卫"},
        //         {title: "请求数据是否明文传输"},
        //         {title: "是否引入反扒机制"},
        //         {title: "是否设置HSTS强制使用HTTPS"},
        //         {title: "是否使用浏览器提供的SRI防攻击"},
        //         {title: "是否存在XSS漏洞"},
        //         {title: "是否存在CSRF漏洞"},
        //         {title: "是否存在SSRF漏洞"},
        //         {title: "文件上传是否存在漏洞"},
        //         {title: "是否存在代码注入漏洞"},
        //         {title: "是否存在命令注入漏洞"},
        //         {title: "是否存在XXE漏洞"},
        //         {title: "是否存在文件读取权限漏洞"},
        //       ]
        //     },
        //     {
        //       title: "服务端安全", list: [
        //         {title: "是否有sql注入漏洞"},
        //         {title: "是否有命令注入漏洞"},
        //         {title: "是否有文件操作漏洞"},
        //         {title: "异常宕机数据是否丢失"},
        //         {title: "是否存在缓存穿透"},
        //         {title: "承载最大并发量"},
        //         {title: "数据库访问临界值"},
        //         {title: "服务器是否有缓存机制"},
        //         {title: "服务器的负载均衡是否合理"},
        //         {title: "服务器连接的是否有超时设置"},
        //         {title: "网络请求是否使用的是内网IP"},
        //         {title: "生产服务是否与测试服务一致"},
        //       ]
        //     },
        //   ]
        // },
        // {
        //   title: "性能测试", list: [
        //     {
        //       title: "性能测试", list: [
        //         {title: "内存利用率峰值"},
        //         {title: "磁盘I/O峰值"},
        //         {title: "网络带宽"},
        //         {title: "并发用户数量"},
        //         {title: "同时在线用户数量"},
        //         {title: "平均响应时间"},
        //         {title: "事务成功率"},
        //         {title: "超时错误率"},
        //         {title: "LCP-视窗内最大内容的渲染时间"},
        //         {title: "FID-用户第一次页面交互到浏览器实际上处理时间的时间"},
        //         {title: "CLS-测量在页面的整个生命周期中发生意外布局的总和"},
        //         {title: "FCP-打开浏览器第一个DOS消耗时间"},
        //         {title: "SpeedIndex（SI）加载过程视觉呈现速度"},
        //         {title: "TTI-页面完全可交互耗费时间"},
        //         {title: "TBT-加载过程阻塞用户操作时长"},
        //       ]
        //     },
        //   ]
        // },
        {
          title: "代码校验", list: [
            {title: "代码是否正常启动", type: 0},
            {title: "代码格式是否规范", type: 0},
            {title: "代码启动后是否崩溃", type: 0},
            {title: "运行代码崩溃次数", type: 1},
            {title: "运行代码警告数量", type: 1},
            {title: "运行代码报错数量", type: 1},
            {title: "是否引入第三方组件", type: 0},
            {title: "使用第三方组件数量", type: 1},
            {title: "配置文件是否符合规范", type: 0},
          ]
        },
        {
          title: "功能测试", list: [
            {title: "未注册用户登录是否提示该用户未注册", type: 0},
            {title: "注册输入是否检验空值", type: 0},
            {title: "注册输入是否校验正则", type: 0},
            {title: "注册功能是否按设计流程执行", type: 0},
            {title: "注册完成后是否进入登录", type: 0},
            {title: "运行代码报错数量", type: 0},
            {title: "登录输入是否校验空值", type: 0},
            {title: "登录输入是否校验正则", type: 0},
            {title: "登录账号、密码错误提示", type: 0},
            {title: "忘记密码是否能够根据账号绑定信息修改密码", type: 0},
            {title: "页面是否正常可浏览", type: 0},
            {title: "点击公告通知是否触发响应事件", type: 0},
            {title: "点击功能模块是否触发响应事件", type: 0},
            {title: "是否有登录身份校验", type: 0},
            {title: "未登录是否跳转登录页面", type: 0},
            {title: "页面滑动是否流畅", type: 0},
            {title: "页面效果是否正常", type: 0},
            {title: "页面文字是否正常", type: 0},
            {title: "跳转路由是否正常", type: 0},
            {title: "页面数据回显是否正常", type: 0},
            {title: "页面数据请求报错数量", type: 1},
            {title: "数据状态变更是否正常", type: 0},
            {title: "异常处理是否正常", type: 0},
            {title: "空数据是否校验", type: 0},
            {title: "加载崩溃次数", type: 1},
            {title: "数据加载状态是否添加", type: 0},
            {title: "定义的变量是否都被初始化", type: 0},
            {title: "服务器是否有针对客户端发送的数据进行异常校验", type: 0},
            {title: "对数据库的操作是否有未释放的情况", type: 0},
            {title: "服务器端的判断逻辑是否存在功能隐患", type: 0},
            {title: "连接的数据库环境是否正确", type: 0},
            {title: "对数据库的操作是否有关闭操作", type: 0},
          ]
        },
        {
          title: "接口测试", list: [
            {title: "URL是否完整", type: 0},
            {title: "请求方法是否正确", type: 0},
            {title: "Header信息是否正确", type: 0},
            {title: "入参内容是否正确", type: 0},
            {title: "返回值是否正确", type: 0},
            {title: "示例是否完整", type: 0},
            {title: "接口命名是否规范", type: 0},
            {title: "接口格式是否规范", type: 0},
            {title: "字段命名是否规范", type: 0},
            {title: "字段类型是否规范", type: 0},
            {title: "响应状态码是否正确", type: 0},
            {title: "接口是否有容错处理", type: 0},
            {title: "字段是否有冗余", type: 0},
            {title: "接口是否有鉴权", type: 0},
            {title: "接口是否有版本区分", type: 0},
            {title: "接口数据加密传输格式", type: 0},
            {title: "请求次数、频率限制", type: 0},
            {title: "接口功能是否完整", type: 0},
            {title: "接口参数临界值是否正常", type: 0},
            {title: "接口并发数量", type: 0},
            {title: "接口参数校验是否正确", type: 0},
            {title: "全部参数传入结果是否正确", type: 0},
            {title: "部分参数传入结果是否正常", type: 0},
            {title: "超范围参数传入结果是否提示异常", type: 0},
            {title: "不传参结果是否提示异常", type: 0},
          ]
        },
        {
          title: "安全测试", list: [
            {title: "是否有防盗刷校验码", type: 0},
            {title: "页面代码是否明文显示", type: 0},
            {title: "是否引入防抖和节流", type: 0},
            {title: "是否配置路由守卫", type: 0},
            {title: "请求数据是否明文传输", type: 0},
            {title: "是否引入反扒机制", type: 0},
            {title: "是否设置HSTS强制使用HTTPS", type: 0},
            {title: "是否使用浏览器提供的SRI防攻击", type: 0},
            {title: "是否存在XSS漏洞", type: 0},
            {title: "是否存在CSRF漏洞", type: 0},
            {title: "是否存在SSRF漏洞", type: 0},
            {title: "文件上传是否存在漏洞", type: 0},
            {title: "是否存在代码注入漏洞", type: 0},
            {title: "是否存在命令注入漏洞", type: 0},
            {title: "是否存在XXE漏洞", type: 0},
            {title: "是否存在文件读取权限漏洞", type: 0},
            {title: "是否有sql注入漏洞", type: 0},
            {title: "是否有命令注入漏洞", type: 0},
            {title: "是否有文件操作漏洞", type: 0},
            {title: "异常宕机数据是否丢失", type: 0},
            {title: "是否存在缓存穿透", type: 0},
            {title: "承载最大并发量", type: 1},
            {title: "数据库访问临界值", type: 1},
            {title: "服务器是否有缓存机制", type: 0},
            {title: "服务器的负载均衡是否合理", type: 0},
            {title: "服务器连接的是否有超时设置", type: 0},
            {title: "网络请求是否使用的是内网IP", type: 0},
          ]
        },
        {
          title: "性能测试", list: [
            {title: "内存利用率峰值", type: 1},
            {title: "磁盘I/O峰值", type: 1},
            {title: "网络带宽", type: 1},
            {title: "并发用户数量", type: 1},
            {title: "同时在线用户数量", type: 1},
            {title: "平均响应时间", type: 1},
            {title: "事务成功率", type: 1},
            {title: "超时错误率", type: 1},
            {title: "LCP-视窗内最大内容的渲染时间", type: 1},
            {title: "FID-用户第一次页面交互到浏览器实际上处理时间的时间", type: 1},
            {title: "CLS-测量在页面的整个生命周期中发生意外布局的总和", type: 1},
            {title: "FCP-打开浏览器第一个DOS消耗时间", type: 1},
            {title: "SpeedIndex（SI）加载过程视觉呈现速度", type: 1},
            {title: "TTI-页面完全可交互耗费时间", type: 1},
            {title: "TBT-加载过程阻塞用户操作时长", type: 1},
          ]
        },
      ],

      formData1: {},
      formData2: {},
      formData3: {},
      formData4: {},
      formData5: {},
      formData6: {},
      formData7: {},
      formData8: {},
      formData9: {},
      formData10: {},

      ruleForm: {},
      fileName: "",
      fd: {},
      rules: {},

      grade: 100,
      resultNum: 0,

      tabIndex1: 0,
      tabIndex2: 0,
      tabIndex3: 0,
      tabIndex4: 0,
      tabIndex5: 0,

      tabIndexVal: "",
    }
  },
  methods: {
    // 用户录入
    getUserOptinon(type) {
      if (type === 0) {
        if (!this.tabIndexVal) {
          return false
        }
        if (this.tabItem === 0) {
          this.selectList[this.tabItem].list[this.tabIndex1].value = this.tabIndexVal;
          if (this.tabIndex1 < this.selectList[this.tabItem].list.length - 1) {
            this.tabIndexVal = "";
            this.tabIndex1 += 1;
            if (this.tabItem === 0 && this.selectList[this.tabItem].list[this.tabIndex1].value) {
              this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex1].value;
            }
          }
        } else if (this.tabItem === 1) {
          this.selectList[this.tabItem].list[this.tabIndex2].value = this.tabIndexVal;
          if (this.tabIndex2 < this.selectList[this.tabItem].list.length - 1) {
            this.tabIndexVal = "";
            this.tabIndex2 += 1;
            if (this.tabItem === 0 && this.selectList[this.tabItem].list[this.tabIndex2].value) {
              this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex2].value;
            }
          }
        } else if (this.tabItem === 2) {
          this.selectList[this.tabItem].list[this.tabIndex3].value = this.tabIndexVal;
          if (this.tabIndex3 < this.selectList[this.tabItem].list.length - 1) {
            this.tabIndexVal = "";
            this.tabIndex3 += 1;
            if (this.tabItem === 0 && this.selectList[this.tabItem].list[this.tabIndex3].value) {
              this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex3].value;
            }
          }
        } else if (this.tabItem === 3) {
          this.selectList[this.tabItem].list[this.tabIndex4].value = this.tabIndexVal;
          if (this.tabIndex4 < this.selectList[this.tabItem].list.length - 1) {
            this.tabIndexVal = "";
            this.tabIndex4 += 1;
            if (this.tabItem === 0 && this.selectList[this.tabItem].list[this.tabIndex4].value) {
              this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex4].value;
            }
          }
        } else if (this.tabItem === 4) {
          this.selectList[this.tabItem].list[this.tabIndex5].value = this.tabIndexVal;
          if (this.tabIndex5 < this.selectList[this.tabItem].list.length - 1) {
            this.tabIndexVal = "";
            this.tabIndex5 += 1;
            if (this.tabItem === 0 && this.selectList[this.tabItem].list[this.tabIndex5].value) {
              this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex5].value;
            }
          }
        }
      } else if (type === 1) {
        if (this.tabItem === 0) {
          if (this.tabIndex1 > 0) {
            this.tabIndex1 -= 1;
          }
          this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex1].value;
        } else if (this.tabItem === 1) {
          if (this.tabIndex2 > 0) {
            this.tabIndex2 -= 1;
          }
          this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex2].value;
        } else if (this.tabItem === 2) {
          if (this.tabIndex3 > 0) {
            this.tabIndex3 -= 1;
          }
          this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex3].value;
        } else if (this.tabItem === 3) {
          if (this.tabIndex4 > 0) {
            this.tabIndex4 -= 1;
          }
          this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex4].value;
        } else if (this.tabItem === 4) {
          if (this.tabIndex5 > 0) {
            this.tabIndex5 -= 1;
          }
          this.tabIndexVal = this.selectList[this.tabItem].list[this.tabIndex5].value;
        }

      }
    },

    getTabId(type){
      let that = this;
      if(type == 1){
        this.tabId = type;
      } else {
        this.tabId = type;
        let url = "/api/datection/select";
        let data = {};
        HTTP.get(url, data, res => {
          if(res.data[0].rate < 1){
            this.resultNum = res.data[0].rate*100;
            this.dialogVisible = true;
            let dataList = this.formData[0].list.concat(this.formData[1].list).concat(this.formData[2].list).concat(this.formData[3].list).concat(this.formData[4].list);
            setTimeout(()=>{
              for(let i = 0;i<dataList.length;i++){
                that.$refs.scheduleHtml.innerHTML += `<p>${dataList[i].title}</p>`
              }
            },500)

            this.getDetectionList();

          }
        }, false)
      }

    },


    handleClose() {
      this.dialogVisible = true;
    },

    handleAvatarSuccess(res) {
      console.log(res.url,'res')
      this.ruleForm.muZip = res.url;
    },
    httpRequest(param) {
      const fileObj = param.file // 相当于input里取得的files
      this.fileName = param.file.name;
      this.fd = new FormData()
      this.fd.append('muZip', fileObj)// 文件对象
      this.$message.success("上传成功")
    },
    handlePreview(){

    },
    // listTab(type){
    //   this.tabItem();
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(!this.ruleForm.phone) {
          this.$message.warning("请输入您的联系方式")
          return false;
        }
        if(!this.ruleForm.title) {
          this.$message.warning("请输入项目名称")
          return false;
        }
        if(!this.fileName) {
          console.log('muZip:',this.fileName)
          this.$message.warning("请上传项目文件")
          return false;
        }

        if (valid) {
          let url = "/api/datection/upload";
          this.fd.append('phone', this.ruleForm.phone)
          this.fd.append('title', this.ruleForm.title)
          this.fd.append('describes', this.ruleForm.describes)
          this.fd.append('state', 0);
          HTTP.post(url, this.fd, res => {
            if (res.code == 0) {
              this.dialogVisible = true;
              this.getDetectionList()
            } else {
              this.$message.error(res.msg);
            }

          }, false)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    jiance() {
      if (!this.tabIndexVal) {
        return false;
      }
      this.$message.success("提交成功");
      // location.reload()
      // this.$router.push("/")
    },

    getDetectionList() {

      // console.log(dataList,111111)
      let ccet = setInterval(() => {
        if (this.resultNum < 100) {
          this.resultNum += 1;


          // if(this.resultNum){
          //   // this.formData
          // }

          if (this.$refs.scheduleHtml) {

            this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[0].list[this.resultNum].title}</p>`
            if (this.resultNum < 10) {
              this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[0].list[this.resultNum].title}</p>`
              // console.log(this.formData[0][this.resultNum])
            } else if (this.resultNum < 30) {
              this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[1].list[this.resultNum - 10].title}</p>`
              // console.log(this.formData[0][this.resultNum])
            } else if (this.resultNum < 50) {
              this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[2].list[this.resultNum - 30].title}</p>`
              // console.log(this.formData[0][this.resultNum])
            } else if (this.resultNum < 70) {
              this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[3].list[this.resultNum - 50].title}</p>`
              // console.log(this.formData[0][this.resultNum])
            } else if (this.resultNum < 90) {
              this.$refs.scheduleHtml.innerHTML += `<p>${this.formData[4].list[this.resultNum - 70].title}</p>`
              // console.log(this.formData[0][this.resultNum])
            }


            this.$refs.scheduleHtml.scrollTo({
              top: this.resultNum * 24,
              behavior: "smooth"
            });
          }


        } else {
          this.$message.success("项目自检完成，进入人工复检。")
          this.dialogVisible = false;
          clearInterval(ccet);
        }
      }, 86400)
    },


  },
  created() {
    this.getDetectionList();
  }
}
</script>

<style scoped lang="scss">
.bg-img {
  background-image: url('./../assets/image/rjjc/jiance-bg.png');
}

.tab-con {
  margin-bottom: .4rem;
  padding: .9rem .3rem .4rem;
  display: flex;
  justify-content: center;

  span {
    font-size: .3rem;
    padding: 0 50px;
    color: #76BEE0;
    cursor: pointer;
    opacity: .8;
    //text-shadow: 0 0 5px #76BEE0;
  }

  span.active {
    color: #FFFFFF;
    opacity: 1;
    text-shadow: 0 0 15px #76BEE0;
  }
}


.body-con {
  background-image: url("./../assets/image/rjjc/jc-bg.png");
  background-size: 100% 100%;
  min-height: 90vh;
  margin-bottom: -40px;
  padding-bottom: .4rem;

  img {
    mix-blend-mode: screen;
    //mix-blend-mode: lighten;
  }

  .zizhu-con {
    width: 98%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color: #FFFFFF;

    //动画盒子样式 Sta###########################
    .jc-class {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      $width: 5rem;
      width: $width;
      height: $width;

      img {
        position: absolute;
      }

      .center-text {
        font-size: .4rem;
        color: #fff;
        position: absolute;
        z-index: 99;
        font-weight: bold;
      }

      .item-dev {
        position: absolute;
        width: calc(100% + 20px);
        height: .8rem;
        left: -10px;
        z-index: 99;
        color: #FFFFFF;
        cursor: pointer;


        div {
          background-image: url("./../assets/image/rjjc/jc-center4.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: .9rem;
          height: .9rem;
          transform-origin: center;
          font-size: .14rem;
          line-height: .18rem;
        }

      }

      .active-con {
        width: 62%;
        transform-origin: center;
        transition: all .3s;
        z-index: 9;

        img {
          transform: rotate(-38deg);
          width: .3rem;
        }
      }

      .active-con1 {
        transform: rotate(37deg);
      }

      .active-con2 {
        transform: rotate(112deg);
      }

      .active-con3 {
        transform: rotate(182deg);
      }

      .active-con4 {
        transform: rotate(254deg);
      }

      .active-con5 {
        transform: rotate(327deg);
      }

      .item-dev-rotate1 {
        transform: rotate(34deg);
      }

      .item-dev1 {
        transform: rotate(-34deg);
      }

      .item-dev-rotate2 {
        transform: rotate(106deg);
      }

      .item-dev2 {
        transform: rotate(-106deg);
      }

      .item-dev-rotate3 {
        transform: rotate(178deg);
      }

      .item-dev3 {
        transform: rotate(-178deg);
      }

      .item-dev-rotate4 {
        transform: rotate(250deg);
      }

      .item-dev4 {
        transform: rotate(-250deg);
      }

      .item-dev-rotate5 {
        transform: rotate(322deg);
      }

      .item-dev5 {
        transform: rotate(-322deg);
      }

      .item-dev-act {
        background-image: url("./../assets/image/rjjc/jc-center3.png") !important;
      }


      .center-img-1 {
        width: calc($width / 1);
      }

      .center-img-2 {
        width: calc($width / 1);
        z-index: 10;
        animation: xuanzhuan 10s linear infinite;
      }

      @keyframes xuanzhuan {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(-360deg);
        }
      }

      .center-img-3 {
        width: 100%;
        mix-blend-mode: screen;
        animation: xuanzhuan1 10s linear infinite;
      }

      @keyframes xuanzhuan1 {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }


    }

    //动画盒子样式 End ###############################

    .jc-input-list {
      background-image: url("./../assets/image/rjjc/input-list.png");
      margin-left: 1.2rem;
      background-size: 100% 100%;
      padding: .66rem 1.17rem .5rem .92rem;

      .jc-title {
        display: flex;
        align-items: center;
        margin-bottom: .2rem;

        span {
          width: .14rem;
          height: .14rem;
          background: #00E4FF;
          border-radius: 50%;
          margin-right: .14rem;
        }

        h4 {
          font-size: .2rem;
          color: #00E2FF;
        }
      }

      .jc-item-con {
        border-left: 1px solid #0096FF;
        padding-left: .06rem;
        height: .5rem;

        > div {
          background: transparent;
          border: 1px solid;
          height: .5rem;
          line-height: .5rem;
          border-image: linear-gradient(-36deg, rgba(0, 156, 255, 0.9400), rgba(0, 156, 255, 0.9400)) 2 2;
          display: flex;

          .jc-item-num {
            width: .5rem;
            height: .5rem;
            background: rgba(0, 132, 255, .3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-size: .16rem;
            text-shadow: 0 0 15px #FFFFFF;
          }

          .jc-item-text {
            padding: 0 .14rem;
            color: #FFFFFF;
          }
        }
      }

      .jc-item-option {
        padding: .6rem 0 .6rem;
        min-height: 1.7rem;

        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #2FCADD;

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          div > div {
            width: .14rem;
            height: .14rem;
            border: 2px solid rgba(0, 156, 255, 0.94);
            border-radius: 50% !important;
            margin-right: .1rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .tabIndexVal-con {
            text-shadow: 0 0 15px #FFFFFF;
          }

          .tabIndexVal-con div:after {
            content: "";
            position: absolute;
            background-color: rgba(0, 156, 255, 0.94);
            width: .06rem;
            height: .06rem;
            z-index: 99;
            border-radius: 50%;
          }
        }


      }

      .jc-option-con {
        display: flex;
        justify-content: center;

        div {
          height: .4rem;
          line-height: .4rem;
          color: #FFFFFF;
          padding: 0 0.3rem;
          cursor: pointer;
          margin: 0 .2rem;
          background: linear-gradient(4deg, rgba(0, 150, 255, 0.55), rgba(0, 150, 255, 0));
          border: 1px solid;
          border-image: linear-gradient(-36deg, rgba(0, 156, 255, 0.9400), rgba(0, 156, 255, 0.9400)) 2 2;
        }

        .end-btn {
          background-color: rgba(0, 233, 227, 1);
        }
      }

    }


  }


  .jif-con {
    background-color: #0A2A42;

    img {
      //mix-blend-mode: screen;
      mix-blend-mode: lighten;
    }
  }


}

.pingtai-jc-dev {
  background-image: url("./../assets/image/rjjc/input-list.png");
  background-size: 100% 100%;
  width: 96%;
  max-width: 1600px;
  margin: 0 auto;
  padding: .32rem .85rem .52rem;

  > div {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .gif-con {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50%;
    flex-direction: column;
    padding-bottom: .3rem;

    p {
      color: #FFFFFF;
      font-size: .16rem;
      text-shadow: 0 0 15px #FFFFFF;
      margin-top: -0.2rem;
    }
    span{
      color: #FFFFFF;
      margin-top: .1rem;
      height: .2rem;
    }

    .upload-demo {
      opacity: 0;
      position: absolute;
      z-index: 9;
      top: 50%;
      left: 50%;
      margin-top: -90px;
      margin-left: -180px;
    }

    .updata-img {
      width: 1.6rem;
      position: absolute;

      span {
        display: block;
        color: #FFFFFF;
        text-align: center;
        text-shadow: 0 0 15px #fff;
      }
    }

    .gif-img {
      mix-blend-mode: lighten;
      width: 7rem;

      img {
        width: 100%;
      }

    }
  }

}

.demo-ruleForm {
  margin-top: .6rem;
}

.jc-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.zd-input {
  background: transparent;
  border: 1px solid;
  border-image: linear-gradient(-36deg, rgba(0, 156, 255, 0.94), rgba(0, 156, 255, 0.94)) 2 2;
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  color: #FFFFFF;
  padding: 0 .1rem;
  font-size: .16rem;
}

.zd-textarea {
  background: transparent;
  border: 1px solid;
  border-image: linear-gradient(-36deg, rgba(0, 156, 255, 0.94), rgba(0, 156, 255, 0.94)) 2 2;
  width: 100%;
  height: 1.8rem;
  line-height: .2rem;
  color: #FFFFFF;
  padding: .1rem .1rem;
  outline: none;
  font-size: .16rem;
}


.tab-list {
  width: 100%;
  margin-bottom: .2rem;

  span {
    margin-right: 40px;
    cursor: pointer;
  }

  .item-active {
    color: #3291F8;
  }
}

.tab-h3 {
  border-left: 1px solid #D6D8DB;
  border-top: 1px solid #D6D8DB;
  border-right: 1px solid #D6D8DB;
  display: flex;
  padding: 20px;
  font-size: 18px;
  font-weight: normal;
  justify-content: center;
}

.tab-item {
  border-left: 1px solid #D6D8DB;
  border-top: 1px solid #D6D8DB;
  border-right: 1px solid #D6D8DB;
  display: flex;

  .item-lable {
    width: 80%;
    border-right: 1px solid #D6D8DB;
    padding: 20px;
  }

  .item-con {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
  }
}


//检测动画样式
.result-body {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1200px;
  height: 60vh;
  margin: 0 auto;
}

.result-con {
  width: 1.4rem;
  height: 1.4rem;
  background-color: #3291F8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: .4rem;
  font-weight: bold;
  position: relative;
  //background-image: url("./../assets/image/rjjc/jc.gif");
}

.result-con:after {
  width: 1.3rem;
  height: 1.3rem;
  position: absolute;
  box-sizing: border-box;
  top: .05rem;
  left: .05rem;
  //background-color: #FFFFFF;
  z-index: 9;
  content: "";
  animation: rotateCon 3s linear infinite;
  border-radius: 50%;
  border-top: 3px solid #FFFFFF;
  border-left: 3px solid #3291F8;
  border-right: 3px solid #3291F8;
}

@keyframes rotateCon {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

.result-text {
  width: calc(100% - 1.6rem);

  h5 {
    margin-bottom: .2rem;
  }

}

.schedule-con {
  width: 100%;
  margin-bottom: .5rem;
}

.schedule-center {
  height: .12rem;
  width: 100%;
  background-color: #ddd;
  border-radius: .15rem;
  display: flex;
  justify-content: space-around;
  //overflow: hidden;
  position: relative;
}

.schedule-list {
  transition: all .3s;
  width: 20%;
  height: 100%;
  border-radius: .15rem;
  background-color: #3291F8;
  position: absolute;
  left: 0;
  z-index: 1;
}

.schedule-text {
  position: relative;
  z-index: 2;
  width: .18rem;
  height: .18rem;
  border-radius: 50%;
  background-color: #FFFFFF;
  top: -0.03rem;
  border: 1px solid #999;
  left: 0;
  display: flex;
  justify-content: center;

  h3 {
    position: absolute;
    width: .6rem;
    top: .24rem;
  }
}

.center-con:after {
  content: "";
  background-color: #64C37C;
  position: absolute;
  width: .12rem;
  height: .12rem;
  top: .02rem;
  left: .02rem;
  border-radius: 50%;
}


.schedule-body {
  height: 2rem;
  overflow-y: auto;
  background-color: #ddd;
  border-radius: .04rem;
  padding: .2rem .14rem;
  box-sizing: border-box;

  p {
    //height: 24px;
    font-size: 14px;
    line-height: 24px;
  }

}

.tijiao-btn {
  background-image: url("./../assets/image/rjjc/tijiao-btn.png");
  background-size: 100% 100%;
  color: #FFFFFF;
  font-size: .2rem;
  height: .8rem;
  line-height: .8rem;
  width: 1.8rem;
  padding: 0;
  text-shadow: 0 0 15px #FFFFFF;
  font-weight: bold;
  margin: .6rem auto 0;
  text-align: center;
  cursor: pointer;
}


.jindu-con {
  display: flex;
  margin: .2rem 0 0 1.2rem;
  color: #FFFFFF;

  span {
    color: #00E9E3;
    opacity: 0.75;
    line-height: .2rem;
    margin-right: .12rem;
  }

  > div {
    background-color: rgba(0, 233, 227, .16);
    height: .2rem;
    padding: .03rem .1rem;
    flex: 1;
    border-radius: .1rem;
    overflow: hidden;

  }
}

.jindu-center {
  transition: all .3s;
  width: 100%;
  height: 100%;
  overflow: hidden;

  div {
    float: left;
    margin-right: 0.03rem;
    width: 0.7%;
    height: .14rem;
    background-color: rgba(0, 233, 227, 1);
  }
}

</style>
