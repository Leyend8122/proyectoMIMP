export default ({ Vue }) => {
  //"https://springbootmimp-production.up.railway.app/programa/"; --produccion
  //"http://localhost:8080/programa/" --localhost
  Vue.prototype.$apiUrl = "http://localhost:8080/";
};
