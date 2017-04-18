<template>
  <div>
    
    <div class="text-center select-box">
      <select name="province" v-model="provinceId" @change="getCities()">
        <option value="0">----请选择----</option>
        <option v-for="item in provinces" v-bind:value="item.id">{{item.name}}</option>
      </select>
      <select name="city" v-model="cityId" @change="getAreas()">
        <option value="0">----请选择----</option>
        <option v-for="item in cities" v-bind:value="item.id" v-bind:parentid="item.parentid">{{item.name}}</option>
      </select>
      <select name="aera" v-model="areaId" v-show="areas.length>0||cityId==0" @change="getLocation">
        <option value="0">----请选择----</option>
        <option v-for="item in areas" v-bind:value="item.id" v-bind:parentid="item.parentid">{{item.name}}</option>
      </select>
    </div>
    <div class="text-center result">
      <p>选择了：<span v-show="location.province">{{location.province}}{{location.city}}{{location.area}}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        title: '三级联动测试',
        lists: [],
        provinces: [],
        cities: [],
        areas: [],
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        location: {
          province: '',
          city: '',
          aera: ''
        }
      }
    },
    created() {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.getData()
    },
    methods: {
      getData(params) {
        let v = this
        if (!params) params = {}
          // 我们这里用全局绑定的 $api 方法来获取数据，方便吧~
        v.$api.get('/static/aera.json', params, function(r) {
          v.lists = r.result;
          v.getProvinces();
        })
      },
      getAeraArray(depth = 1, parentId = 0) {
        let [v, arr] = [this, []];
        for (let [i, area] of v.lists.entries()) {
          // console.log(area);
          if (area.depth == depth && parentId == area.parentid) {
            arr.push(area);
          }
        }
        return arr;
      },
      getProvinces() {
        let v = this;
        v.provinces = v.getAeraArray()
      },
      getCities() {
        let v = this;
        [v.cityId, v.aeraId, v.areas] = [0, 0, []];
        v.location.province='';
        v.cities = v.getAeraArray(2, v.provinceId);
      },
      getAreas() {
        let v = this;
        v.areaId = 0;
        v.areas = v.getAeraArray(3, v.cityId);
        v.location.province='';
        if(v.areas.length==0) v.getLocation();
      },
      getLocation() {
        let v = this;
        v.location = {
          province: v.getNameById(v.provinceId),
          city: v.getNameById(v.cityId),
          area: v.getNameById(v.areaId)
        }
      },
      getNameById(id) {
        let v = this;
        if (id == 0) {
          return ''
        }
        for (let [i, aera] of v.lists.entries()) {
          if (aera.id == id)
            return aera.name;
        }
        return ''
      }
    },
}
</script>
