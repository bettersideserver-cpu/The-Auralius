from pathlib import Path
import pypdfium2 as pdfium
from PIL import Image, ImageDraw

out = Path('tmp/pdf-review')
for filename, prefix in [('The Auralius _ Technical Booklet _ Jul 28.pdf', 'booklet'), ('Surya Realty _ Profile (1).pdf', 'profile')]:
    doc = pdfium.PdfDocument(filename)
    for start in range(0, len(doc), 12):
        sheet = Image.new('RGB', (1800, 1280), 'white')
        draw = ImageDraw.Draw(sheet)
        for i in range(start, min(start + 12, len(doc))):
            page = doc[i]
            preview = page.render(scale=600 / page.get_width()).to_pil().convert('RGB')
            preview.thumbnail((580, 285))
            x, y = ((i-start) % 3)*600, ((i-start)//3)*320
            sheet.paste(preview, (x, y+25))
            draw.text((x+10,y+5), f'{prefix} page {i+1}', fill='black')
        sheet.save(out / f'{prefix}-contact-{start+1}.jpg')
