const express = require("express");
const textCoordintes = require("./text_coordinates.json");
const Database = require("better-sqlite3");
const path = require("node:path");
var cors = require("cors");

const app = express();
const port = 3000;
const db = new Database(path.join("tmp", "database.db"));

// body-parser is now deprecated as of Express 4.16+
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/newspaper/collection", (req, res) => {
  function makeManifest(base_url, url) {
    return {
      "@context": ["http://iiif.io/api/presentation/3/context.json"],
      id: url,
      type: "Collection",
      label: {
        de: ["Berliner Tageblatt"],
      },
      items: [
        {
          id: `${base_url}/api/newspaper/issue_1`,
          type: "Manifest",
          label: {
            de: ["1. Berliner Tageblatt - 1925-02-16"],
          },
        },
        {
          id: `${base_url}/api/newspaper/issue_2`,
          type: "Manifest",
          label: {
            de: ["2. Berliner Tageblatt - 1925-03-13"],
          },
        },
      ],
    };
  }

  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;
  res.send(makeManifest(base_url, url));
});

app.get("/api/newspaper/issue_1", (req, res) => {
  function makeManifest(base_url, url) {
    return {
      "@context": ["http://iiif.io/api/presentation/3/context.json"],
      id: url,
      type: "Manifest",
      label: {
        de: ["1. Berliner Tageblatt - 1925-02-16"],
      },
      thumbnail: [
        {
          id: "https://api.europeana.eu/api/v2/thumbnail-by-url.json?uri=https%3A%2F%2Fiiif.europeana.eu%2Fimage%2F2YMIN6YXMQ6COVM5AO2XKB5KMCKPMT2YKEKNMAGHVRBIHOOY4AVA%2Fpresentation_images%2F9340afd0-ffe2-11e5-b68d-fa163e60dd72%2Fnode-2%2Fimage%2FSBB%2FBerliner_Tageblatt%2F1925%2F02%2F16%2F0%2FF_SBB_00001_19250216_054_079_0_001%2Ffull%2Ffull%2F0%2Fdefault.jpg&type=TEXT",
          type: "Image",
          format: "image/jpeg",
          height: 300,
          width: 300,
        },
      ],
      partOf: [
        {
          id: `${base_url}/api/newspaper/collection`,
          type: "Collection",
          label: {
            de: ["Berliner Tageblatt"],
          },
        },
      ],
      items: [
        {
          id: `${base_url}/api/newpaper/canvas/i1p1`,
          type: "Canvas",
          height: 5000,
          width: 3602,
          label: {
            none: ["p. 1"],
          },
          items: [
            {
              id: `${base_url}/api/newpaper/items/AnnotationPage/i1p1`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${url}/api/newpaper/items/Annotation/i1p1a1`,
                  type: "Annotation",
                  motivation: "painting",
                  body: {
                    id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1/full/max/0/default.jpg",
                    type: "Image",
                    format: "image/jpeg",
                    service: [
                      {
                        id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1",
                        type: "ImageService3",
                        profile: "level1",
                      },
                    ],
                  },
                  target: `${base_url}/api/newpaper/canvas/i1p1`,
                },
              ],
            },
          ],
          annotations: [
            {
              id: `${base_url}/api/newpaper/annotations/AnnotationPage/i1p1ap1`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${base_url}/api/newpaper/annotations/Annotation/i1p1ap1a1`,
                  type: "Annotation",
                  motivation: "commenting",
                  body: {
                    type: "TextualBody",
                    format: "text/plain",
                    language: "en",
                    value: "This is issue 1, page 1",
                  },
                  target: `${base_url}/api/newpaper/canvas/i1p1#xywh=1300,400,200,400`,
                },
              ],
            },
            {
              id: `${base_url}/api/annotations/1`,
              type: "AnnotationPage",
            },
          ],
        },
        {
          id: `${base_url}/api/newpaper/canvas/i1p2`,
          type: "Canvas",
          height: 4999,
          width: 3536,
          label: {
            none: ["p. 2"],
          },
          items: [
            {
              id: `${base_url}/api/newpaper/items/AnnotationPage/i1p2`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${url}/api/newpaper/items/Annotation/i1p2`,
                  type: "Annotation",
                  motivation: "painting",
                  body: {
                    id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p2/full/max/0/default.jpg",
                    type: "Image",
                    format: "image/jpeg",
                    service: [
                      {
                        id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p2",
                        type: "ImageService3",
                        profile: "level1",
                      },
                    ],
                  },
                  target: `${base_url}/api/newpaper/canvas/i1p2`,
                },
              ],
            },
          ],
          annotations: [
            {
              id: `${base_url}/api/annotations/1`,
              type: "AnnotationPage",
            },
          ],
        },
      ],
      service: [
        {
          id: `${base_url}/api/newspaper_search/1`,
          type: "SearchService2",
        },
      ],
    };
  }

  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;
  res.send(makeManifest(base_url, url));
});

app.get("/api/newspaper/issue_2", (req, res) => {
  function makeManifest(base_url, url) {
    return {
      "@context": ["http://iiif.io/api/presentation/3/context.json"],
      id: url,
      type: "Manifest",
      label: {
        de: ["1. Berliner Tageblatt - 1925-02-16"],
      },
      thumbnail: [
        {
          id: "https://api.europeana.eu/api/v2/thumbnail-by-url.json?uri=https%3A%2F%2Fiiif.europeana.eu%2Fimage%2F3UU6R3RRZZGU2VNISCQX7N474GR7X4VMGYBTIWV2SNCBRGSR2WAA%2Fpresentation_images%2Fea1ba210-ffd3-11e5-b68d-fa163e60dd72%2Fnode-2%2Fimage%2FSBB%2FBerliner_Tageblatt%2F1925%2F03%2F13%2F0%2FF_SBB_00001_19250313_054_123_0_001%2Ffull%2Ffull%2F0%2Fdefault.jpg&type=TEXT",
          type: "Image",
          format: "image/jpeg",
          height: 300,
          width: 300,
        },
      ],
      partOf: [
        {
          id: `${base_url}/api/newspaper/collection`,
          type: "Collection",
          label: {
            de: ["Berliner Tageblatt"],
          },
        },
      ],
      items: [
        {
          id: `${base_url}/api/newpaper/canvas/i2p1`,
          type: "Canvas",
          height: 5000,
          width: 3517,
          label: {
            none: ["p. 1"],
          },
          items: [
            {
              id: `${base_url}/api/newpaper/items/AnnotationPage/i2p1`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${url}/api/newpaper/items/Annotation/i2p1a1`,
                  type: "Annotation",
                  motivation: "painting",
                  body: {
                    format: "image/jpeg",
                    id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-issue2-p1/full/max/0/default.jpg",
                    service: [
                      {
                        id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-issue2-p1/",
                        profile: "level1",
                        type: "ImageService3",
                      },
                    ],
                    type: "Image",
                  },
                  target: `${base_url}/api/newpaper/canvas/i2p1`,
                },
              ],
            },
          ],
          annotations: [
            {
              id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p1ap1`,
              items: [
                {
                  body: {
                    format: "text/plain",
                    language: "de",
                    type: "TextualBody",
                    value: "Berliner",
                  },
                  id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p1ap1a1`,
                  motivation: "highlighting",
                  target: `${base_url}/api/newpaper/canvas/i2p1#xywh=184,558,1052,322`,
                  type: "Annotation",
                },
                {
                  body: {
                    format: "text/plain",
                    language: "de",
                    type: "TextualBody",
                    value: "Berliner",
                  },
                  id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p1ap2`,
                  motivation: "highlighting",
                  target: `${base_url}/api/newpaper/canvas/i2p1#xywh=2123,1645,117,27`,
                  type: "Annotation",
                },
                {
                  body: {
                    format: "text/plain",
                    language: "de",
                    type: "TextualBody",
                    value: "Berliner",
                  },
                  id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p1ap3`,
                  motivation: "highlighting",
                  target: `${base_url}/api/newpaper/canvas/i2p1#xywh=2399,2207,170,40`,
                  type: "Annotation",
                },
              ],
              label: {
                en: ["Search results"],
              },
              type: "AnnotationPage",
            },
            {
              id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p1ap2`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${base_url}/api/newpaper/annotations/Annotation/i2p1ap2a1`,
                  type: "Annotation",
                  motivation: "commenting",
                  body: {
                    type: "TextualBody",
                    format: "text/plain",
                    language: "en",
                    value: "This is issue 2, page 1",
                  },
                  target: `${base_url}/api/newpaper/canvas/i2p1#xywh=1300,560,200,350`,
                },
              ],
            },
            {
              id: `${base_url}/api/annotations/2`,
              type: "AnnotationPage",
            },
          ],
        },
        {
          id: `${base_url}/api/newpaper/canvas/i2p2`,
          type: "Canvas",
          height: 5000,
          width: 3502,
          label: {
            none: ["p. 2"],
          },
          items: [
            {
              id: `${base_url}/api/newpaper/items/AnnotationPage/i2p2`,
              type: "AnnotationPage",
              items: [
                {
                  id: `${url}/api/newpaper/items/Annotation/i2p2`,
                  type: "Annotation",
                  motivation: "painting",
                  body: {
                    format: "image/jpeg",
                    id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-issue2-p2/full/max/0/default.jpg",
                    service: [
                      {
                        id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-issue2-p2",
                        profile: "level1",
                        type: "ImageService3",
                      },
                    ],
                    type: "Image",
                  },
                  target: `${base_url}/api/newpaper/canvas/i2p2`,
                },
              ],
            },
          ],
          annotations: [
            {
              id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p2ap1`,
              items: [
                {
                  body: {
                    format: "text/plain",
                    language: "de",
                    type: "TextualBody",
                    value: "Berliner",
                  },
                  id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p2ap1a1`,
                  label: {
                    en: ["Search results"],
                  },
                  motivation: "highlighting",
                  target: `${base_url}/api/newpaper/canvas/i2p2#xywh=1134,768,106,25`,
                  type: "Annotation",
                },
                {
                  body: {
                    format: "text/plain",
                    language: "de",
                    type: "TextualBody",
                    value: "Berliner",
                  },
                  id: `${base_url}/api/newpaper/annotations/AnnotationPage/i2p2ap1a2`,
                  label: {
                    en: ["Search results"],
                  },
                  motivation: "highlighting",
                  target: `${base_url}/api/newpaper/canvas/i2p2#xywh=3301,4156,96,22`,
                  type: "Annotation",
                },
              ],
              type: "AnnotationPage",
              label: {
                en: ["Search results"],
              },
            },
            {
              id: `${base_url}/api/annotations/2`,
              type: "AnnotationPage",
            },
          ],
        },
      ],
    };
  }

  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;
  res.send(makeManifest(base_url, url));
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

  function makeManifest(id, searchTerm, base_url, url) {
    const manifest = {
      "@context": "http://iiif.io/api/search/2/context.json",
      id: url,
      type: "AnnotationPage",
      items: [],
    };

    textCoordintes.forEach((page) => {
      if (page.issue !== Number(id)) {
        return;
      }

      const matches = page.strings[searchTerm];
      if (matches) {
        matches.forEach((match) => {
          const [stringId, x, y, w, h] = match;
          if (manifest.items) {
            manifest.items.push({
              id: `${base_url}/api/newspaper/annotation/${stringId}`,
              type: "Annotation",
              motivation: "highlighting",
              body: {
                type: "TextualBody",
                value: searchTerm,
                format: "text/plain",
              },
              label: {
                none: [`p. ${page.page}`],
              },
              target: `${base_url}/api/newpaper/canvas/i${id}p${page.page}#xywh=${x},${y},${w},${h}`,
            });
          }
        });
      }
    });
    return manifest;
  }

  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;
  res.send(makeManifest(id, searchTerm, base_url, url));
});

