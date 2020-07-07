import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleFeature } from "./article-Feature.entity";
import { Category } from "./category.entity";
import { ArticlePrice } from "./article-price.entity";
import { CartArticle } from "./cart-article.entity";
import { Photo } from "./photo.entity";

@Index("fk_article_category_id", ["categoryId"], {})
@Entity("article")
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column({ type: "varchar", length: 128 })
  name: string;

  @Column({ type:"int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type:"text"})
  description: string;

  @Column({
    type: "enum",
    name: "status",
    enum: ["dostupno", "nije dostupno"],
    default: () => "'dostupno'",
  })
  status: "dostupno" | "nije dostupno";

  @Column({type:"varchar", name: "ingredients", length: 224, default: () => "'0'" })
  ingredients: string;

  @Column({type:"date", name: "date_from" })
  dateFrom: string;

  @Column({type:"date", name: "date_to" })
  dateTo: string;

  @OneToOne(() => ArticleFeature, (articleFeature) => articleFeature.article, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "article_id", referencedColumnName: "articleFeatureId" },
  ])
  article: ArticleFeature;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => ArticleFeature, (articleFeature) => articleFeature.article2)
  articleFeatures: ArticleFeature[];

  @OneToMany(() => ArticlePrice, (articlePrice) => articlePrice.article)
  articlePrices: ArticlePrice[];

  @OneToMany(() => CartArticle, (cartArticle) => cartArticle.article)
  cartArticles: CartArticle[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];
}
