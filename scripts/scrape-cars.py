#!/usr/bin/env python3
"""Scrape GTA Cars detail pages -> one JSON per car + image-download manifest.
Real data only. Dominant jet-form-builder hash folder = this car's gallery."""
import re, html, json, sys, os, time, urllib.request, ssl
from collections import Counter

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
CTX = ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE

BRANDS = [
 "Mercedes-Benz","Land Rover","Range Rover","Rolls-Royce","Aston Martin","Alfa Romeo",
 "BMW","Porsche","Audi","Bentley","Jeep","Nissan","Lamborghini","Toyota","Ford",
 "Chevrolet","Maserati","Ferrari","Dodge","Mini","Jaguar","Cadillac","Tesla","Jetour",
 "Volvo","Lexus","Volkswagen","McLaren","Lotus","Infiniti","Genesis","GMC","Peugeot",
 "Mitsubishi","Mazda","Lincoln","Honda","Geely","Mercedes","Lincoln",
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40, context=CTX) as r:
        return r.read().decode("utf-8","replace")

def clean(s): return html.unescape(re.sub(r"<[^>]+>","",s)).replace("﻿","").strip()

def parse(url, h):
    t = re.search(r"<title>(.*?)</title>", h, re.S)
    title = clean(t.group(1)) if t else ""
    title = re.sub(r"\s*[\|–-]\s*GTA Cars.*$","",title, flags=re.I).strip()
    year = None
    ym = re.match(r"\s*((?:19|20)\d{2})", title)
    if ym: year = int(ym.group(1))
    # brand: first brand found in title
    brand=None
    for b in BRANDS:
        if re.search(r"\b"+re.escape(b)+r"\b", title, re.I): brand=b; break
    if brand=="Mercedes": brand="Mercedes-Benz"
    if brand=="Range Rover": brand="Land Rover"  # canonical make; keep model
    # specs
    specs={}
    for m in re.finditer(r"<b>([^<:]+):</b>(.*?)</div>", h, re.S):
        lab=m.group(1).strip(); val=clean(m.group(2))
        if lab not in specs and val: specs[lab]=val
    price=re.search(r"AED\s?([\d,]{4,})", h)
    price=int(price.group(1).replace(",","")) if price else None
    monthly=re.search(r"([\d,]+)\s*/\s*Month", h, re.I)
    monthly=int(monthly.group(1).replace(",","")) if monthly else None
    # images: dominant hash folder
    raw=re.findall(r"https://gtacars\.ae/wp-content/uploads/jet-form-builder/([a-f0-9]+)/[^\s\"']+?\.(?:jpe?g|png|webp)", h, re.I)
    imgs=[]
    if raw:
        top=Counter(raw).most_common(1)[0][0]
        urls=re.findall(r"https://gtacars\.ae/wp-content/uploads/jet-form-builder/"+top+r"/[^\s\"']+?\.(?:jpe?g|png|webp)", h, re.I)
        seen=set()
        for u in urls:
            # normalise: drop -150x150 style size suffixes to dedupe to originals
            base=re.sub(r"-\d{2,4}x\d{2,4}(?=\.(?:jpe?g|png|webp))","",u, flags=re.I)
            if base not in seen:
                seen.add(base); imgs.append(base)
    # description: meta description as fallback + any long paragraph
    desc=""
    md=re.search(r'<meta name="description" content="([^"]+)"', h)
    if md: desc=html.unescape(md.group(1)).strip()
    # status sold?
    sold = bool(re.search(r"\bSOLD\b", h)) and "sold" in title.lower()
    return {
        "title": title, "year": year, "brand": brand,
        "price": price, "monthly": monthly,
        "mileageKm": parse_km(specs.get("Mileage","")),
        "transmission": specs.get("Transmission"),
        "bodyType": specs.get("Body Type"),
        "cylinders": specs.get("No. of Cylinders") or specs.get("Cylinders"),
        "horsepower": specs.get("Horsepower"),
        "fuelType": specs.get("Fuel Type"),
        "colour": specs.get("Colour") or specs.get("Color"),
        "doors": specs.get("Doors"),
        "regional": specs.get("Specifications"),
        "warranty": specs.get("Warranty"),
        "serviceHistory": specs.get("Service History"),
        "serviceContract": specs.get("Service Contract"),
        "description": desc,
        "imageUrls": imgs[:10],
        "sourceUrl": url,
    }

def parse_km(s):
    m=re.search(r"([\d,]+)", s or "")
    return int(m.group(1).replace(",","")) if m else None

def slugify(url):
    s=url.rstrip("/").split("/")[-1]
    return s

def main():
    urls=[l.strip() for l in open(sys.argv[1]) if l.strip()]
    out=sys.argv[2]
    os.makedirs(out, exist_ok=True)
    manifest={}
    ok=0
    for i,u in enumerate(urls):
        try:
            h=fetch(u); d=parse(u,h)
            if not d["price"] or not d["imageUrls"]:
                print(f"  skip (no price/img): {slugify(u)}"); continue
            slug=slugify(u); d["slug"]=slug
            json.dump(d, open(os.path.join(out,slug+".json"),"w"), indent=2, ensure_ascii=False)
            manifest[slug]=d["imageUrls"]
            ok+=1
            print(f"[{ok}] {d['year']} {d['brand']} | AED {d['price']} | {len(d['imageUrls'])} imgs | {slug[:50]}")
        except Exception as e:
            print(f"  ERR {slugify(u)}: {e}")
        time.sleep(0.25)
    json.dump(manifest, open(os.path.join(out,"_manifest.json"),"w"), indent=2)
    print(f"\nDONE: {ok} cars -> {out}")

if __name__=="__main__": main()
