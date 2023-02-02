import Vue from 'vue'

export default () => {
  Vue.filter('parseDate', function (value) {
    if (!value) return '';

    const v = value instanceof Date ? value : new Date(value);

    return v.toLocaleString('nl-nl', {day: 'numeric', month: 'long', year: 'numeric'});
  })
}
