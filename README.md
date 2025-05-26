Termage
========

Display images in Console/Terminal.

```js
import draw from 'termage'

await draw("keqing.png")
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error drawing image:", err);
    process.exit(1);
  });
```

<div align="center">
	<img width="440" height="320" src="demo.png" alt="demo.png">
</div>
