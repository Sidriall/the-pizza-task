import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import User from './User';

@modelOptions({
  schemaOptions: {
    collection: 'orders',
    timestamps: {},
  },
  options: { allowMixed: Severity.ALLOW },
})
@index({ userId: 1 })
class Order {
  @prop({ ref: () => User, default: null })
  public userId?: mongoose.Types.ObjectId;

  @prop({ type: String, required: true })
  public name?: string;

  @prop({ type: String, required: true })
  public surname?: string;

  @prop({ type: String, required: true })
  public address?: string;

  @prop({ type: () => [Object], required: true })
  public details?: mongoose.Types.DocumentArray<any>;

  // @prop({ type: Date, default: new Date() })
  // public date!: Date;
}

const OrderModel = getModelForClass(Order);

// @ts-ignore
export default mongoose.models.Order || mongoose.model('Order', OrderModel);
