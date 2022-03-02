<template>
  <div class="meInfo-container">
    <!--面包导航区域  -->
    <breadcrumb></breadcrumb>

    <el-container>
      <el-aside width="580px">
        <!-- 个人信息页 -->
        <el-row :gutter="40">
          <!-- 个人信息页 -->
          <el-col :span="12" class="box-col1">
            <el-card shadow="hover" class="box-card">
              <div class="display-info">
                <div class="headImg-info">
                  <img :src="meinfo.headImg" alt="" />
                </div>
                <div class="list-info">
                  <p class="name">{{ meinfo.username }}</p>
                  <p class="position">{{ meinfo.position }}</p>
                  <p class="welcome">欢迎来到ios管理后端</p>
                </div>
              </div>
              <div class="display-date">
                <p>登录地点:以后有空在写</p>
                <p>登录时间:以后有空在写</p>
              </div>
            </el-card>
          </el-col>
          <!-- 自己发布的文章 -->
          <el-col :span="12" class="box-col1-width">
            <el-card shadow="hover">
              <el-container style="height: 500px">
                <el-header height="40px">文章发布</el-header>
                <!-- 表格内容 -->
                <el-main>
                  <el-table
                    :data="meArticle"
                    height="496"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column prop="title" label="封面" width="140">
                      <template slot-scope="scope">
                        <el-image
                          v-if="scope.row.images != ''"
                          :src="scope.row.images"
                          style="width: 100px; height: 100px"
                          fit="fill"
                          :preview-src-list="[scope.row.images]"
                        ></el-image>
                        <img
                          v-else
                          style="width: 100px; height: 100px"
                          src="../../assets/images/noImg.jpg"
                          alt=""
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <el-table-column prop="title" label="状态">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 0" type="info"
                          >草稿</el-tag
                        >
                        <el-tag v-else-if="scope.row.status === 1"
                          >待审核</el-tag
                        >
                        <el-tag
                          v-else-if="scope.row.status === 2"
                          type="warning"
                          >审核</el-tag
                        >
                        <el-tag
                          v-else-if="scope.row.status === 3"
                          type="success"
                          >审核通过</el-tag
                        >
                        <el-tag
                          v-else-if="scope.row.status === 4"
                          type="danger"
                          >审核失败</el-tag
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="pubdate" label="发布时间">
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-card>
          </el-col>
        </el-row>
      </el-aside>
      <!--  -->
      <el-main style="padding: 0">
        <el-row :gutter="40">
          <el-col :span="12" class="box-col2">
            <el-card shadow="hover"> </el-card>
          </el-col>
          <el-col :span="12" class="box-col2-width">
            <el-card shadow="hover"> </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getUserArticle } from "@/api/article.js";
export default {
  components: {
    Breadcrumb,
  },
  props: ["meinfo"],

  data() {
    return {
      //传参
      queryInfo: {
        author: window.sessionStorage.getItem("username"),
      },
      //文章发布列表
      meArticle: [],
    };
  },
  computed: {},
  methods: {
    //加载用户文章
    async loadArticles() {
      console.log(this.queryInfo.author);
      const { data: res } = await getUserArticle(this.queryInfo);
      console.log(res);
      this.meArticle = res.data;
      console.log(this.meArticle);
    },
  },
  created() {
    this.loadArticles();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.content {
  min-width: 1200px;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  // 个让信息页
  .box-col1 {
    width: 580px;
    margin-bottom: 20px;
    .el-card {
      .display-info {
        width: 500px;
        display: flex;
        // justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        padding-bottom: 20px;
        .headImg-info {
          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
          }
        }
        .list-info {
          .name {
            font-size: 30px;
            font-weight: 500;
            margin-bottom: 20px;
          }
          .position {
            font-size: 20px;
            color: #999;
            margin-bottom: 20px;
          }
          .welcome {
            font-size: 20px;
            font-weight: 500;
          }
        }
      }
      .display-date {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        margin-bottom: 10px;
        > P {
          color: #999;
          margin-bottom: 10px;
        }
      }
    }
  }
  //文章发布页
  .box-col1-width {
    min-width: 580px;
    .el-header {
      font-size: 20px;
      font-weight: 600;
      padding: 0;
    }
    .el-main {
      padding: 0;
    }
  }

  .box-col2 {
    min-width: 700px;
    margin-bottom: 20px;
  }

  .box-col2-width {
    min-width: 700px;
  }
}
</style>