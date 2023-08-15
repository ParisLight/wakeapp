
import apiConfig from "../api/apiConfig";

let alreadyRedirected = false;

export default defineNuxtRouteMiddleware((to, from) => {
 
  const token = window.localStorage.getItem('access-token');

  const router = useRouter()

  apiConfig.headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": 'application/json'
  };

  router.onError((error, to) => {
    if(error.message.includes('Failed to fetch dynamically imported module') || error){
      window.location = to.fullPath;
    }
  })

  if(!token && to.path !== '/' && to.path !== '/auth'){
    return navigateTo('/auth');
  }
  if((token && !alreadyRedirected) && (to.path === '/' || to.path === '/auth')){
    alreadyRedirected = true;
    return navigateTo('/servic')
  }
});
