import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";
import { Order } from "src/entities/order.entity";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Cart) 
        private readonly cart: Repository<Cart>,


        @InjectRepository(Order) 
        private readonly order: Repository<Order>,

    ){ }

    async add(CartId: number): Promise<Order | ApiResponse>{
        const order = await this.order.findOne({
            cartId: CartId,
        });

        if(order){
            return new ApiResponse("error", -7001, "An order for this cart has already been made.");
        }
        const cart = await this.cart.findOne(CartId, {
            relations: [
                "cartArticles",
            ],
            

        });

        if(!cart){
            return new ApiResponse("error", -7002, "No such cart found.");
        }
        if(cart.cartArticles.length === 0){
            return new ApiResponse("error", -7003, "This cart is empty.");

        }

        const newOrder: Order = new Order();
        newOrder.cartId = CartId;
        const savedOrder = await this.order.save(newOrder);

        return await this.order.findOne(savedOrder.orderId, {
            relations: [
                "cart",
                "cart.user",
                "cart.cartArticles",
                "cart.cartArticles.article",
                "cart.cartArticles.article.category",
                "cart.cartArticles.article.articlePrices",

            ],
        });

    }
}