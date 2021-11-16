module.exports = {
  async redirects() {
    return [
      {
        source: '/account/',
        destination: '/account/upload',
        permanent: true,
      },
    ]
  },
}