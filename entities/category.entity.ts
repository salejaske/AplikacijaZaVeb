import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";
import { Feature } from "./feature.entity";

@Index("uq_category_name", ["name"], { unique: true })
@Index("uq_category_image_path", ["imagePath"], { unique: true })
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", {
    name: "name",
    unique: true,
    length: 32,
    default: () => "'0'",
  })
  name: string;

  @Column("varchar", {
    name: "image_path",
    unique: true,
    length: 128
  })
  imagePath: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @OneToMany(() => Feature, (feature) => feature.category)
  features: Feature[];
}
