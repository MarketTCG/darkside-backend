import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { OrderService } from '../order/order.service';
import { StripeService } from '../stripe/stripe.service';
import { UserService } from '@user/user.service';
import { VendorService } from "../vendor/vendor.service"
import { ListingsService } from 'src/listing/listing.service';
import { OrderItemDto } from 'src/order/dto/order-item.dto';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly vendorService: VendorService,
    private readonly listingService: ListingsService
  ) {}


  async checkout(createCheckoutDto: CreateCheckoutDto) {
    return 'This action adds a new checkout';
  }

  findAll() {
    return `This action returns all checkout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkout`;
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }

  async createOrderAndCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    const userId = createCheckoutSessionDto.userId;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const items: OrderItemDto[] = await Promise.all(
      createCheckoutSessionDto.items.map(async (item) => {
        const listings = await this.listingService.findByListingId(item.listingId); // Assuming this method exists
        const vendors = await this.vendorService.findById(listings.vendorListing.VendorID); // Assuming this method exists
        return {
          listings,
          vendors,
          quantity: item.quantity,
        } 
      })
    );

    // Create an order
    const createOrderDto: CreateOrderDto = {
      user: [user], 
      items,
      status: 'pending',
      purchaseDate: new Date(),
      stripePaymentId: '', // Replace with actual Stripe payment ID retrieval logic
    };

    const order = await this.orderService.create(createOrderDto);

    // Create a checkout session
    //const session = await this.stripeService.createCheckoutSession(createCheckoutSessionDto.items);
    return { order/* session*/ };
  }
}
