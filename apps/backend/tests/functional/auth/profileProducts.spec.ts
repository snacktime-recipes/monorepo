import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";

test.group('Authorization -> ProfileProducts', (group) => {
    group.tap((test) => test.tags(["auth"]));

    test('fetch profile products', async ({ client }) => {
        await client.post('/profile/login').json({ email: 'test@smail.com', password: '123' });

        const response = await client.get('/profile/products');
        const { response: { body } } = response;

        response.assertStatus(200);

        response.assert?.isArray(body);
        response.assert?.properties(body[0], ["id", "name", "count", "imageUrl", "createdAt", "updatedAt"]);
    });

    test('try to fetch products while unauthorized', async ({ client }) => {
        const response = await client.get('/profile/products');
        const { response: { body } } = response;

        response.assertStatus(401);
        response.assert?.deepEqual(body, {
            error: ErrorType.UNAUTHORIZED,
        });
    });
});