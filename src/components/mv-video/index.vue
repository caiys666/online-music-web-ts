<template>
  <div class="mv">
    <div class="mv-video">
      <div
        class="video-item"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <video
          ref="mvVideo"
          :src="currentMv.url"
          :poster="mvItem.cover"
          muted
          @click="handleChangeVideo"
          @mousemove="handleChangeStyle"
        ></video>
        <div class="play-btn" v-show="isShowPauseBtn">
          <img
            src="../../assets/images/music@2x.png"
            alt=""
            @click="handleChangeVideo"
          />
        </div>
      </div>
      <div class="video-operation">
        <div class="progress">1</div>
        <div class="opera">
          <div class="opera__left">
            <i
              class="iconfont"
              :class="[!isPlay ? 'iconicon_play' : 'iconbofangzanting']"
              @click="handleChangeVideo"
            ></i>
            <span class="commend">00:00</span><span class="commend">/</span
            ><span class="commend">05:32</span>
          </div>
          <div class="opera__right">
            <el-dropdown
              class="commend"
              @command="handleDefinitionCommand"
              placement="top"
            >
              <div>{{ definitionText }}</div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in definitionList"
                  :key="index"
                  :command="item.br"
                  >{{ item.br }}p</el-dropdown-item
                >
              </el-dropdown-menu></el-dropdown
            >
            <el-dropdown
              class="commend speed"
              @command="handleSpeedCommand"
              placement="top"
            >
              <div>{{ speedText }}</div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in speedList"
                  :key="index"
                  :command="item.speed"
                  >{{ item.speed }}</el-dropdown-item
                >
              </el-dropdown-menu></el-dropdown
            >
            <div class="commend volume" @mouseleave="handleShow('')">
              <input
                v-if="isShowText === 'volumn'"
                type="range"
                v-model="volume"
                @change="handleVolume"
              />
              <i
                class="iconfont iconyinliang"
                @mouseover="handleShow('volumn')"
              ></i>
            </div>
            <div class="commend">
              <i class="iconfont iconshezhi"></i>
            </div>
            <div class="commend">
              <i class="iconfont iconpingmufangda"></i>
            </div>
            <div class="commend">
              <i class="iconfont iconquanping1"></i>
            </div>
            <div class="commend">
              <i class="iconfont iconquanping"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import "./index.less";

@Component
export default class MvVideo extends Vue {
  @Prop() private currentMv!: any;
  @Prop() private mvItem!: any;
  // video标签对象
  mvVideo: any = "";
  // 视频是否播放
  isPlay: boolean = false;
  // 是否显示暂停播放按钮
  isShowPauseBtn: boolean = true;
  // 显示控制
  isShowText: any = "";
  // 计时器
  timer: any = "";
  // 初始音量
  volume: any = 50;
  // 视频清晰度数组
  definitionList: any = [];
  // 选择清晰度的文字
  definitionText: string = "自动";
  // 视频加载
  loading: boolean = false;
  // 速度数组
  speedList: any = [
    { speed: "2.0x" },
    { speed: "1.5x" },
    { speed: "1.25x" },
    { speed: "1.0x" },
    { speed: "0.75x" },
    { speed: "0.5x" },
  ];
  // 速度文字
  speedText: string = "倍速";
  /** 获取video标签 */
  mounted() {
    this.mvVideo = this.$refs.mvVideo;
    this.mvVideo.volume = this.volume / 100;
    this.definitionList = this.mvItem.brs;
  }
  /** 改变音量设置 */
  //   handleChangeMuted() {
  //     this.mvVideo.muted = false;
  //     this.mvVideo.volume = 0.5;
  //   }
  /** 改变视频播放的参数函数 */
  handleChangeVideo() {
    this.mvVideo.muted = false;
    if (this.isPlay) {
      this.mvVideo.pause();
      this.isShowPauseBtn = true;
    } else {
      var videoPromise = this.mvVideo.play();
      //   while (videoPromise !== undefined) {
      if (videoPromise !== undefined) {
        videoPromise
          .then(() => {
            this.loading = false;
            console.log(11);
          })
          .catch(() => {
            this.loading = true;
            console.log(11);
          });
      }
      //   }
      this.isShowPauseBtn = false;
    }
    this.isPlay = !this.isPlay;
  }
  /** 鼠标移动改变样式 */
  handleChangeStyle() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.isShowPauseBtn = true;
    this.timer = setTimeout(() => {
      this.isShowPauseBtn = false;
    }, 1000);
  }
  handleDefinitionCommand(value: any) {
    this.definitionText = value + "p";
  }
  handleSpeedCommand(value: any) {
    this.speedText = value;
  }
  // 改变音量
  handleVolume() {
    this.mvVideo.volume = this.volume / 100;
  }
  /** 鼠标移动进行显示 */
  handleShow(text: string) {
    this.isShowText = text;
  }
}
</script>

<style scoped></style>
