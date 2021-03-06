// 柱状图模块1
(function () {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2. 指定配置项和数据
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // 修改图表的大小
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: [
          "旅游行业",
          "教育培训",
          "游戏行业",
          "医疗行业",
          "电商行业",
          "社交行业",
          "金融行业"
        ],
        axisTick: {
          alignWithLabel: true
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12"
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2
          }
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "35%",
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5
        }
      }
    ]
  };
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4.让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})();

// 柱状图2
(function () {
  // 声明颜色数组
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  // 1实例化对象
  var myChart = echarts.init(document.querySelector
    ('.bar2 .chart'));
  // 2. 指定配置项和数据 
  option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
      // containLabel: true
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false
    },
    // 不显示y轴线和相关刻度
    yAxis: [
      {
        type: 'category',
        // 是否是反向坐标轴
        inverse: true,
        data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
        //不显示y轴线条
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff'
        }
      },
      // 第二组对象
      {
        inverse: true,
        data: [702, 350, 610, 793, 664],
        //不显示y轴线条
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff'
        }
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        data: [70, 34, 60, 78, 69],
        // 给series  第一个对象里面的 添加 
        yAxisIndex: 0,
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          //设置第一组柱子不同颜色
          color: function (params) {
            // console.log(params);
            // params 传进来的是柱子对象
            return myColor[params.dataIndex];
          }
        },
        // 显示柱子内的文字
        label: {
          show: true,
          // 图形内显示
          position: 'inside',
          // 文字的显示格式 {c} 会自动的解析为 数据 data里面的数据
          formatter: '{c}%'
        }
      },
      {
        name: '框',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 15,
        data: [100, 100, 100, 100, 100],
        // 给series  第二个对象里面的 添加 
        yAxisIndex: 1,
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15
        },
      }
    ]
  };
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4.让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})();

// 折线图模块制作
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector('.line .chart')),
    // 2. 指定配置项和数据
    option = {
      // 通过这个color修改两条线的颜色
      color: ['#00f2f1', ' #ed3f35'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        // 修改图例组件，文字颜色
        textStyle: {
          color: '#4c9bfd'
        },
        right: '10%' // 距离右边10%
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        show: true,// 显示边框
        borderColor: '#012f4a',// 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false  // 去除轴内间距
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false  // 去除刻度
        },
        axisLabel: {
          color: '#4c9bfd' // 文字颜色
        },
        axisLine: {
          shoe: false  // 去除轴线
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' // 分割线颜色
          }
        }
      },
      series: [
        {
          name: '新增粉丝',
          type: 'line',
          // 可以让我们的折线带有弧度
          smooth: true,
          data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        },
        {
          name: '新增游客',
          type: 'line',
          smooth: true,
          data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        },
      ]
    };
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4.让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})()