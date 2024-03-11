IIIF server for newspaper clover project.

## install

```
npm install

```

## start server

```
npm run dev
```

## endpoints

### `/api/newspaper/collection`

returns manifest for two issues of a
newspaper

**method:** GET

### `/api/newspaper/issue_1`

returns manifest for first issues of newspaper

**method:** GET

**response**

```JSON
{
  "@context": ["http://iiif.io/api/presentation/3/context.json"],
  "id": "http://localhost:3000/api/newspaper/issue_1",
  "type": "Manifest",
  "label": { "de": ["1. Berliner Tageblatt - 1925-02-16"] },
  "thumbnail": [
    {
      "id": "https://api.europeana.eu/api/v2/thumbnail-by-url.json?uri=https%3A%2F%2Fiiif.europeana.eu%2Fimage%2F2YMIN6YXMQ6COVM5AO2XKB5KMCKPMT2YKEKNMAGHVRBIHOOY4AVA%2Fpresentation_images%2F9340afd0-ffe2-11e5-b68d-fa163e60dd72%2Fnode-2%2Fimage%2FSBB%2FBerliner_Tageblatt%2F1925%2F02%2F16%2F0%2FF_SBB_00001_19250216_054_079_0_001%2Ffull%2Ffull%2F0%2Fdefault.jpg&type=TEXT",
      "type": "Image",
      "format": "image/jpeg",
      "height": 300,
      "width": 300
    }
  ],
  "partOf": [
    {
      "id": "http://localhost:3000/api/newspaper/collection",
      "type": "Collection",
      "label": { "de": ["Berliner Tageblatt"] }
    }
  ],
  "items": [
    {
      "id": "http://localhost:3000/api/newpaper/canvas/i1p1",
      "type": "Canvas",
      "height": 5000,
      "width": 3602,
      "label": { "none": ["p. 1"] },
      "items": [
        {
          "id": "http://localhost:3000/api/newpaper/items/AnnotationPage/i1p1",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "http://localhost:3000/api/newspaper/issue_1/api/newpaper/items/Annotation/i1p1a1",
              "type": "Annotation",
              "motivation": "painting",
              "body": {
                "id": "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1/full/max/0/default.jpg",
                "type": "Image",
                "format": "image/jpeg",
                "service": [
                  {
                    "id": "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1",
                    "type": "ImageService3",
                    "profile": "level1"
                  }
                ]
              },
              "target": "http://localhost:3000/api/newpaper/canvas/i1p1"
            }
          ]
        }
      ],
      "annotations": [
        {
          "id": "http://localhost:3000/api/annotations/1",
          "type": "AnnotationPage"
        }
      ]
    },
    {
      "id": "http://localhost:3000/api/newpaper/canvas/i1p2",
      "type": "Canvas",
      "height": 4999,
      "width": 3536,
      "label": { "none": ["p. 2"] },
      "items": [
        {
          "id": "http://localhost:3000/api/newpaper/items/AnnotationPage/i1p2",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "http://localhost:3000/api/newspaper/issue_1/api/newpaper/items/Annotation/i1p2",
              "type": "Annotation",
              "motivation": "painting",
              "body": {
                "id": "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p2/full/max/0/default.jpg",
                "type": "Image",
                "format": "image/jpeg",
                "service": [
                  {
                    "id": "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p2",
                    "type": "ImageService3",
                    "profile": "level1"
                  }
                ]
              },
              "target": "http://localhost:3000/api/newpaper/canvas/i1p2"
            }
          ]
        }
      ],
      "annotations": [
        {
          "id": "http://localhost:3000/api/annotations/1",
          "type": "AnnotationPage"
        }
      ]
    }
  ],
  "service": [
    {
      "id": "http://localhost:3000/api/newspaper_search/1",
      "type": "SearchService2"
    }
  ]
}

```

### `/api/newspaper/issue_2`

returns manifest for second issues of newspaper

**method:** GET

### `/api/newspaper_search/<id>?q=<search term>`

returns content search manifest

**method:** GET

**query params:**

- `id` is the object id. 1 is for first newspaper issue. 2 is for second newspaper issue.
- `q` is the search term

**response**

