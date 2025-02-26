import ReactECharts from 'echarts-for-react';

const options = {
  title: {
    text: 'Ejemplo de Gráfico',
  },
  tooltip: {},
  xAxis: {
    data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
  },
  yAxis: {},
  series: [
    {
      name: 'Ventas',
      type: 'bar',
      data: [5, 20, 36, 10, 10],
    },
  ],
};

const MyChart = () => <ReactECharts option={options} />;

export default MyChart;
