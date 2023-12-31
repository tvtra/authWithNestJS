import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    isAdmin: boolean;

    @Prop()
    orgId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);