import app from './app';
import { PORT } from './lib/env';
// import config from './config';

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Example app listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
