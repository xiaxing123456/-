<template>
  <div class="user-manage">
    <!-- 面包导航区域 -->
    <breadcrumb></breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card style="margin-top: 15px">
      <div>
        <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <el-col :span="9">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUserList'>
              <el-button slot="append" icon="iconfont icon-sousuo" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisble = true">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表区域 -->
    <el-table :data='userlist' border stripe>
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="职位" prop="position"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip effect="dark" content="修改信息" placement="top" >
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index,scope.row)" ></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showEditDialog()"></el-button>
          </el-tooltip>
          <!-- 发布哪些文章按钮 -->
          <el-tooltip effect="dark" content="发布文章历史" placement="top" :enterable='false'>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showEditDialog()"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 2, 5, 10]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    </el-card>

    <!-- 按钮对话框显示与隐藏 -->
    <el-dialog title="修改用户" :visible.sync="updateDialogVisble" width="50%" @close="updateaddDialogClosed">
      <el-form :model="updateForm" ref="updateFormRef" :rules="addFormRules" label-width="70px">
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input v-model="updateForm.account"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="姓名" prop="username">
          <el-input v-model="updateForm.username"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updateForm.phone"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="职位" prop="position">
          <el-input v-model="updateForm.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisble = false">取消</el-button>
        <el-button type="primary" @click="updadeUser">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editDialogVisble" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisble = false">取消</el-button>
        <el-button type="primary" @click="editDialogVisble = false">确定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加超级用户" :visible.sync="addDialogVisble" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="70px">
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input v-model="addForm.account"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="职位" prop="position">
          <el-input v-model="addForm.position"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisble = false">取消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  components:{
    Breadcrumb
  },
  data(){
    // 验证邮箱的规则
      var checkEmail = (rule,value,cb) =>{
        const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(regEmail.test(value)){
          //合法邮箱
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      }

      //验证手机号的规则
      var checkMobile = (rule,value,cb) =>{
        const regMobile = /^(0|86|17951)?(13[0-9]|15[123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)){
          //合法邮箱
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }
    return{
      //获取用户信息
      userlist:[],
      //获取用户列表参数
      queryInfo:{
        query:"",
        pagenum:1,
        pagesize:5,
      },
      //总人数
      total:0,

      //添加用户显示与隐藏
      addDialogVisble:false,

      //控制修改用户对话框的显示与隐藏
      updateDialogVisble:false,

      //控制修改用户对话框的显示与隐藏
      editDialogVisble:false,

      addForm:{
        account:'',
        username:'',
        password:'',
        email:'',
        phone:'',
        position:'',
      },
      updateForm:{
        account:'',
        username:'',
        password:'',
        email:'',
        phone:'',
        position:'',
        id:''
      },
      //添加用户的校验规则
      addFormRules:{
        account:[
          { required: true, message: '请输入用户名称', trigger: 'blur'},
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        username:[
          { required: true, message: '请输入用户名称', trigger: 'blur'},
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入用户密码', trigger: 'blur'},
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入用户邮箱', trigger: 'blur'},
          {validator:checkEmail,trigger:'blur'}
        ],
        phone:[
          { required: true, message: '请输入用户手机号', trigger: 'blur'},
          { validator:checkMobile, trigger: 'blur' }
        ]
      },



    }
  },
  //方法
  methods:{
    //查询所有用户信息
    async getUserList(){
      const {data:res} = await this.$http.post('/users',this.queryInfo)
      console.log(res)
      if(res.meta.status !==200) return this.$message.error('获取用户列表失败')
      this.userlist = res.datas.users
      this.total = res.datas.total
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //监听页码值 改变的事件
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed(){
      //关闭表单重置
      this.$refs.addFormRef.resetFields()
    },
    //点击确定按钮，添加新用户
    async addUser(){
      this.$refs.addFormRef.validate(async (valid) => {
        if(!valid) return
        //校验成功后发起添加用户的网络请求
        const {data:res} = await this.$http.post('/users/add',this.addForm)
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        //隐藏添加用户的对话框
        this.addDialogVisble = false
        // 重新获取用户列表数据
        this.getUserList()
        // console.log(this.addForm.mobile)
      })
    },

    //监听修改用户信息对话框关闭事件
    updateaddDialogClosed(){
      this.$refs.updateFormRef.resetFields()
    },
    handleEdit(index,row){
      console.log(index)
      console.log(row)
      this.updateDialogVisble = true
      let rows = {
        account:row.account,
        username:row.username,
        password:row.password,
        email:row.email,
        phone:row.phone,
        position:row.position,
        id:row.id,
        }
      this.updateForm = rows
    },
    async updadeUser(){
      this.$refs.updateFormRef.validate( async (valid) =>{
        if(!valid) return;
        const {data:res} = await this.$http.post('/users/update',this.updateForm)
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error('修改用户信息失败')
        this.$message.success('修改用户信息成功')
        //隐藏添加用户的对话框
        this.updateDialogVisble = false
        // 重新获取用户列表数据
        this.getUserList()
        // console.log(this.addForm.mobile)
      })
    },

    //编辑展示用户的对话框
    showEditDialog(){
      this.editDialogVisble = true
    }
  },
  //创造
  created(){
    this.getUserList()
  },
  //挂载
  mounted(){
    
  }
}
</script>

<style lang='less' scoped>

</style>