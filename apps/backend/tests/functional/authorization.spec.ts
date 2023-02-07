import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import Profile from 'App/Models/Profile';
import { ProfileSchema } from "./_schemas/Profile.schema";

test.group('Authorization', (group) => {
    group.tap((test) => test.tags(["auth"]));

    /*
    | Route: POST /profile/login
    | Schema: ./_schemas/Profile.schema.ts
    | Description:
    |   Authorizes user using email and password. Returns full
    |   user object.
    */
    test('authorize user using email and password', async ({ client, expect }) => {
        const response = await client.post('/profile/login').json({
            email: "test@smail.com",
            password: "123"
        });
        const { response: { body } } = response;

        response.assertStatus(200);
        expect(body).toMatchObject(ProfileSchema);
    });

    /*
    | Route: POST /profile/login
    | Description:
    |   Tries to authorize to nonexistent account. Returns 400 status
    |   code and { error: ErrorType.INVALID_PAYLOAD } response
    */
    test('try to authorize to nonexistent account', async ({ client }) => {
        const response = await client.post('/profile/login');
        const { response: { body } } = response;

        response.assertStatus(400);
        response.assert?.deepEqual(body, {
            error: ErrorType.INVALID_PAYLOAD,
        });
    });

    /*
    | Route: POST /profile/logout
    | Description:
    |   Logout from authorized profile. Returns { ok: true } and 200
    |   status code.
    */
    test('logout', async ({ client }) => {
        const profile = await Profile.find(1);

        const response = await client.post('/profile/logout').loginAs(profile!);
        const { response: { body } } = response;

        response.assertStatus(200);
        response.assert?.deepEqual(body, { ok: true });
    });

    /*
    | Route: POST /profile/logout
    | Description:
    |   Tries to logout from unauthorized profile. Returns 401
    |   status code and { error: ErrorType.UNAUTHORIZED } response
    */
    test('try to logout while unauthorized', async ({ client }) => {
        const response = await client.post('/profile/logout');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});