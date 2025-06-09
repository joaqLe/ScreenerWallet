const app = require('./app');

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
