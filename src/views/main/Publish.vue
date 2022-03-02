<template>
  <div class="publish-container">
    <!--面包导航区域  -->
    <breadcrumb></breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="article" label-width="40px">
        <!-- 标题 作者区域 -->
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="标题">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="作者">
              <el-input v-model="article.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 文章内容区域 -->
        <el-form-item label="内容">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="500"
            placeholder="请输入文章内容"
          ></el-tiptap>
          <!-- <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap> -->
          <!-- <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap> -->
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.images" class="upload-img">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/images"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="article.images" :src="article.images" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-radio-group>
        </el-form-item>

        <!-- 分类区域 -->
        <el-form-item label="分类">
          <el-select v-model="article.class_id" placeholder="请选择分类">
            <el-option label="小说文学" value=" 小说文学"></el-option>
            <el-option label="人文社科" value=" 人文社科"></el-option>
            <el-option label="历史传记" value=" 历史传记"></el-option>
            <el-option label="经济管理" value=" 经济管理"></el-option>
            <el-option label="学习教育" value=" 学习教育"></el-option>
            <el-option label="励志成功" value=" 励志成功"></el-option>
            <el-option label="生活时尚" value=" 生活时尚"></el-option>
            <el-option label="英文原版" value=" 英文原版"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(true)">发表</el-button>
          <el-button @click="onPublish(false)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { postArticle } from "@/api/article.js";

import {
  // necessary extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  CodeBlock,
  Link,
  TextAlign,
  Indent,
  TextColor,
  Preview,
  Fullscreen,
} from "element-tiptap";

// 富文本编辑器
import "element-tiptap/lib/index.css";

export default {
  components: {
    Breadcrumb,
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      article: {
        title: "",
        author: "",
        content: " ",
        images: null,
        class_id: null,
        draft: false,
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }), //标题
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true }), //下划线
        new Italic(), //斜体
        new Strike(), //删除线
        new ListItem(),
        new BulletList(), //无序列表
        new OrderedList(), //有序列表
        new Image(), //图片
        new CodeBlock(), //代码块
        new Link(), //连接
        new TextAlign(), //文本对齐
        new Indent(), //缩进
        new TextColor(), //文字样式
        new Preview(), //预览
        new Fullscreen(), //全屏
      ],
    };
  },
  computed: {},
  methods: {
    async onPublish(draft) {
      this.article.draft = draft;
      const { data: res } = await postArticle(this.article);
      console.log(this.article);
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error("文章发布失败");
      this.$message.success("文章发布成功");
      // console.log(this.$router)
      this.$router.push("/articleManage");
    },

    handleAvatarSuccess(res, file) {
      this.article.images = res.url;
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style  scoped>
.upload-img{
  border: 1px dashed;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>