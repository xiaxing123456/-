<template>
  <div class="article-container">
    <!--面包导航区域  -->
    <breadcrumb></breadcrumb>

    <!-- 塞选卡片1 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>塞选内容</span>
      </div>
      <!-- 文章塞选表单 -->
      <el-form ref="form" :model="queryInfo" label-width="40px" size="small">
        <!-- 内容管理状态 -->
        <el-form-item label="状态">
          <el-radio-group v-model="queryInfo.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 内容分类区域 -->
        <el-form-item label="分类">
          <el-select v-model="queryInfo.class_id" placeholder="请选择分类">
            <el-option label="全部" :value="null"></el-option>
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

        <!-- 文章发布日期 -->
        <!-- <el-form-item label="日期">
          <el-date-picker
            v-model="form.data1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item> -->

        <!-- 塞选按钮 -->
        <el-form-item>
          <el-button type="primary" @click="this.loadArticles">塞选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 文章内容卡片2 -->
    <el-card style="margin-top: 15px">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>根据塞选条件共查询到 {{ total_count }} 条结果</span>
      </div>

      <!-- 文章表格 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        :default-sort = "{prop:'pubdate',order: 'descending'}"
      >
        <el-table-column prop="cover" label="封面" width="180">
          <template slot-scope="scope">
            <!-- <img v-if="scope.row.cover.images" class="article-cover" :src="scope.row.cover.images" alt=""> -->
            <!-- <img v-else class="article-cover" src="@/assets/images/noImg.webp" alt=""> -->
            <el-image
              v-if="scope.row.cover.images"
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images"
              fit="fill"
              :preview-src-list="[scope.row.cover.images]"
            ></el-image>
            <img v-else style="width: 100px; height: 100px" src="../../assets/images/noImg.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="author" label="作者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="warning"
              >审核</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="danger"
              >审核失败</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" > </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tooltip effect="dark" content="修改信息" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getArticle } from "@/api/article";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      //文章表格数据
      articles: [
        // pubdate
      ],
      //文章请求参数
      queryInfo: {
        page: 1,
        per_page: 5,
        status: null,
        class_id: null,
      },
      //文章总数
      total_count: null,
    };
  },
  computed: {},
  methods: {
    //获取文章数据
    async loadArticles() {
      const { data: res } = await getArticle(this.queryInfo);
      // const {data:res} = await this.$http.get('/article',{params:{page:2}})
      res.data.results.forEach((item) => {
        item.pubdate = item.pubdate.replace('Z','').replace('T','/')
      });
      console.log(res);
      this.articles = res.data.results;
      this.total_count = res.data.total_count;
    },
    //监听pape改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.loadArticles();
    },
    //监听per_page改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.per_page = newSize;
      this.loadArticles();
    },
  },
  created() {
    //调用文章数据
    this.loadArticles();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.article-cover {
  width: 50%;
  background-size: cover;
}
</style>