app.get("/api/annotations/:id", async (req, res) => {
  const objectId = req.params.id;
  // const token = req.headers.authorization?.replace("Bearer ", "");
  const token = "123abc";

  if (objectId == undefined || typeof objectId !== "string") {
    return res.send({ errror: "missing id" });
  }
  if (token === undefined) {
    return res.send({ error: "no token" });
  }

  const annotations = await fetchAnnotations(objectId, token);
  let base_url = req.protocol + "://" + req.get("host");
  let url = `${base_url}${req.originalUrl}`;

  function makeManifest(annotations, url) {
    return {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      id: url,
      type: "AnnotationPage",
      label: { none: ["Clippings"] },
      items: annotations,
    };
  }

  res.send(makeManifest(annotations, url));
});

async function fetchAnnotations(objectId, token) {
  let annotations = [];

  const stmt = db.prepare(
    `SELECT annotation FROM annotations WHERE object_id = ? AND token = ?;`
  );
  const rows = stmt.all(objectId, token);

  if (rows.length > 0) {
    annotations = rows.map((row) => {
      const annotation = JSON.parse(row.annotation);
      if (Array.isArray(annotation.body)) {
        annotation.body = [
          {
            id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1/full/150,/0/default.jpg",
            type: "Image",
            format: "image/jpeg",
          },
        ].concat(annotation.body);
      } else {
        annotation.body = [
          {
            id: "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1/full/150,/0/default.jpg",
            type: "Image",
            format: "image/jpeg",
          },
          annotation.body,
        ];
      }
      return annotation;
    });
  }

  return annotations;
}

