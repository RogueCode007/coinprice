new Vue({
  el: "#app",
  data() {
    return {
      info: null,
      errored: false,
      loading: true,
      rate: null,
      dollar: null
    }
  },
  created(){
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res)=> {
        this.info = res.data.bpi
        this.dollar = res.data.bpi.USD["rate_float"]
      })
      .catch(error=> {
        console.log(error)
        this.errored = true
      })
      .finally(()=> this.loading = false)
  },
  mounted(){
    fetch("http://apilayer.net/api/live?access_key=6c3655668d1f5442967eda5b31e4e0bf")
    .then(response => response.json())
    .then(data=> this.rate = data.quotes["USDNGN"])
    .catch(err => {
      console.log(err);
    });
  },
  filters:{
    parser: function(num){
     return num.toFixed(2)
    }
  }
})