import os, sys

pdf_path = r"C:\Users\user\.gemini\antigravity-ide\brain\3d742525-b6cb-4bc3-a297-6741a1dc77c4\.user_uploaded\media_1791522529911.pdf"
print("PDF exists:", os.path.exists(pdf_path))

try:
    import fitz # PyMuPDF
    print("PyMuPDF (fitz) available")
    doc = fitz.open(pdf_path)
    print("Page count:", len(doc))
    os.makedirs("public/assets/images/pdf_slides", exist_ok=True)
    os.makedirs("assets/images/pdf_slides", exist_ok=True)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        pix.save(f"public/assets/images/pdf_slides/slide_{i+1}.jpg")
        pix.save(f"assets/images/pdf_slides/slide_{i+1}.jpg")
    print("Saved all slides as high-res images!")
except Exception as e:
    print("PyMuPDF error:", e)
