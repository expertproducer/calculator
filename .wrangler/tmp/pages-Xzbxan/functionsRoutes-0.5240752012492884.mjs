import { onRequestOptions as __api_contact_js_onRequestOptions } from "D:\\Calculator\\functions\\api\\contact.js"
import { onRequestPost as __api_contact_js_onRequestPost } from "D:\\Calculator\\functions\\api\\contact.js"
import { onRequest as __api_video_js_onRequest } from "D:\\Calculator\\functions\\api\\video.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contact_js_onRequestOptions],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api/video",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_video_js_onRequest],
    },
  ]