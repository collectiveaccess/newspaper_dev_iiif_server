const express = require("express");
const Database = require("better-sqlite3");
const path = require("node:path");
var cors = require("cors");

const db_utils = require("./db_utils");
const manifest_utils = require("./manifest_utils");

const app = express();
const port = 3000;
const db = new Database(path.join("tmp", "database.db"));

// body-parser is now deprecated as of Express 4.16+
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

function format_url(req) {
  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;
  return { base_url, url };
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/fixtures/newspaper/issue_1", (req, res) => {
  const { base_url, url } = format_url(req);
  res.send(manifest_utils.makeIssue1Manifest(base_url, url));
});

app.get("/api/newspaper_search/:id", (req, res) => {
  const id = req.params.id;
  if (id == undefined || typeof id !== "string") {
    return res.send({ errror: "missing id" });
  }

  const searchTerm = req.query.q;
  if (searchTerm == undefined || typeof searchTerm !== "string") {
    return res.send({ errror: "missing search term" });
  }

  const { base_url, url } = format_url(req);
  res.send(
    manifest_utils.makeContentSearchManifest(id, searchTerm, base_url, url)
  );
});

app.get("/api/annotations/:id", async (req, res) => {
  const objectId = req.params.id;
  const token = req.headers.authorization?.replace("Bearer ", "");
  // const token = "123abc";

  if (objectId == undefined || typeof objectId !== "string") {
    return res.send({ errror: "missing id" });
  }
  if (token === undefined) {
    return res.send({ error: "no token" });
  }

  let annotations = await db_utils.fetchAnnotationsByObject(
    db,
    objectId,
    token
  );
  annotations = annotations.map(manifest_utils.appendImage);

  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;

  res.send(manifest_utils.formatAnnotationPage(annotations, url));
});

app.post("/api/annotationsByCanvas/:id", async (req, res) => {
  const objectId = req.params.id;
  const token = req.headers.authorization?.replace("Bearer ", "");
  // const token = "123abc";
  const { canvas, annotation } = req.body;

  if (canvas === undefined) {
    return res.send({ error: "no canvas" });
  }
  if (token === undefined) {
    return res.send({ error: "no token" });
  }

  // fetch
  if (req.query.action === "GET") {
    const annotations = await db_utils.fetchAnnotationsByObjectCanvas(
      db,
      canvas,
      objectId,
      token
    );

    let base_url = req.protocol + "://" + req.get("host");
    let url = `${base_url}${req.originalUrl}`;
    return res.send(manifest_utils.formatAnnotationPage(annotations, url));

    // create
  } else if (req.method === "POST") {
    await db_utils.createAnnotation(db, annotation, canvas, objectId, token);

    return res.send({ message: "create annotation" });
  } else {
    return res.send({ message: "invalid request" });
  }
});

app.delete("/api/annotationsByCanvas/:id", async (req, res) => {
  const { annotation } = req.body;

  await db_utils.deleteAnnotation(db, annotation);

  res.send({ message: "annotation is deleted" });
});

app.put("/api/annotationsByCanvas/:id", async (req, res) => {
  const { annotation } = req.body;

  await db_utils.updateAnnotation(db, annotation);

  res.send({ message: "annotation is updated" });
});

app.get("/api/pdf", (req, res) => {
  const { base_url, url } = format_url(req);
  res.send(manifest_utils.makePdfManifest(base_url, url));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
