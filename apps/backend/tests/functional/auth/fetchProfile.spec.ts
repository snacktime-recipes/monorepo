import { test } from "@japa/runner";
import Profile from "App/Models/Profile";
import ErrorType from "Types/ErrorType.enum";

test.group('Authorization -> FetchProfile', (group) => {
    group.tap((test) => test.tags(["auth"]));

    test('fetch authorized profile', async ({ client }) => {
        const profile = await Profile.find(1);

        const response = await client.get('/profile').loginAs(profile!);
        const { response: { body } } = response;

        response.assertStatus(200);
        response.assert?.properties(body, ["id", "email", "createdAt", "updatedAt"]);
    });

    test('try to fetch profile while unauthorized', async ({ client }) => {
        const response = await client.get('/profile');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});