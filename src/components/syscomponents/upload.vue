<template>
<div class="page-template">
    <p class="page-template-title">概况</p>
    <div class="page-template-content">
      <input type="file" ref="upload"> ok
      <button @click="submit">ddd</button>
      <button @click="uploadbase64">upload base64</button>
      
      <a href="http://localhost:8091/uploadpostcard?postcard=fileService/upload/11.jpg" download="postcard" > download</a>
<!-- group1/M00/00/00/wKgA9FuZypmAaOSkAAE227ZXheg860.jpg -->
      <a href="http://localhost:8091/download/?fileId=group1/M00/00/00/wKgA9FuZypmAaOSkAAE227ZXheg860.jpg" download="postcard" > download from fastdfs</a>
    </div>    
      <Treelist :treeData="treedata" root @select="getCurrentNode"></Treelist>
</div>
</template>

<script>
  export default {
    name: "upload",
    components: {
      // TreeList: () => import('./treeobj.vue')
    },
    data() {
        let self = this;
        return {
          treedata: [
          {
            title: '概况tree1',
            num: 10,
            children: [
              {
                title: 'tree2',
                num: 10,
                children: [{
                  title: 'tree3',
                  num: 10,
                  children: [{
                    title: 'tree4',
                    num: 10
                  },
                  {
                    title: 'tree5',
                    num: 10
                  },{
                    title: 'tree6',
                    num: 10
                  }]
                }]
              },
              {
                title: 'tree2',
                num: 10,
                children: [{
                  title: 'tree3',
                  num: 10,
                  children: [{
                    title: 'tree4',
                    num: 10
                  },
                  {
                    title: 'tree5',
                    num: 10
                  },{
                    title: 'tree6',
                    num: 10
                  }]
                }]
              }
            ]
          }, {
            title: 'tree1',
            num: 10,
            children: [
              {
                title: 'tree2',
                num: 10,
                children: [{
                  title: 'tree3',
                  num: 10,
                  children: [{
                    title: 'tree4',
                    num: 10
                  },
                  {
                    title: 'tree5',
                    num: 10
                  },{
                    title: 'tree6',
                    num: 10
                  }]
                }]
              },
              {
                title: 'tree2',
                num: 10,
                children: [{
                  title: 'tree3',
                  num: 10,
                  children: [{
                    title: 'tree4',
                    num: 10
                  },
                  {
                    title: 'tree5',
                    num: 10
                  },{
                    title: 'tree6',
                    num: 10
                  }]
                }]
              }
            ]
          }
          ],
          base64: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6"
        }
    },
    mounted() {},
    methods: {
       submit() {
           debugger
            console.log(this.$refs['upload'])
            var file = this.$refs['upload'];
            var formData = new FormData();
            formData.append('logo', file.files[0]);
            this.$post('http://127.0.0.1:8091/upload', formData)
       },
       getCurrentNode(val) {
         console.log(val)
       },
       uploadbase64(){
         this.$post('http://127.0.0.1:8091/uploadpostcard', {
           postcard: 'postcard',
           data: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6'
        }).then(res=> {
          debugger
        }).catch(err => {
          window.location.href = "http://127.0.0.1:8091/download/?fileId=group1/M00/00/00/wKgA9FuZypmAaOSkAAE227ZXheg860.jpg";
        })
       }
    }
  }
</script>

<style lang="stylus">
</style>
