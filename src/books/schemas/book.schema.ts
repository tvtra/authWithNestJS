import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Book {
    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop()
    orgId: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);