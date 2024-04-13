# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class ComicItem(scrapy.Item):
    title = scrapy.Field()
    reference_link = scrapy.Field()
    chapters = scrapy.Field()
    categories = scrapy.Field()
    story_content = scrapy.Field()

    