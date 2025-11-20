import json
import datetime
from xml.sax.saxutils import escape

BASE_URL = "https://sudhir.is-a.dev"
ESSAYS_FILE = "essays.json"
OUTPUT_FILE = "feed.xml"

def generate_rss():
    try:
        with open(ESSAYS_FILE, "r") as f:
            essays = json.load(f)
    except FileNotFoundError:
        print(f"Error: {ESSAYS_FILE} not found.")
        return

    rss_content = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>Sudhir</title>
 <description>Minimalist blog by Sudhir</description>
 <link>{BASE_URL}</link>
 <lastBuildDate>{datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0000")}</lastBuildDate>
 <pubDate>{datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0000")}</pubDate>
 <ttl>1800</ttl>
"""

    for essay in essays:
        title = escape(essay.get("title", "Untitled"))
        slug = essay.get("slug", "")
        description = escape(essay.get("description", ""))
        date_str = essay.get("date", "")
        
        # Convert date to RFC 822 format if possible, otherwise use as is
        try:
            dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
            pub_date = dt.strftime("%a, %d %b %Y 00:00:00 +0000")
        except ValueError:
            pub_date = date_str

        link = f"{BASE_URL}/essay.html?slug={slug}"

        rss_content += f"""
 <item>
  <title>{title}</title>
  <description>{description}</description>
  <link>{link}</link>
  <guid isPermaLink="true">{link}</guid>
  <pubDate>{pub_date}</pubDate>
 </item>
"""

    rss_content += """
</channel>
</rss>
"""

    with open(OUTPUT_FILE, "w") as f:
        f.write(rss_content)
    
    print(f"RSS feed generated at {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_rss()
