import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from '@nestjsx/crud'
import { ArticleService } from "src/services/artricle/article.service";
import { Article } from "entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";

@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id:{
            field: 'articleId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join: {
            categories: {   
                eager: true
            },
            photos: {
                 eager: true   
            },
            articleFeatures: {
                eager: true
            },
            articlePrices: {
                eager: true
            }
        }
    }
}) 
export class ArticleController{
    constructor(public service: ArticleService){ }

    @Post('createFull')
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
    }
}