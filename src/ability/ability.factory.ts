import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Book } from "src/books/schemas/book.schema";
import { User } from "src/users/schemas/user.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof Book | User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder(
            Ability as AbilityClass<AppAbility>
            );
        
        if (user.isAdmin) {
            can(Action.Manage, 'all');
            cannot(Action.Manage, 'all', { orgId: { $ne: user.orgId } }).because(
                'You can only manage books in your own organization',
            );
        } else {
            can(Action.Read, 'all');
            cannot(Action.Delete, 'all').because(
                'Only admin can do that',
            );
            cannot(Action.Create, 'all').because(
                'Only admin can do that',
            );
            cannot(Action.Update, 'all').because(
                'Only admin can do that',
            );
        }

        return build({
            detectSubjectType: (item) =>
            item.constructor as ExtractSubjectType<Subjects>,
        })
    }
}
