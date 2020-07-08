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
    fetch("https://openexchangerates.org/api/latest.json?app_id=8c743057d8194900901d5c64ecca5bc9&base=USD&symbols=NGN&prettyprint=true")
    .then(response => response.json())
    .then(data => this.rate = (data.rates.NGN))
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