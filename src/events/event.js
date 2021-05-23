export default [
  {
    name: 'SHOW_MESSAGE',
    callback: function (params) {
       this.$toasted.show(params.text, {
        theme: 'outline',
        position: 'top-right',
        duration: 5000 })
    },
  },
  {
    name: 'SHOW_ERROR',
    callback: function (params) {
    this.$toasted.error(params.text, {
      theme: 'outline',
      position: 'top-right',
      duration: 5000,
   })

      console.log('error')
    },
  },
  {
    name: 'LOADING',
    callback: function (flag) {
      this.$loading(flag)
    },
  },
]
