const app = require('./src/app');
const port = process.env.PORT || 3000; // Render가 PORT를 주입함
app.listen(port, () => console.log(`Server listening on port ${port}`));
