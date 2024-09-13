export default {
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  expo: {
    extra: {
      eas: {
        slug: "agenda-saude-notificacao",
        projectId: "8f6fe5a9-362c-40b9-a370-a623c36156d8",
      },
    },
  },
};
