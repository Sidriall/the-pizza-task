import {
  prop,
  getModelForClass,
  index,
  modelOptions,
} from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'users' } })
@index({ username: 1 }, { unique: true })
class User {
  @prop({ type: String, required: true, minlength: 3, unique: true })
  public username?: string;

  @prop({ type: String, required: true })
  public password?: string;
}

const UserModel = getModelForClass(User);

// @ts-ignore
export default mongoose.models.User || mongoose.model('User', UserModel);
