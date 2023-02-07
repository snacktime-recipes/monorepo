import { test } from "@japa/runner";
import Profile from "App/Models/Profile";
import ErrorType from "Types/ErrorType.enum";
import { ProfileProductSchema } from "../_schemas/Profile.schema";

test.group('Profile -> ProfileProducts', (group) => {
    group.tap((test) => test.tags(["profile"]));

    /*
    | Route: GET /profile/products
    | Schema: ./_schemas/Profile.schema.ts (ProfileProductSchema)
    | Description:
    |   Returns an array of this profile's products
    */
    test('fetch profile products', async ({ client, expect }) => {
        const profile = await Profile.find(1);

        const response = await client.get('/profile/products').loginAs(profile!);
        const { response: { body } } = response;

        response.assertStatus(200);

        response.assert?.isArray(body);
        expect(body).toEqual(
            expect.arrayContaining([ProfileProductSchema]),
        )
    });

    /*
    | Route: GET /profile/products
    | Schema: ...
    | Description:
    |    Tries to get profile's product information while unauthorized. Returns 401 status code
    |    with { error: ErrorType.UNAUTHORIZED } body
    */
    test('try to fetch products while unauthorized', async ({ client }) => {
        const response = await client.get('/profile/products');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});