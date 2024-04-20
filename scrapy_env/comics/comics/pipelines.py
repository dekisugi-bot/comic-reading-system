# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from comics.items import ComicItem, ChapterItem 
import psycopg2

class ComicsPipeline:
    def open_spider(self, spider):
        # Establish connection to the database
        self.connection = psycopg2.connect(
            host='localhost',
            dbname='comics_system',
            user='postgres',
            password='thanh0803'
        )
        self.cursor = self.connection.cursor()

    def close_spider(self, spider):
        # Close the database connection
        self.connection.close()

    def process_item(self, item, spider):
        # Insert data into the database
        try: 
            if isinstance(item, ComicItem):
                self.cursor.execute(
                    "INSERT INTO comics_system.comics (title, reference_link, categories, image_link, story_content) VALUES (%s, %s, %s, %s, %s)",
                    (item['title'], item['reference_link'], item['categories'], item['image_link'], item['story_content'])
                )
                self.connection.commit()
                return item
            elif isinstance(item, ChapterItem):
                self.cursor.execute(
                    "INSERT INTO comics_system.chapters (name, comic_name, chapter_link, image_urls) VALUES (%s, %s, %s, %s)",
                    (item['name'], item['comic_name'], item['chapter_link'], item['image_urls'])
                )
                self.connection.commit()
                return item
        except psycopg2.Error as e:
            self.connection.rollback()
            spider.logger.error(f"Database error: {e}")
            raise
        
