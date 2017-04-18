<template>
  <div class="document">
    <div class="text-center select-box">
      <select name="year" v-model="year" @change="getDays">
        <option v-for="item in years" v-bind:value="item">{{item}}年</option>
      </select>
      <select name="month" v-model="month" @change="getDays">
        <option v-for="item in months" v-bind:value="item">{{item}}月</option>
      </select>
      <select name="day" v-model="day" @change="setDate">
        <option v-for="item in days" v-bind:value="item">{{item}}日</option>
      </select>
    </div>
    <div class="text-center result">
      <p>选择的时间为{{year}}年{{month}}月{{day}}日，星期{{chinese[weekday]}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      let v = this,
        now = new Date(),
        [year, month, day, weekDay] = [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
          now.getDay()
        ];
      const monthsClassicfy = {
        bigMonth: [1, 3, 5, 7, 8, 10, 12],
        smallMonth: [4, 6, 9, 11],
        Feb: [2]
      };
      return {
        monthsClassicfy: monthsClassicfy,
        year: year,
        month: month,
        day: day,
        weekday: weekDay,
        years: v.getNumArray(year + 100, 1970),
        months: v.getNumArray(12),
        days: [],
        chinese: ['天', '一', '二', '三', '四', '五', '六'],
      }
    },
    created() {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.getDates()
    },
    methods: {
      getDates() {
        let v = this;
        // v.years = v.getNumArray(v.year+100,1970)
        v.getDays();
      },
      getNumArray(max, min = 1) {
        let v = this;
        let arr = [];
        for (let i = min; i < max + 1; i++) {
          arr.push(i)
        }
        return arr;
      },
      getMonthDays() {
        let v = this;
        if (v.monthsClassicfy.bigMonth.indexOf(v.month) > -1) {
          v.days = v.getNumArray(31);
        } else if (v.monthsClassicfy.smallMonth.indexOf(v.month) > -1) {
          v.days = v.getNumArray(30);
        } else if (v.year % 4 != 0 || v.year % 100 == 0 && v.year % 400 != 0) {
          v.days = v.getNumArray(28);
        } else {
          v.days = v.getNumArray(29);
        }
      },
      getDays() {
        let v = this;
        v.getMonthDays();
        v.years = v.getNumArray(v.year+100,1970)
        v.setDate();
      },
      setDate() {
        let v = this;
        v.weekday = new Date(v.year, v.month - 1, v.day).getDay();
      }
    },
}
</script>
