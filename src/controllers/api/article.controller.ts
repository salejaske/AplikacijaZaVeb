import { Controller } from "@nestjs/common";
import { Crud } from '@nestjsx/crud'
import { ArticleService } from "src/services/artricle/article.service";
import { Article } from "entities/article.entity";

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
            features: {
                 eager: true   
            },
            articles: {
                eager: false
            }
        }
    }
}) 
export class ArticleController{
    constructor(public service: ArticleService){ }
}