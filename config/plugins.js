module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "mailgun",
      providerOptions: {
        apiKey: env("MAILGUN_API_KEY"),
        domain: env("MAILGUN_DOMAIN"),
      },
      settings: {
        defaultFrom: env("EMAIL_DEFAULT_FROM"),
        defaultReplyTo: env("EMAIL_DEFAULT_REPLY_TO"),
        // testAddress: env("EMAIL_TEST_ADDRESS"),
      },
    },
  },
});
