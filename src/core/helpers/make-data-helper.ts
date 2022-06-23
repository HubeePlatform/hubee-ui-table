import { PersonTestModel } from '@/core/models';
import { faker } from '@faker-js/faker';

export default class MakeDataHelper {
    static makeName(): string {
        return faker.name.findName();
    }

    static makePerson(): PersonTestModel {
        const statusChance = Math.random();
        return {
            firstName: MakeDataHelper.makeName(),
            lastName: MakeDataHelper.makeName(),
            age: Math.floor(Math.random() * 30),
            visits: Math.floor(Math.random() * 100),
            progress: Math.floor(Math.random() * 100),
            status:
                statusChance > 0.66
                    ? 'relationship'
                    : statusChance > 0.33
                    ? 'complicated'
                    : 'single',
        } as PersonTestModel;
    }
}
