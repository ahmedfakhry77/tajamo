export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");

  if (token.value) {
    // If authenticated, prevent access to login or register pages
    if (to.path.includes("login") || to.path.includes("register")) {
      return navigateTo("/"); // Redirect to home
    }
  } else {
    // If not authenticated, allow access only to login or register pages
    if (!to.path.includes("login") && !to.path.includes("register")) {
      return navigateTo("/login"); // Redirect to login
    }
  }
});
