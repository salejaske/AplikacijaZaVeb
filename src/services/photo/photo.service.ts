import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Photo } from "entities/photo.entity";


@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    constructor(@InjectRepository(Photo)private readonly photo: Repository<Photo>,) {
        super(photo);
    }

    add(newPhoto: Photo): Promise<Photo> {
        return this.photo.save(newPhoto);
    }
    
}