# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class ComicItem(scrapy.Item):
    id = scrapy.Field()
    title = scrapy.Field()
    reference_link = scrapy.Field()
    image_link = scrapy.Field()
    categories = scrapy.Field()
    story_content = scrapy.Field()

class ChapterItem(scrapy.Item):
    name = scrapy.Field()
    comic_name = scrapy.Field()
    chapter_link = scrapy.Field()
    image_urls = scrapy.Field()