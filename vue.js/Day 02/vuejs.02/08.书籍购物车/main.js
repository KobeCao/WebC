const app = new Vue({
  el: '#app',
  data: {
    books: [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-3',
        price: 128.00,
        count: 1
      },
    ]
  },
  methods: {
    // getFinalPrice(price) {
    // return '￥' + price.toFixed(2);
    // }
    increment(index) { // 在调用的时候传过来 index
      this.books[index].count++;
    },
    decrement(index) {
      this.books[index].count--;
    },
    removeClick(index) {
      this.books.splice(index,1);
    }
  },
  computed: {
    totalPrice() {
      // 1.普通的for循环
      // let totalPrice = 0;
      // for(let i = 0;i < this.books.length; i++) {
      //   totalPrice += this.books[i].price * this.books[i].count;  // 价格乘以数量
      // }
      // return totalPrice;

      // 2. for (let i in this.books)
      // for(let i in this.books) {
      //   const book = this.books[i];
      //   totalPrice += book.price * book.count
      // }
      // return totalPrice;

      // 3.for( let i 0f this.books)
      // let totalPrice = 0;
      // for( let item of this.books) {
      //   totalPrice += item.price * item.count 
      // }
      // return totalPrice;

      // reduce 高阶函数
      return this.books.reduce(function (preValue,book) {
        return preValue + book.price * book.count;
      },0)
    }
  },

  // 过滤器
  filters: {
    showPrice(price) { // 将要过滤的东西作为参数传入进去
      return '￥' + price.toFixed(2);
    }
  }
})    




