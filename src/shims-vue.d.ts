declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'vue-video-player'
declare module 'vue-aplayer' {
  import vueAplayer from 'vue-aplayer'
  export default vueAplayer
}
