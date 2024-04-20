import scrapy
from comics.items import ComicItem, ChapterItem
import os

class MyComicSpider(scrapy.Spider):
    name = 'comics'
    allowed_domains = ['nettruyenfull.com']
    start_urls = ['http://nettruyenfull.com/']
    
    output_filename = 'comics/data/story.json'

    def start_requests(self):
        # Delete file if it exists
        if os.path.exists(self.output_filename):
            os.remove(self.output_filename)

        # Tiếp tục các yêu cầu bình thường
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for comic in response.css('div.item'):
            item = ComicItem()
            item['title'] = comic.css('h3 a::text').get()
            item['reference_link'] = comic.css('h3 a::attr(href)').get()
            
            if item['reference_link']:
                request = scrapy.Request(item['reference_link'],
                                         callback=self.parse_comic_details,
                                         meta={'comic_item': item})
            
                yield request
    
    def parse_comic_details(self, response):
        # Retrieve item from the previous response
        item = response.meta['comic_item']

        # Continue extracting other details from the comic's detailed page
        categories = response.css('p.col-xs-8 a::text').getall()
        item['categories'] = categories
        item['image_link'] = response.css('div.col-xs-4.col-image img::attr(src)').get()

        #Extracting story content from the comic's detailed page
        story_content = response.css('div.detail-content p::text').get()
        item['story_content'] = story_content 
        
        yield item
        
        # item['chapters'] = {}
        
        # Select each row in the chapters list
        chapters = response.css('.row .chapter a')
        for chapter in chapters:
            ch_item = ChapterItem()
            ch_item['chapter_link'] = chapter.xpath('./@href').get()

            # Request the chapter page and parse it with a different method
            yield scrapy.Request(
                ch_item['chapter_link'], 
                callback=self.parse_chapter, 
                meta={
                    'comic': item,
                    'comic_chapter':ch_item
                }
            )           
        
    def parse_chapter(self, response):
        # This method will parse the individual chapter pages to get image links
        item = response.meta['comic']
        ch_item = response.meta['comic_chapter']
        ch_item['name'] = response.css('p.select-chapter span::text').get()
        ch_item['comic_name'] = item['title']
        ch_item['chapter_link'] = response.url
        ch_item['image_urls'] = response.css('.page-chapter img.lazy::attr(data-original)').getall()
        
        yield ch_item