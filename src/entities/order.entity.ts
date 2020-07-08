import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Index("cart_id", ["cartId"], {})
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", { name: "cart_id", unsigned: true})
  cartId: number;

  @Column("enum", {
    name: "status",
    enum: ["prihvacena", "odbijena", "na cekanju"],
    default: () => "'na cekanju'",
  })
  status: "prihvacena" | "odbijena" | "na cekanju";

  @OneToOne(() => Cart, (cart) => cart.cart)
  cart: Cart;
}
