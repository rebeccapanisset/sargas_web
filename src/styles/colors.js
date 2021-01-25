export default function Colors(opacity) {
  const colors = {
    clearWhite: '#f2f2f2',
    iceWhite: '#efefef',
    white: `rgba(255, 255, 255, ${opacity || 0.6})`,
    green: '#20818c',
    darkGreen: '#00535b',
    black: '#333',
    opacityBlack: `rgba(0, 0, 0, ${opacity || 0.3})`,
    red: '#b74949',
    gray: '#F5F5F5',
    gradient: {
      frist: '#23ccef',
      second: `rgba(0, 78, 87, ${opacity || 0.6})`,
      third: `rgba(64, 145, 255, ${opacity || 0.7})`,
    },
    orange: '#ff9000',
    primary: '#00535b',
    success: '#008D4C',
    alert: '#FFF3CD',
    danger: '#D73925',
    info: '#00ACD6',
    blue: '#ebf8ff',
  };
  return colors;
}
