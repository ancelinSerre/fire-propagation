import express from "express";
import * as url from "url";

const app = express();
const port = 3000;

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Fire propagation app listening on port ${port}`);
});
