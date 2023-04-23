interface ImportMetaEnv {
  VITE_OMNICOMM_LOGIN: string;
  VITE_OMNICOMM_PASSWORD: string;
  VITE_MAPBOX_TOKEN: string;
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
