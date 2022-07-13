module.exports = {
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/catalog/muzhskaya',
        permanent: true,
      },
    ];
  },
};