app.post("/api/annotationsByCanvas/:id", async (req, res) => {
  const objectId = req.params.id;
  // const token = req.headers.authorization?.replace("Bearer ", "");
  const token = "123abc";
  const { canvas, annotation } = req.body;

  if (canvas === undefined) {
    return res.send({ error: "no canvas" });
  }
  if (token === undefined) {
    return res.send({ error: "no token" });
  }

  // fetch
  if (req.query.action === "GET") {
    async function fetchAnnotations(canvas, objectId, token) {
      let annotations = [];

      const stmt = db.prepare(
        `SELECT annotation FROM annotations WHERE canvas = ? AND object_id = ? AND token = ?;`
      );
      const rows = stmt.all(canvas, objectId, token);
      if (rows.length > 0) {
        annotations = rows.map((row) => JSON.parse(row.annotation));
      }

      return annotations;
    }

    const annotations = await fetchAnnotations(canvas, objectId, token);

    function formatAnnotationPage(annotations, url) {
      return {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        id: url,
        type: "AnnotationPage",
        items: annotations,
      };
    }

    let base_url = req.protocol + "://" + req.get("host");
    let url = `${base_url}${req.originalUrl}`;
    return res.send(formatAnnotationPage(annotations, url));
  } else if (req.body === undefined) {
    return res.status(400).json({ error: "body is missing" });

    // create
  } else if (req.method === "POST") {
    const stmt = db.prepare(
      `INSERT INTO annotations (annotation, canvas, object_id, token, annotation_id)
      VALUES (?, ?, ?, ?, ?)`
    );
    stmt.run(
      JSON.stringify(annotation),
      canvas,
      objectId,
      token,
      annotation.id
    );

    return res.send({ message: "create annotation" });
  }
});

app.delete("/api/annotationsByCanvas/:id", async (req, res) => {
  const { annotation } = req.body;

  const stmt = db.prepare("DELETE from annotations WHERE annotation_id = ?");
  stmt.run(annotation.id);

  res.send({ message: "annotation is deleted" });
});

app.put("/api/annotationsByCanvas/:id", async (req, res) => {
  const { annotation } = req.body;

  const stmt = db.prepare(
    "UPDATE annotations set annotation = ? WHERE annotation_id = ?"
  );
  stmt.run(JSON.stringify(annotation), annotation.id);

  res.send({ message: "annotation is updated" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
