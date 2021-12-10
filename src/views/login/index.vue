<template>
  <div class="login">
    <el-form
    class='login-form'
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    label-position="top"
  >
  <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" @keyup.native.enter="onSubmit"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" @keyup.native.enter="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        class="login-btn"
        @click="onSubmit"
        :loading="isLoginLoading"
      >登录{{isLoginLoading== true?'中...':''}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          { pattern: /^(\s+)?1\d{10}(\s+)?$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在6~18位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1 表单验证
        await (this.$refs.form as Form).validate()
        // 2 验证通过 - 提交表单
        this.isLoginLoading = true
        const { data } = await login(this.form)
        // 3 请求处理结果
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1 登录成功记录登录状态，状态需要全局访问（放到vuex容器中）
          // 2 然后在访问需要登录的页面的时候判断有没有登录状态（ 路由拦截器）
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang= 'scss' scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
