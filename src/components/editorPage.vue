<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="min-height: 400px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  props:{
    content: {}
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          'uploadImage': {
            fieldName: "file",
            server: 'https://admin.lyrjfwpt.cn/api/common/upload',
            headers: {
              token: localStorage.getItem("access_token")
            },
            customInsert(res, insertFn) {
              // res 即服务端的返回结果

              // 从 res 中找到 url alt href ，然后插图图片
              insertFn(res.url, res.name)
            },
          },
        }
      },
      mode: 'default', // or 'simple'
    }
  },
  methods: {

    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    this.html = this.content;
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  watch:{
    html(val){
      this.$emit("changeContetn",val)
    }
  }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
