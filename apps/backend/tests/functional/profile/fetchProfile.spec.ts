import { test } from "@japa/runner";
import Profile from "App/Models/Profile";
import ErrorType from "Types/ErrorType.enum";
import { ProfileSchema } from "../_schemas/Profile.schema";

test.group('Profile -> FetchProfile', (group) => {
    group.tap((test) => test.tags(["profile"]));

    /*
    | Route: GET /profile
    | Schema: ./_schemas/Profile.schema.ts
    | Description:
    |   Returns information about currently authorized profile
    */
    test('fetch authorized profile', async ({ client, expect }) => {
        const profile = await Profile.find(1);

        const response = await client.get('/profile').loginAs(profile!);
        const { response: { body } } = response;

        response.assertStatus(200);
        expect(body).toMatchObject(ProfileSchema); 
    });

    /*
    | Route: GET /profile
    | Schema: ./_schemas/Profile.schema.ts
    | Description:
    |   Tries to get profile information while unauthorized. Returns 401 status
    |   code and { error: ErrorType.UNAUTHORIZED } response
    */
    test('try to fetch profile while unauthorized', async ({ client }) => {
        const response = await client.get('/profile');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});