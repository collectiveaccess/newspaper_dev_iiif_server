async function fetchAnnotationsByObjectCanvas(db, canvas, objectId, token) {
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

async function fetchAnnotationsByObject(db, objectId, token) {
  let annotations = [];

  const stmt = db.prepare(
    `SELECT annotation FROM annotations WHERE object_id = ? AND token = ?;`
  );
  const rows = stmt.all(objectId, token);
  if (rows.length > 0) {
    annotations = rows.map((row) => JSON.parse(row.annotation));
  }

  return annotations;
}

async function createAnnotation(db, annotation, canvas, objectId, token) {
  const stmt = db.prepare(
    `INSERT INTO annotations (annotation, canvas, object_id, token, annotation_id)
      VALUES (?, ?, ?, ?, ?)`
  );
  stmt.run(JSON.stringify(annotation), canvas, objectId, token, annotation.id);
}

async function deleteAnnotation(db, annotation) {
  const stmt = db.prepare("DELETE from annotations WHERE annotation_id = ?");
  stmt.run(annotation.id);
}

async function updateAnnotation(db, annotation) {
  const stmt = db.prepare(
    "UPDATE annotations set annotation = ? WHERE annotation_id = ?"
  );
  stmt.run(JSON.stringify(annotation), annotation.id);
}

module.exports = {
  fetchAnnotationsByObjectCanvas,
  fetchAnnotationsByObject,
  createAnnotation,
  deleteAnnotation,
  updateAnnotation,
};
