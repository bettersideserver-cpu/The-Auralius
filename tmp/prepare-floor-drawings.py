from pathlib import Path
from PIL import Image, ImageChops
import json

source = Path('Auralius floormaps')
target = Path('plans/images/floormaps')
target.mkdir(parents=True, exist_ok=True)
manifest = []
for block, ground_page, upper_page in [(1,7,8),(2,10,11),(3,13,14),(4,16,17),(5,19,20)]:
    for floor, page, side in [('ground',ground_page,1),('first',upper_page,0),('attic',upper_page,1)]:
        filename = f'The Auralius Technical Booklet-{page}.png'
        with Image.open(source / filename) as original:
            original = original.convert('RGB')
            midpoint = original.width // 2
            half = original.crop((midpoint if side else 0, 0, original.width if side else midpoint, original.height))
            # Trim only exterior blank paper. Keep the title, dimensions and every annotation.
            ink = half.convert('L').point(lambda value: 255 if value < 245 else 0)
            bounds = ink.getbbox()
            x0,y0,x1,y1 = bounds
            box = (max(0,x0-100),max(0,y0-100),min(half.width,x1+100),min(half.height,y1+100))
            drawing = half.crop(box)
            stem = f'block-{block}-{floor}'
            full = target / f'{stem}.webp'
            drawing.save(full,'WEBP',lossless=True,method=6)
            # Pixel equality confirms that conversion has not removed fine linework.
            with Image.open(full) as encoded:
                assert ImageChops.difference(drawing,encoded.convert('RGB')).getbbox() is None
            preview = drawing.copy()
            preview.thumbnail((1800,1800),Image.Resampling.LANCZOS)
            preview.save(target / f'{stem}-preview.webp','WEBP',lossless=True,method=6)
            manifest.append(dict(block=block,floor=floor,source=filename,source_half='right' if side else 'left',crop=box,width=drawing.width,height=drawing.height,full=full.as_posix(),lossless_verified=True))
            print(stem,drawing.size,full.stat().st_size)
(target / 'sources.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
