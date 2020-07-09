export class EditArticleDto {
    name: string;
    categoryId: number;
    excerpt: string;
    description: string;
    status: 'dostupno'|'nije dostupno';
    price: number;
    features: {
        featureId: number;
        value: string;
    }[] | null;
}
