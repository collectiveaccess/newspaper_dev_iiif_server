IIIF server for newspaper clover project.

## install

```
npm install

```

create sqlite database to store the clippings

```
node createDB.js
```

## start server

```
npm run dev
```

## endpoints

### `/api/fixtures/newspaper/issue_1`

returns manifest for first issues of newspaper

**method:** GET

### `/api/fixtures/content-search/<id>?q=<search term>`

returns content search manifest

**method:** GET

**query params:**

- `id` is the object id. 1 is for first newspaper issue.
- `q` is the search term

**response**

```JSON

{
  "@context": "http://iiif.io/api/search/2/context.json",
  "id": "http://localhost:3000/api/fixtures/content-search/1?q=Berliner",
  "type": "AnnotationPage",
  "items": [
    {
      "id": "http://localhost:3000/api/fixtures/newspaper/annotation/584",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "Berliner",
        "format": "text/plain"
      },
      "label": { "none": ["p. 1"] },
      "target": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p1#xywh=839,3259,118,27"
    },
    {
      "id": "http://localhost:3000/api/fixtures/newspaper/annotation/920",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "Berliner",
        "format": "text/plain"
      },
      "label": { "none": ["p. 1"] },
      "target": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p1#xywh=161,459,1063,329"
    },
    {
      "id": "http://localhost:3000/api/fixtures/newspaper/annotation/1272",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "Berliner",
        "format": "text/plain"
      },
      "label": { "none": ["p. 1"] },
      "target": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p1#xywh=1942,1579,106,23"
    },
    {
      "id": "http://localhost:3000/api/fixtures/newspaper/annotation/2650",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "Berliner",
        "format": "text/plain"
      },
      "label": { "none": ["p. 2"] },
      "target": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p2#xywh=2468,4313,106,26"
    }
  ]
}

```

### `/api/annotations/<id>`

returns clippings for one object

**method:** GET

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**response**

```JSON
{
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "http://localhost:3000/api/annotations/1",
  "type": "AnnotationPage",
  "label": { "none": ["Clippings"] },
  "items": [
    {
      "type": "Annotation",
      "body": {
        "type": "TextualBody",
        "value": "second",
        "format": "text/plain"
      },
      "motivation": "commenting",
      "target": {
        "type": "SpecificResource",
        "source": {
          "id": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p1",
          "type": "Canvas",
          "partOf": [
            {
              "id": "http://localhost:3000/api/fixtures/newspaper/issue_1",
              "type": "Manifest"
            }
          ]
        },
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=113.88103485107422,1937.4461669921875,830.598030090332,521.8487548828125"
        }
      },
      "id": "#56f5a06f-6fb1-4160-b6c0-fa9717f0edb4"
    }
  ]
}


```

### `/api/annotations/:id`

creates a clipping

**method:** POST

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `annotation` is an annotation in IIIF format

`annotation`

```JSON
{
  "type": "Annotation",
  "body": {
    "type": "TextualBody",
    "value": "first clipping",
    "format": "text/plain"
  },
  "motivation": "commenting",
  "target": {
    "type": "SpecificResource",
    "source": {
      "id": "http://localhost:3000/api/fixtures/newpaper/canvas/i1p1",
      "type": "Canvas",
      "partOf": [
        {
          "id": "http://localhost:3000/api/fixtures/newspaper/issue_1",
          "type": "Manifest"
        }
      ]
    },
    "selector": {
      "type": "FragmentSelector",
      "conformsTo": "http://www.w3.org/TR/media-frags/",
      "value": "xywh=113.88103485107422,1937.4461669921875,830.598030090332,521.8487548828125"
    }
  },
  "id": "#56f5a06f-6fb1-4160-b6c0-fa9717f0edb4"
}

```

### `/api/annotations/:id`

deletes a clipping

**method:** DELETE

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `annotation` is an annotation in IIIF format

### `/api/annotations/:id`

updates a clipping

**method:** PUT

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `annotation` is an annotation in IIIF format