```JSON

{
  "@context": "http://iiif.io/api/search/2/context.json",
  "id": "http://localhost:3000/api/newspaper_search/1?q=hatte",
  "type": "AnnotationPage",
  "items": [
    {
      "id": "http://localhost:3000/api/newspaper/annotation/1134",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "hatte",
        "format": "text/plain"
      },
      "label": { "none": ["p. 1"] },
      "target": "http://localhost:3000/api/newpaper/canvas/i1p1#xywh=1794,2225,60,28"
    },
    {
      "id": "http://localhost:3000/api/newspaper/annotation/1457",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "hatte",
        "format": "text/plain"
      },
      "label": { "none": ["p. 2"] },
      "target": "http://localhost:3000/api/newpaper/canvas/i1p2#xywh=1526,2680,60,29"
    },
    {
      "id": "http://localhost:3000/api/newspaper/annotation/2662",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "hatte",
        "format": "text/plain"
      },
      "label": { "none": ["p. 2"] },
      "target": "http://localhost:3000/api/newpaper/canvas/i1p2#xywh=1535,4338,61,28"
    },
    {
      "id": "http://localhost:3000/api/newspaper/annotation/2734",
      "type": "Annotation",
      "motivation": "highlighting",
      "body": {
        "type": "TextualBody",
        "value": "hatte",
        "format": "text/plain"
      },
      "label": { "none": ["p. 2"] },
      "target": "http://localhost:3000/api/newpaper/canvas/i1p2#xywh=1485,4438,63,29"
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
      "body": [
        {
          "value": "https://iiif.io/api/image/3.0/example/reference/4ce82cef49fb16798f4c2440307c3d6f-newspaper-p1/full/150,/0/default.jpg",
          "type": "Image",
          "format": "image/jpeg"
        },
        { "type": "TextualBody", "value": "first", "format": "text/plain" },
      ],
      "motivation": "commenting",
      "target": {
        "type": "SpecificResource",
        "source": {
          "id": "http://localhost:3000/api/newpaper/canvas/i1p1",
          "type": "Canvas",
          "partOf": [
            {
              "id": "http://localhost:3000/api/newspaper/issue_1",
              "type": "Manifest"
            }
          ]
        },
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=1229.863525390625,2535.308837890625,561.4622802734375,653.014892578125"
        }
      },
      "id": "#3b97cb08-c959-4bdf-8f97-2a32ada99ce3"
    }
  ]
}

```

### `/api/annotationsByCanvas/:id?action=GET`

returns clippings for one canvas.

Note: I'm sending canvas ID in the request body instead of query params because the canvas id might be too long to use in the url.

I used POST instead of GET because canvas ID is sent in the request body

**method:** POST

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.
- `action` is hacky way to fake a get action.

**request body**

- `canvas` is the canvas ID

**response**

```JSON
{
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "http://localhost:3000/api/annotationsByCanvas/1?action=GET",
  "type": "AnnotationPage",
  "label": {
    "none": ["Clippings"]
  },
  "items": [
    {
      "type": "Annotation",
      "body": [
        {
          "type": "TextualBody",
          "value": "first",
          "format": "text/plain"
        },
        {
          "type": "TextualBody",
          "value": "o",
          "format": "text/plain"
        }
      ],
      "motivation": "commenting",
      "target": {
        "type": "SpecificResource",
        "source": {
          "id": "http://localhost:3000/api/newpaper/canvas/i1p1",
          "type": "Canvas",
          "partOf": [
            {
              "id": "http://localhost:3000/api/newspaper/issue_1",
              "type": "Manifest"
            }
          ]
        },
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=1229.863525390625,2535.308837890625,561.4622802734375,653.014892578125"
        }
      },
      "id": "#3b97cb08-c959-4bdf-8f97-2a32ada99ce3"
    }
  ]
}
```

### `/api/annotationsByCanvas/:id`

creates a clipping

**method:** POST

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `canvas` is the canvas ID
- `annotation` is an annotation in IIIF format

`annotation`

```JSON
{
   "type": "Annotation",
   "body": {
      "type": "TextualBody",
      "value": "po",
      "format": "text/plain"
   },
   "motivation": "commenting",
   "target": {
      "type": "SpecificResource",
      "source": {
         "id": "http://localhost:3000/api/newpaper/canvas/i1p1",
         "type": "Canvas",
         "partOf": [
            {
               "id": "http://localhost:3000/api/newspaper/issue_1",
               "type": "Manifest"
            }
         ]
      },
      "selector": {
         "type": "FragmentSelector",
         "conformsTo": "http://www.w3.org/TR/media-frags/",
         "value": "xywh=353.384765625,1617.4652099609375,825.937255859375,565.2774658203125"
      }
   },
   "id": "#0601483e-bb06-44eb-8bc2-96d3e75c3c86"
}

```

### `/api/annotationsByCanvas/:id`

deletes a clipping

**method:** DELETE

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `annotation` is an annotation in IIIF format

### `/api/annotationsByCanvas/:id`

updates a clipping

**method:** PUT

**headers:**

- authorization with JWT token

**query params:**

- `id` is the object id.

**request body**

- `annotation` is an annotation in IIIF format
