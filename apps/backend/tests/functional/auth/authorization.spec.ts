import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";

test.group('Authorization', (group) => {
    group.tap((test) => test.tags(["auth"]));

    test('authorize user using email and password', async ({ client }) => {
        const response = await client.post('/profile/login').json({
            email: "test@smail.com",
            password: "123"
        });
        const { response: { body } } = response;

        response.assertStatus(200);
        response.assert?.properties(body, ["id", "email", "createdAt", "updatedAt"]);
    });

    test('try to authorize to nonexistent account', async ({ client }) => {
        const response = await client.post('/profile/login');
        const { response: { body } } = response;

        response.assertStatus(400);
        response.assert?.deepEqual(body, {
            error: ErrorType.INVALID_PAYLOAD,
        });
    });

    test('logout', async ({ client }) => {
        await client.post('/profile/login').json({ email: "test@smail.com", password: "123" });

        const response = await client.post('/profile/logout');
        const { response: { body } } = response;

        response.assertStatus(200);
        response.assert?.deepEqual(body, { ok: true });
    });

    test('try to logout while unauthorized', async ({ client }) => {
        const response = await client.post('/profile/logout');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});