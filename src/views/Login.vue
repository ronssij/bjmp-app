<template>
  <div class="bg-bjmp-800 h-screen font-sans flex flex-wrap h-screen">
    <div class="bg-bjmp-800 w-1/2" >
      <img class="clear-both realtive object-cover h-full w-full opacity-25" :src="require('@/assets/bg.jpg')" alt="">
      <div class="absolute h-full  top-0 w-1/2 flex items-center justify-center" >
        <img class="w-5/12 select-none" :src="require('@/assets/bjmp-logo.png')" alt="BJMP-LOGO">
      </div>
    </div>
    <div class="w-1/2 bg-bjmp-100 flex items-center px-10" >
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div class="max-w-md w-full">
          <div class="mt-2" >
            <h2 class="text-4xl tracking-wider text-bjmp-800">
              Welcome to <span class="font-bold text-bjmp-900" > BJMP XI </span>
            </h2>
            <p class="text-sm leading-5 text-gray-600" >
              Welcome back!, Please Sign in account to continue.
            </p>
          </div>

          <div :class="{ 'hidden': visible, 'mt-6': !visible }" class="w-full text-center" >
            <p class="text-red-500 text-xs"> Invalid login credentials! </p>
          </div>

          <form class="my-8" @submit.prevent="login" >
            <div >
              <input v-model="form.username" class="shadow bg-white appearance-none rounded-none border w-full px-4 py-5 text-gray-700 leading-tight order-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-md sm:leading-5" id="username" type="text" placeholder="Username">
            </div>
            <div class="-mt-px">
              <input v-model="form.password" class="shadow bg-white appearance-none rounded-none border w-full px-4 py-5 text-gray-700 leading-tight order-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-md sm:leading-5" id="password" type="password" placeholder="Password">
            </div>
            <div class="flex items-center justify-between mt-8">
              <button type="submit" class="group relative w-full flex justify-center py-4 px-12 border border-transparent text-md leading-5 font-medium uppercase tracking-wider rounded-md text-white bg-bjmp-900 hover:bg-bjmp-800 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                <!-- <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-bjmp-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span> -->
                Sign in Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/utils/form'

export default {
  name: "Login",
  data () {
    return {
      visible: true,
      form: new Form({
        username: '',
        password: ''
      })
    }
  },
  methods: {
    login () {
      this.form.$clearErrors()
      this.form.$busy = true

      this.$api.post('/auth/login', {
        username: this.form.username,
        password: this.form.password
      })
      .then(({ data }) => {
        this.form.$busy = false
        this.$store.commit('auth/setToken', data.data)
        this.$router.replace({ name: 'about' })
      })
      .catch(err => {
        this.form.$busy = false
        if (err.response.status === 401) {
          this.form.$setErrors({ password: err.response.data.message })
        } else if (err.response.status === 422) {
          this.form.$setErrors(err.response.data.errors)
        }
      })
    }
  }
}
</script>
